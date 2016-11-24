var express = require('express');
var bodyParser = require('body-parser');
var helmet = require('helmet');
var compression = require('compression');
var utils = require('./libs/utils.lib');
var config = require('./config');
var app = express();
var apiRoutes = require('./routes/main');
var mongoose = require('mongoose');

app.disable('x-powered-by');

/**
 * Setting the system startup mode.
 * It can be: test, dev or production.
 */
let startUpMode = utils.getStartUpMode();

if(startUpMode === 'PRODUCTION') {
	mongoose.connect(config.MONGO_DB_PRODUCTION);
} else if(startUpMode === 'TEST') {
	mongoose.connect(config.MONGO_DB_TEST);
	utils.bootstrapCollections(app);
} else {
	mongoose.connect(config.MONGO_DB_DEV);
}

// Setting body parser
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

// Setting helmet
app.use(helmet());

// Setting compression - G-Zip
app.use(compression());

/**
 * Setting up the routes configs
 */
app.use('/', apiRoutes);

/**
 * Start server if it's in production or dev mode
 * In 'test' mode, the server is started after 
 * setup the collections by bootstrapCollections 
 * function.
 */ 
if(startUpMode === 'PRODUCTION' || startUpMode === 'DEV') {
	app.listen(config.SERVER_PORT, function() {
		console.log(`Express started on port ${port}, on ${startUpMode} mode.`);
	});
}
