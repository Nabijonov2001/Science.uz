const { verifyToken } = require('../modules/jwt')
const jwt = require('jsonwebtoken')

module.exports = async function admin(req, res, next){
  let token = req.cookies.token
  token = verifyToken(token)
  console.log(token)
  if(!token){
      res.redirect('/login')
      return
  }   
  if(token.role ==='user'){
      res.redirect('/blog')
      return
  }
   req.user = token
   next()
}