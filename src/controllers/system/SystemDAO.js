import systemModel from '../../models/system.model'

/** System DAO
 * Interacts with mongo database controlling System collection, that contains
 * config informations.
 */

export default class {
    /**
     * Returns a new System D.O.
     */
    createObject() {
        return new systemModel();
    }

    /**
     * Saves on the database the System D.O.
     */
    insertSystem(system_) {
        return new Promise((resolve, reject) => {
            system_.save((err, doc) => {
                if (err)
                    reject();
                resolve(doc);
            });
        });
    }

    /**
     * Executes a query
     */
    executeQuery(query_) {
        return new Promise((resolve, reject)=>{
            query_.exec().then((doc) => {
                resolve(doc);
            }).catch(reject);
        });
    }

    /**
	 * Prints on console logger the crude D.O.
	 */
	printObject(system_) {
		console.log(system_);
	}
}
