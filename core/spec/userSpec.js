var request = require('request');
var frisby = require('frisby');
var config = require('../config');

/** Wrong user */
frisby.create('Ensure that there isnt a user')
    .post(config.HOST+'/authenticate')
    .expectStatus(200)
    .expectHeaderContains('Content-Type', 'json')
    .expectJSON({
        status: "error",
        errorcode: 1,
        msg: "user not exists"
    })
    .expectJSONTypes({
        status: String,
        errorcode: Number,
        msg: String
    })
.toss();

/** First admin user */
frisby.create('Ensure that first admin user is created')
    .get(config.HOST+'/setup')
    .after(function(err, res, body) {

        /** Correct user, wrong password */
        frisby.create('Ensure that user is using wrong password')
            .post(config.HOST+'/authenticate', {
                mail: 'root@admin.com',
                password: 'wrong_password'
            })
            .expectStatus(200)
            .expectHeaderContains('Content-Type', 'json')
            .expectJSON({
                status: "error",
                errorcode: 2,
                msg: "wrong password"
            })
            .expectJSONTypes({
                status: String,
                errorcode: Number,
                msg: String
            })
        .toss();

        /** Correct user and password */
        frisby.create('Ensure that api is authenticating an user')
            .post(config.HOST+'/authenticate', {
                mail: 'root@admin.com',
                password: '123456@admin'
            })
            .afterJSON(function(json) {

                /** Get users basic list */
                frisby.create('Returning basic list of users')
                    .addHeader('Authorization', json.token)
                    .get(config.HOST+'/user')
                    .expectJSONTypes({
                        status: String,
                        data: Array
                    })
                    .expectJSON('data.?', { // Verifica se dentro da array data, existe o valor definido abaixo
                        mail: "root@admin.com"
                    })
                .toss();

            })
            .expectStatus(200)
            .expectHeaderContains('Content-Type', 'json')
            .expectJSON({
                status: "success"
            })
            .expectJSONTypes({
                status: String,
                token: String
            })
        .toss();



    })
.toss();