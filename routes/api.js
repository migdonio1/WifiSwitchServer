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
    .post(function(req, res) {
        Device.create(req.body, function(err, device){
            if(err) {
                res.send(err);
            } else {
                res.json(device);
            }
        })
    })
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
    })
    .delete(function(req, res) {
        Device.remove({
            _id: req.params.device_id
        }, function(err, device) {
            if(err) {
                res.send(err);
            } else {
                res.json(device);
            }
        });
    });

router.route('/devices/:device_id/sensors')
    .post(function(req, res) {
        Device.findById(req.params.device_id)
            .exec(function(err, device){
                if(err) {
                    res.send(err);
                } else {
                    Sensor.create(req.body, function(err, sensors){
                        for(var i=0; i<sensors.length; i++){
                            device.sensors.push(sensors[i]._id);
                        }

                        device.save(function(err, device) {
                            if(err) {
                                res.send(err);
                            } else {
                                res.json(device);
                            }
                        })
                    });
                }
            })
    })
    .get(function(req,res) {
        Device.findById(req.params.device_id)
            .exec(function(err, device) {
                Sensor.find({
                    '_id': {
                        $in: device.sensors
                    }
                }, function(err, sensors){
                    device.sensors = sensors;
                    res.json(device);
                });
            });
    });

router.route('/devices/:device_id/sensors/:sensor_id')
    .get(function(req, res) {
        Device.findById(req.params.device_id)
            .exec(function(err, device){
                Sensor.findById(req.params.sensor_id)
                    .exec(function(err, sensor) {
                        console.log("holis1",device);
                        console.log("holis2",sensor);
                        device.sensors = [sensor];
                        console.log("holis3",device);
                        res.json(device);
                    });
            });
    });

router.route('/devices/:device_id/switchs')
    .post(function(req, res) {
        Device.findById(req.params.device_id)
            .exec(function(err, device){
                if(err) {
                    res.send(err);
                } else {
                    Switch.create(req.body, function(err, switchs){
                        for(var i=0; i<switchs.length; i++){
                            device.switchs.push(switchs[i]._id);
                        }

                        device.save(function(err, device) {
                            if(err) {
                                res.send(err);
                            } else {
                                res.json(device);
                            }
                        })
                    });
                }
        })
    })
    .get(function(req,res) {
        Device.findById(req.params.device_id)
            .exec(function(err, device) {
                Switch.find({
                    '_id': {
                        $in: device.switchs
                    }
                }, function(err, switchs){
                    device.switchs = switchs;
                    res.json(device);
                });
            });
    });

router.route('/devices/:device_id/switchs/:switch_id')
    .get(function(req, res) {
        Device.findById(req.params.device_id)
            .exec(function(err, device){

                Switch.findById(req.params.switch_id)
                    .exec(function(err, switchIot) {
                        device.switchs = [switchIot];
                        res.json(device);
                    });
            });
    });

module.exports = router;