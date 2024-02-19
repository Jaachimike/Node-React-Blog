const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
const User = require('./models/User')
const bcrypt = require('bcrypt');
const app = express()
const jwt = require('jsonwebtoken')
const cookieParser = require('cookie-parser')

const salt = bcrypt.genSaltSync(10)
const secret = 'usf9s7f9g7gw97gwb7dwd97gdbsdg9s8hd9bs98d'

app.use(cors({ credentials: true, origin: 'http://localhost:5173' }))
app.use(express.json())
app.use(cookieParser())

mongoose.connect('mongodb+srv://blog:qlsjHUeAdp4MjkUI@cluster0.dc85o7e.mongodb.net/?retryWrites=true&w=majority')


app.post('/register', async (req, res) => {
    const { username, password } = req.body;
    try {
        const userDoc = await User.create({ username, password: bcrypt.hashSync(password, salt) })
        res.json(userDoc)
    } catch (e) {
        console.log(e);
        res.status(400).json(e)
    }
})

app.post('/login', async (req, res) => {
    const { username, password } = req.body
    const userDoc = await User.findOne({ username })
    const passOk = bcrypt.compareSync(password, userDoc.password);
    if (passOk) {
        //logged in
        jwt.sign({ username, id: userDoc._id, }, secret, {}, (err, token) => {
            if (err) throw err
            res.cookie("token", token).json({
                id: userDoc._id,
                username
            })
        })
        // res.json()
    } else {
        res.status(400).json('wrong credentials')
    }

})

app.get('/profile', (req, res) => {
    const { token } = req.cookies
    jwt.verify(token, secret, {}, (err, info) => {
        if (err) throw err
        res.json(info)
    })
    res.json(req.cookies)
})

app.post('/logout', (req, res) => {
    res.cookie('token', '').json('ok')

})

app.post('/post', (req, res) => {

})

app.listen(4000, () => {
    console.log('Listening on port 4000');
})

// blog

// qlsjHUeAdp4MjkUI


// mongodb+srv://blog:qlsjHUeAdp4MjkUI@cluster0.dc85o7e.mongodb.net/?retryWrites=true&w=majority