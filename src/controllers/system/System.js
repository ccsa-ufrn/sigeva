import SystemDAO from './SystemDAO';
import systemModel from '../../models/system.model';
import systemSchema from '../../models/system.model';

/**
 * System
 * Manipulates D.O. to create and edit System configurations
 */

export default class {
    /**
     * Initialize a System creating a DAO and setting a Object
     */
    constructor() {
        this.DAO = new SystemDAO();
        this.systemObject = this.DAO.createObject();
    }

    /**
     */
    loadSystem(obj_) {
        this.systemObject = obj_;
    }

    /**
     * Set data to a System configuration
     */
    setData(data_) {
        console.log(systemSchema);
        systemSchema.schema.eachPath((path)=>{
			if (data_[path])
				this.systemObject[path] = data_[path];
		});

    }

    /**
     * Stores the Object in the database
     */
    store() {
        return new Promise((resolve, reject) => {
            this.DAO.insertSystem(this.systemObject)
            .then(resolve, reject);
        });
    }

    /**
     * Gets configuration data by configuration name
     * @param name searched config name
     */
    getDataByName(name_) {
        var query = systemModel.findOne({name:name_});
        query.select('data');
        return new Promise((resolve, reject) => {
            this.DAO.executeQuery(query)
                .then((data)=> {
                    resolve(data);
                })
                .catch(reject);
        });
    }
}
