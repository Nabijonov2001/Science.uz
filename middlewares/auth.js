const { verifyToken } = require("../modules/jwt")


module.exports = function auth(req, res, next){
    let token = req.cookies.token
    if(!token){
        res.redirect('/login')
        return
    }
    token = verifyToken(token)
    if(!token){
        res.redirect('/login')
    }
    
    next()
}