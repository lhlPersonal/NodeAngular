/**
 * Created by bulusli on 2014/10/13.
 */
var mongoose = require('mongoose');
var path = require('path');
var dbURI = require(path.join(__dirname, 'constant')).dbUrl;

function initMongo() {
    console.log('Creating global mongoose connection...');

    // When successfully connected
    mongoose.connection.on('connected', function () {
        console.log('Mongoose default connection open to ' + dbURI);
    });

// If the connection throws an error
    mongoose.connection.on('error', function (err) {
        console.log('Mongoose default connection error: ' + err);
    });

// When the connection is disconnected
    mongoose.connection.on('disconnected', function () {
        console.log('Mongoose default connection disconnected');
    });

// If the Node process ends, close the Mongoose connection
    process.on('SIGINT', function () {
        mongoose.connection.close(function () {
            console.log('Mongoose default connection disconnected through app termination');
            process.exit(0);
        });
    });

    mongoose.connect(dbURI);
}

module.exports = initMongo;