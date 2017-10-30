import EventDAO from './EventDAO';
import EventModel from '../../models/event.model';
import FieldError from '../FieldError';
import * as EventHelper from './EventHelper';

/**
 * Event
 * Stores and manipulates Event Database Object
 */
export default class {
  /**
   * Initialize a Event instance creating a EventDAO and requesting a empty Object.
   */
  constructor() {
    this.eventObject = EventDAO.createObject();
  }

  /**
   * Validate and sets event informations
   * @param data set of fields to load
   * @return error message.
   */
  setData(data_) {
    const fixedFields = ['name', 'subtitle', 'location'];
    const errors = []; // Array of errors

    const eventPeriodBegin = EventHelper.parseDate(data_.eventPeriodBegin);
    const eventPeriodEnd = EventHelper.parseDate(data_.eventPeriodEnd);

    const eventPeriod = EventHelper.mountDateRange(eventPeriodBegin, eventPeriodEnd, errors, 'eventPeriod');
    if (eventPeriod) {
      this.eventObject.eventPeriod = eventPeriod;
    }

    const enrollmentPeriodBegin = EventHelper.parseDate(data_.enrollmentPeriodBegin);
    const enrollmentPeriodEnd = EventHelper.parseDate(data_.enrollmentPeriodEnd);

    const enrollmentPeriod = EventHelper.mountDateRange(enrollmentPeriodBegin, enrollmentPeriodEnd, errors, 'enrollmentPeriod');
    if (enrollmentPeriod) {
      this.eventObject.enrollmentPeriod = enrollmentPeriod;
    }

    fixedFields.forEach((field) => {
      if (data_[field]) {
        if (!EventHelper.isBetweenLength(data_[field], 3)) {
          errors.push(FieldError(field, `Valor inválido para ${field}`));
        } else {
          this.eventObject[field] = data_[field];
        }
      } else {
        // It's a required field, must be received
        errors.push(FieldError(field, 'É obrigatório preencher este campo'));
      }
    });

    return new Promise((resolve, reject) => {
      if (errors.length !== 0) {
        reject(errors);
      } else {
        resolve();
      }
    });
  }

  /**
   * Load event by ID
   * @param id_ event identification
   * @return Promise. Resolves if event exists, rejects otherwise.
   */
  loadById(id_) {
    const query = EventModel.findOne({ _id: id_ });
    return new Promise((resolve, reject) => {
      EventDAO.executeQuery(query)
        .then((event) => {
          if (event) {
            // Set this current event with the returned
            this.eventObject = event;
            resolve();
          } else {
            // Event not found
            reject();
          }
        }).catch(reject);
    });
  }

  /**
   * Returns a formated Event filtered by fields
   * @param fields_ Fields to extract from the event
   * @return a formated event
   */
  toFormatedEvent(fields_) {
    // The passed fields_ is in the format 'name,subtitle,location'. We must parse it to Mongoose
    // format and restrict with fields are requestable
    const formatedFields = EventHelper.eventFieldsParse(fields_);
    return EventHelper.formatEvent(this.eventObject, formatedFields); // stub
  }

  /**
   * List all events
   * @param req values
   * @error message
   * @return Promise. Resolve(Events), Rejects(Errors)
   */
  static loadEvents(page_, count_, query_, fields_, sort_, published_) {
    const fieldsStr = EventHelper.eventFieldsParse(fields_);
    const queryStr = `${query_}.*`;
    const query = query_ !== '' ? { name: { $regex: queryStr, $options: 'i' } } : {};
    query.published = published_;

    let skipNum = 0;
    if (page_ > 1) {
      skipNum = (page_ - 1) * count_;
    }
    // console.log(queryObj);
    return new Promise((resolve) => {
      EventModel
        .find(query, fieldsStr, { skip: skipNum })
        .sort(sort_)
        .limit(count_)
        .then((docs) => {
          resolve(docs);
        });
    });
  }

  /**
   * Insert a event in db
   * @return Promise. Resolve(set event values on), Reject(Error)
   */
  store() {
    return new Promise((resolve, reject) => {
      EventDAO.insertEvent(this.eventObject)
        .then((eventDoc) => {
          resolve(eventDoc);
        }).catch(reject);
    });
  }
}
