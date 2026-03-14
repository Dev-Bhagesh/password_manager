const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const Pass = require('./models/password')
require("dotenv").config()
const MONGO_URI = process.env.MONGO_URI
const PORT = process.env.PORT


const app = express()

mongoose.connect(`${MONGO_URI}`)
console.log("mongodb connected")
app.use(cors())
app.use(express.json())

app.get('/', (req, res) => {
    res.send("server is running")
})

app.post('/putpasswords', (req, res) => {
    const {title,username,password} = req.body
    const data = req.body
    console.log(data)
    const dbpass = new Pass({title,username,password})
    dbpass.save()
    console.log("insertion successfull")
    res.json({
        message: "Password saved",
        data: data
    })

})

app.get('/getpasswords', async (req,res)=>{
    const passwords = await Pass.find()
    res.json(passwords)
})

app.listen(PORT, () => {
    console.log(`server is running on port ${PORT}`)
})
