const express = require('express');
const dotenv = require('dotenv');
// eslint-disable-next-line no-unused-vars
const colors = require('colors');
const morgan = require('morgan');
const connectDB = require('./src/config/db');

const reviews = require('./src/routes/reviews');
const users = require('./src/routes/users');
const login = require('./src/routes/login');

dotenv.config({ path: './src/config/config.env' });

connectDB();

const app = express();

app.use(express.json());
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

app.use('/api/v1/reviews', reviews);
app.use('/api/v1/users', users);
app.use('/api/v1/login', login);
// app.get('/', (req, res) => res.send('Hello'));

const PORT = process.env.PORT || 5000;
app.listen(
  PORT,
  console.log(
    `Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow.bold
  )
);
