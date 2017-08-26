import FieldRequestDAO from './FieldRequestDAO';
import fieldRequestSchema from '../../models/fieldRequest.model'

/**
 * FieldRequest
 * Manipulates D.O. about requests of fields from user
 */

export default class {
	/**
	 * Initialize a FieldRequest creating a userDAO and requiring a Object
	 */
	constructor() {
		this.DAO = new FieldRequestDAO();
		this.fieldRequestObject = this.DAO.createObject();
	}

	/**
	 * Sets a fieldRequest
	 * @param data set of fields required to create a FieldRequest
	 */
	setData(data) {
		fieldRequestSchema.schema.eachPath((path)=>{
			if (data[path])
				this.fieldRequestObject[path] = data[path];
		});
	}

	/**
	 * Inserts/Update a D.O. in the database
	 */
	store() {
		this.DAO.insertFieldRequest(this.fieldRequestObject);
		// Remember to check here if the field have editable:true
	}
}
