var http = require('http');
var express = require('express');
var mongoose = require('mongoose');
var autoIncrement = require('mongoose-auto-increment');
var config = require('./config/environment');
var app = express();
var server = http.createServer(app);

//connect to mongodb
mongoose.connect(config.mongo.uri, config.mongo.options);
autoIncrement.initialize(mongoose.connection);
mongoose.connection.on('error', function (err) {
    console.error('MongoDB connection error:' + err);
    process.exit(-1);
});

//config and routes
require('./config/express')(app);
require('./routes')(app);


module.exports = {
    start: function () {
        server.listen(config.port, config.ip, function () {
            console.log('App listening on %d.', config.port);
        })
    }
};