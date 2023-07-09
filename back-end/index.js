const express = require('express');
const mongoose = require('mongoose');
const authController = require('./controllers/authController');
const accountController = require('./controllers/accountController')
const path = require('path');
require('dotenv').config();
const app = express()

const cors = require('cors');

app.use('/uploads', express.static(path.join(__dirname, 'uploads')))

// Front-end URLs for local development and production
const allowedOrigins = [
    'http://127.0.0.1:5173',
    'https://hotelhaven.netlify.app/'
  ];
  
  app.use(cors({
    credentials: true,
    origin: allowedOrigins
  }));
  
  app.use((req, res, next) => {
    const origin = req.headers.origin;
    if (allowedOrigins.includes(origin)) {
      res.setHeader('Access-Control-Allow-Origin', origin);
    }
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    next();
  });

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

