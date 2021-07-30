const mongoose = require('mongoose');
var moment = require('moment'); // require


const messageSchema = new mongoose.Schema({
    "sender": {type:String ,  required: true},
    "timestamp": {type:String ,  default: moment().unix() },
    "text": {type:String ,  required: true},
    "visible": {type:Boolean ,  default: true}
})

const chatSchema = new mongoose.Schema({
    "user1": {type:String ,  required: true},
    "user2": {type:String ,  required: true},
    "messages": {type:[messageSchema] ,  required: false, default: []},
    "visible": {type:Boolean ,  default: true},
})
const Message = mongoose.model('Message', messageSchema);
const Chat = mongoose.model('Chat', chatSchema);
module.exports = {Message , Chat} ;