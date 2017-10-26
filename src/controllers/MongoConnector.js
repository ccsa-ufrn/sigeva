import mongoose from 'mongoose';
import config from '../../config';

/**
 * MongoConnector: connects application to mongo database.
 */
export default function () {
  mongoose.Promise = Promise; // Fix mongoose Promise deprecation by using ES6 Promise

  // Starts the mongoose connection to database
  let uri;
  if (process.env.NODE_ENV === 'test') {
    uri = config.mongo_connection.test;
  } else if (process.env.NODE_ENV === 'dev') {
    uri = config.mongo_connection.development;
  } else if (process.env.NODE_ENV === 'prod') {
    uri = config.mongo_connection.production;
  }

  mongoose.connect(uri, {
    useMongoClient: true,
  });

  // CONNECTION EVENTS
  // When successfully connected
  mongoose.connection.on('connected', () => {
    console.log('Mongoose default connection open');
  });

  // If connection throws an error
  mongoose.connection.on('error', (err) => {
    console.log(`Mongoose default connection error: ${err}`);
  });

  // When the connection is desconnected
  mongoose.connection.on('disconnected', () => {
    console.log('Mongoose default connection disconnected');
  });

  // If the Node process ends, close the Mongoose connection
  process.on('SIGNT', () => {
    mongoose.connection.close(() =>{
      console.log('Mongoose default connection disconnected through app termination');
      process.exit(0);
    });
  });
}
