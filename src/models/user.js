const mongoose = require('mongoose');

// User schema definition
const userSchema = new mongoose.Schema({
    "email": {type:String ,  required: true},
    "password": {type:String ,  required: true},
    "chatRooms": {type:[String] ,  required: false, default: []} ,
    "createdTweets": {type:[String] ,  required: false, default: []},
    "likedTweets": {type:[String] ,  required: false, default: []},
    "rtTweets": {type:[String] ,  required: false, default: []}
})
// Method for validate the password
userSchema.methods.validatePass = function (sentPassword) {
    return sentPassword === this.password;
}
// Create the user model into mongo and exports the model for usage of other modules
module.exports = mongoose.model('User', userSchema)