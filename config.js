require('dotenv').config();
module.exports = {
    PORT : process.env.PORT,
    SECRET_WORD : process.env.SECRET_WORD,
    MONGO_URL : process.env.MONGO_URL
}