const toRad=(value)=>{
    return value * Math.PI / 180;
};

const toDeg = (radians)=>{
   return  radians * (180/Math.PI);
};

const destinationPoint = (latng,brng, dist)=> {
    dist = dist / 6371;  
    brng = toRad(brng);  
    
    let lat1 = toRad(latng.lat), lon1 = toRad(latng.lng);
    let lat2 = Math.asin(Math.sin(lat1) * Math.cos(dist) + 
                         Math.cos(lat1) * Math.sin(dist) * Math.cos(brng));

    let lon2 = lon1 + Math.atan2(Math.sin(brng) * Math.sin(dist) *
                                 Math.cos(lat1), 
                                 Math.cos(dist) - Math.sin(lat1) *
                                 Math.sin(lat2));

    if (isNaN(lat2) || isNaN(lon2)) return null;
    return {lat:toDeg(lat2), lng:toDeg(lon2)};
 }

 const get360Points = (lat,lng,rad)=>{
    let points = [];
    //var part = 360 / part;
    let _rpt = 0 ;
    let _latlng = {lat:lat,lng:lng}

    do {
        let coord = destinationPoint(_latlng,_rpt,rad / 1000);
        points.push([coord.lng,coord.lat]);
        _rpt+=1;    
    }while(_rpt<=360)
    return points;
}

module.exports  = {destinationPoint,get360Points}