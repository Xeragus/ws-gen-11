const multer = require('multer');

const uploadImage = () =>{
    const storage = multer.diskStorage({
        destination: function(req, file, callback) {
            callback(null, './image-upload');
        },
        filename: function(req, file, callback) {
            callback(null, Date.now() + file.originalname);
        }
    });
    
    const upload = multer({
      storage: storage  
    });
}

module.exports = uploadImage;

