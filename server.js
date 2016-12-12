/**
 * Created by migdonio1 on 11/10/16.
 */
var express = require('express');
var mongoose = require('mongoose');
var app = express();
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');

/**/

var server = require('http').Server(app);
var io = require('socket.io')(server);

server.listen(3030);

/*
 * Mongosee
 */

var Switch,
    Sensor,
    Device,
    User;

mongoose.connect("mongodb://localhost:27017/iot-wifi-switch");

var db = mongoose.connection;

db.on("error", console.error.bind(console, 'connection error:'));

db.once('open', function() {
    console.log("Database iot-wifi-switch connected...");
    initModels();

    app.set('views', path.join(__dirname, 'views'));
    app.locals.basedir = app.get('views');

    app.set('view engine', 'pug');

    app.use(logger('dev'));
    app.use(bodyParser.urlencoded({extended: true}));
    app.use(bodyParser.json());
    app.use(cookieParser());
    app.use(express.static(path.join(__dirname, '/public')));

    var port = process.env.PORT || 3002;

    var apiRouter = require('./routes/api');
    var webRouter = require('./routes/web');

    app.use('/api/v1/', apiRouter);
    app.use('/', webRouter);


    io.on('connection', function(socket) {

        socket.on('holi', function (device) {
           console.log("Recibido capitan");
        });

        socket.on('update-socket', function (data) {
            io.emit('update', {data : data});
        });
        socket.on('update-state', function (data) {
            data = JSON.parse(data);
            console.log("3",data.id);
            /*console.log("3",data.name);
            console.log("3",data.position);*/
            Device.findByIdAndUpdate(data.id, {status : data.status}, function (err, device) {
                console.log("4",device);
                io.emit('state-device-button', {
                    status : data.status,
                    id : data.id
                });
                io.emit('state-device-circle', {
                    status : data.status,
                    id : data.id
                });
            })
        });
        socket.on('update-sensor', function (data) {
            io.emit('update-sensor', {data : data});
        });
        socket.on('update-state-sensor', function (data) {
            console.log("3",data);
            Sensor.findByIdAndUpdate(data.id, {status : data.status}, function (err, sensor) {
                console.log("4",data.status);
                io.emit('statesensor', {
                    status : data.status,
                    id : data.id
                });
            })
        });
        socket.on('update-switch', function (data) {
            io.emit('update-switch', {data : data});
        });
        socket.on('update-state-switch', function (data) {
            console.log("3",data);
            Switch.findByIdAndUpdate(data.id, {status : data.status}, function (err, switchIot) {
                console.log("4",data.status);
                io.emit('stateswitch', {
                    status : data.status,
                    id : data.id
                });
            })
        });
        // Success!  Now listen to messages to be received
        socket.on('message',function(event){
            console.log('Received message from client!',event);
        });

        socket.on('disconnect',function(){
            console.log('Server has disconnected');
        });
    });

    app.listen(port);

    console.log("IoT server started on port " + port + "...");
});

function initModels() {
    require("./models/Switch.model");
    require("./models/Sensor.model");
    require("./models/Device.model");
    require("./models/User.model");

    Switch = mongoose.model('Switch');
    Sensor = mongoose.model('Sensor');
    Device = mongoose.model('Device');
    User = mongoose.model('User');
}