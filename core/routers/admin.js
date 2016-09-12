var express = require('express');
var router = express.Router();

router.get('/', function(req, res) {
	res.send('Admin login');
});

router.get('/dashboard', function(req, res) {
	res.send('Admin dashboard');
});

module.exports = router;