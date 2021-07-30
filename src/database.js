const mongoose = require('mongoose');
const User = require('./models/user');
mongoose.connect('mongodb://localhost/speer_db', {
    useCreateIndex: true,
    useNewUrlParser: true,
    useFindAndModify: false,
    useUnifiedTopology: true
}).then(db => 
    {
        var userEmail = "admin-speer@gmail.com";
        User.findOne({'email': userEmail}, (err, user)=>{
            if (!err && ! user) {
                var newUser = new User();
                newUser.email = userEmail;
                newUser.password = "YWRtaW4tc3BlZXI=";
                newUser.save((errorSave) => {});
            }
            console.log('DB is connected');
        });
    }
    )
.catch(error => console.error(error));