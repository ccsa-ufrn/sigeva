import System from '../controllers/system/System';
import connection from '../controllers/MongoConnector';

connection();

/**
 * Script to inialize database with initial configurations for user registration
 *
 * Maradona Morais '2017-08-27 16:05': Create working script
 * Maradona Morais '2017-09-16 21:50': Changing code to only init register_fields
 */

// Creating a new System information
const sys = new System();
// Setting it to be a Register Fields
sys.setData({
  name: 'register_fields',
  data: [],
});

sys.store()
  .then(() => {
    console.log('Register fields has been created in database');
	process.exit();
  })
  .catch((err) => {
    console.log('It cannot save register fields. ', err);
	process.exit();
  });
