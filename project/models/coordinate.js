var mongoose = require("mongoose");

var coordinateSchema = mongoose.Schema({
  latitude: {
    type: String,
    required: ['Please provide the latitude']
  },
  longitude: {
    type: String, 
    required: ['Please provide the longitude']
  }
});

module.exports = mongoose.model("Coordinate", coordinateSchema); 