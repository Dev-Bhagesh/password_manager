const express = require('express')
const cors = require('cors')
require("dotenv").config()
const app = express()
const PORT = process.env.PORT

app.use(cors())  
app.use(express.json())

app.get('/',(req,res)=>{
    res.send("server is running and sakshi i love you")
})

app.post('/p',(req,res)=>{
    const data = req.body

    console.log(data)

    res.json({
        message: "Password saved",
        data: data
    })

})

app.listen(PORT,()=>{
    console.log(`server is running on port ${PORT}`)
})
