const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const Pass = require('./models/password')
require("dotenv").config()
const MONGO_URI = process.env.MONGO_URI
const PORT = process.env.PORT || 5000;
const encrypt = require('./utils/enctypt')
const decrypt = require('./utils/decrypt')
const User = require('./models/user')
const bcrypt = require('bcrypt')
const session = require('express-session')
const SESSION_KEY = process.env.SESSION_KEY
const app = express()

// connect to the mongodb
mongoose.connect(MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch(err => {
    console.error("MongoDB connection failed:", err)
    process.exit(1)
  });

app.set("trust proxy", 1);

// cors
app.use(cors({
  origin: ["http://localhost:5173","https://password-manager-nu-liard.vercel.app"],
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type"]
}));

app.use(express.json())

// Session
app.use(session({
    secret: SESSION_KEY,
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: true, //set this to true after deployment
      sameSite: "lax",
      httpOnly: true
    }
  }));

// =====================================================================

app.get('/', (req, res) => {
    res.send("server is running")
})


// To set passwords in db
app.post('/putpasswords', async (req, res) => {
    const { title, username } = req.body
    const password = req.body.password
    const encryptedpassword = encrypt(password)
    const data = req.body
    const userID = req.session.user.id
    // console.log(data)
    const dbpass = new Pass({ userID, title, username, password: encryptedpassword })
    dbpass.save()
    // console.log("insertion successfull")
    res.json({
        message: "Password saved",
        data: data
    })

})


app.post('/login', async (req, res) => {
    try {

        const { name, email, password } = req.body
        let user = await User.findOne({ email })
        if (!user) return res.status(400).json({ message: 'User Not found' })

        const isMatch = await bcrypt.compare(password, user.password)
        if (!isMatch) return res.status(400).json({ message: "Invalid credentials" })

        // ✅ CREATE SESSION HERE
        req.session.user = {
            id: user._id,
            name: user.name,
            email: user.email
        }

        res.status(200).json({ success: true, userID: user._id, message: `Welcome ${user.name}` })
    } catch (err) {
        res.status(500).json({ message: "Server error" });
    }

})


// To fetch passwords from db
app.get('/getpasswords', async (req, res) => {
    // console.log("getpassword triggered")
    try {
        if (!req.session.user) {
            return res.status(401).json({ message: "Unauthorized User" })
        }

        const userID = req.session.user.id
        // console.log("session userID set in getpassword")
        const password = await Pass.find({ userID: userID })

        const decriptedpassword = password.map((item) => {
            return {
                ...item._doc,
                password: decrypt(item.password)
            }
        })
        // console.log("decripted passwords in /getpassword")
        res.json(decriptedpassword)
        // console.log("Decrepted passwords sent to frontend")
    } catch (err) {
        res.status(500).json({ message: "Server error" })
    }
})

app.post('/updatepassword', async (req, res) => {
    const { _id, title, username, password } = req.body

    const encryptPassword = encrypt(password)
    const updated = await Pass.findByIdAndUpdate(_id, {
        title, username, password: encryptPassword
    }, { new: true })

    res.json(updated)
})

app.post('/register', async (req, res) => {
    const { name, email, password } = req.body
    let exist = await User.findOne({ $or: [{ email }] })
    if (exist) return res.status(400).json({ message: "Email alredy exist" });

    let hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ name, email, password: hashedPassword })
    user.save()
    // const user = new User({name,email,password})
    res.json(user)
})

app.delete('/deletepassword/:id', async (req, res) => {
    try {
        // ✅ Check session
        if (!req.session.user) {
            return res.status(401).json({ message: "Unauthorized" })
        }

        const userID = req.session.user.id
        const passwordID = req.params.id

        // ✅ Delete ONLY matching id + user
        const deleted = await Pass.findOneAndDelete({
            _id: passwordID,
            userID: userID
        })

        if (!deleted) {
            return res.status(404).json({ message: "Password not found" })
        }

        res.json({ message: "Deleted successfully" })

    } catch (err) {
        res.status(500).json({ message: "Server error" })
    }
})

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });