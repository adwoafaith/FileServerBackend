const path = require('path')
const multer = require('multer')

const storage = multer.diskStorage({
    destination: './uploads', // Define the upload destination folder
    filename: function (req, file, cb) {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({
    storage: storage,
    limits: {
        fileSize: 50 * 1024 * 1024, // Maximum file size in bytes (e.g., 50MB)
    },
});
module.exports = upload  