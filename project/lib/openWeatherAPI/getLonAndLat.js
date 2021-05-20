const axios = require('axios');

// This function is for getting longtitude and latitute values for choosen city
const getLongAndLat = async (cityName) => { 
    const res = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=7b3feaad5e6664abdb248228134167fa`)
    const {lon, lat} = res.data.coord;
    return {
        lon,
        lat
    }
  }

module.exports = getLongAndLat