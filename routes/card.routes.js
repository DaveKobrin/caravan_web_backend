const express = require('express');
const router = express.Router();

const ctrls = require('../controllers');

router.post('/createSeed', ctrls.card.createAllCards);
router.get('/getCards', ctrls.card.getAllCards);
router.get('/getOneById/:id', ctrls.card.getOneById);
router.get('/getManyByPattern/:field/:value', ctrls.card.getManyByPattern);

module.exports = router;

