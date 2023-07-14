const User = require("../models/user");
const { verifyToken } = require("./access-token")

const adminAccess = async (req, res, next) => {
    try {
        if (!req.headers.authorization.split(' ')[1]) return  res.status(401).json({message: 'Please provide authorization headers'})
        const user = verifyToken(req.headers.authorization.split(' ')[1]);

        const currentUser =  await User.findOne({email: user.email})
        if(currentUser.role === 'admin') next()
        else return res.status(401).json({message: 'UnAuthorized'})
    } catch (error) {
        return res.status(401).json({message: error.message ? error.message : 'Internal Server Error'})
    }
}
const userAccess = async (req, res, next) => {
    try {
        if (!req.headers.authorization.split(' ')[1]) return  res.status(401).json({message: 'Please provide authorization headers'})
        const user = verifyToken(req.headers.authorization.split(' ')[1]);

        const currentUser =  await User.findOne({email: user.email})
        if(currentUser.role === 'user' || currentUser.role === 'admin') next()
        else return res.status(401).json({message: 'UnAuthorized'})
    } catch (error) {
        return res.status(401).json({message: error.message ? error.message : 'Internal Server Error'})
    }
}

const generalAccess = async (req, res, next) => {
    try {
        if (!req.headers.authorization.split(' ')[1]) return  res.status(401).json({message: 'Please provide authorization headers'})
        const user = verifyToken(req.headers.authorization.split(' ')[1]);

        if(user.role === 'user' || user.role === 'admin') next()
        else return res.status(401).json({message: 'UnAuthorized'})
    } catch (error) {
        return res.status(401).json({message: error.message ? error.message : 'Internal Server Error'})
    }
}

module.exports = {
    adminAccess,
    userAccess,
    generalAccess
}