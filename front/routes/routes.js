var express = require('express');
var router = express.Router();

/** Administrative routes */
require('./admin/routes')(router);

/** Site routes */
require('./site/routes')(router);

module.exports = router;
