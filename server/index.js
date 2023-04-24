const express = require('express');
const createError = require('http-errors');
const cors = require('cors');
const createErrors = require('http-errors');
require('dotenv').config();
require('./helpers/init_mongodb');
const JWT = require('jsonwebtoken');

const AuthRoute = require('./Routes/Auth.route');
const ProductRoute = require('./Routes/Product.route');

const app = express();

// Middlewares
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cors());

// APIs
app.use('/auth', AuthRoute);
app.use('/product', ProductRoute);

// Handling Errors
app.use(async (req, res, next) => {
  next(createError.NotFound());
});

app.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.send({
    error: {
      status: error.status || 500,
      message: error.message
    }
  });
});


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server listening at port ${PORT}...`);
});