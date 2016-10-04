var express = require('express');
var bodyParser = require('body-parser');
var helmet = require('helmet');
var compression = require('compression');
var app = express();
// Routes
var adminRouters = require('./routes/admin');
var userRouters = require('./routes/user');
var siteRouters = require('./routes/site');

app.disable('x-powered-by');
app.enable('view cache');

app.set('views', './views');
app.set('view engine', 'pug');

// Setting static content
app.use('/public', express.static('app'));
app.use('/public/js', express.static('app/ts'));
app.use('/public', express.static('node_modules'));

// Setting body parser
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

// Setting helmet
app.use(helmet());

// Setting compression - G-Zip
app.use(compression());

// Setting routes
app.use('/admin', adminRouters)
app.use('/', siteRouters)
app.use('/user', userRouters)

// Starting server
app.listen(3000, function() {
	console.log('Express started on port 3000.');
});