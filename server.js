const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const session = require('express-session');
const KnexSessionStore = require('connect-session-knex')(session);

const db = require('./data/dbConfig');
const loginRouter = require('./api/login/loginRouter');
const registerRouter = require('./api/register/registerRouter');
const usersRouter = require('./api/users/usersRouter');

const server = express();

const sessionConfig = {
    name: 'auth session',
    secret: 'auth secret!',
    cookie: {
        maxAge: 1000 * 60 * 60 * 24,
        secure: process.env.SECURE || false,
    },
    httpOnly: true,
    resave: false, 
    saveUninitialized: false,
    store: new KnexSessionStore({
        knex: db,
        tablename: 'sessions',
        sidefieldname: 'sid',
        createtable: true,
        clearInterval: 1000 * 60 * 60 * 24,
    }),
}

server.use(express.json());
server.use(helmet());
server.use(cors());
server.use(session(sessionConfig));

server.use('/api/login', loginRouter);
server.use('/api/register', registerRouter);
server.use('/api/users', usersRouter);

module.exports = server;