let request = require('request');
let config = require('../config');
let http = require('http');
let jasmine = require('jasmine');

describe("In User routes, the route", function() { 

    it('[GET /user] should be ON', function(done) {
    
        request
        .get(config.HOST+'/user')
        .on('response', function(res) {
            expect(res.statusCode).toBe(200);
            done();
        })
        .on('error', function(err) {
            console.log(err);
            done();
        });
    
    });

    it('[POST /user] should be ON', function(done) {
    
        request
        .post(config.HOST+'/user')
        .on('response', function(res) {
            expect(res.statusCode).toBe(200);
            done();
        })
        .on('error', function(err) {
            console.log(err);
            done();
        });
    
    });

    it('[POST /user/upload-photo] should be ON', function(done) {
    
        request
        .post(config.HOST+'/user/upload-photo')
        .on('response', function(res) {
            expect(res.statusCode).toBe(200);
            done();
        })
        .on('error', function(err) {
            console.log(err);
            done();
        });
    
    });

    it('[PUT /user] should be ON', function(done) {
    
        request
        .put(config.HOST+'/user/10')
        .on('response', function(res) {
            expect(res.statusCode).toBe(200);
            done();
        })
        .on('error', function(err) {
            console.log(err);
            done();
        });
    
    });

    it('[DELETE /user] should be ON', function(done) {
    
        request
        .delete(config.HOST+'/user/10')
        .on('response', function(res) {
            expect(res.statusCode).toBe(200);
            done();
        })
        .on('error', function(err) {
            console.log(err);
            done();
        });
    
    });

});

describe("An anonymous user", function() {

    it("shouldn't access the GET /user route", function(done) {

        request
        .get({
                url: config.HOST+'/user'
            },
            function(err, res, body) {
                let obj = JSON.parse(body);
                expect(obj.errorcode).toBe(1);
                done();
            }
        );

    });

});

describe("An authenticated user", function() {

    let jwt = null;

    beforeAll(function(done) {

        /** Authenticate */
        request
        .post({
                url: config.HOST+'/token/authenticate',
                form: { mail: 'vitae.erat@etarcu.ca', password: '123456' } 
            },
            function(err, res, body) {
                let obj = JSON.parse(body);
                jwt = obj.token;
                done();
            }
        );

    });

    it("should access the GET /user route", function(done) {

        request
        .get({
                url: config.HOST+'/user',
                headers: {
                    'Authorization' : jwt
                }
            },
            function(err, res, body) {
                let obj = JSON.parse(body);
                expect(obj.errorcode).toBe(undefined);
                expect(obj.data).not.toBe(undefined);
                done();
            }
        );

    });

    it(`should retrieve users with default queries`, function(done){ 
        
        request
        .get({
                url: config.HOST+'/user',
                headers: {
                    'Authorization' : jwt
                }
            },
            function(err, res, body) {
                let obj = JSON.parse(body);

                /** It needs results */
                expect(obj.data).not.toBe(undefined);

                /** 3 fields ( _id, name, mail) are retrieve by default */
                expect(Object.keys(obj.data[0]).length).toBe(3);
                expect(obj.data[0]._id).not.toBe(undefined);
                expect(obj.data[0].name).not.toBe(undefined);
                expect(obj.data[0].mail).not.toBe(undefined);

                /** 5 records has field active = true in test source */
                expect(obj.data.length).toBe(5);

                /** Verifyng if it's sorted by name */
                // here code

                done();
            }
        );

    })

});