const express = require('express');
const bcrypt = require('bcryptjs');

const db = require('../../data/helpers/auth_models');

const registerRouter = express.Router();

registerRouter.post('/', async (req, res) => {
    const user = req.body;
    const hash = bcrypt.hashSync(user.password, 12);
    user.password = hash;
    try {
        const userAdded = await db.add(user);
        res.status(201).json(userAdded)
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = registerRouter;