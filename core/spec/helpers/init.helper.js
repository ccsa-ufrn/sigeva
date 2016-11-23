let mongoose = require('mongoose');
let config = require('../../config');

/** 
 * Setup connection with mongodb
 */
mongoose.connect(config.MONGO_DB_TEST);