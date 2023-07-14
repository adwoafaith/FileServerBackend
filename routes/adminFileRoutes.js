const express = require('express')
const router = express.Router()

const controllerAdmin = require('../controllers/controllerAdmin')
const upload = require('../fileMiddleware/upload')
const { adminAccess } = require('../utils/permissions')

router.post('/addFile', adminAccess, upload.single('file'), controllerAdmin.addFile)
router.get('/counts', adminAccess, controllerAdmin.getCounts)

module.exports = router
