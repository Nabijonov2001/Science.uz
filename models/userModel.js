const mongoose  = require('mongoose')
const Joi = require('joi')

const UserSchema  = new mongoose.Schema({
    full_name:{
        type:String,
        required:true
    },
    username:{
        type:String,
        required:true
    },
    email:{
        type:String,
        unique:true,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    is_verified:{
        type:Boolean,
        required:true,
        default:false
    },
    role:{
        type:String,
        required:true,
        default : 'user'
    }


}, {timestamps:true})

const Users = mongoose.model('users', UserSchema)

function validateUser(data){
    const schema = Joi.object().keys({
        full_name:Joi.string().min(5).max(50).required(),
        username: Joi.string().min(5).max(30).required(),
        email: Joi.string().min(5).max(50).email().required(),
        password: Joi.string().min(5).max(20).required()
    })
   return schema.validate(data)
}

module.exports = {
    Users, validateUser
}
