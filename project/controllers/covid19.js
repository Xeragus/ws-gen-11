const Covid = require('../models/covid.js')
const successResponse = require('../lib/handlers/success-response-sender');
const errorResponse = require('../lib/handlers/error-response-sender');
const covidFilter = require('../lib/covid19/covid-filter')

module.exports = {
  fetchAll: async (req, res) => {
    try {
      const covid = await Covid.find();
      successResponse(res, 'List of all covid news', covid);
    } catch (error) {
      errorResponse(res, 500, error.message)
    }
  },
  fetchOne: async (req, res) => {
    try {
      let covid = await Covid.findById(req.params.id);
      if (!covid) errorResponse(res, 400, 'No covid news with the provided id')

      covid = covid.toObject();
      covid = {
        ...covid,
        covid: await covidFilter(covid.country, covid.fromDate, covid.toDate)
      }

      successResponse(res, `Covid news with id #${req.params.id}`, covid);
    } catch (error) {
      errorResponse(res, 500, error.message)
    }
  },
  create: async (req, res) => {
    try {
      const covid = await Covid.create(req.body);
      successResponse(res, 'New covid news added', covid);
    } catch (error) {
      errorResponse(res, 500, error.message)
    }
  }
}