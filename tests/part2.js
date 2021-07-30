const app = require('../src/server');
const req = require('supertest');

describe('***************** SECTION  2 *****************', ()=>{
    describe('Create a Tweet ( POST /tweet)', ()=>{
        it('Responds with an unsuccessfull tweet creation, as the author user is not set', done =>{
            const body = {};
            req(app)
                .post('/tweet')
                .send(body)
                .expect('Content-Type', /json/)
                .expect({"errorMsg" : "No Author sent in the request" , status: 500}, done);
        });

        it('Responds with an unsuccessfull tweet creation, as the text message is not set', done =>{
            const body = {
                "author" :"aaaaa"
            };
            req(app)
                .post('/tweet')
                .send(body)
                .expect('Content-Type', /json/)
                .expect({"errorMsg" : "No Text sent in the request" , status: 500}, done);
        });

        it('Responds with an unsuccessfull tweet creation, as the text message is too long', done =>{
            const body = {
                "author" :"aaaaa",
                "text" : "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Minus similique maiores pariatur nihil aut reprehenderit eos corrupti omnis. Accusamus, iusto molestiae iure quam est ad in quisquam enim minima earum.Lorem, ipsum dolor sit amet consectetur adipisicing elit. Minus similique maiores pariatur nihil aut reprehenderit eos corrupti omnis. Accusamus, iusto molestiae iure quam est ad in quisquam enim minima earum."
            };
            req(app)
                .post('/tweet')
                .send(body)
                .expect('Content-Type', /json/)
                .expect({"errorMsg" : "The text exceeds the 280 character limit" , status: 500}, done);
        });

        it('Responds with an unsuccessfull tweet creation, as the author does not exists', done =>{
            const body = {
                "author" :"aaaaa",
                "text" : "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Minus similique maiores pariatur nihil aut reprehenderit eos corrupti omnis. Accusamus, iusto molestiae iure quam est ad in quisquam enim minima earum."
            };
            req(app)
                .post('/tweet')
                .send(body)
                .expect('Content-Type', /json/)
                .expect({"errorMsg" : "The author could not be found" , status: 404}, done);
        });
    });

    describe('Updates a Tweet (POST /tweet/update/:tweetId)', ()=>{
        it('Responds with an unsuccessfull tweet update, as the tweet id is not set', done =>{
            const body = {};
            req(app)
                .post('/tweet/update')
                .send(body)
                .expect('Content-Type', /json/)
                .expect({"errorMsg" : "No Tweet Id sent in the request" , status: 500}, done);
        });

        it('Responds with an unsuccessfull tweet update, as the text message is not set', done =>{
            const body = {};
            req(app)
                .post('/tweet/update/aaaaa')
                .send(body)
                .expect('Content-Type', /json/)
                .expect({"errorMsg" : "No Text sent in the request" , status: 500}, done);
        });

        it('Responds with an unsuccessfull tweet update, as the text message is too long', done =>{
            const body = {
                "text" : "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Minus similique maiores pariatur nihil aut reprehenderit eos corrupti omnis. Accusamus, iusto molestiae iure quam est ad in quisquam enim minima earum.Lorem, ipsum dolor sit amet consectetur adipisicing elit. Minus similique maiores pariatur nihil aut reprehenderit eos corrupti omnis. Accusamus, iusto molestiae iure quam est ad in quisquam enim minima earum."
            };
            req(app)
                .post('/tweet/update/aaaaa')
                .send(body)
                .expect('Content-Type', /json/)
                .expect({"errorMsg" : "The text exceeds the 280 character limit" , status: 500}, done);
        });

        it('Responds with an unsuccessfull tweet update, as the tweet to modify does not exists', done =>{
            const body = {
                "text" : "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Minus similique maiores pariatur nihil aut reprehenderit eos corrupti omnis. Accusamus, iusto molestiae iure quam est ad in quisquam enim minima earum."
            };
            req(app)
                .post('/tweet/update/aaaaa')
                .send(body)
                .expect('Content-Type', /json/)
                .expect({"errorMsg" : "The tweet could not be found" , status: 404} , done);
        });
    });

    describe('Returns a searched tweet (GET /tweet/:tweetId)', () => {
        
        it('Responds with an unsuccessfull tweet search, not tweet id sent', done =>{
            req(app)
                .get('/tweet/')
                .expect('Content-Type', /json/)
                .expect({"errorMsg" : "No Tweet Id sent in the request" , status: 500}, done);
        });
        it('Responds with a unsuccessfull tweet search, wrong id', done =>{
            req(app)
                .get('/tweet/aaaaa')
                .expect({"errorMsg" : "The tweet could not be found" , status: 404}, done);
        });
    })

    describe('Deletes a tweet (DELETE /tweet/:tweetId)', () => {
        
        it('Responds with an unsuccessfull tweet delete, not tweet id sent', done =>{
            req(app)
                .delete('/tweet/')
                .expect('Content-Type', /json/)
                .expect({"errorMsg" : "No Tweet Id sent in the request" , status: 500}, done);
        });
        it('Responds with a unsuccessfull tweet delete, wrong id', done =>{
            req(app)
                .delete('/tweet/aaaaa')
                .expect({"errorMsg" : "The tweet could not be found" , status: 404}, done);
        });
    })

    describe('Creates a chatroom (POST /chat/)', ()=>{
        it('Responds with an unsuccessfull chat creation, as the user 1 id is not set', done =>{
            const body = {};
            req(app)
                .post('/chat/')
                .send(body)
                .expect('Content-Type', /json/)
                .expect({"errorMsg" : "No User 1 sent in the request" , status: 500}, done);
        });
        it('Responds with an unsuccessfull chat creation, as the user 2 id is not set', done =>{
            const body = {
                "user1": "aaaaaaa",
            };
            req(app)
                .post('/chat/')
                .send(body)
                .expect('Content-Type', /json/)
                .expect({"errorMsg" : "No User 2 sent in the request" , status: 500}, done);
        });
        it('Responds with an unsuccessfull chat creation, as the user 1 id does not exists', done =>{
            const body = {
                "user1": "aaaaaaa",
                "user2": "bbbbbbb"
            };
            req(app)
                .post('/chat/')
                .send(body)
                .expect('Content-Type', /json/)
                .expect({ errorMsg: 'The user 1 does not exists', status: 404 }, done);
        });
    
    });

    describe('Creates a message in a chatroom (POST /message/)', ()=>{
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

    describe('Gets a chatroom (GET /chat/)', () => {
        it('Responds with an unsuccessfull chat search, not tweet id sent', done =>{
            req(app)
                .get('/chat/')
                .expect('Content-Type', /json/)
                .expect({"errorMsg" : "No Chat Id sent in the request" , status: 500}, done);
        });
        it('Responds with a unsuccessfull chat search, wrong id', done =>{
            req(app)
                .get('/chat/aaaaa')
                .expect({"errorMsg" : "The chat could not be found" , status: 404}, done);
        });
    });
});