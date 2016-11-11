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

router.get('test', function(req, res){
    res.json({});
})

let private_route = function(req, res) {

    if(req.user === undefined) {
        res.json({status: 'error', errorcode: 1, msg: 'invalid credentials'});
    } else {
        next();
    }

};

require('./system')(router, private_route, mongoose, config, utils, bcrypt, jwt);
require('./token')(router, private_route, mongoose, config, utils, bcrypt, jwt);
require('./user')(router, private_route, mongoose, config, User, utils, bcrypt, jwt);

module.exports = router;
