require('dotenv').config()
const axios = require('axios');

const apiKey = process.env.NOMIC_API_KEY;
module.exports = getExcangeRateForAll = async() => {
   const res = await axios.get(`https://api.nomics.com/v1/exchange-rates?key=${apiKey}`)
    const data = res.data;
    return data
}
