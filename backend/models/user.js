const mongoose = require('mongoose')
const password = require('./password')

const userSchema = new mongoose.Schema({
    name:String,
    email:String,
    password:String
})

module.exports = mongoose.model('User',userSchema)