import express from 'express';
import bodyParser from 'body-parser';
import connector from './MongoConnector';

import APIrouter from './API';

const app = express();

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({
  extended: false,
}));

// parse application/json
app.use(bodyParser.json());

// Execute connection to database
connector();

// Prepare app with routings
app.use('/api', APIrouter);

export default app;
