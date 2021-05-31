const express = require("express");
const app = express();
const jwt = require('express-jwt');
const cryptoRouter = require('./routers/crypto');
const unauthorizedErrorHandler = require('../../lib/handlers/unathorized-error-handler');
const serverStartLogger = require('../../lib/handlers/server-start-logger');

require('../../lib/db/db');
require('dotenv').config()

app.use(express.json());
app.use(jwt({
  secret: process.env.SECRET_AUTH_KEY,
  algorithms: ['HS256']
}));
app.use((err, req, res, next) => unauthorizedErrorHandler(err, req, res, next));
app.use('/crypto', cryptoRouter);

app.listen(process.env.CRYPTO_API_PORT, error => serverStartLogger('Crypto', process.env.CRYPTO_API_PORT, error));
