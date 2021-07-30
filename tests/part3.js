const app = require('../src/server');
const req = require('supertest');

describe('***************** SECTION  3 *****************', ()=>{

    describe('Changes a like from an user to a tweet (POST /likeChange/)', ()=>{
        it('Responds with an unsuccessfull like change, as the tweet id was not sent', done =>{
            const body = {};
            req(app)
                .post('/likeChange/')
                .send(body)
                .expect('Content-Type', /json/)
                .expect({"errorMsg" : "No Tweet Id sent in the request" , status: 500}, done);
        });
        it('Responds with an unsuccessfull like change, as the sender id was not sent', done =>{
            const body = {
                "tweetId": "aaaaaaa",
            };
            req(app)
                .post('/likeChange/')
                .send(body)
                .expect('Content-Type', /json/)
                .expect({"errorMsg" : "No Sender Id sent in the request" , status: 500}, done);
        });
        it('Responds with an unsuccessfull like change, as the tweet does not exist', done =>{
            const body = {
                "tweetId": "aaaaaaa",
                "senderId": "bbbbbbbb",
            };
            req(app)
                .post('/likeChange/')
                .send(body)
                .expect('Content-Type', /json/)
                .expect({"errorMsg" : "The tweet could not be found" , status: 404}, done);
        });
    
    });

    describe('Changes a rt from an user to a tweet (POST /retweetChange/)', ()=>{
        it('Responds with an unsuccessfull RT change, as the tweet id was not sent', done =>{
            const body = {};
            req(app)
                .post('/retweetChange/')
                .send(body)
                .expect('Content-Type', /json/)
                .expect({"errorMsg" : "No Tweet Id sent in the request" , status: 500}, done);
        });
        it('Responds with an unsuccessfull RT change, as the sender id was not sent', done =>{
            const body = {
                "tweetId": "aaaaaaa",
            };
            req(app)
                .post('/retweetChange/')
                .send(body)
                .expect('Content-Type', /json/)
                .expect({"errorMsg" : "No Sender Id sent in the request" , status: 500}, done);
        });
        it('Responds with an unsuccessfull RT change, as the tweet does not exist', done =>{
            const body = {
                "tweetId": "aaaaaaa",
                "senderId": "bbbbbbbb",
            };
            req(app)
                .post('/retweetChange/')
                .send(body)
                .expect('Content-Type', /json/)
                .expect({"errorMsg" : "The tweet could not be found" , status: 404}, done);
        });
    });
});