const express = require('express');
const app = express();
const bcrypt = require('bcryptjs')
const mongoose = require("mongoose")
const User = require('./models/User')
const Place = require('./models/Place')
const jwt = require('jsonwebtoken')
const cookieParser = require('cookie-parser')
const imageDownloader = require('image-downloader')
const multer = require('multer');
const fs=require('fs')
const jwtkey ='vhghikfjnkdbiklakopsggkhb'
const key = bcrypt.genSaltSync(10);
require('dotenv').config()
const cors = require('cors');
app.use(express.json());
app.use(cookieParser());
app.use('/uploads' , express.static(__dirname+'/uploads'))
app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true,
    
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
    res.cookie(token, '').json(true);
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

app.post('/upload-by-link', async (req, res) => {
    const { link } = req.body;
    const imgname = Date.now() + '.jpg';
     await imageDownloader.image({
        url: link,
        dest:'/Users/srivarshabachu/Desktop/3-2 sem/airbnbclone/api/uploads/'+imgname,
     })
    res.json(imgname)
})

const photosMW = multer({ dest: '/Users/srivarshabachu/Desktop/3-2 sem/airbnbclone/api/uploads/' });
app.post('/upload', photosMW.array('photos', 100), (req, res) => {
    const uploadedFiles=[]
    for (let i = 0; i < req.files.length; i++){
        const { path, originalname } = req.files[i];
        const parts = originalname.split('.')
        const ext = parts[parts.length - 1];
        const newPath = path + '.' + ext;
        fs.renameSync(path, newPath);
        uploadedFiles.push(newPath.replace('/Users/srivarshabachu/Desktop/3-2 sem/airbnbclone/api/uploads/',''));
    }
    res.json(uploadedFiles)
})
app.post('/places', async (req, res) => {
    const {
        title, address, addedPhotos, description, price,
        perks, extraInfo, checkIn, checkOut, maxGuests,
    } = req.body;

    try {
        // Create the place without authentication
        const place = await Place.create({
            title, address, photos: addedPhotos, description,
            perks, extraInfo, checkIn, checkOut, maxGuests,
        });

        // Respond with the created place
        res.json(place);
    } catch (error) {
        // Handle errors
        console.error('Error creating place:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});


app.listen(4000, () => {
    console.log('Server is running on port 4000');
});