var mongoose = require("mongoose");

var CityShema = mongoose.Schema({
  City: {
    type: String,
    required: ['Please provide city name']
  }

});

const cityModel = mongoose.model("City", CityShema);

module.exports = {
  cityModel  
}

