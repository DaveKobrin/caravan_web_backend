// DEPENDENCIES
require('dotenv').config();
const mongoose = require('mongoose');	

// ESTABLISH DB CONNECTION
const mongoURI = process.env.MONGODB_URI;
const db = mongoose.connection;

mongoose.connect(mongoURI);
db.on('error', (err)=> {console.log('ERROR! - ' + err.message)});
db.on('connected', ()=>{console.log(`Connected to - ${db.host} : ${db.port}`)});
db.on('disconnected', ()=>{console.log('disconnected from mongoDB')});
