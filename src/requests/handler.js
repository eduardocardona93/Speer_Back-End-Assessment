const User = require('../models/user');
const Tweet = require('../models/tweet');
const Chat = require('../models/chat').Chat;
const Message = require('../models/chat').Message;

module.exports = (app) => {
        app.get('/', (req,res) => {
            res.send('OK');
        });
    // ************************* PART ONE *************************
    app.post('/signup', (req,res) => {
        const userEmail = req.body.email;
        const userPass = req.body.password;
        var errorsSaving = null;
        if(!userEmail){
            res.status(500).json({"errorMsg" : "No Email sent" , status: 500});
        }else if(!userPass){
            res.status(500).json({"errorMsg" : "No Password Sent" , status: 500});
        }else{
            User.findOne({'email': userEmail}, (err , user)=>{
                if (err) {
                    errorsSaving = {error : err , status: 500};
                    
                }else if(user) {
                    errorsSaving = {"errorMsg" : "User email already registered" , status: 400};
                }else{
                    var newUser = new User();
                    newUser.email = userEmail;
                    newUser.password = userPass;                   
                    newUser.save( (errorSave) => {
                        errorsSaving = {error : errorSave , status: 500};
                    });                    
                }
                if(errorsSaving) {
                    res.status(errorsSaving.status).json(errorsSaving);
                }else{
                    res.status(201).json({"userId" : newUser._id, "message": "User Created Successfully", "status": 201});
                }
            })
        }
        

    });
    app.get('/login', (req,res) => {
        const userEmail = req.query.email;
        const userPass = req.query.password;
        if(!userEmail){
            res.status(500).json({"errorMsg" : "No Email sent in the request" , status: 500});
        }else if(!userPass){
            res.status(500).json({"errorMsg" : "No Password sent in the request" , status: 500});
        }else{
            User.findOne({'email': userEmail}, (err , user)=>{
                if (err) {
                    res.status(500).json({error : err , status: 500});
                }else if(!user) {
                    res.status(404).json({"errorMsg" : "User not found" , status: 404});
                }else if(!user.validatePass(userPass)) {
                    res.status(500).json({"errorMsg" : "Wrong password" , status: 500});
                }else{
                    res.json({"userId" : user._id, "message": "User Logged Successfully",  "status": 200})
                }
            })
        }
    });
    
    // ************************* PART TWO *************************
    // ---------- TWEETS ----------

    // CREATE
    app.post('/tweet', (req,res) => {
        const authorTw = req.body.author;
        const previousTweetTw = req.body.previousTweet;
        const isReplyTw = req.body.isReply;
        const isThreadTw = req.body.isThread;
        const textTw = req.body.text;

        if(!authorTw){
            res.status(500).json({"errorMsg" : "No Author sent in the request" , status: 500});
        }else if(!textTw){
            res.status(500).json({"errorMsg" : "No Text sent in the request" , status: 500});
        }else if(textTw.length > 280){
            res.status(500).json({"errorMsg" : "The text exceeds the 280 character limit" , status: 500});
        }else{
            User.findOne({'_id': authorTw}, (err , author)=>{
                
                if(!author){
                    res.status(404).json({"errorMsg" : "The author could not be found" , status: 404});
                }else{
                    var newTweet = new Tweet();
                    newTweet.author = authorTw;
                    newTweet.previousTweet = previousTweetTw ? previousTweetTw : previousTweetTw;
                    newTweet.isReply = isReplyTw ? isReplyTw : false;
                    newTweet.isThread = isThreadTw ? isThreadTw : false;
                    newTweet.text = textTw;
                    
                    newTweet.save( (errorSaveTw) => {
                        if(errorSaveTw) {
                            res.status(500).json(errorSaveTw);
                        }else{
                            author.createdTweets.push(newTweet._id);
                            author.save((errorSaveUser) => {
                                if(errorSaveUser) {
                                    res.status(500).json(errorSaveUser);
                                }else{
                                    res.status(201).json({"tweetId" : newTweet._id, "message": "Tweet Saved Successfully",  "status": 201});
                                }
                            })
                        }
                    });        
                }
            }); 
        }
        

    });
    // UPDATE
    app.post('/tweet/update/', (req,res) => {
        res.status(500).json({"errorMsg" : "No Tweet Id sent in the request" , status: 500});
    });
    app.post('/tweet/update/:tweetId', (req,res) => {
        const tweetId = req.params.tweetId;
        const textTw = req.body.text;
        if(!textTw){
            res.status(500).json({"errorMsg" : "No Text sent in the request" , status: 500});
        }else if(textTw.length > 280){
            res.status(500).json({"errorMsg" : "The text exceeds the 280 character limit" , status: 500});
        }else{
            Tweet.findOne({'_id': tweetId}, (err , tweet)=>{
                
                if(!tweet){
                    res.status(404).json({"errorMsg" : "The tweet could not be found" , status: 404});
                }else{
                    tweet.text = textTw;                  
                    tweet.isEdited = true;                  
                    tweet.save( (errorSaveTw) => {
                        if(errorSaveTw) {
                            res.status(500).json(errorSaveTw);
                        }else{
                            res.status(200).json({ "message": "Tweet Edit Successfully", "status": 200});
                        }
                    });        
                }
            }); 
        }
    });
    // READ
    app.get('/tweet/', (req,res) => {
        res.status(500).json({"errorMsg" : "No Tweet Id sent in the request" , status: 500});
    })
    app.get('/tweet/:tweetId', (req,res) => {
        const tweetId = req.params.tweetId;
        Tweet.findOne({'_id': tweetId}, (err , tweet)=>{
            if(!tweet) {
                res.status(404).json({"errorMsg" : "The tweet could not be found" , status: 404});
            }else {
                res.status(200).json({"tweet": tweet, "status": 200});  
            }
        }); 
    });
    // DELETE
    app.delete('/tweet/', (req,res) => {
        res.status(500).json({"errorMsg" : "No Tweet Id sent in the request" , status: 500});
    });
    app.delete('/tweet/:tweetId', (req,res) => {
        const tweetId = req.params.tweetId;
        Tweet.findOne({'_id': tweetId}, (err , tweet)=>{
            if(!tweet) {
                res.status(500).json({"errorMsg" : "The tweet could not be found" , status: 404});
            }else {
                tweet.visible = false;                  
                tweet.save( (errorSaveTw) => {
                    if(errorSaveTw) {
                        res.status(500).json(errorSaveTw);
                    }else{
                        res.status(200).json({ "message": "Tweet Deleted Successfully", "status": 200});
                    }
                });        
            }
        }); 
    });

    // ---------- CHAT ----------
    app.post('/chat/', (req,res) => {
        const chatUser1 = req.body.user1;
        const chatUser2 = req.body.user2;
        if(!chatUser1){
            res.status(500).json({"errorMsg" : "No User 1 sent in the request" , status: 500});
        }else if(!chatUser2){
            res.status(500).json({"errorMsg" : "No User 2 sent in the request" , status: 500});
        }else{
            User.findOne({'_id': chatUser1 }, (err , userObj1)=>{
                if(!userObj1){
                    res.status(404).json({"errorMsg" : "The user 1 does not exists" , status: 404});
                }else{
                    User.findOne({'_id': chatUser2 }, (err , userObj2)=>{
                        if(!userObj2){
                            res.status(404).json({"errorMsg" : "The user 2 does not exists" , status: 404});
                        }else{
                            Chat.findOne({'user1': chatUser1, 'user2': chatUser2}, (err , chatSearch1)=>{
                                if(chatSearch1){
                                    res.status(500).json({"errorMsg" : "The chat already exists" , status: 500});
                                }else{
                                    Chat.findOne({'user1': chatUser2, 'user2': chatUser1 }, (err , chatSearch2)=>{
                                        if(chatSearch2) {
                                            res.status(500).json({"errorMsg" : "The chat already exists" , status: 500});
                                        }else {
                                            var newChat = new Chat();
                                            newChat.user1 = chatUser1;
                                            newChat.user2 = chatUser2;
                                            newChat.save( (errorSaveChat) => {
                                                if(errorSaveChat) {
                                                    res.status(500).json(errorSaveChat);
                                                }else{
                                                    userObj1.chatRooms.push(newChat._id);
                                                    userObj1.save((errorSaveUser1) => {
                                                        if(errorSaveUser1) {
                                                            res.status(500).json(errorSaveUser1);
                                                        }else{
                                                            userObj2.chatRooms.push(newChat._id);
                                                            userObj2.save((errorSaveUser2) => {
                                                                if(errorSaveUser2) {
                                                                    res.status(500).json(errorSaveUser2);
                                                                }else{
                                                                    res.status(201).json({"chatId" : newChat._id, "message": "Chat created Successfully",  "status": 201});
                                                                }
                                                            });
                                                        }
                                                    })
                                                }
                                            });   
                                        }
                                    });      
                                }
                            }); 
                        }
                    });
                }
            })
        }
    });
    app.post('/message/', (req,res) => {
        const chatId = req.body.chatId;
        const senderId = req.body.senderId;
        const message = req.body.message;
        if(!chatId){
            res.status(500).json({"errorMsg" : "No Chat Id sent in the request" , status: 500});
        }else if(!senderId){
            res.status(500).json({"errorMsg" : "No Sender Id sent in the request" , status: 500});
        }else if(!message){
            res.status(500).json({"errorMsg" : "No Message sent in the request" , status: 500});
        }else{
            Chat.findOne({'_id': chatId}, (err , chat) => {
                if(!chat) {
                    res.status(404).json({"errorMsg" : "The chat could not be found" , status: 404});
                }else {
                    const msgObj = new Message()
                    msgObj.sender = senderId;
                    msgObj.text = message;
                    chat.messages.push(msgObj);
                    chat.save((errorSave) => {
                        if (errorSave) {
                            res.status(500).json(errorSave);
                        } else {
                            res.status(201).json({"chat": chat, "message": "Message sent successfully", "status": 201});  
                        }
                    })
                    
                }
            }); 
        }
    })
    app.get('/chat/', (req,res) => {
        res.status(500).json({"errorMsg" : "No Chat Id sent in the request" , status: 500});
    })
    app.get('/chat/:chatId', (req,res) => {
        const chatId = req.params.chatId;
        Chat.findOne({'_id': chatId}, (err , chat) => {
            if(!chat) {
                res.status(500).json({"errorMsg" : "The chat could not be found" , status: 404});
            }else {
                res.status(200).json({"chat": chat, "status": 200});  
            }
        }); 
    })



    // ************************* PART THREE *************************
    app.post('/likeChange/:tweetId', (req,res) => {

    });
    app.post('/retweetChange/:tweetId', (req,res) => {

    });

    
};