var express = require('express');
var bodyParser = require('body-parser');
var helmet = require('helmet');
var compression = require('compression');
var routes = require('./routes/routes');
var app = express();

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
app.use('/', routes)

// Starting server
app.listen(8080, function() {
	console.log('Front-end started on port 8080.');
});
