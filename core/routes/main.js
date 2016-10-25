var express = require('express');
var jwt = require('jsonwebtoken');
var mongoose = require('mongoose');
var User = require('../models/User');
var config = require('../config');
var bcrypt = require('bcrypt');
var router = express.Router();

mongoose.connect(config.MONGO_DB_SRC);

/** AFTER FIRST USE, DELETE THIS */
router.get('/setup', function(req, res) {

    var password = '123456';

    bcrypt.genSalt(10, function(err, salt) {
        bcrypt.hash(password, salt, function(err, hash) {

            var user = new User({
                name: 'Victor Almeida Schinaider',
                mail: 'victorschinaider@outlook.com',
                pass: hash,
                type: 'administrator'
            });

            user.save(function(err) {
                if(err) {
                    res.json({err: err});
                } else {
                    res.json({ status: 'ok' });
                }
            });

        });
    });

});

router.all('*', function(req, res, next) {

    /*if(req.url !== '/authenticate') {

    }*/

    next();
});

router.post('/authenticate', function(req, res) {

    var mail = req.body.mail;
    var password = req.body.password;

    User.findOne({mail: mail}).select('_id name mail pass').exec(function(err, user) {

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

require('./user')(router);

module.exports = router;
