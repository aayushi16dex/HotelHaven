const accountController = require('express').Router()
const Place = require('../models/placeModel')
const Booking = require('../models/bookingModel');
const User = require('../models/userModel')
const imageDownloader = require('image-downloader');
const jwt = require('jsonwebtoken') 
const cookieParser = require('cookie-parser');
accountController.use(cookieParser());
const path = require('path');
const multer = require('multer');   //upload img from device
const fs = require('fs');   // rename files on server
const { rejects } = require('assert');

const uploadDir = path.resolve(path.join(__dirname, '..'));

// add photo by link
accountController.post('/upload-by-link', async (req, res) => {
    try {
        const imgName = "photo" + Date.now() + ".jpg";
        const { link } = req.body;
        await imageDownloader.image({
            url: link,
            dest: path.join(uploadDir, 'uploads', imgName)
        });
        res.json(imgName);
    }

    catch (e) {
        res.json("Some error occured");
    }
})

// add photo from device
const photosMiddleware = multer({ dest: 'uploads' });
accountController.post('/upload-from-device', photosMiddleware.array('photos', 100), (req, res) => {
    const uploadedFiles = [];
    for (let i = 0; i < req.files.length; i++) {
        const { path, originalname } = req.files[i];
        const parts = originalname.split('.');
        const ext = parts[parts.length - 1];
        const newPath = path + '.' + ext;
        fs.renameSync(path, newPath);
        uploadedFiles.push(newPath.replace('uploads\\', ''));
    }
    res.json(uploadedFiles);
})

// adding place by owner
accountController.post('/addPlace', async (req, res) => {
   try{
    console.log(req.body.title);
    const { token } = req.cookies;
    const { title, type, address, addedPhotos,
        description, perks, checkIn,
        checkOut, maxGuests, price } = req.body;
    jwt.verify(token, process.env.JWT_SECRET, {}, async (err, userData) => {
        if (err) throw err;
        const placeDoc = await Place.create({
            owner: userData.id,
            // owner: "fe3evffvfde",
            title, type, address, 
            photos: addedPhotos,
            description, perks, checkIn,
            checkOut, maxGuests,price
        });
        res.json(placeDoc);
    });
   }

   catch(e){
    res.json(e);
    
   }
});

// get places of a particular user
accountController.get("/user-places", (req,res) => {
    const { token } = req.cookies;

    jwt.verify(token, process.env.JWT_SECRET, {}, async (err, userData) => {
        const {id} = userData;
        res.json(await Place.find({owner:id}));
    });
})

// get all places
accountController.get("/places", async (req,res) => {
    res.json(await Place.find());
})

// get a particular place
accountController.get("/place/:id", async (req,res) => {
    const {id} = req.params;
    const placeDoc = await Place.findById(id);
    const owner = await User.findById(placeDoc.owner);
    const ownerName = owner.username;
    const ownerGender = owner.gender;
    res.json({placeDoc, ownerName, ownerGender});
})

// update place of a particular user
accountController.put('/updatePlace', async (req, res) => {
    try{
     const { token } = req.cookies;
     const { id, title, type, address, addedPhotos,
         description, perks, checkIn,
         checkOut, maxGuests, price } = req.body;
     jwt.verify(token, process.env.JWT_SECRET, {}, async (err, userData) => {
         if (err) throw err;
         const placeDoc = await Place.findById(id);
         if (placeDoc.owner.toString() == userData.id){
            placeDoc.set({
                title, type, address, 
                photos: addedPhotos,
                description, perks, checkIn,
                checkOut, maxGuests, price
            })
         }
         await placeDoc.save();
         res.status(200).json(placeDoc);  
     });
    }
 
    catch(e){
     res.json(e);    
    }
 });

 // book a place
 accountController.post('/bookingPlace', async (req,res) => {
    const userData = await getUserDataFromReq(req);
    const {
        placeId, checkIn, checkOut, numOfGuests, totalPrice
    } = req.body;
    Booking.create({
        placeId, checkIn, checkOut, numOfGuests, totalPrice,
        userId: userData.id
    }).then((bookingDoc) => {
        res.status(200).json(bookingDoc);
    }).catch((err) =>{
        throw err;
    })
 });
 
 // get all bookings of a user
 accountController.get('/bookings', async (req,res) => {
    const userData = await getUserDataFromReq(req);
    res.json(await Booking.find({userId:userData.id}).populate("placeId"));
 }) 


 function getUserDataFromReq(req){
    return new Promise((resolve, reject) =>{
        jwt.verify(req.cookies.token, process.env.JWT_SECRET, {}, async (err, userData) => {
            if (err) throw err;
            resolve(userData);
        })
    });    
 }


module.exports = accountController