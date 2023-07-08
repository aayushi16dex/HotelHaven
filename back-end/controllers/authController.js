const authController = require('express').Router()
const User = require('../models/userModel')
const bcrypt = require('bcrypt')   //password hashing
const jwt = require('jsonwebtoken')   //authentication
const cookieParser = require('cookie-parser');
authController.use(cookieParser());

// Register
authController.post('/register', async(req,res) => {
    try{
        const isExisting = await User.findOne({email: req.body.email})
        if (isExisting){
            return res.status(404).json({msg: "Email has already been registered"})
        }
        // generates hashed password
        const hashedPassword = await bcrypt.hash(req.body.password, 10)

        // uses spread syntax to expand an iterable object into individual elements
        const userDoc = await User.create({...req.body, password: hashedPassword})
        await userDoc.save();

        // others stores all properties of user except password
        const {password, ...others} = userDoc._doc
        const token = createToken(others)

        // 201: create new resource
        return res.status(201).json({others, token})
    }
    catch(error){
        return res.status(500).json(error.message)
    }
})

//login
authController.post('/login', async(req, res) => {
    try{
        const userDoc = await User.findOne({email: req.body.email})

        if (!userDoc){
            return res.status(404).json({msg: "Invalid credentials"})
        }
        
        // entered password, stored password
        const comparePassword = await bcrypt.compare(req.body.password, userDoc.password)

        if(!comparePassword){
            return res.status(400).json({msg: "Invalid credentials"})
        }

        // others stores all properties of user except password
        const {password, ...others} = userDoc._doc
        const token = createToken(others)

        // 200: Everything is okay
        return res.cookie('token',token,{
            httpOnly: true,
            secure: true,
            sameSite: 'None'
          }).status(200).json({others, token})
    }
    catch(error){
        return res.status(500).json(error.message)
    }
})

// get info after successfull login
authController.get('/profile', (req, res) => {
    const {token} =  req.cookies;

    if (token){
        jwt.verify(token, process.env.JWT_SECRET, {}, async (err, data) => {
            if (err) throw err;
            const {username, email,_id, gender} = await User.findById(data.id);
            res.status(200).json({username, email,_id, gender});
        });   
    }
    else{
        res.status(404).json("No token"); 
    }
})

// log out
authController.post('/logout', (req, res) => {
    res.cookie('token','').json("Logged out");
})

// create token fnc
const createToken = (user) => {
    const payload = {
        id: user._id.toString(),
        isAdmin: user.isAdmin,
    }

    try{
        const token = jwt.sign(payload, process.env.JWT_SECRET);
        return token;
    }
    catch(e){
        console.log("Error: " + e);
    }    
}

module.exports = authController