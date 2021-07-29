const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
    local : {
        email: String,
        password: String
    }
})

userSchema.methods.generateHash = (password) => {
    var resultHash = null;
     bcrypt.hashSync(password, 
        bcrypt.genSaltSync(8,   
            (errSalt , salt) => {

            }), 
        (err, hash) => {
            resultHash = hash;
        }
    );
  return resultHash
}

userSchema.methods.validatePass = (password) => {
    return bcrypt.compareSync(password, this.local.password);
}

module.exports = mongoose.model('User', userSchema)