const express = require('express');
//initializations
const app = express();
const passport = require('passport');
require('./database');


// Settings
app.set('port', process.env.PORT || 3300);
// Middlewares
app.use(express.urlencoded({ extended: false }));


// Requests Handler
require('./requests/handler') (app)

// app.post();
// app.delete();


// Initializing
app.listen(app.get('port') , () => {
    console.log("Server on port ",app.get('port'));
});