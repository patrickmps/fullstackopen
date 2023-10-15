const express = require('express');
const mongoose = require('mongoose');
const app = express();
const cors = require('cors');
const config = require('./utils/config');
const { info } = require('./utils/logger');
require('express-async-errors');
const middleware = require('./utils/middleware');
const usersRouter = require('./controllers/users')
const loginRouter = require('./controllers/login')
const blogsRouter = require('./controllers/blogs');


mongoose.set('strictQuery', false);

info('connecting to', config.MONGODB_URI);

mongoose.connect(config.MONGODB_URI)
  .then(() => {
    info('connected to MongoDB');
  })
  .catch((error) => {
    error('error connecting to MongoDB:', error.message);
  });

app.use(cors());
app.use(express.static('build'));
app.use(express.json());
app.use(middleware.requestLogger);
app.use(middleware.tokenExtractor);


app.use('/api/users', usersRouter)
app.use('/api/login', loginRouter)
app.use('/api/blogs', blogsRouter);

app.use(middleware.unknownEndpoint);
app.use(middleware.errorHandler);

module.exports = app;
