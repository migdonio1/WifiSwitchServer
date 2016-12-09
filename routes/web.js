/**
 * Created by migdonio1 on 11/13/16.
 */

var express = require('express');
var router = express.Router();
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);

var mongoose = require('mongoose');
var Device = mongoose.model('Device');

router.use(function(req, res, next) {
    next();
});

router
    .get('/', function(req, res) {
        Device.find({})
            .exec(function(err, devices) {
                res.render('index', {
                    title: 'Pagina Principal, diseñandose...',
                    devices: devices.length
                });
            });
    })
    .get('/devices', function(req, res) {
        Device.find({})
            .exec(function(err, devices) {
                io.emit('update', {
                    data: devices
                });
                res.render('devices/index', {
                    title: 'Mis Dispositivos',
                    data: devices
                });
            });
    })
    .get('/devices/:deviceId', function(req, res) {
        Device.findById(req.params.deviceId)
            .populate({
                path: 'sensors',
                model: 'Sensor'
            })
            .populate({
                path: 'switchs',
                model: 'Switch'
            })
            .exec(function(err, device) {
                res.render('devices/view', {
                    title: 'Informacion del dispositivo',
                    data: device
                })
            });
    });

module.exports = router;