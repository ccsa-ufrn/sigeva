import Moment from 'moment';

import FieldError from '../FieldError';
import DateRangeModel from '../../models/dateRange.model';

/**
 * Converts a two-dates range into a human readable string
 * @param dateBegin_ initial date
 * @param dateEnd_ final date
 */
const humanReadablePeriod = (dateBegin_, dateEnd_) => {
  const beginMoment = Moment(dateBegin_).locale('pt-br');
  const endMoment = Moment(dateEnd_).locale('pt-br');

  const halfDate = (moment) => {
    return `${moment.format('DD')} de ${moment.format('MMMM')}`;
  };

  // Default format
  let readablePeriod = `${beginMoment.format('DD/MM/YYYY')} a ${endMoment.format('DD/MM/YYYY')}`;

  if (beginMoment.format('Y') === endMoment.format('Y')) {
    // Same year
    if (beginMoment.format('MM') === endMoment.format('MM')) {
      // Same month
      if (beginMoment.format('DD') === endMoment.format('DD')) {
        // Same day
        if (beginMoment.format('LT') === endMoment.format('LT')) {
          // Same time means that the event occours belong all day
          readablePeriod = beginMoment.format('LL');
        } else {
          // Diferent times
          readablePeriod = `${beginMoment.format('LL')} das ${beginMoment.format('LT')} às ${endMoment.format('LT')}`;
        }
      } else {
        // Diferents days
        readablePeriod = `${beginMoment.format('DD')} a ${endMoment.format('LL')}`;
      }
    } else {
      // Diferents months
      readablePeriod = `${halfDate(beginMoment)} a ${endMoment.format('LL')}`;
    }
  }

  return readablePeriod;
};

/**
 * Parse fields to Mongoose format and restrict access to requestable fields
 * @param fields requested fieldds
 * @return parsed array in Mongoose request format
 */
const eventFieldsParse = (fields) => {
  const requestableFields = ['name', 'subtitle', 'location', 'eventPeriod', 'enrollmentPeriod', 'published', 'thumbnail'];
  let fieldsStr = '';
  const fieldsArray = fields.split(',');
  fieldsArray.forEach((f) => {
    if (requestableFields.includes(f)) {
      fieldsStr = fieldsStr.concat(f);
      fieldsStr = fieldsStr.concat(' ');
    }
  });
  fieldsStr = fieldsStr.concat('_id');
  return fieldsStr; // If at end no one at requestable are in fields
  // just return _id
};

/**
 * Format event to a javascript object filtering his fields
 * @param eventObject event Mongo object
 * @param fields Parsed string of fields in Mongoose request format (see eventFieldsParse)
 */
const formatEvent = (eventObject, fields) => {
  const arrFields = fields.split(' '); // These fields are already restricted and parsed
  const formatedEvent = {};
  arrFields.forEach((field) => {
    formatedEvent[field] = eventObject[field];
  });
  formatedEvent.readableEventPeriod = humanReadablePeriod(
    eventObject.eventPeriod.begin,
    eventObject.eventPeriod.end);
  formatedEvent.readableEnrollmentPeriod = humanReadablePeriod(
    eventObject.enrollmentPeriod.begin,
    eventObject.enrollmentPeriod.end);
  return formatedEvent;
};

const isBetweenLength = (field_, min_, max_ = 255) => {
  const field = field_.trim(); // Removes spaces bars from the borders
  if (field.length < min_ || field.length > max_) return false;
  return true;
};

/**
 * Parse a String date into Date format
 * @param date String date to be parsed
 * @return parsed date | false if it is invalid
 */
const parseDate = (date) => {
  const parsedDate = new Date(date);
  if (isNaN(parsedDate) || parsedDate < 0) {
    return false;
  }
  return parsedDate;
};

/**
 * Mount a DateRange object model
 * @param dateBegin initial date to mount
 * @param dateEnd final date to mount
 * @param errors errors buffer
 * @param errorFieldName field name to error display
 * @return false if handle a error, a DateRangeModel otherwise
 */
const mountDateRange = (dateBegin, dateEnd, errors, errorFieldName) => {
  if (!dateBegin || !dateEnd) {
    errors.push(FieldError(errorFieldName, 'Alguma data é inválida ou não foi preenchida'));
    return false;
  }
  // Compare dates
  if (dateEnd < dateBegin) {
    errors.push(FieldError(errorFieldName, 'A data inicial não pode ser posterior à data final'));
    return false;
  }
  // The dates are valid
  return DateRangeModel({
    begin: dateBegin,
    end: dateEnd,
  });
};

/**
 * This function is util while generating certificates. Receives a text with marks and a object that 
 * contains relationship mark-raplace. The return is the received text with replaces of the object. Ex:
 * 
 * text: "{tvshow} is the {eval} thing ever made"; object: {tvshow: "Rick and Morty", eval: "best"}
 */
textReplace = (templateText, targetObj) => {
  let text = templateText;
  for (let prop in targetObj) {
    if (targetObj.hasOwnProperty(prop)) {
      text = text.replace('{'+ prop +'}', targetObj[prop]);
    }
  }
  return text;
};

export {
  eventFieldsParse,
  formatEvent,
  isBetweenLength,
  parseDate,
  mountDateRange,
  humanReadablePeriod,
  textReplace,
};
