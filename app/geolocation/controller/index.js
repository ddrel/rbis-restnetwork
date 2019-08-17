const mongoose =  require('mongoose');
const util  =  require("../../common/util/util");
const getGeoLocation = (type,lon,lat)=>{
let P = new Promise((res,rej)=>{
    let model = type=="city"? mongoose.model("cities_geolocation"): mongoose.model("provincial_geolocation");
    let points = util.get360Points(lat,lon,30)
    model.find({
        "geometry":{
            $geoIntersects : {
            $geometry : {
                type : 'Polygon',
                coordinates : [points]
                        }
            }
        }
    }).then(d=>{
        res(d)
    }).catch(e=>{
        rej(e);
    }) 
})
return P;    
}



const getShape=(args)=>{
    let model  = mongoose.model("geo_shape");
    let query = {$or:[{"properties.NAME_1":new RegExp(args,'i')},{"properties.NAME_2":new RegExp(args,'i')}]}
    console.log(query)
  return  model.find(query,{limit:50}).select("_id properties.NAME_1 properties.NAME_2 properties.ENGTYPE_1 properties.ENGTYPE_2").then(data=>{
        
        let prov = data.filter(d=>{return d.properties.ENGTYPE_1=="Province"})
                    .map(d=>{
                            return {id:d._id,
                            name:d.properties.NAME_1,
                            type:'province'
                        }
                    })

        let mc = data.filter(d=>{return d.properties.ENGTYPE_2=="Municipality" || d.properties.ENGTYPE_2=="City"})
                    .map(d=>{
                            return {id:d._id,
                            name:`${d.properties.NAME_2}, ${d.properties.NAME_1}`,
                            type:'municity'
                        }
                    })                    

        return {province:prov,municity:mc}                    

    })
    
}

const getShapeById = id => mongoose.model("geo_shape").findOne({_id:id})

const getGeoCity = (lon,lat)=>{
    return getGeoLocation("city",lon,lat);
}

const getGeoProvince = (lon,lat)=>{
    return getGeoLocation("provincial",lon,lat);
}
module.exports = {getGeoCity,getGeoProvince,getShape,getShapeById};