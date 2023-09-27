const jwt = require('jsonwebtoken')
const { SECRETJWT } = require('../config/enviroments.config');

const secretKey = SECRETJWT;

const generateToken = user => {
  return jwt.sign( user._id , secretKey, { expiresIn: '15m' })
}

const authToken = (req, res, next) => {
  const authHeader = req.headers.authorization

  if (!authHeader)
    return res.status(401).json({ status: 'error', error: 'Unauthorized' })

  const token = authHeader.split(' ')[1]

  jwt.verify(token, secretKey, (error, credentials) => {
    if (error)
      return res.status(403).json({ status: 'error', error: 'Forbidden' })

    req.user = credentials.user
    next()
  })
}

module.exports = {
  generateToken,
  authToken,
}