var express = require('express');
var router = express.Router();

require('./user')(router);

module.exports = router;
