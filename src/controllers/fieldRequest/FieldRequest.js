import FieldRequestDAO from './FieldRequestDAO';
import fieldRequestSchema from '../../models/fieldRequest.model'

/**
 * FieldRequest
 * Manipulates D.O. about requests of fields from user
 *
 * Maradona Morais '2017-08-27 16:01': static createDate() + suport Promise in store()
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
	 * Simplify a creation of a FieldRequest data
	 */
	static createData(name_, readableName_, HTMLtype_, editable_=null, required_=null) {
		var data = {
			name: name_,
			readableName: readableName_,
			HTMLtype: HTMLtype_
		};
		data.editable = editable_ != null ? editable_ : true;
		data.required = required_ != null ? required_ : false;

		return data;
	}

	/**
	 * Sets a fieldRequest
	 * @param data set of fields required to create a FieldRequest
	 */
	setData(data_) {
		fieldRequestSchema.schema.eachPath((path)=>{
			if (data_[path])
				this.fieldRequestObject[path] = data_[path];
		});
	}

	/**
	 * Inserts/Update a D.O. in the database
	 */
	store() {
		return new Promise((resolve, reject) => {
			this.DAO.insertFieldRequest(this.fieldRequestObject)
            .then(resolve, reject);
        });
	}
}
