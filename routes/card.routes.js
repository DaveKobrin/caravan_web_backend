const express = require('express');
const router = express.Router();

const ctrls = require('../controllers');

router.post('/createSeed', ctrls.card.createAllCards);
router.get('/getCards', ctrls.card.getAllCards);


module.exports = router;

