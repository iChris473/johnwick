
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const bcrypt = require('bcrypt');

const UserSchema = new mongoose.Schema({

    name: {
        type: String,
        required: true,
    },
    email: String,
    country: {
        type: String
    },
    phone: {
        type: String
    },
    ticket: {
        type: String
    },
    paymentMethod: String,
    
    meetDate: String
 

}, {timestamps: true})


module.exports = mongoose.model("Reeve", UserSchema);