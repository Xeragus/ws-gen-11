const express = require('express');
const { upload } = require('../../../lib/uploadFile');
const router = express.Router();
const controller = require('../../../controllers/files')



router.post('/file', upload.single('file'), controller.fileUpload)
.post('/files', upload.array('files'), controller.filesUpload)
.get('/getSingleFiles', controller.getallSingleFiles)
.get('/getMultipleFiles', controller.getallMultipleFiles)
.delete('/single/:id', controller.deleteFile)
.delete('/multiple/:id', controller.deleteMultipleFiles)


module.exports = router