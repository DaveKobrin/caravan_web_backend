const db = require('../models');
const bcrypt = require('bcrypt');

const register = async (req, res) => {
  try {
    const userExists = await db.User.findOne({ gamertag: req.body.gamertag });
    if (userExists) return res.status(403).json({ message: 'gamertag already exists' });
    const salt = bcrypt.genSaltSync(10);
    req.body.password = bcrypt.hashSync(req.body.password, salt);
    const starterSet = {set: 'Standard'};
    req.body.ownedCards = await db.Card.find(starterSet,'_id');
    const user = await db.User.create(req.body);
    if (user) {
      req.session.currentUser = user;
      return res.status(200).json({ message: 'registered and logged in new user', user });
    }
  } catch (err) {
    //catch any errors
    return res.status(400).json({ error: err.message });
  }
};

const login = async (req, res) => {
    try {
        const user = await db.User.findOne({ gamertag: req.body.gamertag });
        if (!user) return res.status(404).json({ message: 'gamertag not found' });
        
        const validLogin = bcrypt.compareSync(req.body.password, user.password);
        if (validLogin) {
            req.session.currentUser = user;
            return res.status(200).json({ message: 'logged in user', user });
        }
        return res.status(403).json({ message: 'credentials do not match' });
    } catch (err) {
      //catch any errors
      return res.status(400).json({ error: err.message });
    }
  };

module.exports = {
  register,
  login,
};
