const express = require('express');
const mongoose = require('mongoose');
const authController = require('./controllers/authController');
const accountController = require('./controllers/accountController')
const path = require('path');
require('dotenv').config();
const app = express()

const cors = require('cors');

app.use('/uploads', express.static(path.join(__dirname, 'uploads')))


// front-end url
app.use(cors({
    credentials: true,
    origin: ['http://127.0.0.1:5173']
}));

//connect db
mongoose.set('strictQuery', false)
mongoose.connect(process.env.MONGO_URL,
    { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Database connected successfully'))
    .catch((err) => { console.error(err); });

// middleware
// below 2 are used for when using req.body
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use('/auth', authController)
app.use('/account', accountController);


// start the server
app.listen(process.env.PORT, () => console.log("Server is running"))

