const mongoose = require('mongoose')

const passwordSchema = new mongoose.Schema({
    userID:String,
    title:String,
    username:String,
    password:{
        iv:String,
        content:String
    }
})

module.exports = mongoose.model("pass",passwordSchema)