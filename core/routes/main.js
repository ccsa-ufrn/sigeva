var express = require('express');
var jwt = require('jsonwebtoken');
var mongoose = require('mongoose');
var config = require('../config');
var bcrypt = require('bcrypt');
var utils = require('../libs/utils.lib');
var User = require('../models/user.model');
var router = express.Router();


/** 
 * MONGOOSE CONNECTION
 * */
mongoose.connect(config.MONGO_DB_SRC);

/**
 * GET /setup
 * Bootstraps the app, it can be executed only the first time
 */
router.get('/setup', function(req, res) {

    var mail = 'root@admin.com';
    var password = '123456@admin';

    User.findOne({mail: mail}).select('_id mail pass').exec(function(err, user) {

        if(user === null) {

            bcrypt.genSalt(10, function(err, salt) {
                bcrypt.hash(password, salt, function(err, hash) {

                    var user = new User({
                        name: 'Administrador',
                        mail: mail,
                        pass: hash,
                        active: true,
                        type: 'administrator'
                    });

                    user.save(function(err) {
                        if(err) {
                            res.json({status: 'error', errorcode: 2, msg: err});
                        } else {
                            res.json({status: 'success'});
                        }
                    });

                });
            });

        } else {
            res.json({status: 'error', errorcode: 1, msg: 'first user already created'});
        }

    });

});

/**
 * POST /authenticate
 * Authenticate a user and return a jwt token
 */
router.post('/authenticate', function(req, res) {

    var mail = req.body.mail;
    var password = req.body.password;

    User.findOne({mail: mail}).select('_id mail pass').exec(function(err, user) {

        if(user === null) {
            res.json({status: 'error', errorcode: 1, msg: 'user not exists'});
            return;
        } else {
            bcrypt.compare(password, user.pass, function(err, r) {
                if(r == true) {
                    jwt.sign({ id: user.id }, config.JWT_KEY, { expiresIn: '24h' }, function(err, token) {
                        res.json({status: 'success', token: token});
                        return;
                    });
                } else {
                    res.json({status: 'error', errorcode: 2, msg: 'wrong password'});
                    return;
                }
            });
        }
    });
    
});

router.all('*', function(req, res, next) {

    jwt.verify(req.headers['authorization'], config.JWT_KEY, function(err, decoded) {
        if(decoded !== undefined) {

            User
			.findOne()
			.where('_id').equals(new mongoose.Types.ObjectId(decoded.id)).
			select('_id name mail active type').
			exec(function(err, user) {
                req.user = user;
                next();
			});

        } else {
            next();
        }
        
    });

});

let private_route = function(req, res) {

    if(req.user === undefined) {
        res.json({status: 'error', errorcode: 1, msg: 'invalid credentials'});
    } else {
        next();
    }

};

require('./users')(router, private_route, mongoose, config, User, utils, bcrypt, jwt);

module.exports = router;
