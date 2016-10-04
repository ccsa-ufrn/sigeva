var express = require('express');
var mongoose = require('mongoose');
var config = require('../config');

var router = express.Router();
var userModel = require('../app/models/User');

//Mongoose connection
mongoose.connect(config.MONGO_DB_SRC);

router.get('/new', function(req, res) {
	console.log("Creating a new User");
	//There go a example
	var new_user = new userModel({name: "Maradona Morais", mail: "me@mrmorais.com.br"});
	new_user.save(function(err) {
		if(!err) {
			res.json({success: true, data: {user: new_user}});
		} else {
			res.json({success: false, data: {err: "Undefined"}});
		}
	});

});

router.get('/all', function(req, res) {
	console.log("Return all users");
	userModel.find({}).exec(function(err, docs) {
		res.json({success: true, data: docs});
	});
});

module.exports = router;
