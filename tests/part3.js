const app = require('../src/server');
const req = require('supertest');

describe('POST /message/', ()=>{
    it('Responds with an unsuccessfull message creation, as the chat id was not sent', done =>{
        const body = {};
        req(app)
            .post('/message/')
            .send(body)
            .expect('Content-Type', /json/)
            .expect({"errorMsg" : "No Chat Id sent in the request" , status: 500}, done);
    });
    it('Responds with an unsuccessfull message creation, as the sender id was not sent', done =>{
        const body = {
            "chatId": "aaaaaaa",
        };
        req(app)
            .post('/message/')
            .send(body)
            .expect('Content-Type', /json/)
            .expect({"errorMsg" : "No Sender Id sent in the request" , status: 500}, done);
    });
    it('Responds with an unsuccessfull message creation, as the message was not sent', done =>{
        const body = {
            "chatId": "aaaaaaa",
            "senderId": "bbbbbbbb",
        };
        req(app)
            .post('/message/')
            .send(body)
            .expect('Content-Type', /json/)
            .expect({"errorMsg" : "No Message sent in the request" , status: 500}, done);
    });
    it('Responds with an unsuccessfull message creation, as the chat does not exists', done =>{
        const body = {
            "chatId": "aaaaaaa",
            "senderId": "bbbbbbbb",
            "message" : "wrong id"
        };
        req(app)
            .post('/message/')
            .send(body)
            .expect('Content-Type', /json/)
            .expect({"errorMsg" : "The chat could not be found" , status: 404}, done);
    });
   
});