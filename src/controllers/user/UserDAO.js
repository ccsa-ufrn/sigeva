import userModel from '../../models/user.model'

/** User DAO (Data Access Object)
 * Interacts with the collection of users in the database
 *
 * Maradona Morais '2017-09-22 16:01': Define interations with User Model
 */

// TODO: Support promises
export default class {
	/**
	 * Returns a new instance (Object) of a User Model defined in /models/user.model
	 * @return User Database Object
	 */
	createObject() {
		return new userModel();
	}

	/**
	 * Saves on the database a User Database Object
	 * @param user User Database Object
	 */
	insertUser(user_) {
		user_.save((err)=>{
			if(err)
				console.log(err);
		});
	}
	
	/**
	 * Prints on console logger the crude User Database Object
	 */
	printObject(user_) {
		console.log(user_);
	}

}
