const mongoose = require('mongoose');
var moment = require('moment');

const tweetSchema = new mongoose.Schema({
    "author": {type:String ,  required: true},
    "previousTweet": {type:String ,  required: false, default: null},
    "isEdited": {type:Boolean ,  default: false},
    "isReply": {type:Boolean ,  default: false},
    "isThreadTw": {type:Boolean ,  default: false},
    "text": {type: String ,  required: true},
    "timestamp": {type: String ,  required: true, default: moment().unix()},
    "retweets": {type: Number ,  default: 0},
    "likes" : {type: Number ,  default: 0},
    "visible": {type:Boolean ,  default: true}
})

tweetSchema.methods.validateLength = function () {
    return this.text.length > 280;
}

module.exports = mongoose.model('Tweet', tweetSchema);