var express = require('express');
var path = require('path');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var favicon = require('serve-favicon');
//var logInit = require(path.join(__dirname, 'common/log'));
//var mongoInit = require(path.join(__dirname, 'common/db'));
var urlMapping = require(path.join(__dirname, 'common/urlMapping'));
var server = express();

// view engine setup
server.set('views', path.join(__dirname, 'views'));
server.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
server.use(favicon(path.join(__dirname, 'angular_web/images/favicon.ico')));

//parser
server.use(bodyParser.json());
server.use(bodyParser.urlencoded({ extended: false }));
server.use(cookieParser());

//static res
server.use(express.static(path.join(__dirname, 'angular_web')));

//log
//server.use(log4js.connectLogger(logInit, {level:log4js.levels.INFO, format:':method :url'}));
// global router handler
server.use(function (req, res) {
    urlMapping(req, res);
});

// catch 404 and forward to error handler
server.use(function (req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (server.get('env') === 'development') {
    server.use(function (err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
server.use(function (err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});

//mongo start
//mongoInit();

module.exports=server;
