const express = require('express');
const router = express.Router();
const controller = require('../../../controllers/weather');

router .get('/current/:cityName', controller.getCurrentWeather)
        .get('/five/days/forecast/:cityName', controller.fiveDaysForecast)
        .get('/:cityName/:days', controller.getHistoricalWeatherInfo)
        
    

module.exports = router