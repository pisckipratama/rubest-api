// import modules
const express = require('express');
const morgan = require('morgan');
const dotenv = require('dotenv');
const colors = require('colors');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const connectDB = require('./app/lib/configs/db');
const errorHandler = require('./app/lib/middlewares/error');

// Load environments, initial app and db
dotenv.config();
const app = express();
connectDB();

// middlewares
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}
app.use(cors());

// routes
app.get('/', (_, res) => {
  res.status(200).json({ status: 'ok', message: 'Rubest API ready to use!' });
});
const baseURL = '/api/v1';
const authRouter = require('./app/components/auth/auth_routes');
const cashRouter = require('./app/components/cashflow/cashflow_routes');
app.use(baseURL, authRouter);
app.use(baseURL, cashRouter);

app.use(errorHandler);

const PORT = process.env.PORT || 1337;
app.listen(PORT, () => {
  console.log(`Server running in ${process.env.NODE_ENV} on port ${PORT}`);
});

// handle unhandled promise rejection
process.on('unhandledRejection', (err, promise) => {
  console.log(`Error: ${err.message}`);

  // close server & exit process
  server.close(() => process.exit(1));
});

module.exports = app;
