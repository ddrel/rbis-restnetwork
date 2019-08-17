'use strict';

let mongoose = require('mongoose'),
      Schema = mongoose.Schema;


const province = {
  type:String,  
  properties: Schema.Types.Mixed,  
  geometry : { type : Schema.Types.Mixed, index : '2dsphere' } 
};

const provinceSchema = new Schema(province,{ collection: 'provincial_geolocation' });
mongoose.model('provincial_geolocation', provinceSchema);


const city = {
  type:String,  
  properties: Schema.Types.Mixed,  
  geometry : { type : Schema.Types.Mixed, index : '2dsphere' } 
};

const citySchema = new Schema(city,{ collection: 'cities_geolocation' });
mongoose.model('cities_geolocation', citySchema);


const geo_shape = {
  type:String,  
  properties: {
                NAME_1:String,
                NAME_2:String,
                ENGTYPE_1:String,
                ENGTYPE_2:String,
            },  
  geometry : { type : Schema.Types.Mixed} 
};

const geo_shapeSchema = new Schema(geo_shape,{ collection: 'geo_shape' });
mongoose.model('geo_shape',geo_shapeSchema);