const express = require('express')
const router = express.Router();

const {confirmOTP,forgotPassword,genOTP,login,resetPassword,signup_post,} = require('../controllers/authController')

router.post('/signup', confirmOTP,signup_post)
router.post('/verify',genOTP)
router.post('/login',login)
router.post('/forgotPassword',forgotPassword)
router.patch('/resetPassword/:token',resetPassword)

module.exports = router;