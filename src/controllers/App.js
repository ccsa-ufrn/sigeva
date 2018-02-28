import express from 'express';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import cors from 'cors';

import fileUpload from 'express-fileupload';
import connector from './MongoConnector';

import APIrouter from './API';
import { downloadFile } from '../controllers/file/FileRouterFunctions';

const app = express();

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({
  extended: false,
}));

app.use(cors());

// enable application to use cookies
app.use(cookieParser());

// enable file upload
app.use(fileUpload());

// parse application/json
app.use(bodyParser.json());

// Execute connection to database
connector();

// Route to download files
app.use('/file/download/:id', downloadFile);

// Prepare app with routings
app.use('/api', APIrouter);

export default app;
