let request = require('request');
let config = require('../config');
let http = require('http');
let jasmine = require('jasmine');
let User = require('../models/user.model');
let functions = require('./libs/functions.lib');
let fs = require('fs');
let async = require('async');

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

    beforeAll(function(done) {
        functions.createUsers(User, fs, async, function() { done(); });
    });

    it("should access the GET /user route", function(done) {

        done();

    });

    afterAll(function(done) {
        functions.removeUsers(User, fs, async, function() { done(); });
    })

});