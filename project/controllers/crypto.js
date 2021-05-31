const getCoinInfo = require('../lib/crypto/getCoinInfo');
const getExcangeRate = require('../lib/crypto/getExcangeRateForAll');
const currencyTicker = require('../lib/crypto/currencyTicker');

const cryptoController = {
    coinInfo: async(req, res) => {
        console.log(req.query.ids)
        const data = await getCoinInfo(req.query.ids);
       res.json(data)
    },
    getExcangeRateForAll: async(req, res) => {
        const data =  await getExcangeRate();
        res.json(data)
    },
    ticker: async(req, res) => {
        const {ids, interval, convertTo} = req.query;
        const data =  await currencyTicker(ids, interval, convertTo);
        res.json(data)
    }
}

module.exports = cryptoController;
