module.exports = (app) => {
    app.get('/', (req,res) => {
        res.send('OK')
    });
    
    app.post('/login', (req,res) => {
        res.send('OK')
    });
    
    app.post('/signup', (req,res) => {
        res.send('OK')
    });
};