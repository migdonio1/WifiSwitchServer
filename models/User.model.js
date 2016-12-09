/**
 * Created by migdonio1 on 10/5/16.
 */
'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var userSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique:true,
        trim: true
    },
    password: {
        type: String,
        required: true
    },
    name: {
        first: {
            type: String,
            required: true,
            trim: true
        },
        last: {
            type: String,
            required: true,
            trim: true
        }
    },
    email:{
        type: String,
        required: true,
        unique:true
    },
    devices:[{
        type: Schema.ObjectId,
        ref: 'Device'
    }]
});

module.exports = mongoose.model('User', userSchema);
