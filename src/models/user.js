const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    local : {
        email: String,
        password: String
    }
})

userSchema.methods.validatePass = function (sentPassword) {
    return sentPassword === this.local.password;
}

module.exports = mongoose.model('User', userSchema)