const Coordinate = require('../models/coordinate')
const successResponse = require('../lib/success-response-sender');
const errorResponse = require('../lib/error-response-sender');
const axios = require('axios')

const getWeatherByCoordinates = async (latitude, longitude) => {
  const res = await axios.get(`https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&units=metric&exclude=daily,minutely,hourly&appid=9b5fa6d25b8720bf3aa2591a22661c04`)

  return {
    location: res.data.timezone,
    sunrise: res.data.current.sunrise,
    sunset: res.data.current.sunset,
    temp: res.data.current.temp,
    feels_like: res.data.current.feels_like
  }
}

const getSolarRadiationData = async (latitude, longitude) => {
  const res = await axios.get(`http://api.openweathermap.org/data/2.5/solar_radiation/forecast?lat=${latitude}&lon=${longitude}&appid=9b5fa6d25b8720bf3aa2591a22661c04`)

  return {
    ghi: res.data.list[0].radiation.ghi,
    dni: res.data.list[0].radiation.dni,
    dhi: res.data.list[0].radiation.dhi
  }
}

module.exports = {
  fetchAll: async (req, res) => {
    try {
      const coordinates = await Coordinate.find();
      successResponse(res, 'List of all coordinates', coordinates);
    } catch (error) {
      errorResponse(res, 500, error.message)
    }
  },
  fetchOne: async (req, res) => {
    try {
      let coordinate = await Coordinate.findById(req.params.id);
      if (!coordinate) errorResponse(res, 400, 'No coordinates with the provided id')

      coordinate = coordinate.toObject();
      coordinate = {
        ...coordinate,
        weather: await getWeatherByCoordinates(coordinate.latitude, coordinate.longitude),
        solar_radiation: await getSolarRadiationData(coordinate.latitude, coordinate.longitude)
      }

      successResponse(res, `Location with id #${req.params.id}`, coordinate);
    } catch (error) {
      errorResponse(res, 500, error.message)
    }
  },
  create: async (req, res) => {
    try {
      const coordinate = await Coordinate.create(req.body);
      successResponse(res, 'New coordinates added', coordinate);
    } catch (error) {
      errorResponse(res, 500, error.message)
    }
  }
}