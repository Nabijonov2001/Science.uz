const Joi = require('joi')

 module.exports = class Validation{
    static loginValidation(data){
        return Joi.object().keys({
            username:Joi.string().min(5).max(50).required(),
            password:Joi.string().min(5).max(20).required()
        }).validate(data)
    }
}



