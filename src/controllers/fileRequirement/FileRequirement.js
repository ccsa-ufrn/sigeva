import FileRequirementDAO from './FileRequirementDAO';
import FileRequirementModel from '../../models/fileRequirement.model';

/**
 * FileRequirement
 * Manipulates D.O. about requirements of files uploads
 *
 * Maradona Morais '2017-11-09': First definition
 */
export default class {
  /**
   * Initialize a FileRequerement creating a DAO and requiring a Object
   */
  constructor() {
    this.object = FileRequirementDAO.createObject();
  }

  loadById(id) {
    const query = FileRequirementModel.findById(id);
    return new Promise((resolve, reject) => {
      FileRequirementDAO.executeQuery(query)
        .then((doc) => {
          this.object = doc;
          resolve(doc);
        })
        .catch(reject);
    });
  }

  /**
   * Sets the requirement fields
   *
   * @param name Requirement name
   * @param description datails about the requirement
   * @param fileType the name that will be assigned in the filepath
   * @param acceptedExtensions file extensions accepted for the request ('.doc .pdf')
   */
  setData(name, description, fileType, acceptedExtensions) {
    this.object = Object.assign(this.object, {
      name,
      description,
      fileType,
      acceptedExtensions,
    });
  }

  /**
   * Stores the file requirement in the database
   */
  store() {
    return new Promise((resolve, reject) => {
      FileRequirementDAO.insertFileRequirement(this.object)
        .then(resolve, reject);
    });
  }
}
