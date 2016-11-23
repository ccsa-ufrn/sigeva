let request = require('request');
let config = require('../config');
let http = require('http');
let jasmine = require('jasmine');
let User = require('../models/user.model');
let functions = require('./libs/functions.lib');
let fs = require('fs');
let async = require('async');

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

});

describe('An anonymous user', function() {

    beforeAll(function(done) {
        functions.createUsers(User, fs, async, function() { done(); });
    });

    it('should try to authenticate with non-existent mail, then he will receive a error', function(done) {
        
        request
        .post({
                url: config.HOST+'/token/authenticate',
                form: { mail: 'teste@test.com', password: '123465' } 
            },
            function(err, res, body) {
                let obj = JSON.parse(body);
                expect()
                expect(obj.errorcode).toBe(1);
                done();
            }
        );

    });

    it(`should try to authenticate with an existent mail but wrong password, 
    then he will receive a error`, function(done) {
        
        request
        .post({
                url: config.HOST+'/token/authenticate',
                form: { mail: 'vitae.erat@etarcu.ca', password: '123465' } 
            },
            function(err, res, body) {
                let obj = JSON.parse(body);
                expect()
                expect(obj.errorcode).toBe(2);
                done();
            }
        );

    });

    it(`should try to authenticate with an existent mail, 
    a correct password but a disabled user, 
    then he will receive a error`, 
    function(done) {
        
        request
        .post({
                url: config.HOST+'/token/authenticate',
                form: { mail: 'vulputate.dui.nec@nibh.org', password: '123456' } 
            },
            function(err, res, body) {
                let obj = JSON.parse(body);
                expect()
                expect(obj.errorcode).toBe(3);
                done();
            }
        );

    });

    it(`should try to authenticate with an existent mail, 
    a correct password and an enable user, 
    then he will receive a success`, 
    function(done) {
        
        request
        .post({
                url: config.HOST+'/token/authenticate',
                form: { mail: 'vitae.erat@etarcu.ca', password: '123456' } 
            },
            function(err, res, body) {
                let obj = JSON.parse(body);
                expect()
                expect(obj.errorcode).toBe(undefined);
                done();
            }
        );

    });

    afterAll(function(done) {
        functions.removeUsers(User, fs, async, function() { done(); });
    });

});