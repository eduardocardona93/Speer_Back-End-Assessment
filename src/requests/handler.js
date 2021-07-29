const User = require('../models/user');

module.exports = (app) => {
    app.get('/', (req,res) => {
        res.send('OK');
    });
    
    app.post('/signup', (req,res) => {
        const userEmail = req.body.email;
        const userPass = req.body.password;
        var errorsSaving = null;
        if(!userEmail){
            res.status(500).json({errorMsg : "No Email sent" , status: 500});
        }else if(!userPass){
            res.status(500).json({errorMsg : "No Password Sent" , status: 500});
        }else{
            User.findOne({'local.email': userEmail}, (err , user)=>{
                if (err) {
                    errorsSaving = {error : err , status: 500};
                    
                }else if(user) {
                    errorsSaving = {errorMsg : "User email already registered" , status: 400};
                }else{
                    var newUser = new User();
                    newUser.local.ema
                    il = userEmail;
                    newUser.local.password = userPass;                   
                    newUser.save( (errorSave) => {
                        errorsSaving = {error : errorSave , status: 500};
                    });                    
                }
                if(errorsSaving) {
                    res.status(errorsSaving.status).json(errorsSaving);
                }else{
                    res.status(201).json({userId : newUser._id, status: 201});
                }
            })
        }
        

    });
    
    app.get('/login', (req,res) => {
        const userEmail = req.query.email;
        const userPass = req.query.password;
        if(!userEmail){
            res.status(500).json({errorMsg : "No Email sent in the request" , status: 500});
        }else if(!userPass){
            res.status(500).json({errorMsg : "No Password sent in the request" , status: 500});
        }else{
            User.findOne({'local.email': userEmail}, (err , user)=>{
                if (err) {
                    res.status(500).json({error : err , status: 500});
                }else if(!user) {
                    res.status(404).json({errorMsg : "User not found" , status: 404});
                }else if(!user.validatePass(userPass)) {
                    res.status(500).json({errorMsg : "Wrong password" , status: 500});
                }else{
                    res.json({userId : user._id})
                }
            })
        }
    });
    

    app.post('/user/chat', (req,res) => {});

    app.post('/tweet/create', (req,res) => {});
    app.post('/tweet/update', (req,res) => {});
    app.post('/tweet/delete', (req,res) => {});
    app.post('/tweet/create', (req,res) => {});
    app.post('/tweet/likeChange', (req,res) => {});
    app.post('/tweet/retweet', (req,res) => {});
};