const Upload = require('../models/upload');
const successResponse = require('../lib/success-response-sender');
const errorResponse = require('../lib/error-response-sender');

module.exports = {
    create: async(req, res) => {
        try {
            req.body.image = req.file.path
            const upload = await Upload.create(req.body);   
            successResponse(res, 'New file is uploaded', upload);  
        } catch (error) {
            errorResponse(res, 500, error.message)
        }   
    }
};