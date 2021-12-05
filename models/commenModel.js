const mongoose = require('mongoose')


const commentSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    
    email:{
        type:String,
        required:true
    },
    message:{
        type:String,
        required:true
    }
})

const comments = mongoose.model('comment', commentSchema)
module.exports = comments