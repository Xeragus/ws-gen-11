const axios = require('axios');

module.exports = async (country, fromDate, toDate) => {
  const res = await axios.get(`https://api.covid19api.com/country/${country}?from=${fromDate}&to=${toDate}`)


  const arr = []
  res.data.forEach(element => {
    const covid = {
      country: element.Country,
      confirmed: element.Confirmed.toString(),
      active: element.Active.toString(),
      recovered: element.Recovered.toString(),
      deaths: element.Deaths.toString()
    }
    arr.push(covid)
  })
  return arr
}

