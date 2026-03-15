const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const Pass = require('./models/password')
require("dotenv").config()
const MONGO_URI = process.env.MONGO_URI
const PORT = process.env.PORT
const encrypt = require('./utils/enctypt')
const decrypt = require('./utils/decrypt')


const app = express()

// connect to the mongodb
mongoose.connect(`${MONGO_URI}`)
console.log("mongodb connected")
app.use(cors())
app.use(express.json())

app.get('/', (req, res) => {
    res.send("server is running")
})

// To set passwords in db
app.post('/putpasswords',async (req, res) => {
    const {title,username} = req.body
    const password = req.body.password
    const encryptedpassword = encrypt(password)
    const data = req.body
    console.log(data)
    const dbpass = new Pass({title,username,password:encryptedpassword})
    dbpass.save()
    console.log("insertion successfull")
    res.json({
        message: "Password saved",
        data: data
    })

})

// To fetch passwords from db
app.get('/getpasswords', async (req,res)=>{
    const passwords = await Pass.find()

    const decriptedpassword = passwords.map((item)=>{
        return{
            ...item._doc,
            password:decrypt(item.password)
        }
    })
    res.json(decriptedpassword)
})

app.post('/updatepassword', async (req,res)=>{
    const {_id,title,username,password} = req.body

    const encryptPassword = encrypt(password)
    const updated = await Pass.findByIdAndUpdate(_id,{
        title,username,password:encryptPassword
    },{new:true})
    
    res.json(updated)
})

app.listen(PORT, () => {
    console.log(`server is running on port ${PORT}`)
})
