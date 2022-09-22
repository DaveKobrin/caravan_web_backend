// DEPENDENCIES
require('dotenv').config()
const express = require('express')
const session = require('express-session')
const cors = require('cors')
const routes = require('./routes')

// IMPORT CONTROLLERS
// const mediaController = require('./controllers/mediaController.js');
// const userController = require('./controllers/userController.js');

// CONSTANTS
const app = express()
const PORT = process.env.PORT || 3000
const REACT_URI = process.env.REACT_URI || 'http://localhost:3001'
const SESSION_SECRET = process.env.SESSION_SECRET
const whitelist = [REACT_URI]
const corsOptions = {
  credentials: true,
  origin: (origin, callback) => {
    console.log(origin)
    if (whitelist.indexOf(origin) !== -1) callback(null, true)
    else callback(new Error('Not allowed by CORS'))
  },
}

// DB CONNECTION
require('./config/db.connection.js')

// MIDDLEWARE
app.use(cors(corsOptions))
app.use(session({ secret: SESSION_SECRET, resave: false, saveUninitialized: false }))
app.use(express.static('./public'))
app.use('/css', express.static(__dirname + '/css'))
app.use('/images', express.static(__dirname + '/images'))
app.use('/js', express.static(__dirname + '/js'))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// ROUTES

app.use('/cards', routes.cards)

// START SERVER
app.listen(PORT, () => {
  console.log(`Express listening to port : ${PORT}`)
})
