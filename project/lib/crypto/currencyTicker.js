require('dotenv').config()
const axios = require('axios');

const apiKey = process.env.NOMIC_API_KEY;

// example (["BTC", "ETH", "XRP"], "1d", "EUR")
module.exports = currencyTicker = async(ids, interval, convertTo ="USD") => {
   const res = await axios.get(`https://api.nomics.com/v1/currencies/ticker?key=${apiKey}&ids=${ids}&interval=${interval}d&convert=${convertTo}&per-page=100&page=1"`)
    const data = res.data;
    return data
}