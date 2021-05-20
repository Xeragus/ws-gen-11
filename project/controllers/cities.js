const City = require('../models/city')
const successResponse = require('../lib/success-response-sender');
const errorResponse = require('../lib/error-response-sender');


const axios = require('axios');


const getFiveDayForecast = async (cityName) => {
  const res = await axios.get(`https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&appid=a2a90db6fff18d6da8b54c8dbecc2aee&units=metric`)
  console.log(res);
  let apiResponse = [];

  res.data.list.forEach((row) => {
    let rowdata = {
      'datetime': row.dt_txt,
      'main': row.main,
      'weather': row.weather[0],
      'wind': row.wind,
      'clouds': row.clouds
    };

    apiResponse.push(rowdata);
  });

  return apiResponse;
}

module.exports = {
  fetchAll: async (req, res) => {
    try {
      const cities = await City.find();
      successResponse(res, 'List of all cities', cities);
    } catch (error) {
      errorResponse(res, 500, error.message)
    }
  },
  fetchOne: async (req, res) => {
    try {
      let city = await City.findById(req.params.id);
      if (!city) errorResponse(res, 400, 'No city with the provided id')

      city = city.toObject();
      city = {
        'city': city.name,
        'hourlyWeather': await getFiveDayForecast(city.name)
      };

      successResponse(res, `City with id #${req.params.id}`, city);
    } catch (error) {
      errorResponse(res, 500, error.message)
    }
  },
  create: async (req, res) => {
    try {
      const city = await City.create(req.body);
      successResponse(res, 'New city created', city);
    } catch (error) {
      errorResponse(res, 500, error.message)
    }
  }
}