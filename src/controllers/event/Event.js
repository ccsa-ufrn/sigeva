import EventDAO from './EventDAO';
import EventModel from '../../models/event.model';
import DateRangeModel from '../../models/dateRange.model';
import * as EventHelper from './EventHelper';
import Response from '../Response';

/**
 * Event
 * Stores and manipulates Event Database Object
 */
export default class {
  /**
   * Initialize a Event instance creating a EventDAO and requesting a empty Object.
   */
  constructor() {
    // [MR] Mudar: Os métodos do DAO podem ser estáticos, não será necessário criar um objeto
    // [MR] com o DAO.
    // Com o DAO estático ficaria = eventDAO.createObject();
    this.DAO = new EventDAO();
    this.eventObject = this.DAO.createObject();
  }
  /**
   * Validate and sets event informations
   * @param data set of fields to load
   * @error message.
   */

  setData(data_) {
    const fixedFields = ['name', 'subtitle', 'eventPeriodBegin', 'eventPeriodEnd', 'eventPeriod', 'registerPeriodBegin', 'registerPeriodEnd', 'registerPeriod'];
    const errors = []; // Array of errors

    const eventPeriod = new DateRangeModel({
      begin: data_.eventPeriodBegin,
      end: data_.eventPeriodEnd });
    data_.eventPeriod = eventPeriod;

    const registerPeriod = new DateRangeModel({
      begin: data_.registerPeriodBegin,
      end: data_.registerPeriodEnd });
    data_.registerPeriod = registerPeriod;

    fixedFields.forEach((field) => {
      if (data_[field]) {
        // Validade name
        if (field === 'name') {
          if (!EventHelper.isBetweenLength(data_[field], 3)) {
            errors.push({
              field,
              message: 'Valor inválido para nome',
            });
          }
        }
        if (field === 'eventPeriodBegin' || field === 'eventPeriodEnd') {
          if (!EventHelper.validaData(data_[field])) {
            errors.push({
              field,
              message: 'Valor inválido para a data',
            });
          }
        }
        if (field === 'eventPeriod' || field === 'registerPeriod') {
          this.eventObject[field] = data_[field];
        }
        else {
          this.eventObject[field] = data_[field].trim();
        }
      } else {
        // It's a required field, must be received
        errors.push({
          field,
          message: 'É obrigatório preencher este campo',
        });
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
      this.DAO.insertEvent(this.eventObject)
        .then((eventDoc) => {
          resolve(EventHelper.formatEvent(eventDoc));
        }).catch(reject);
    });
  }
}
