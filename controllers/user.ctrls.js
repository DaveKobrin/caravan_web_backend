const db = require('../models');
const bcrypt = require('bcrypt');

//  Register a new user account and log it in
const register = async (req, res) => {
    try {
        const userExists = await db.User.findOne({ gamertag: req.body.gamertag });
        if (userExists) return res.status(403).json({ message: 'gamertag already exists' });
        const salt = bcrypt.genSaltSync(10);
        req.body.password = bcrypt.hashSync(req.body.password, salt);
        const starterSet = {set: 'Standard'};
        req.body.ownedCards = await db.Card.find(starterSet,'_id');
        const user = await db.User.create(req.body);
// ******** testing ******************************************
        if (user) {
            req.session.curUser = user._id;
            req.session.save();
            console.log('new user created :', user._id, ' session : ', req.session);
            return res.status(200).json({ message: 'registered new user', user: {
                id: user._id,
                name: user.name,
                gamertag: user.gamertag,
                email: user.email,
                balance: user.balance,
                friends: user.friends,
                ownedCards: user.ownedCards,
                deck: user.deck,
            } });
        }
    } catch (err) {
        //catch any errors
        return res.status(400).json({ error: err.message });
    }
};

//  Login an existing user account
const login = async (req, res) => {
    try {
        const user = await db.User.findOne({ gamertag: req.body.gamertag });
        if (!user) return res.status(404).json({ message: 'gamertag not found' });
        
        const validLogin = bcrypt.compareSync(req.body.password, user.password);
        if (validLogin) {
            req.session.curUser = user._id;
            req.session.save();
            res.session = req.session;
            console.log('loging in ', user._id, ' session : ', req.session);
            return res.status(200).json({ message: 'logged in user', user: {
                id: user._id,
                name: user.name,
                gamertag: user.gamertag,
                email: user.email,
                balance: user.balance,
                friends: user.friends,
                ownedCards: user.ownedCards,
                deck: user.deck,
            } });
        }
        return res.status(403).json({ message: 'credentials do not match' });
    } catch (err) {
      //catch any errors
      return res.status(400).json({ error: err.message });
    }
};

//  Log user session out
const logout = (req, res) => {
    return res.status(200).json({ message: 'logged out' });
}

//  Return the deck from a user._id
const getDeck = async (req, res) => {
    try{
        const deck = await db.User.findById(req.params.user, 'deck');
        return res.status(200).json({ message: 'found deck', deck });
    } catch(err) {
        //catch any errors
        return res.status(400).json({ error: err.message });
    }
}

//  Add a card to the deck by id
const addCardToDeck = async (req, res) => {
    console.log('session before reload : ', req.session);
    await req.session.reload((err)=>{err?console.log({err}):console.log('reloaded session from db')});
    console.log('session after reload : ', req.session)

    if(!req.params.user)
        return res.status(404).json({error: 'no user id'});
    try {
        const user = await db.User.findById(req.params.user);
        if(!user.deck.includes(req.params.card)) {
            user.deck.push(req.params.card);
            user.save();
            return res.status(200).json({message: 'card added'});
        }
        return res.status(400).json({ message: 'card already in deck' });
    } catch(err) {
        //catch any errors
        return res.status(400).json({ error: err.message });
    }
}

//  Remove a card from the deck by id 
const removeCardFromDeck = async (req, res) => {
    if(!req.params.user)
        return res.status(404).json({error: 'no user id'});
    try {
        const user = await db.User.findById(req.params.user);
        if(user.deck.includes(req.params.card)) {
            user.deck.splice(user.deck.indexOf(req.params.card),1);
            user.save();
            return res.status(200).json({message: 'card removed'})
        }
        return res.status(400).json({ message: 'card not in deck' });
    } catch(err) {
        //catch any errors
        return res.status(400).json({ error: err.message });
    }
}

const toggleCard = async (req, res) => {
    if(!req.params.user)
        return res.status(404).json({error: 'no user id'});
    try {
        const user = await db.User.findById(req.params.user);
        const idx = user.deck.indexOf(req.params.card);
        if(idx === -1) {
            user.deck.push(req.params.card);
            user.save();
            return res.status(200).json({message: 'card added'});
        } else {
            user.deck.splice( idx, 1);
            user.save();
            return res.status(200).json({message: 'card removed'})
        }
    } catch(err) {
        //catch any errors
        return res.status(400).json({ error: err.message });
    }
}

const destroy = async (req, res) => {
    if(!req.params.user)
        return res.status(404).json({error: 'no user id'});
    try {
        const success = await db.User.findByIdAndDelete(req.params.user);
        return res.status(200).json({ message: 'user deleted' });
    } catch(err) {
        //catch any errors
        return res.status(400).json({ error: err.message });
    }
}

//  TODO STRETCH
//  Add user._id as friend to currentUser and vice versa
const addFriend = async (req, res) => {

}

//  TODO STRETCH
//  Remove user._id from currentUser.friends and vice versa
const removeFriend = async (req, res) => {

}

module.exports = {
    register,
    login,
    logout,
    getDeck,
    addCardToDeck,
    removeCardFromDeck,
    toggleCard,
    destroy,
    addFriend,
    removeFriend,
};
