var express = require('express');
const { getIndex, redir, commentByUsers } = require('../controllers/indexController');
const auth = require('../middlewares/auth');
var router = express.Router();

router.get('/', redir)
router.get('/blog',  getIndex)
router.post('/blog', commentByUsers)
// router.post('/create', postIndex)
module.exports = {
  path:'/',
  router
};
