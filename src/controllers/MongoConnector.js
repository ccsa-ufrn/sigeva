import {mongo_connection} from '../../config'
import mongoose from 'mongoose'

/**
 * MongoConnector: connects application to mongo database.
 */
export default function() {
	mongoose.Promise = require('bluebird'); // Fix mongoose Promise deprecation by using Bluebird

	// Starts the mongoose connection to database
	mongoose.connect(mongo_connection, {
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
