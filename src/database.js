const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/speer_db', {
    useCreateIndex: true,
    useNewUrlParser: true,
    useFindAndModify: false,
    useUnifiedTopology: true
}).then(db => console.log('DB is connected'))
.catch(error => console.error(error));