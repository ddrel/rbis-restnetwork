const express = require('express');
const router = express.Router();
const controller   = require('../controller/index');

router.get("/city", (req, res, next) => {
    let lat = req.query.lat,lon=req.query.lon;
    if(lat=="" || lon=="") {res.status(500).status("Error");return;} 
    return  controller.getGeoCity(lon,lat).then(city=>{
        res.send(city);
      }).catch(next);
});

router.get("/province", (req, res, next) => {
  let lat = req.query.lat,lon=req.query.lon;

  console.log(req.query);

  if(lat=="" || lon=="") {res.status(500).status("Error");return;} 
  return  controller.getGeoProvince(lon,lat).then(province=>{
      res.send(province);
    }).catch(next);
});

router.get("/search", (req, res, next) => {
    let name = req.query.name || "";
    if(name=="") {res.status(500).status("Error");return;} 
    return controller.getShape(name).then(d=>{
      res.send(d)
    }).catch({next});

})

router.get("/getbyid", (req, res, next) => {
  let id = req.query.id || "";
  if(id=="") {res.status(500).status("Error");return;} 
  return controller.getShapeById(id).then(d=>{
    res.send(d)
  }).catch(next);

})

module.exports = router;