import SystemDAO from './SystemDAO';
import systemModel, { systemSchema } from '../../models/system.model';
import fieldRequestModel from '../../models/fieldRequest.model';

/**
 * System
 * Manipulates D.O. to create and edit System configurations
 */
export default class {
  /**
   * Initialize a System creating a DAO and setting a Object
   */
  constructor() {
    this.systemObject = SystemDAO.createObject();
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
    systemSchema.schema.eachPath((path) => {
      if (data_[path]) this.systemObject[path] = data_[path];
    });
  }

  /**
   * Stores the Object in the database
   */
  store() {
    return new Promise((resolve, reject) => {
      SystemDAO.insertSystem(this.systemObject)
        .then(resolve, reject);
    });
  }

  /**
   * Gets registerFieldRequests
   */
  static getRegisterFieldRequests() {
    const query = systemModel.findOne({ name: 'register_fields' });
    query.select('data');
    query.populate('data', 'name readableName HTMLtype required editable', fieldRequestModel);
    return new Promise((resolve, reject) => {
      SystemDAO.executeQuery(query)
        .then((result) => {
          resolve(result.data);
        }).catch(reject);
    });
  }

  /**
   * Gets configuration data by configuration name
   * @param name searched config name
   */
  static getDataByName(name_) {
    const query = systemModel.findOne({ name: name_ });
    query.select('data');
    return new Promise((resolve, reject) => {
      SystemDAO.executeQuery(query)
        .then((data) => {
          resolve(data);
        })
        .catch(reject);
    });
  }
}
