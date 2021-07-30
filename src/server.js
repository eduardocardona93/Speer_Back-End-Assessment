const express = require('express');
const session = require('express-session');
var multer = require('multer');
var upload = multer();

//initializations
const app = express();
require('./database');


// Settings
app.set('port', process.env.PORT || 3300);
// Middlewares
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(session({
    secret : 'mysecretapp',
    resave : true,
    saveUninitialized: true
}))
app.use(upload.array());

// Requests Handler
require('./requests/handler') (app);



// Initializing
app.listen(app.get('port') , () => {
    console.log("Server on port ",app.get('port'));
});

module.exports = app;