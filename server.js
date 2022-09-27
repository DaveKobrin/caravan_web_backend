// DEPENDENCIES
require('dotenv').config();
const express = require('express');
// const https = require('https');
const session = require('express-session');
// const fs = require('fs');
const MongoDBStore = require('connect-mongodb-session')(session);
const cors = require('cors');
const routes = require('./routes');
// const cookieParser = require('cookie-parser');

// IMPORT CONTROLLERS
// const mediaController = require('./controllers/mediaController.js');
// const userController = require('./controllers/userController.js');

// CONSTANTS
// const key = fs.readFileSync('./key.pem');
// const cert = fs.readFileSync('./cert.pem');
const app = express();
// const server = https.createServer({key: key, cert: cert}, app);
const PORT = process.env.PORT || 3000;
const REACT_URI = process.env.REACT_URI || 'http://localhost:3001';
const MONGODB_URI = process.env.MONGODB_URI;
const SESSION_SECRET = process.env.SESSION_SECRET;
const COOKIE_MAX_AGE = 1000*60*60*1; // login lasts for 1 hour
const whitelist = [REACT_URI, 'https://localhost:3001', 'http://localhost:3001'];
const corsOptions = {
  credentials: true,
  origin: (origin, callback) => {
    console.log(origin);
    if ((whitelist.indexOf(origin) !== -1) || (!origin)) callback(null, true);
    else callback(new Error('Not allowed by CORS'));
  },
};

// DB CONNECTION
require('./config/db.connection.js');
const mongoDBstore = new MongoDBStore({uri: MONGODB_URI, collection: 'mySessions'});

// MIDDLEWARE
app.use(cors(corsOptions));
// app.use(cookieParser());
app.use(session({
    secret: SESSION_SECRET,
    name: 'session-id',
    store: mongoDBstore,
    cookie: {
        maxAge: COOKIE_MAX_AGE,
        // sameSite: 'none',
        secure: false,
        httpOnly:false,
    },
    resave: true,
    saveUninitialized: true,
}));
app.use(express.static('./public'));
app.use('/css', express.static(__dirname + '/css'));
app.use('/images', express.static(__dirname + '/images'));
app.use('/js', express.static(__dirname + '/js'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ROUTES

app.use('/cards', routes.card);
app.use('/user', routes.user);

// START SERVER
// server
app.listen(PORT, () => {
  console.log(`Express listening to port : ${PORT}`);
});
