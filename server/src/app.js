require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const helmet = require('helmet');

const { NODE_ENV, CORS_ORIGIN_DEV, CORS_ORIGIN_PROD } = require('./config');

const {
  usersRouter,
  songsRouter,
  setsRouter,
  gigsRouter
} = require('./routes');
const errors = require('../src/middlewares/errors');

const morganOption = NODE_ENV === 'production' ? 'tiny' : 'dev';
const morganSkip = { skip: NODE_ENV === 'test' };
const corsOrigin = {
  origin: NODE_ENV === 'production' ? CORS_ORIGIN_DEV : CORS_ORIGIN_PROD
};

const app = express();
app.use(morgan(morganOption, morganSkip));
app.use(cors(corsOrigin));
app.use(helmet());

app.get('/api/v1', (req, res) => {
  res.send('Express boilerplate initialized!');
});

/*
| ROUTES HERE -------------------------
*/

app.use('/api/v1/auth', usersRouter);
app.use('/api/v1/songs', songsRouter);
app.use('/api/v1/sets', setsRouter);
app.use('/api/v1/gigs', gigsRouter);

/*
|--------------------------------------
*/

app.use(errors.notFound);
app.use(errors.errorHandler);

module.exports = app;
