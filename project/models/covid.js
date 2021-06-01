var mongoose = require("mongoose");

var covidSchema = mongoose.Schema({
  country: {
    type: String,
  },
  fromDate: {
    type: String,
    //(year-month-day)
  },
  toDate: {
    type: String
    //(year-month-day)
  }
});

module.exports = mongoose.model("Covid", covidSchema);