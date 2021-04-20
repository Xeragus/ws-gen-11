const express = require("express");
const app = express();
const mongoose = require("mongoose");
const blogPostsRouter = require('./routers/blogposts');
const categoriesRouter = require('./routers/categories');
app.use(express.json());

mongoose.connect("mongodb://localhost/ws-gen-11-project", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.use('/blogposts', blogPostsRouter);
app.use('/categories', categoriesRouter);

app.listen("3000", (error) => {
  if (error) {
    return console.log(
      "Error happened while starting the app on port 3000: ",
      error
    );
  }
  console.log("Blog service successfully started on port 3000");
});
