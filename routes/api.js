/**
 * Created by migdonio1 on 11/13/16.
 */
var express = require('express');
var router = express.Router();

var mongoose = require('mongoose');
var Device = mongoose.model('Device');
var Sensor = mongoose.model('Sensor');
var Switch = mongoose.model('Switch');

router.use(function(req, res, next) {
    next();
});

router.route('/devices')
    .get(function(req, res) {
        Device.find({})
            .populate({
                path: 'sensors',
                model: 'Sensor'
            })
            .populate({
                path: 'switchs',
                model: 'Switch'
            })
            .exec(function(err, devices) {

                res.json(devices);
            });
    });

router.route('/devices/:device_id')
    .get(function(req, res) {
        Device.findById(req.params.device_id)
            .populate({
                path: 'sensors',
                model: 'Sensor'
            })
            .populate({
                path: 'switchs',
                model: 'Switch'
            })
            .exec(function(err, device) {
                if(err) {
                    res.send(err);
                }
                res.json(device);
            });
    });

router.route('/devices/:device_id/sensors')
    .get(function(req,res) {
        Device.findById(req.params.device_id)
            .exec(function(err, device) {
                Sensor.find({
                    '_id': {
                        $in: device.sensors
                    }
                }, function(err, sensors){
                    var data = {
                        device: device,
                        sensors: sensors
                    };
                    res.json(data);
                });
            });
    });

router.route('/devices/:device_id/sensors/:sensor_id')
    .get(function(req, res) {
        Device.findById(req.params.device_id)
            .exec(function(err, device){

                Sensor.findById(req.params.sensor_id)
                    .exec(function(err, sensor) {
                        var data = {
                            device: device,
                            sensor: sensor
                        };

                        res.json(data);
                    });
            });
    });

router.route('/devices/:device_id/switchs')
    .get(function(req,res) {
        Device.findById(req.params.device_id)
            .exec(function(err, device) {
                Switch.find({
                    '_id': {
                        $in: device.switchs
                    }
                }, function(err, switchs){
                    var data = {
                        device: device,
                        switchs: switchs
                    };
                    res.json(data);
                });
            });
    });

router.route('/devices/:device_id/switchs/:switch_id')
    .get(function(req, res) {
        Device.findById(req.params.device_id)
            .exec(function(err, device){

                Switch.findById(req.params.switch_id)
                    .exec(function(err, switchIot) {
                        var data = {
                            device: device,
                            switchIot: switchIot
                        };

                        res.json(data);
                    });
            });
    });

module.exports = router;