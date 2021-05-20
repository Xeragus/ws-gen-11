const getLonAndLat = require('./getLonAndLat');
const axios = require('axios');

// Weather api
const apiKey = '7b3feaad5e6664abdb248228134167fa'

const fiveDaysThreeHoursInfo = async (cityName) => { 
    const lonAndLat = await getLonAndLat(cityName);
    const {lon, lat} = lonAndLat;

    const res = await axios.get(`https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`)
    const data = res.data;
    return data
  }

  fiveDaysThreeHoursInfo()

module.exports = fiveDaysThreeHoursInfo