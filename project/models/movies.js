var mongoose = require("mongoose");

var movieSchema = mongoose.Schema({
  name: {
    type: String,
  },
});

module.exports = mongoose.model("Movie", movieSchema);