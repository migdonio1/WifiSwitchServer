/**
 * Created by migdonio1 on 10/5/16.
 */
'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var deviceSchema = new Schema ({
    name: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    position: {
        latitude: {
            type: Number,
            required: true
        },
        longitude: {
            type: Number,
            required: true
        }
    },
    status: {
        type: String,
        required: true,
        trim: true
    },
    sensors: [{
        type: Schema.ObjectId,
        ref: 'Sensor'
    }],
    switchs: [{
        type: Schema.ObjectId,
        ref: 'Switch'
    }]

});

module.exports = mongoose.model('Device', deviceSchema);