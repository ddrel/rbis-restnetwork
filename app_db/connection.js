const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

// We always want to make a validated TLS/SSL connection
let options = {
    promiseLibrary: global.Promise,
    useNewUrlParser: true
};


const MONGO_CONNECT = {
                       connect:function(){
                        mongoose.connect( process.env.MONGODB_LOCAL || process.env.MONGODB_BLUEMIX,options)
                        .then(function() {
                          const admin = new mongoose.mongo.Admin(mongoose.connection.db);
                          admin.buildInfo(function(err, info) {
                            if (err) {
                              console.err(`Error getting MongoDB info: ${err}`);
                            } else {
                              console.log(`Connection to MongoDB (version ${info.version}) opened successfully!`);
                            }
                          });
                        })
                        .catch((err) => console.error(`Error connecting to MongoDB: ${err}`));

                       } 
}


module.exports = MONGO_CONNECT;