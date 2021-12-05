const {Posts} = require('../models/postModel')

module.exports = class SinglePostController{
    static async getSinglePost(req, res){
        const slug = req.params.slug
        let post = await Posts.findOne({
            title_slug:slug
        })
        if(!post){
            res.status(400).json({
                ok:false,
                message:'Bunday post mavjud emas!',
            })
        }
        res.status(200).render('single_post', {
            ok:true,
            message:'Single Post',
            post
        })
    }
}