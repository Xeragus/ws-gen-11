const successResponse = require('../lib/success-response-sender');
const errorResponse = require('../lib/error-response-sender');
const { userModel } = require('../models/blog-post');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const cron = require('node-cron');
const schedule = require('node-schedule')
const nodemailer = require('../lib/nodeMailer');


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
        expiresIn: '30m'
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
        expiresIn: '30m'
      });

      successResponse(res, 'JWT successfully refreshed', token);
    } catch (error) {
      errorResponse(res, 500, error.message);
    }
  },
  delete: async (req, res) => {
    try {
      await userModel.remove({ _id: req.params.id });

      cron.schedule('*/10 * * * * *', () => {
        console.log('User deleted');
      });

      const date = new Date('2021-05-03T21:27:00.000+2:00');

      const jobSchedule = schedule.scheduleJob(date, function () {
        console.log('node-schedule');
        jobSchedule.cancel()
      });

      res.send(`User ${req.params.id} is deleted`);
    } catch (error) {
      res.send({ message: error });
    }
  },
  getAll: async (req, res) => {
    try {
      const users = await userModel.find()
      successResponse(res, 'List of all users', users);
    } catch (error) {
      errorResponse(res, 500, error.message)
    }
  },
  changePassword: async (req, res) => {
    try {
      const user = await userModel.findOne({ email: req.body.email });
      if (!user) {
        return errorResponse(res, 403, 'Forbidden');
      }
      if (!bcrypt.compareSync(req.body.password, user.password)) {
        return errorResponse(res, 401, 'Unauthorized');
      }

      if (req.body.new_password === req.body.confirmation_password) {
        req.body.password = req.body.new_password;
      } else {
        return errorResponse(res, 400, 'Passwords do not match');
      }

      req.body.password = bcrypt.hashSync(req.body.password);

      const updateUser = await userModel.findByIdAndUpdate(user._id, req.body);
      if (updateUser) {
        return successResponse(res, 'Password is successfully changed');
      }
      return errorResponse(res, 404, 'Not Found');
    } catch (err) {
      return errorResponse(res, 500, 'Internal Server Error');
    }
  },
  forgotPassword: async (req, res) => {
    try {
      const user = await userModel.findOne({ email: req.body.email });
      if (!user) {
        return errorResponse(res, 404, 'Not Found');
      }

      const getLink = await userModel.findByIdAndUpdate(user._id);
      if (getLink) { nodemailer(req.user.email) };
      return successResponse(res, 'Email has been send, kindly follow the instructions.');
    } catch (err) {
      return errorResponse(res, 500, 'Internal Server Error');
    }
  },
  resetPassword: async (req, res) => {
    try {
      const user = await userModel.findOne({ email: req.body.email });
      if (!user) {
        return errorResponse(res, 403, 'Forbidden');
      }
    
      if (req.body.new_password === req.body.confirmation_password) {
        req.body.password = req.body.new_password;
      } else {
        return errorResponse(res, 400, 'Passwords do not match');
      }

      req.body.password = bcrypt.hashSync(req.body.password);

      const updateUser = await userModel.findByIdAndUpdate(user._id, req.body);
      if (updateUser) {
        return successResponse(res, 'Password is successfully changed');
      }
      return errorResponse(res, 404, 'Not Found');
    } catch (err) {
      return errorResponse(res, 500, 'Internal Server Error');
    }
  }
}
