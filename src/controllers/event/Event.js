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
   * List all events
   * @param req values
   * @error message
   * @return Promise. Resolve(Events), Rejects(Errors)
   */
  loadEvents(req_, res_, page_, count_, query_, fields_, sort_){
    const fieldsStr = EventHelper.eventFieldsParse(fields_);
    const errors = [];
    const queryStr = `${query_}.*`;
    const query = query_ !== '' ? { name: { $regex: queryStr } } : {};

    let sortObj;
    try {
      sortObj = JSON.parse(sort_);
    } catch (e) {
      res_.status(400).json({
        error: e.message,
      });
      return;
    }

    let skipNum = 0;
    if (page_ > 1) {
      skipNum = (page_ - 1) * count_;
    }
    // console.log(queryObj);
    return new Promise((resolve, reject) => {
      EventModel
        .find(query, fieldsStr, { skip: skipNum })
        .sort(sortObj)
        .limit(count_)
        .then((docs) => {
          resolve(docs);

        });
    });
  }

  /**
   * List a singular event
   * @param id event
   * @error message
   * @return Promise. Resolve(Event), Reject(Error)
   */
  loadById(data_, req, res){
    EventModel.findById(data_, function (err, event) {
      if (err) {
        res.send(err);
      }
      if (event) {
        res.send(event);
      } else {
        res.send("No event found with that ID");
      }
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
          resolve(EventHelper.formatEvent(eventDoc));
        }).catch(reject);
    });
  }
}
