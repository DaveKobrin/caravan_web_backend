// DEPENDENCIES
require('dotenv').config();
const express = require('express');
const session = require('express-session');
const mongoose = require('mongoose');	

// IMPORT CONTROLLERS
// const mediaController = require('./controllers/mediaController.js');
// const userController = require('./controllers/userController.js');

// CONSTANTS
const app = express();
const PORT = process.env.PORT || 3000;
const SESSION_SECRET = process.env.SESSION_SECRET;
const mongoURI = process.env.MONGODB_URI;
const db = mongoose.connection;

// START SERVER AND DATABASE CONNECTION
app.listen(PORT, ()=>{ console.log(`Express listening to port : ${PORT}`)});
mongoose.connect(mongoURI);
db.on('error', (err)=> {console.log('ERROR! - ' + err.message)});
db.on('connected', ()=>{console.log(`Connected to - ${db.host} : ${db.port}`)});
db.on('disconnected', ()=>{console.log('disconnected from mongoDB')});

// MIDDLEWARE  
app.use(session({ secret: SESSION_SECRET, resave: false, saveUninitialized: false }));
app.use(express.static('./public'));
app.use('/css', express.static(__dirname + '/css'));
app.use('/images', express.static(__dirname + '/images'));
app.use('/js', express.static(__dirname + '/js'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
