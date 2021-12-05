const Joi = require('joi')

 module.exports = class ValidationComment{
    static commentValidation(data){
        return Joi.object().keys({
            name:Joi.string().min(5).max(50).required(),
            email:Joi.string().min(5).max(20).email().required(),
            message:Joi.string().min(5).max(1000).required()
        }).validate(data)
    }
}