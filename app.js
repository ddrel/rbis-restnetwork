const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const dotenv = require('dotenv');
const cors = require('cors')
const compression = require('compression');

const indexRouter = require('./app/index/routes/index');
const geoLocationRouter = require('./app/geolocation/routes/index');
const roadsRouter = require('./app/road/routes/index');




const app = express();

app.options('*', cors())
dotenv.load({ path: '.env' });
app.use(function(req, res, next) { res.header('Access-Control-Allow-Origin', "*"); res.header('Access-Control-Allow-Methods','GET,PUT,POST,DELETE'); res.header('Access-Control-Allow-Headers', 'Content-Type'); next();
})

// GZIP all assets
app.use(compression());

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

//Models
require('./app/geolocation/model/index');
require('./app/road/model/index')

//Routes
app.use('/', indexRouter);
app.use('/geolocation', geoLocationRouter);
app.use('/roads',roadsRouter);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.send(err);
});

require("./app_db/connection").connect();

module.exports = app;
