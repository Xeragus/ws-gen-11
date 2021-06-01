const express = require("express");
const app = express();
const covidRouter = require('./routers/covid');
const jwt = require('express-jwt');
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
app.use('/covid19', covidRouter);
app.listen(process.env.COVID19_API_PORT, error => serverStartLogger('Covid', process.env.COVID19_API_PORT, error));