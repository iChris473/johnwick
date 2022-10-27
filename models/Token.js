
const mongoose = require('mongoose');
const Schema = mongoose.Schema

const TokenSchema = new mongoose.Schema({
    userId:{
        type: String,
        required: true,
    },
    token: {
        type: String,
        required: true
    }
}, {timestamps: true})


module.exports = mongoose.model("Tokens", TokenSchema)