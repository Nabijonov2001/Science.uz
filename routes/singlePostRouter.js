const { getSinglePost } = require('../controllers/singlePostController')
const auth = require('../middlewares/auth')

const router = require('express').Router()

router.get('/blog/:slug', auth, getSinglePost)
module.exports = {
    path:'/',
    router
}