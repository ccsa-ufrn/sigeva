import fieldRequestModel from '../../models/fieldRequest.model'

/** FieldRequest DAO
 * Interacts with the collection of FieldRequests in the database
 *
 * Maradona Morais '2017-08-25 14:08': First definition
 * Maradona Morais '2017-08-25 21:35': Create functions: createObject, insertFielRequest, printObject
 */

export default class {
	/**
	 * Returns a new instance (Object) of a Field Request. Model defined in /model/fieldResquest
	 * @return FieldRequest Database Object (D.O.)
	 */
	createObject() {
		return new fieldRequestModel();
	}

	/**
	 * Saves on the database a FieldRequest Object
	 * @param fieldRequest FieldRequest D.O.
	 */
	insertFieldRequest(fieldRequest_) {
		fieldRequest_.save((err) => {
			if(err)
				console.log(err);
		});
	}

	/**
	 * Prints on console logger the crude D.O.
	 */
	printObject(fieldRequest_) {
		console.log(fieldRequest_);
	}
};
