const express = require('express');
const { loginPost, loginGet } = require('../controllers/loginController');
const router = express.Router();

router.get('/login', loginGet)
router.post('/login', loginPost)
module.exports = {
  path:'/',
  router
};