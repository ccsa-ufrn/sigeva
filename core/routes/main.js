var express = require('express');
var jwt = require('jsonwebtoken');
var mongoose = require('mongoose');
var config = require('../config');
var bcrypt = require('bcrypt');
var User = require('../models/user.model');
var router = express.Router();


/** mongoose conn */
mongoose.connect(config.MONGO_DB_SRC);

/** BEGIN - AFTER FIRST USE, DELETE THIS */
router.get('/setup', function(req, res) {

    var mail = 'root@admin.com';
    var password = '123456@admin';

    User.findOne({mail: mail}).select('_id mail pass').exec(function(err, user) {

        if(user !== null) {

            bcrypt.genSalt(10, function(err, salt) {
                bcrypt.hash(password, salt, function(err, hash) {

                    var user = new User({
                        mail: mail,
                        pass: hash,
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
/** END - AFTER FIRST USE, DELETE THIS */

router.post('/authenticate', function(req, res) {

    var mail = req.body.mail;
    var password = req.body.password;

    User.findOne({mail: mail}).select('_id mail pass').exec(function(err, user) {

        if(user === null) {
            res.json({status: 'error', errorcode: 1, msg: 'user not exists'});
        } else {
            bcrypt.compare(password, user.pass, function(err, r) {
                if(r == true) {
                    jwt.sign(user._id, config.JWT_KEY, { expiresIn: '24h' }, function(err, token) {
                        res.json({status: 'success', token: token});
                    });
                } else {
                    res.json({status: 'error', errorcode: 2, msg: 'wrong password'});
                }
            });
        }
    });
    
});

router.all('*', function(req, res, next) {

    if(req.url !== '/authenticate' || req.url !== '/setup') {

        jwt.verify(req.headers['authorization'], config.JWT_KEY, function(err, decoded) {
            if(decoded === undefined) {
                res.json({status: 'error', errorcode: 1, msg: 'invalid credentials'});
            } else {
                next();
            }
        });

    } else {
        next();
    }

    
});

var test = require('../controllers/user.controller');
console.log('');

require('./users')(router, mongoose, config, User, bcrypt);

module.exports = router;
