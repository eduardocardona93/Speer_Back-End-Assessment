const expect = require('chai').expect;
const req = require('supertest');
const app = require('../src/server');


describe('GET /login', ()=>{
    it('Responds with a successfull login for the admin user', done =>{
        req(app)
            .get('/login?email=admin-speer@gmail.com&password=YWRtaW4tc3BlZXI=')
            .expect('Content-Type', /json/)
            .expect(200, done);
    });

    it('Responds with a unsuccessfull login for the admin user, wrong password', done =>{
        req(app)
            .get('/login?email=admin-speer@gmail.com&password=a1b2c3d4')
            .expect(500, done);
    });

    it('Responds with a unsuccessfull login sending no email', done =>{
        req(app)
            .get('/login?password=YWRtaW4tc3BlZXI')
            .expect(500, done);
    });

    it('Responds with a unsuccessfull login sending no password', done =>{
        req(app)
            .get('/login?email=admin-speer@gmail.com')
            .expect(500, done);
    });

    it('Responds with a unsuccessfull login sending wrong email', done =>{
        req(app)
            .get('/login?email=speer&password=a1b2c3d4')
            .expect(404, done);
    });
})



describe('POST /signup', ()=>{


    it('Responds with a unsuccessfull registration for the admin user, as the email is already taken', done =>{
        const body = {  
            "email" : "admin-speer@gmail.com",
            "password" : "YWRtaW4tc3BlZXI="
        }
        req(app)
            .post('/signup')
            .send(body)
            .expect(400, done);
    });

    it('Responds with a unsuccessfull registration, as the email is not send', done =>{
        req(app)
            .post('/signup')
            .expect(500, done);
    });
    it('Responds with a unsuccessfull registration, as the password is not send', done => {
        req(app)
            .post('/signup')
            .send({"email" : "admin-speer@gmail.com"})
            .expect(500 ,done)
    });

})


