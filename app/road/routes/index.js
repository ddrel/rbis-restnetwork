const express = require('express');
const router = express.Router();
const controller   = require('../controller/index');

router.get("/search", (req, res, next) => {
    let _params = {};
        _params.qry = req.query.qry;
        _params.limit = req.query.limit
        _params.page = req.query.page || 1;
     
    return  controller.search(_params).then(searchresult=>{
        res.send(searchresult);
      }).catch(next);
  });
  
  router.get('/getbyrid',(req,res,next)=>{
      let rid = req.query.rid || "";
      if(rid=="") {res.send({}) 
                return;};

        return controller.getRoadByRID(rid).then(result=>{
            res.send(result);
        }).catch(next);

  })

  router.get('/getsegmentbyid',(req,res,next)=>{
    let rid = req.query.id || "";
    if(rid=="") {res.send({}) 
              return;};

      return controller.getRoadCarriageway(rid).then(result=>{
          res.send(result);
      }).catch(next);

})
router.get('/getroadwithsegmentbyid',(req,res,next)=>{
    let rid = req.query.id || "";
    if(rid=="") {res.send({}) 
              return;};

      return controller.getRoadByRIDwithCarriageway(rid).then(result=>{
          res.send(result);
      }).catch(next);

})


  
  module.exports = router;