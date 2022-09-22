const mongoose = require('mongoose');

const cardSchema = new mongoose.Schema({
    name: {type: String, reqired: true},// enum:['Ace', 'Two', 'Three', 'Four', 'Five', 'Six', 'Seven', 'Eight', 'Nine', 'Ten', 'Jack', 'Queen', 'King', 'Joker']},
    value: {type: Number, required: true, min:0, max:10},
    suit: {type: String, required: true},// enum:['Hearts', 'Diamonds', 'Clubs', 'Spades']},
    set: {type: String, required:true},// enum: ['Standard', 'Gomorrah', 'Lucky_38', 'Sierra_Madre', 'Tops', 'Ultra-Luxe']},
    isModifier: {type: Boolean, default: false},
    face: {type: String, required: true},
    back: {type: String, required: true}
});

const Card = mongoose.model('Card', cardSchema);

module.exports = Card;