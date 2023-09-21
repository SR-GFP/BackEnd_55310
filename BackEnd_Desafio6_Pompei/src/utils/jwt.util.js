const jwt = require ("jsonwebtoken")
const { SECRETJWT } = require ("../config/enviroments.config")

const secreteKey = SECRETJWT

const generateToken = user =>{
  return jwt.sign({user}, secreteKey, {expiresIn: "1h"})

}

module.exports ={
  generateToken,
  
}