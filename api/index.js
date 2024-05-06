const express = require('express');
const app = express();
const bcrypt = require('bcryptjs')
const mongoose = require("mongoose")
const User = require('./models/User')
const jwt = require('jsonwebtoken')
const cookieParser = require('cookie-parser')
const jwtkey ='vhghikfjnkdbiklakopsggkhb'
const key = bcrypt.genSaltSync(10);
require('dotenv').config()
const cors = require('cors');
app.use(express.json());
app.use(cookieParser());
app.use(cors({
    credentials: 'true',
    origin:'http://localhost:5173'
}))

mongoose.connect(process.env.MONGO_URL)


app.get('/test', (req, res) => {
    res.json('test ok');
});


app.get('/profile', (req, res) => {
    const { token } = req.cookies;
    if (token) {
        jwt.verify(token, jwtkey, {}, async (err, userData) => {
            if (err) throw err;
            const { name, email, _id } = await User.findById(userData.id);
            res.json({ name, email, _id });
        });
    } else {
        res.json(null);
    }
});


app.post('/logout', async (req, res) => {
    res.cookie('token', '').json(true);
})


app.post('/register', async (req, res) => {
    const { name, mail, password } = req.body;
    try {
        const userDoc = await User.create({
            name,
            mail,
            password: bcrypt.hashSync(password, key),
        });
        res.json(userDoc)
    }
    catch (e) {
        res.status(422).json(e);
    }
});
app.post('/login', async (req, res) => {
    const { mail, password } = req.body;
    try {
        const userDoc = await User.findOne({
            mail
        });
        if (userDoc) {
            const passOk = bcrypt.compareSync(password, userDoc.password)
            if (passOk) {
                jwt.sign({
                    mail: userDoc.mail,
                    id: userDoc._id,
                }, jwtkey, {}, (err, token) => {
                    if (err) throw err;
                    res.cookie('token', token).json(userDoc);
                });
            }
            else{res.json('enter correct password')}
        }
        else { res.json('not found'); }
    }
    catch (e) {
        res.status(422).json(e);
    }
});

app.listen(4000, () => {
    console.log('Server is running on port 4000');
});