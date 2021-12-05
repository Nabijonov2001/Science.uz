const {Users} = require("../models/userModel")
const {loginValidation} = require('../validations/loginValidation')
const { generateToken } = require("../modules/jwt")
const { comparePassword } = require("../modules/password")

module.exports = class LoginConntroller{

    static loginGet(req, res){
        res.render('login')
    }
    static async loginPost(req, res){
        try {
            const {error} = loginValidation(req.body)
            if(error) throw new Error(error.details[0].message)
            const {username, password} = req.body
            let user = await Users.findOne({username})
            if(!user) throw new Error('Username yoki password xato!')
            const checkPassword = await comparePassword(password, user.password)
            if(!checkPassword) throw new Error('Username yoki password xato!')
            let token = generateToken({
                id:user._id,
                role: user.role,
                username:user.username
            })
            if(user.role !== 'user'){
                res.cookie('token', token).status(201).redirect('/dashboard')
            }
            res.cookie('token', token).status(201).redirect('/blog')
        } catch (error) {
            res.status(400).render('login',{
                ok:false,
                message:error+''
            })
        }
    }
}