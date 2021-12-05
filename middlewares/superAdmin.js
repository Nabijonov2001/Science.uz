const { verifyToken } = require('../modules/jwt')

module.exports = async function superAdmin(req, res, next){
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
  if(token.role == 'admin'){
      res.redirect('/dashboard')
  }
   req.user = token
   next()
}