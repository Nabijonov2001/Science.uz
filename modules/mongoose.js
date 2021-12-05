const mongoose = require('mongoose')
const { MONGO_URL } = require('../config')

module.exports = mongoose.connect(MONGO_URL)
.then(res=>console.log('Mongodb ulandi...'))
.catch(err=>console.log('Mongodbga ulanishda xatolik...'))