const mongoose = require('mongoose');


const userSchema = new mongoose.Schema({
    "email": {type:String ,  required: true},
    "password": {type:String ,  required: true},
    "chatRooms": {type:[String] ,  required: false, default: []} ,
    "createdTweets": {type:[String] ,  required: false, default: []},
    "likedTweets": {type:[String] ,  required: false, default: []},
    "rtTweets": {type:[String] ,  required: false, default: []}
})

userSchema.methods.validatePass = function (sentPassword) {
    return sentPassword === this.password;
}

module.exports = mongoose.model('User', userSchema)