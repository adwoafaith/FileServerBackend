const express = require('express')
const  controllerUser= require('../controllers/controllerUser')
const { userAccess, adminAccess, generalAccess } = require('../utils/permissions')
const router = express.Router()

router.get('/findfile', generalAccess, controllerUser.findAllFiles);
router.get('/fileTitle', generalAccess,controllerUser.findFiletitle);
router.post('/sendEmail/:id', userAccess, controllerUser.sendEmail);
router.get('/file/download/:id',  userAccess,  controllerUser.Peh);

module.exports = router;