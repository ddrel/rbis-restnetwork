const mongoose =  require('mongoose');


const getwinduv=(qry)=>{
    return mongoose.model("winduv").findOne(qry); 
}

const getWindBygroupIndex = (group,index)=>{
    let P =  new Promise((res,rej)=>{
        let qry = index?{group:group,index:index} : {};
        console.log(qry);
            getwinduv(qry).then(data=>{
                res(data)
            }).catch(error=>{
                rej(error);
            });
      });      
      return P;
};


const getWindByDatekey=(date)=>{
      let P =  new Promise((res,rej)=>{
        let qry = date?{datekey:date} : {};
            getwinduv(qry).then(data=>{
                res(data)
            }).catch(error=>{
                rej(error);
            });
      });      
      return P;
};

module.exports = {getWindBygroupIndex,getWindByDatekey};