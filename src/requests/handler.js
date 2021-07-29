const User = require('../models/user');

module.exports = (app) => {
    app.get('/', (req,res) => {
        res.send('OK')
    });
    
    app.post('/signup', (req,res) => {
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
                }else if(user) {
                    res.status(500).send({errorMsg : "User email already registered" , status: 500});
                }else{
                    var newUser = new User();
                    newUser.local.email = userEmail;
                    newUser.local.password = newUser.generateHash(userPass);
                    if(!newUser.local.password){
                        res.status(500).send({errorMsg : "Error saving the password, contact the admin" , status: 500});
                    }
                    newUser.save((errorSave) => {
                        res.status(500).send({error : errorSaveerr , status: 500});
                        return null;
                    })
                    res.send('OK')
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
                }if(!user.validatePass(password)) {
                    res.status(500).send({errorMsg : "Wrong password" , status: 500});
                }else{
        
                    res.send('OK')
                }
            })
        }
    });
    
    

};