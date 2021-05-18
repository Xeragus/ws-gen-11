const { cityModel } = require("../models/cities");
const successResponse = require("../lib/success-response-sender");
const errorResponse = require("../lib/error-response-sender");
module.exports = {
  create: async (req, res) => {
    try {
      const city = await cityModel.create(req.body);
      successResponse(res, "New city created", city);
    } catch (error) {
      errorResponse(res, 500, error.message);
    }
  },
  fetchAll: async (req, res) => {
    try {
      const Cities = await cityModel.find()      
      successResponse(res, "List of all cities", city);
    } catch (error) {
      errorResponse(res, 500, error.message);
    }
  },
};
