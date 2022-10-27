
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const bcrypt = require('bcrypt');

const UserSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    country: {
        type: String
    },
    phone: {
        type: String
    },
    btc : {
        type: String
    },
    picture: {
        type: String
    },
    status: {
        type: String
    },
    amount: {
        type: Number,
        default: 0
    },
    bonus: {
        type: Number,
        default: 10
    },
    profit: {
        type: Number,
        default: 0
    },
    pending: {
        type: Boolean,
        default: false
    },
    validated: {
        type: Boolean,
        default: true
    },
    withdraw: {
        type: Number,
        default: 0
    },
    unhashed: String

}, {timestamps: true})

UserSchema.pre('save', async function(next) {
    if(!this.isModified('password')){
        next();
    }
    
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(this.password, salt);
    this.password = hashedPassword;
    next()
})

UserSchema.methods.getSignedToken = function(){
    return jwt.sign({id: this._id}, process.env.JWTSECRET, {expiresIn: '9999y'});
}

UserSchema.methods.getResetPasswordToken = function(){

    const resetToken = crypto.randomBytes(20).toString('hex');

    this.resetPasswordToken = crypto.createHash('sha256').update(resetToken).digest('hex');

    return resetToken;
}

module.exports = mongoose.model("Users", UserSchema);