const File = require('../models/file');
const MultipleFiles = require('../models/files');
const successResponse = require('../lib/success-response-sender');
const errorResponse = require('../lib/error-response-sender');
const file = require('../models/file');

module.exports = {
  fileUpload: async (req, res, next) => {
    try {
      const file = new File({
        fileName: req.file.originalname,
        filePath: req.file.path,
        fileType: req.file.mimetype,
        fileSize: req.file.size
      });
      await file.save();
      successResponse(res, 'File uploaded!', file);
    } catch (error) {
      errorResponse(res, 500, error.message)
    }
  },
  filesUpload: async (req, res, next) => {
    try {
      let filesArray = [];
      req.files.forEach(element => {
        const file = {
          fileName: element.originalname,
          filePath: element.path,
          fileType: element.mimetype,
          fileSize: element.size
        }
        filesArray.push(file);
      });
      const files = new MultipleFiles({
        title: req.body.title,
        files: filesArray
      });
      await files.save();
      successResponse(res, 'Files uploaded!', files);
    } catch (error) {
      errorResponse(res, 500, error.message)
    }
  },
  getallSingleFiles: async (req, res, next) => {
    try {
      const file = await File.find();
      successResponse(res, 'List of all single files', file);
    } catch (error) {
      errorResponse(res, 500, error.message)
    }
  },
  getallMultipleFiles: async (req, res, next) => {
    try {
      const files = await MultipleFiles.find();
      successResponse(res, 'List of all multiple files', file);
    } catch (error) {
      errorResponse(res, 500, error.message)
    }
  },
  deleteFile: async (req, res) => {
    try {
      await File.remove({ _id: req.params.id });
      res.send(`File ${req.params.id} is deleted`);
    } catch (error) {
      res.send({ message: error });
    }
  },
  deleteMultipleFiles: async (req, res) => {
    try {
      await MultipleFiles.remove({ _id: req.params.id });
      res.send(`Files ${req.params.id} are deleted`);
    } catch (error) {
      res.send({ message: error });
    }
  }
}
