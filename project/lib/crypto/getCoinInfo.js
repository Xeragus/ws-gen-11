require('dotenv').config()
const axios = require('axios');

const apiKey = process.env.NOMIC_API_KEY;
// example for id = BTC
module.exports = getCoinInfo = async(id) => {
   const res = await axios.get(`https://api.nomics.com/v1/currencies?key=${apiKey}&ids=${id}`)
   const data = res.data[0];
   return data;
}

