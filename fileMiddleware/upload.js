const path = require ('path')
const multer = require ('multer')


var storage = multer.diskStorage({
    filename: function(req, file, cb){
        // let ext = path.extname(file.originalname)
        cb(null, Date.now() + path.extname(file.originalname))
    }
})

var upload = multer ({
    storage:storage,
    fileFilter: function(req, file, callback){
        console.log(file.mimetype)
        if (
        file.mimetype == 'image/png' ||
        file.mimetype == 'image/jpg' ||
        file.mimetype == 'image/jpeg' ||
        file.mimetype === 'audio/mpeg' ||
        file.mimetype === 'video/mp4' ||
        file.mimetype === 'application/pdf'
    ){
        callback(null,true)
    }
    else{
        console.log('Files that can be uploaded are jpg, png,video/mp4/ file formats supported')
        callback(null,false)
    }
        
    },
   limits: {
    fileSize: 50 * 1024 * 1024, // Maximum file size in bytes (e.g., 50MB)
  },
})

module.exports = upload  