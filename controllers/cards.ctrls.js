const db = require('../models')

// Get All cards

// Create All cards
const createAllCards = async (req, res) => {
  console.log('creating cards')
  try {
    // if the cards collection exists drop the collection
    const found = await db.Cards.find({})
    if (found) await db.Cards.collection.drop()

    // create the array of cards
    const seedData = []
    const sets = ['Standard', 'Gomorrah', 'Lucky_38', 'Sierra_Madre', 'Tops', 'Ultra-Luxe']
    const names = ['Ace', 'Two', 'Three', 'Four', 'Five', 'Six', 'Seven', 'Eight', 'Nine', 'Ten', 'Jack', 'Queen', 'King']
    const suits = ['Hearts', 'Diamonds', 'Clubs', 'Spades']
    let card = {}

    for (const set of sets) {
      for (const suit of suits) {
        for (let idx in names) {
          idx = parseInt(idx)
          // console.log({idx});
          card = {}
          card.name = names[idx]
          card.value = idx < 10 ? idx + 1 : 0 //modifier cards value is 0
          card.suit = suit
          card.set = set
          card.isModifier = idx < 10 ? false : true
          card.face = `${idx + 1}_of_${suit}.png`
          card.back = `card_back_${set}`
          seedData.push(card)
        }
      }
      card = {}
      card.name = 'Red Joker'
      card.value = 0 //modifier cards value is 0
      card.suit = suits[0]
      card.set = set
      card.isModifier = true
      card.face = `Joker_1.png`
      card.back = `card_back_${set}`
      seedData.push(card)

      card = {}
      card.name = 'Black Joker'
      card.value = 0 //modifier cards value is 0
      card.suit = suits[2]
      card.set = set
      card.isModifier = true
      card.face = `Joker_2.png`
      card.back = `card_back_${set}`
      seedData.push(card)
    }

    //insert array into database
    const inserted = await db.Cards.insertMany(seedData)
    // console.log({inserted});
    // console.log(seedData.length);
    return res.status(200).json({ message: 'Card data created successfully.' })
  } catch (err) {
    //catch any errors
    return res.status(400).json({ error: err.message })
  }
}

const getAllCards = async () => {
  try {
    const found = await db.Cards.find({})
    console.log(found)
  } catch (err) {
    console.error(err.message)
  }
}

module.exports = {
  createAllCards,
  getAllCards,
}
