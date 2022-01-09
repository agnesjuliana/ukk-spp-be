const jwt = require('jsonwebtoken')
const { response } = require('../utils/wrapper')
const JWT_KEY = "secret"

const generateToken = async(payload)=>{
  const options = {expiresIn: "5 days"}
  const token = jwt.sign(payload, JWT_KEY, options)
  return token
}

const getToken = (headers)=>{
  if(headers.authorization.includes('Bearer')){
    const parted = headers.authorization.split(' ')
    if(parted.length === 2){
      return parted[1]
    }
  }
  return undefined
}

const verifyToken = async (req, res, next) => {
  const encryptedToken = getToken(req.headers)
  if(!encryptedToken){
    response(res, null, 'failed getToken', 500)
  }

  let decodedToken
  try{
    decodedToken = jwt.verify(encryptedToken, JWT_KEY)
  }catch(error){
    if(error instanceof jwt.TokenExpiredError){
      return response(res, null, 'token expired', 401)
    }
    return response(res, null, 'Invalid Token!', 401)
  }
  
  req.user = decodedToken
  next()
}

module.exports = {
  verifyToken, generateToken
};