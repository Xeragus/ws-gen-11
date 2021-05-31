const express = require('express');
const router = express.Router();
const controller = require('../../../controllers/crypto');

router .get('/ticker', controller.ticker)
        .get('/exchange-rates', controller.getExcangeRateForAll)
        .get('/coinId', controller.coinInfo)
    

module.exports = router;