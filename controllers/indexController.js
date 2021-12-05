const { default: slugify } = require("slugify")
const path = require('path')
const { Posts, validatePost } = require("../models/postModel")
const { commentValidation } = require("../validations/commentValidation")
const comments = require("../models/commenModel")
module.exports  = class IndexController{
    
    static redir(req, res){
        res.redirect('/blog')
    }

    static async getIndex(req, res){
        console.log(req.query)
        let { c_page} = req.query
        c_page = c_page || 1
        let p_page = 6
        const posts = await Posts.find().skip(p_page * (c_page-1)).limit(p_page).sort({createdAt:-1})
        res.status(200).render('index',{
            posts
        })
    }

    static async commentByUsers(req, res){
        try {
            const {error} = commentValidation(req.body)
            if(error) throw new Error(error.details[0].message)
            await comments.create({
                name:req.body.name,
                email: req.body.email,
                message:req.body.message
            })
            res.status(201).redirect('/blog')
        } catch (error) {
            res.status(400).json({
                ok:false,
                message:error +""
            })
        }
    }
    
    // static async postIndex(req, res){
    //     try {
    //         const {error} = validatePost(req.body)
    //         if(error){
    //             throw new Error(error.details[0].message)
    //         }
    //         if(!req.files|| req.files.length===0){
    //             throw new Error('Rasm yuklanishi shart!')
    //         }
    //         const image = req.files.image
    //         const imageType = image.mimetype.split('/')[0]
    //         const imageName = image.name.split('.')[0]
    //         const imageFormat = image.mimetype.split('/')[1]
    //         const imagePath = path.join(__dirname, '..', 'public', 'images', `${imageName}- ${Date.now()}.${imageFormat}`)
    //         if(imageType==='image'||imageType==='vector'){
    //             await image.mv(imagePath)
    //         }
    //         const {title, header, main} = req.body
    //         const title_slug  = slugify(title, {replacement:'-', lower:true, trim:true})
    //         const check = await Posts.findOne({title_slug})
    //         if(check){
    //             throw new Error('Bunday sarlavhali post mavjud...')
    //         }
    //         let post = await Posts.create({
    //             title, header,
    //             main, imagePath, 
    //             title_slug
    //         })
    //         res.status(201).json({
    //             ok:true,
    //             message:'Post qo`shildi',
    //             post
    //         })
            
    //     } catch (error) {
    //         res.status(404).json({
    //             ok:false,
    //             message:error+''
    //         })
    //     }
        
    // }
}