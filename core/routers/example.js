var express = require('express');
var router = express.Router();

router.get('/', function(req, res) {
	res.send('Routing is ok');
});

module.exports = router;