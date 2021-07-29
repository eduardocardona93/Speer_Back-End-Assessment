const User = require('../models/user');

module.exports = (app) => {
    app.get('/', (req,res) => {
        res.send('OK')
    });
    
    app.post('/signup', (req,res) => {
        const userEmail = req.body.email;
        const userPass = req.body.password;
        var errorsSaving = null;
        if(!userEmail){
            errorsSaving = {errorMsg : "No Email sent" , status: 500};
        }else if(!userPass){
            errorsSaving = {errorMsg : "No Password Sent" , status: 500};
        }else{
            User.findOne({'local.email': userEmail}, (err , user)=>{
                if (err) {
                    errorsSaving = {error : err , status: 500};
                }else if(user) {
                    errorsSaving = {errorMsg : "User email already registered" , status: 500};
                }else{
                    var newUser = new User();
                    newUser.local.email = userEmail;
                    newUser.local.password = userPass;
                    if(!newUser.local.password){
                        errorsSaving = {errorMsg : "Error saving the password, contact the admin" , status: 500};
                    }                    
                    newUser.save((errorSave) => {
                        errorsSaving = {error : errorSave , status: 500};
                    });                    
                }
                if(!errorsSaving){
                    res.send({userId : newUser._id, status: 200});
                }else{
                    res.status(500).send(errorsSaving);
                }
            })
        }
    });
    
    app.post('/login', (req,res) => {
        const userEmail = req.body.email;
        const userPass = req.body.password;
        if(!userEmail){
            res.status(500).send({errorMsg : "No Email sent" , status: 500});
        }else if(!userPass){
            res.status(500).send({errorMsg : "No Password Sent" , status: 500});
        }else{
            User.findOne({'local.email': userEmail}, (err , user)=>{
                if (err) {
                    res.status(500).send({error : err , status: 500});
                }else if(!user) {
                    res.status(500).send({errorMsg : "User not found" , status: 500});
                }else if(!user.validatePass(userPass)) {
                    res.status(500).send({errorMsg : "Wrong password" , status: 500});
                }else{
                    req.session.user_id = user._id;
                    res.send({userId : user._id})
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