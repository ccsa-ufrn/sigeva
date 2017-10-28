import mongoose, { Schema } from 'mongoose';

/* @@ Date Range Model
 *
 * @ Description: Defines a range between two dates
 *
 * There is no documentation about it, but is used in activityType.model
 * To deal with Date, Sigeva respect the 5 Laws of API dates and times
 * http://apiux.com/2013/03/20/5-laws-api-dates-and-times/
 *
 * Use ISO-8601, its the first law. So we assumes a given data as:
 * Example: '2017-10-28T15:44:52.775Z'
 *
 * @ Log
 * Maradona Morais '2017-08-20 XX:XX': First definition
 */

const dateRangeSchema = new Schema({
  begin: { // Initial date of the range
    type: Date,
    required: true,
  },
  end: { // Final date of the range
    type: Date,
    required: true,
  },
});

const dateRangeModel = mongoose.model('DateRange', dateRangeSchema);
export { dateRangeSchema };
export default dateRangeModel;
