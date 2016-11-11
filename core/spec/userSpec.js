var request = require('request');
var frisby = require('frisby');
var config = require('../config');
var http = require('http');

/** TESTING IF REQUESTS EXIST */
frisby.create('Ensure that GET /user exists')
    .get(config.HOST+'/user')
    .expectStatus(200)
.toss();

frisby.create('Ensure that GET /user/:id exists')
    .get(config.HOST+'/user/as12')
    .expectStatus(200)
.toss();

frisby.create('Ensure that POST /user exists')
    .post(config.HOST+'/user')
    .expectStatus(200)
.toss();

frisby.create('Ensure that POST /user/upload-photo exists')
    .post(config.HOST+'/user/upload-photo')
    .expectStatus(200)
.toss();

frisby.create('Ensure that PUT /user/:id exists')
    .put(config.HOST+'/user/as12')
    .expectStatus(200)
.toss();

frisby.create('Ensure that DELETE /user/:id exists')
    .delete(config.HOST+'/user/as12')
    .expectStatus(200)
.toss();


/*frisby.create('Ensure that first admin user is created')
    .get(config.HOST+'/setup')
    .after(function(err, res, body) {
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

        frisby.create('Ensure that api is authenticating an administrator user')
            .post(config.HOST+'/authenticate', {
                mail: 'root@admin.com',
                password: '123456@admin'
            })
            .afterJSON(function(json) {

                frisby.create('Ensure that is return a basic list of users')
                    .addHeader('Authorization', json.token)
                    .get(config.HOST+'/user')
                    .expectJSONTypes({
                        status: String,
                        data: Array
                    })
                    .expectJSON('data.?', { // Verifica se dentro da array data, existe o valor definido abaixo
                        mail: "root@admin.com"
                    })
                    .expectJSONLength('data.*', 3) // The default number of fields
                .toss();

                frisby.create('Ensure that is returning only some fields')
                    .addHeader('Authorization', json.token)
                    .get(config.HOST+'/user?fields=name,mail')
                    .expectJSONTypes('data.*',{
                        name: String
                    })
                    .expectJSONLength('data.*', 3) // It's number of fields more _id field
                .toss();
                frisby.create('Ensure that is only returning _id')
                    .addHeader('Authorization', json.token)
                    .get(config.HOST+'/user?fields=')
                    .expectJSONLength('data.*', 3) // It's number of fields more _id field
                .toss();

                frisby.create('Ensure that is only returning _id')
                    .addHeader('Authorization', json.token)
                    .get(config.HOST+'/user?fields=field1,field2,strangefield')
                    .expectJSONLength('data.*', 1) // It's number of fields more _id field
                .toss();

                frisby.create('Ensure that is creating a new access token')
                    .get(config.HOST+'/access-token')
                    .afterJSON(function(json_token) {

                        let access_token = json_token.token;

                        frisby.create('Ensure that is creating a new user with minimum requeriments')
                            .post(config.HOST+'/user', {
                                name: 'User test',
                                mail: 'usertest@outlook.com',
                                password: '123456@teste',
                                cpf: '11122233389',
                                token: access_token
                            })
                            .expectJSONTypes('data.*',{
                                status: String
                            })
                            .expectJSONLength('data.*', 1)
                            .afterJSON(function(json_result_creation) {

                            })
                        .toss();



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
.toss(); */