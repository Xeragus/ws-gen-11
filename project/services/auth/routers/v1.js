const express = require('express');
const router = express.Router();
const controller = require('../../../controllers/auth');

router.post('/register', controller.register)
      .post('/login', controller.login)
      .post('/change-password', controller.changePassword)
      .post('/forgot-password', controller.forgotPassword)
      .post('/reset-password', controller.resetPassword)
      .get('/refresh-token', controller.refreshToken)
      .get('/users', controller.getAll)
      .delete('/:id', controller.delete)


module.exports = router;