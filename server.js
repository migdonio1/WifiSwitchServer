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


    io.sockets.on('connection', function(socket) {
        socket.on('demo-socket', function (data) {
            console.log(data);
            socket.emit('demo-holis', {data: "holis"});
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

    Swtich = mongoose.model('Switch');
    Sensor = mongoose.model('Sensor');
    Device = mongoose.model('Device');
    User = mongoose.model('User');
}