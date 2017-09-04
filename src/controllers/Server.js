import app from './App';
import express from 'express';
import APIrouter from './API';
import {application} from '../../config';

console.log(`Application enviroment is ${process.env.NODE_ENV}`);

// SETINGS FOR STATIC FILES
app.use('*', express.static('/home/ccsa/sigeva/public'));
/*
 NOTE: Don't care about the *, it is putting all on React hands
 TODO: the React-routes must deal with 5xx and 4xx errors. Needs to configurate
 the react-routes in the project.
*/

// STARTS THE SERVER
app.listen(application.port, () => {
	console.log(`Starting Express ${application.name} ${application.version} at ::${application.port}`);
})
