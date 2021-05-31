const express = require("express");
const app = express();
const basketballRouter = require('./routers/basketball');
const footballRouter = require('./routers/football')
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
app.use('/basketball', basketballRouter);
app.use('/football', footballRouter)
app.listen(process.env.INFO_API_PORT, error => serverStartLogger('Info', process.env.INFO_API_PORT, error));
