const express = require('express');

const Users = require('../../data/helpers/auth_models');

const usersRouter = express.Router();

usersRouter.get('/', restricted, async (req, res) => {
    try {
        const users = await Users.get();
        res.status(201).json(users)
    } catch (err) {
        res.status(500).json(err);
    }
});

function restricted(req, res, next) {
    if(req.session && req.session.userId) {
      next();
    } else {
      res.status(401).json({ message: 'You shall not pass!' });
    }
  }

module.exports = usersRouter;