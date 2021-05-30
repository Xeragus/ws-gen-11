const express = require('express');
const router = express.Router();
const controller = require('../../../controllers/movies');

router.get('/', controller.fetchAll)
      .get('/:id', controller.fetchOne)
      .post('/', controller.create)

module.exports = router;