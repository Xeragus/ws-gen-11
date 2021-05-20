const {
  historicalWeather,
  currentWeather,
} = require("../lib/openWeatherAPI/oneCallApi");
const fiveDaysThreeHoursInfo = require("../lib/openWeatherAPI/call-5day-3hour-Forecast");

module.exports = {
  // Provide city name, and days. Ex. http://localhost:3004/weather/Struga/4
  // You can choose number from 1 to 5, 1 = yesterday, 2 = before yesterday and etc...
  getHistoricalWeatherInfo: async (req, res) => {
    try {
      const { cityName, days } = req.params;
      const getData = await historicalWeather(cityName, days);
      res.send(getData);
    } catch (error) {
      console.log(error);
    }
  },
  getCurrentWeather: async (req, res) => {
    try {
      const cityName = req.params.cityName;
      const getData = await currentWeather(cityName);
      res.send(getData);
    } catch (error) {
      console.log(error);
    }
  },
  // Weather forecast for 5 days with data every 3 hours by city name
  fiveDaysForecast: async (req, res) => {
    try {
      const cityName = req.params.cityName;
      const getData = await fiveDaysThreeHoursInfo(cityName);
      res.send(getData);
    } catch (error) {
      console.log(error);
    }
  },
};
