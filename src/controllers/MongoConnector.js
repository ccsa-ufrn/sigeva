import {mongo_connection} from '../../config'
import mongoose from 'mongoose'

/**
 * MongoConnector: connects application to mongo database.
 */
export default function() {
	mongoose.Promise = require('bluebird'); // Fix mongoose Promise deprecation by using Bluebird

	// Starts the mongoose connection to database
	let uri;
	if (process.env.NODE_ENV == "test") {
		uri = mongo_connection.test;
	} else if (process.env.NODE_ENV == "dev") {
		uri = mongo_connection.development;
	} else {
		uri = mongo_connection.production;
	}

	mongoose.connect(uri, {
		useMongoClient: true,
	});

	// CONNECTION EVENTS
	// When successfully connected
	mongoose.connection.on('connected', ()=> {
		console.log(`Mongoose default connection open to ${mongo_connection}`)
	})

	// If connection throws an error
	mongoose.connection.on('error', (err)=> {
		console.log(`Mongoose default connection error: ${err}`)
	})

	// When the connection is desconnected
	mongoose.connection.on('disconnected', ()=> {
		console.log('Mongoose default connection disconnected')
	})

	// If the Node process ends, close the Mongoose connection
	process.on('SIGNT', ()=> {
		mongoose.connection.close(()=>{
			console.log('Mongoose default connection disconnected through app termination')
			process.exit(0);
		})
	})


};
