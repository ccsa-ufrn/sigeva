import eventModel from '../../models/event.model'

/** Event DAO (Data Access Object)
 * Interacts with the collection of Event in the database
 *
 * Thayrone Dayvid '2017-08-24 14:01': Define interations with Event Model
 */

// TODO: Support promises
export default class {
  // [MR] Transformar todas os métodos em estático
	/**
	 * Returns a new instance (Object) of a Event Model defined in /models/event.model
	 * @return Event Database Object
	 */
	createObject() {
		return new eventModel();
	}

	/**
	 * Saves on the database a Event Database Object
	 * @param event Event Database Object
	 */
	insertEvent(event_) { // [MR] essa operação não requer uso de promise?
        event_.save((err)=>{
            if(err)
                console.log(err);
        });
    }


	/**
	 * Prints on console logger the crude Event Database Object
	 */
	printObject(event_) {
		console.log(event_);
	}

}
