const bcrypt = require('bcrypt')

module.exports = class Password{
    static async hashPassword(pass){
        const salt = await bcrypt.genSalt(10)
        const hash = await bcrypt.hash(pass, salt)
        return hash
    }

    static async comparePassword(password, hashedPassword){
        return await bcrypt.compare(password, hashedPassword)
    }
}

