const mongoose  = require('mongoose')
const Joi = require('joi')

const PostSchema  = new mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    header:{
        type:String,
        required:true
    },
    main:{
        type:String,
        required:true
    },
    title_slug:{
        type:String,
        unique:true,
        required:true
    },
    imagePath:{
        type:String,
        required:true
    }


}, {timestamps:true})

const Posts = mongoose.model('posts', PostSchema)

function validatePost(data){
    const schema = Joi.object().keys({
        title:Joi.string().min(5).max(200).required(),
        header: Joi.string().min(100).required(),
        main: Joi.string().min(200).required(),
    })
   return schema.validate(data)
}

module.exports = {
    Posts, validatePost
}
