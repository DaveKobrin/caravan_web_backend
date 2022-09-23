const db = require('../models');
const bcrypt = require('bcrypt');

const register = async (req, res) => {
    try {
        const userExists = await db.Users.findOne({gamertag: req.body.gamertag});
        if(userExists) 
            return res.status(403).json({message: 'gamertag already exists'});
        const salt = bcrypt.genSaltSync(10);
        req.body.password = bcrypt.hashSync(req.body.password, salt);
        const newUser = await db.Users.create(req.body);
        if(newUser) {
            req.session.currentUser = newUser;
            return res.status(200).json({message: 'registered and logged in new user'});
        }
    } catch (err) { //catch any errors
        return res.status(400).json({error: err.message});
    };
}


module.exports = {
    register,
};
