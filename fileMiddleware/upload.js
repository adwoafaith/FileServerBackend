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
        file.mimetype == 'image/jpeg'
    ){
        callback(null,true)
    }
    else{
        console.log('Only jpg and png file formats supported')
        callback(null,false)
    }
        
    },
    limits:{
        fileSize: 1024*1024*2
    }
})

module.exports = upload  