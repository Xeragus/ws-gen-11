const express = require('express');
const router = express.Router();

router.get('/hehe', (req, res) => {
  res.send({
    message: 'Stignavte na GET /hehe',
    x: 'y',
    products: [4, 5, true, 'hehe', [1, 2], {5: 3}]
  });
});

module.exports = router