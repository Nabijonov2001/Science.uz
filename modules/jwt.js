const jwt = require('jsonwebtoken')
const { SECRET_WORD } = require('../config')


function generateToken(data){
    return  jwt.sign(data, SECRET_WORD)
    
}

function verifyToken(token){
    try {
        let decoded = jwt.verify(token, SECRET_WORD)
        if(!decoded){
            throw new Error('Token xato')
        }
        return decoded
    } catch (error) {
        console.log(error)
    }
  
}


module.exports = {generateToken, verifyToken}