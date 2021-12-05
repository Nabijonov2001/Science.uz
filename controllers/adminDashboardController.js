const { default: slugify } = require("slugify")
const path = require('path')
const { Posts, validatePost } = require("../models/postModel")
const commments = require('../models/commenModel')
module.exports  = class DashboardController{
    
    static async dashboardGet(req, res){
        let { c_page} = req.query
        c_page = c_page || 1
        let p_page = 6
        const posts = await Posts.find().skip(p_page * (c_page-1)).limit(p_page).sort({createdAt:-1})
        res.status(200).render('dashboard',{
            ok:true,
            message:'postlar',
            posts
        })
    }
     
    static async getComments(req, res){
        let messages = await commments.find()
        res.render('comments', {
            messages
        })
    }

    static async dashboarGETSinglePost(req, res){
        const slug = req.params.slug
        let post = await Posts.findOne({
            title_slug:slug
        })
        if(!post){
            res.status(400).redirect('/dashboard')
        }
        res.status(200).render('dashboardSinglePost', {
            ok:true,
            message:'Single Post',
            post
        })
    }
    
    static dashboardPostGet(req, res){
        res.render('create')
    }
    static async dashboardPost(req, res){
      
        try {
            console.log(req.files)
            const data = {
                title:req.body.title,
                header:req.body.snippet,
                main:req.body.bodytext
            }
            const {error} = validatePost(data)
            if(error){
                throw new Error(error.details[0].message)
            }
            if(!req.files|| req.files.length===0){
                throw new Error('Rasm yuklanishi shart!')
            }
            const image = req.files.image
            const imageType = image.mimetype.split('/')[0]
            const imageName = image.name.split('.')[0]
            const imageFormat = image.mimetype.split('/')[1]
            const imagePath = path.join('public', 'images', `${imageName}- ${image.md5}.${imageFormat}`)
            if(imageType==='image'||imageType==='vector'){
                await image.mv(imagePath)
            }
            const {title, header, main} = data
            const title_slug  = slugify(title, {replacement:'-', lower:true, trim:true})
            const check = await Posts.findOne({title_slug})
            if(check){
                throw new Error('Bunday sarlavhali post mavjud...')
            }
            let post = await Posts.create({
                title, header,
                main, imagePath, 
                title_slug
            })
            res.status(201).redirect('/dashboard')
            
        } catch (error) {
            res.status(404).json({
                ok:false,
                message:error+''
            })
            
        }
        
    }

    static async dashboardUpdateGet(req, res){
        try {
            const slug = req.params.slug
            let post = await Posts.findOne({title_slug:slug})
            if(!post) throw new Error('Bunday post mavjud emas!')
            res.status(201).json({
                ok:true,
                message:'Post tahrirlandi'
            })
            
        } catch (error) {
            res.status(404).json({
                ok:false,
                message:error+''
            })
        }
    }

    static async dashboardUpdate(req, res){
        try {
            console.log(req.params.slug)
            const slug = req.params.slug
            let check = await Posts.findOne({title_slug:slug})
            if(!check) throw new Error('Bunday post mavjud emasda!')
            const {error} = validatePost(req.body)
            if(error){
                throw new Error(error.details[0].message)
            }
            if(!req.files|| req.files.length===0){
                throw new Error('Rasm yuklanishi shart!')
            }
            const image = req.files.image
            const imageType = image.mimetype.split('/')[0]
            const imageName = image.name.split('.')[0]
            const imageFormat = image.mimetype.split('/')[1]
            const imagePath = path.join('public', 'images', `${imageName}- ${image.md5}.${imageFormat}`)
            console.log(imagePath)
            if(imageType==='image'||imageType==='vector'){
                await image.mv(imagePath)
            }
            const {title, header, main} = req.body
            const title_slug  = slugify(title, {replacement:'-', lower:true, trim:true})
             await Posts.updateOne({title_slug:req.params.slug},
                {
                title, header,
                main, imagePath, 
                title_slug
                })
            res.status(201).redirect('/dashboard')
            
        } catch (error) {
            res.status(404).json({
                ok:false,
                message:error+''
            })
        }
    }


    static async dashboardDelete(req, res){
        console.log(req.params)
        try { 
            const title_slug = req.params.slug
            const check = await Posts.findOne({title_slug})
            if(!check){
                throw new Error('Bunday sarlavhali post mavjud emas...')
            }
            await Posts.deleteOne({title_slug:req.params.slug})
            res.status(201).json({
                ok:true,
                message:'Post o`chirildi.'
            })
            
        } catch (error) {
            res.status(404).json({
                ok:false,
                message:error+''
            })
        }
    }
}