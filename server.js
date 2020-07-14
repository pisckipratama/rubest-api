const express = require('express');
const morgan = require('morgan');
const dotenv = require('dotenv');

// call .env file
dotenv.config({ path: '.env' });

const app = express();

// init db
const pool = require('./lib/db');

// import route
const productRouter = require('./components/products/products.routes');
const userRouter = require('./components/users/users.routes');

// check jika node_env=development nampil logging
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// init and run router
app.use('/api/v1/products', productRouter);
app.use('/api/v1/users', userRouter);

const PORT = process.env.PORT || 1337;
app.listen(PORT, () => {
  console.log(`Server running in ${process.env.NODE_ENV} on port ${PORT}`);
});