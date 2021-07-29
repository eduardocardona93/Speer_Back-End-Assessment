const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
    local : {
        email: String,
        password: String
    }
})

userSchema.methods.generateHash = (password) => {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
}

userSchema.methods.validatePass = (password) => {
    return bcrypt.compareSync(password, this.local.password);
}

module.exports = mongoose.model('User', userSchema)