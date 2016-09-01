var express = require('express');
var app = express();
app.disable('x-powered-by');

//Setting BodyParser
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

//Setting Helmet
var helmet = require('helmet');
app.use(helmet());

//Setting Compression - G-Zip
var compression = require('compression');
app.use(compression());

//Setting routers
var exampleRouter = require('./routers/example');
app.use('/routing', exampleRouter);

app.get('/', function(req, res) {
	res.send("It's working");
});

//Starting application
app.listen(3000, function() {
	console.log('Express started');
});
