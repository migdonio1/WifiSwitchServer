/**
 * Created by migdonio1 on 10/5/16.
 */
'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var sensorSchema = new Schema ({
    name: {
        type: String,
        required: true
    },
    type: {
        type: String,
        required: true,
        trim: true
    },
    values: [{
        date: {
            type: Date,
            required: Date.now
        },
        value: String
    }],
    status: {
        type: String,
        required: true,
        trim: true
    }
});

module.exports = mongoose.model('Sensor', sensorSchema);