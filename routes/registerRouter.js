const express = require('express');
const { getRegister,register } = require('../controllers/registerController');
const router = express.Router();

router.get('/register', getRegister)
router.post('/register', register)
module.exports = {
  path:'/',
  router
};