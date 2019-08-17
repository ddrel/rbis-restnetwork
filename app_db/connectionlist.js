const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

const options = {
  promiseLibrary: global.Promise,
  useNewUrlParser: true,
  reconnectTries: Number.MAX_VALUE,
  reconnectInterval: 60 * 1000
};

const MONGO_CONNECT = ()=>{
    let _conStr = {
                    "XX00": process.env.MONGODB_XX00 || process.env.MONGODB_XX00_LOCAL,
                    /*"XX15": process.env.MONGODB_XX15,*/
                    "XX30": process.env.MONGODB_XX30 || process.env.MONGODB_XX30_LOCAL,
                    /*"XX45": process.env.MONGODB_XX45,*/
                    "0000": process.env.MONGODB_0000 || process.env.MONGODB_0000_LOCAL,
                    "0600": process.env.MONGODB_0600 || process.env.MONGODB_0600_LOCAL,
                    "1200": process.env.MONGODB_1200 || process.env.MONGODB_1200_LOCAL,
                    "1800": process.env.MONGODB_1800 || process.env.MONGODB_1800_LOCAL,
                    "MAIN":process.env.MONGODB_MAIN || process.env.MONGODB_MAIN_LOCAL
    }

    let _conObj = {
                    "XX00": null,
                    /*"XX15": null,*/
                    "XX30": null,
                    /*"XX45": null,*/
                    "0000": null,
                    "0600": null,
                    "1200": null,
                    "1800": null,
                    "MAIN": null
                }

let conArr = [];    
return {
        init:()=>{
            return new Promise((res,rej)=>{
                let conArr = [];
                for(let n in _conStr){
                    let a = new Promise((res,rej)=>{
                        let db = mongoose.createConnection(_conStr[n],options);
                        _conObj[n] = db;                
                        db.once('open', (e)=> {
                            console.log(_conStr[n]);
                            res(true)
                        });
                        db.once('error', (error)=> {
                            console.log(error);
                            console.log(`Error connecting to ${_conStr[n]}`);
                            rej(`Error connecting to ${n}`)
                        });
                    });
                    conArr.push(a);                
                };
                
                Promise.all(conArr).then(connections=>{
                    mongoose.DBs = _conObj;
                    res(_conObj);
                });
            })
        },
        forEachConnections:(cb)=>{
            for(let k in _conObj){
                cb({name:k,connection:_conObj[k]})
            }
        },
        getDB:(name)=>{
            return _conObj[name];
        }

}


}

module.exports = MONGO_CONNECT