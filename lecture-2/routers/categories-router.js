const express = require('express');
const router = express.Router();
const categoriesController = require('../controllers/categories');

router.get('/', categoriesController.fetchAll)
      .get('/:id', categoriesController.fetchOne)
      .post('/', categoriesController.create)
      // .post('/', categoriesController.categoryUpdate)
      

module.exports = router;