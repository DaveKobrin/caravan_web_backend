const express = require('express')
const router = express.Router()

const ctrls = require('../controllers')

router.post('/createSeed', ctrls.cards.createAllCards)
router.get('/getCards', ctrls.cards.getAllCards)

module.exports = router
