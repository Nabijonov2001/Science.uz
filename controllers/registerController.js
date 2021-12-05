const { validateUser, Users } = require("../models/userModel")
const { generateToken } = require("../modules/jwt")
const { hashPassword } = require("../modules/password")


module.exports = class RegisterConntroller{
    
    static  getRegister(req, res){
        res.render('signup')
    }
    
    static async register(req, res){
        try {
            const {error} = validateUser(req.body)
            if(error){
                throw new Error(error.details[0].message)
            }
            const {full_name, username, email, password} = req.body
            const checkEmail = await Users.findOne({email})
            const checkUsername = await Users.findOne({username})
            if(checkEmail) throw new Error('Bu email allaqachon olingan!')
            const hashPass = await hashPassword(password)
            if(checkUsername) throw new Error('Bu username oldin olingan!')
             await Users.create({
                full_name, username, 
                email, password:hashPass
            })
            let token = generateToken({full_name, username, email})
            res.cookie('token', token)
            res.status(201).redirect('/login')
        } catch (error) {
            res.status(400).render('signup',{
                ok:false,
                err:error+''
            })
        }
    }
}