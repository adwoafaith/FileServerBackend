const jwt = require("jsonwebtoken")
require('dotenv').config()
const secret = process.env.SECRET

const genToken = (data) => {
    console.log(data)
    return jwt.sign(data, secret, { expiresIn: 43200 })
}

const verifyToken = (token) => {
    return jwt.verify(token, secret, (error, result) => {
        if (error) return error;
        return result;
    })
}

module.exports = {
    genToken,
    verifyToken
}