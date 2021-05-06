const express = require('express');

const router = express.Router();
const controller = require('../../../controllers/upload');
const multer = require('multer');

const storage = multer.diskStorage({
    destination: function(req, file, callback) {
        callback(null, 'image-upload');
    },
    filename: function(req, file, callback) {
        callback(null, file.originalname);
    }
});

const upload = multer({
  storage: storage  
});

router.post('/', upload.single('image'), controller.create)
module.exports = router;