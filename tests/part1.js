const app = require('../src/server');
const req = require('supertest');

describe('***************** SECTION  1 *****************', ()=>{
    describe('Gets an user for login (GET /login)', ()=>{
        it('Responds with a unsuccessfull login sending no email', done =>{
            req(app)
                .get('/login?password=YWRtaW4tc3BlZXI')
                .expect('Content-Type', /json/)
                .expect({"errorMsg" : "No Email sent in the request" , status: 500}, done);
        });

        it('Responds with a unsuccessfull login sending no password', done =>{
            req(app)
                .get('/login?email=admin-speer@gmail.com')
                .expect('Content-Type', /json/)
                .expect({"errorMsg" : "No Password sent in the request" , status: 500}, done);
        });

        it('Responds with a unsuccessfull login sending wrong email', done =>{
            req(app)
                .get('/login?email=speer&password=a1b2c3d4')
                .expect('Content-Type', /json/)
                .expect({"errorMsg" : "User not found" , status: 404}, done);
        });
        it('Responds with a unsuccessfull login for the admin user, wrong password', done =>{
            req(app)
                .get('/login?email=admin-speer@gmail.com&password=a1b2c3d4')
                .expect('Content-Type', /json/)
                .expect({"errorMsg" : "Wrong password" , status: 500}, done);
        });
        it('Responds with a successfull login for the admin user', done =>{
            req(app)
                .get('/login?email=admin-speer@gmail.com&password=YWRtaW4tc3BlZXI=')
                .expect('Content-Type', /json/)
                .expect(200, done);
        });
    })

    describe('Creates an user (POST /signup)', ()=>{    
        it('Responds with a unsuccessfull registration, as the email is not send', done =>{
            req(app)
                .post('/signup')
                .expect({"errorMsg" : "No Email sent" , status: 500}, done);
        });    
        it('Responds with a unsuccessfull registration, as the password is not send', done => {
            req(app)
                .post('/signup')
                .send({"email" : "admin-speer@gmail.com"})
                .expect('Content-Type', /json/)
                .expect({"errorMsg" : "No Password Sent" , status: 500} ,done)
        });
        it('Responds with a unsuccessfull registration for the admin user, as the email is already taken', done =>{
            const body = {  
                "email" : "admin-speer@gmail.com",
                "password" : "YWRtaW4tc3BlZXI="
            }
            req(app)
                .post('/signup')
                .send(body)
                .expect('Content-Type', /json/)
                .expect({"errorMsg" : "User email already registered" , status: 400}, done);
        });
    });
});


