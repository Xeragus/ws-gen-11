const express = require('express');
const app = express();
const weatherRouter = require('./routers/weather')

app.use(express.json());

app.use('/weather', weatherRouter)

app.listen("3004", (error) => {
    if (error) {
      return console.log(
        "Error happened while starting the app on port 3004: ",
        error
      );
    }
    console.log("Weather service successfully started on port 3004");
  });