const express = require('express');
const bcrypt = require('bcryptjs');

const db = require('../../data/helpers/auth_models');

const loginRouter = express.Router();

loginRouter.post('/', async (req, res) => {
    const { username, password } = req.body;
    try {
        const userFound = await db.getBy({ username });
        if (userFound && bcrypt.compareSync(password, userFound.password)) {
            req.session.userId = userFound.id;
            res.status(200).json({ message: 'Logged In!', sessionId: req.session.userId })
        } else {
            res.status(401).json({ message: 'You shall not pass!' })
        }
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = loginRouter;