const getLonAndLat = require('./getLonAndLat');
const axios = require('axios');

// Weather api
const apiKey = '7b3feaad5e6664abdb248228134167fa'

// Use this date for creating timestamp 
let date = new Date();
let timestamp = null

//Get weather info fo X days in past. (1-5 days back)
const getHistoricalInformations = async (lat, lon, timestamp) => {
    const res = await axios.get(`https://api.openweathermap.org/data/2.5/onecall/timemachine?lat=${lat}&lon=${lon}&dt=${timestamp}&appid=${apiKey}&units=metric`)
    const data = await res.data;
   
     const { temp, feels_like, pressure, humidity, clouds, wind_speed, sunrise, sunset } = data.current;
     let fiveDaysInfo ={
       temp,
       feels_like,
       pressure,
       humidity,
       clouds,
       wind_speed,
       sunrise,
       sunset,
       icon: data.current.weather[0].icon
     }
      return fiveDaysInfo
  }

const historicalWeather = async (cityName, days) => {
    // Convert miliseconds to seconds
    timestamp = Math.floor(date.setDate(date.getDate() - days) / 1000)
    
    const res = await getLonAndLat(cityName);
    const {lon, lat} = res;
    const informations = await getHistoricalInformations(lat, lon, timestamp);
    return informations
}
// Get current weather info
const getCurrentWeather = async (lat, lon) => {
   const res = await axios.get(`https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=hourly,daily&appid=${apiKey}&units=metric`)
   const data = await res.data;
 
   const { temp, feels_like, pressure, humidity, clouds, wind_speed, sunrise, sunset } = data.current;
   let currentWeatherInfo ={
     temp,
     feels_like,
     pressure,
     humidity,
     clouds,
     wind_speed,
     sunrise,
     sunset,
     icon: data.current.weather[0].icon
   }
    return currentWeatherInfo
}
const currentWeather = async (cityName) => {
  const res = await getLonAndLat(cityName);
  const {lon, lat} = res;
  const informations = await getCurrentWeather(lat, lon);
  return informations
}


module.exports = {historicalWeather, currentWeather}