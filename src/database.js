const mongoose = require('mongoose');
const User = require('./models/user');
mongoose.connect('mongodb://localhost/speer_db', {
    useCreateIndex: true,
    useNewUrlParser: true,
    useFindAndModify: false,
    useUnifiedTopology: true
}).then(db => 
    {
        console.log('DB is connected');

        var adminEmail = "admin-speer@gmail.com";
        User.findOne({'email': adminEmail}, (err, user)=>{
            if (!err && ! user) {
                var newUser = new User();
                newUser.email = adminEmail;
                newUser.password = "YWRtaW4tc3BlZXI=";
                newUser.save((errorSave) => {});
            }
        });
        var qaEmail = "qa-speer@gmail.com";
        User.findOne({'email': qaEmail}, (err, user)=>{
            if (!err && ! user) {
                var newUser = new User();
                newUser.email = qaEmail;
                newUser.password = "YWRtaW4tc3BlZXI=";
                newUser.save((errorSave) => {});
            }
        });
    }
    )
.catch(error => console.error(error));