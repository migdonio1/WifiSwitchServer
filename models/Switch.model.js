/**
 * Created by migdonio1 on 10/5/16.
 */
'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var switchSchema = new Schema ({
    name: {
        type: String,
        required: true,
        trim: true
    },
    status: {
        type: String,
        required: true,
        trim: true
    },
    timeOn: [{
        date: {
            type: Date,
            required: Date.now
        }
    }]
});

module.exports = mongoose.model('Switch', switchSchema);