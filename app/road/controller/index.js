const mongoose = require('mongoose');

const search = (params)=>{
let _params = {};    
    _params.qry = params.qry || "";
    _params.limit = parseInt(params.limit) || 5;
    _params.page = parseInt(params.page) || 1
    let  rname = new RegExp(_params.qry,'i'),rid = new RegExp(_params.qry,'i');

    return mongoose.model("Roads").paginate( {$or:[{"R_NAME":rname},{"R_ID":rid}]}, { page: _params.page, limit: _params.limit,select:"R_ID R_NAME"})  
}

const getRoadByRID=(rid)=>{
    return mongoose.model("Roads").findOne({R_ID:rid}).select("R_ID R_NAME DirFlow Environmen Length ProvinceCo RegionCode CityMunCod RROW R_CLASS R_Importan Terrain geometry RoadCarriageway").then(d=>{
        return {R_ID:d.R_ID,
                R_NAME:d.R_NAME,
                Environmen:d.Environmen,
                Length:d.Length,
                ProvinceCo:d.ProvinceCo,
                RegionCode:d.RegionCode, 
                CityMunCod:d.CityMunCod,
                RROW:d.RROW,
                R_CLASS:d.R_CLASS,
                R_Importan:d.R_Importan,
                Terrain:d.Terrain,
                DirFlow:d.DirFlow,
                geometry:d.geometry,
                RoadCarriageway:d.RoadCarriageway.map(c=>{
                    return { R_ID:c.R_ID,
                        SegmentID:c.SegmentID,
                        SurfaceTyp:c.SurfaceTyp,
                        SegmentCon:c.SegmentCon,
                        PavementTy:c.PavementTy,
                        LaneWidthL:c.LaneWidthL,
                        LaneWidthR:c.LaneWidthR,
                        NumLanes:c.NumLanes,
                        LRPEndDisp:c.LRPEndDisp,
                        LRPEndKmPo:c.LRPEndKmPo,
                        LRPStartDi:c.LRPStartDi,
                        LRPStartKm:c.LRPStartKm,
                        SegmentLen:c.SegmentLen,
                        PavementThickness:c.PavementThickness,
                        PavementStrength:c.PavementStrength,
                        geometry:c.geometry}
                })
            }
    })
}

const getRoadByRIDwithCarriageway=(rid)=>{
    return mongoose.model("Roads").findOne({R_ID:rid}).select("RoadCarriageway").then(d=>{
        return d.geometry
    })
}

const getRoadCarriageway=(segmentid)=>{
    return mongoose.model("Roads").findOne({"RoadCarriageway.SegmentID":segmentid}). then(d=>{
        return d.RoadCarriageway.filter(c=>c.SegmentID==segmentid)[0] || {};
    }).then(d=>{
        return {
            R_ID:d.R_ID,
            SegmentID:d.SegmentID,
            SurfaceTyp:d.SurfaceTyp,
            SegmentCon:d.SegmentCon,
            PavementTy:d.PavementTy,
            LaneWidthL:d.LaneWidthL,
            LaneWidthR:d.LaneWidthR,
            NumLanes:d.NumLanes,
            LRPEndDisp:d.LRPEndDisp,
            LRPEndKmPo:d.LRPEndKmPo,
            LRPStartDi:d.LRPStartDi,
            LRPStartKm:d.LRPStartKm,
            geometry:d.geometry
        }
    })
}


module.exports = {search,getRoadByRID,getRoadCarriageway,getRoadByRIDwithCarriageway}