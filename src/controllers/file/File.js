import FileDAO from './FileDAO';
import FileModel from '../../models/file.model';

/**
 * File
 * Manipulates D.O. about uploaded files
 *
 * Maradona Morais '2017-11-10': First definition
 */
export default class {
  /**
   * Initialize a File creating a DAO and requiring a Object
   */
  constructor() {
    this.object = FileDAO.createObject();
  }

  loadById(id) {
    const query = FileModel.findById(id).populate('fileRequirement');
    return new Promise((resolve, reject) => {
      FileDAO.executeQuery(query)
        .then((doc) => {
          this.object = doc;
          resolve(doc);
        })
        .catch(reject);
    });
  }

  /**
   * Sets the file fields
   * @param fileRequirement file requirement ID
   * @param ownUser own user ID
   */
  setData(fileRequirement, ownUser, extension) {
    this.object = Object.assign(this.object, {
      fileRequirement,
      ownUser,
      extension,
    });
  }

  /**
   * Stores the file requirement in the database
   */
  store() {
    return new Promise((resolve, reject) => {
      FileDAO.insertFile(this.object)
        .then(resolve, reject);
    });
  }
}
