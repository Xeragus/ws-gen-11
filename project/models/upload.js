const mongoose = require("mongoose");

const uploadSchema = mongoose.Schema({
  image: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("Upload", uploadSchema);
