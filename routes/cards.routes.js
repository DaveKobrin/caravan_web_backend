const express = require('express');
const router = express.Router();

const ctrls = require('../controllers');

router.post('/createSeed', ctrls.cards.createAllCards);

module.exports = router;