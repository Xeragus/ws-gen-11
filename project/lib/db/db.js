const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost/ws-gen-11-project", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
