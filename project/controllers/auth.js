const successResponse = require('../lib/success-response-sender');
const errorResponse = require('../lib/error-response-sender');
const { userModel } = require('../models/blog-post&user')
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

module.exports = {
  register: async (req, res) => {
    try {
      if (!req.body.password || req.body.password != req.body.confirmation_password) {
        return errorResponse(res, 400, 'Bad request. Passwords do not match');
      }

      const user = await userModel.findOne({ email: req.body.email });
      if (user) {
        return errorResponse(res, 400, 'Bad request. User exists with the provided email.');
      }

      req.body.password = bcrypt.hashSync(req.body.password);

      await userModel.create(req.body);

      successResponse(res, 'User registered');
    } catch (error) {
      errorResponse(res, 500, error.message);
    }
  },
  login: async (req, res) => {
    try {
      const user = await userModel.findOne({ email: req.body.email });
      if (!user) {
        return errorResponse(res, 400, 'Bad request. User with the provided email does not exist.');
      }
      if (!bcrypt.compareSync(req.body.password, user.password)) {
        return errorResponse(res, 401, 'Bad request. Incorrect password.');
      }

      const payload = {
        id: user._id,
        email: user.email
      }

      const token = jwt.sign(payload, '3218943205PADSOKDASI(*#$U(', {
        expiresIn: '50m'
      });

      successResponse(res, 'JWT successfully generated', token);
    } catch (error) {
      errorResponse(res, 500, error.message);
    }
  },
  refreshToken: (req, res) => {
    try {
      const payload = {
        id: req.user.id,
        email: req.user.email
      }

      const token = jwt.sign(payload, '3218943205PADSOKDASI(*#$U(', {
        expiresIn: '50m'
      });

      successResponse(res, 'JWT successfully refreshed', token);
    } catch (error) {
      errorResponse(res, 500, error.message);
    }
  },
  logout: (req, res) => {
    try {
      const payload = {
        id: req.user.id,
        email: req.user.email
      }

      const token = jwt.sign(payload, 'Invalid secret key', {
        expiresIn: '1'
      });

      successResponse(res, 'You have been logged out', token);
    } catch (error) {
      errorResponse(res, 500, error.message);
    }
  }
};