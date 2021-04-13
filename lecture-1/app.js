const express = require('express');
const app = express();
const router = require('./router');

app.use('/', router);

console.log('hehehe');

app.listen('3000', (error) => {
  if (error) {
    return console.log('Error happened while starting the app on port 3000: ', error);
  }
  console.log('Application successfully started on port 3000');
});