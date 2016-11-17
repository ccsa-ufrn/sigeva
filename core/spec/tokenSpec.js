let request = require('request');
let config = require('../config');
let http = require('http');
let jasmine = require('jasmine');
let mongoose = require('mongoose');
let fs = require('fs');
let async = require('async');
let functions = require('./helpers/functions.helper');
let User = require('../models/user.model');

//mongoose.connect(config.MONGO_DB_TEST);

describe("In Token routes, the route", function() { 

    it('[POST /token/authenticate] should be ON', function(done) {
    
        request
        .post(config.HOST+'/token/authenticate')
        .on('response', function(res) {
            expect(res.statusCode).toBe(200);
            done();
        })
        .on('error', function(err) {
            console.log(err);
            done();
        });
    
    });

    // 123456@admin
});

describe('An anonymous user', function() {

    beforeAll(function(done) {
        functions.createUsers(User, fs, async, function() { done(); });
    });

    it('should try to authenticate with non-existent mail, then he will receive a error', function(done) {
        
        request
        .post(config.HOST+'/token/authenticate', function(err, res, body) {
            let obj = JSON.parse(body);
            expect()
            expect(obj.errorcode).toBe(1);
            done();
        });

    });

    it('should try to authenticate with an existent mail but wrong password, then he will receive a error', function(done) {
        
        request
        .post(config.HOST+'/token/authenticate', function(err, res, body) {
            let obj = JSON.parse(body);
            expect()
            expect(obj.errorcode).toBe(1);
            done();
        });

    });

    afterAll(function(done) {
        functions.removeUsers(User, fs, async, function() { done(); });
    });

});