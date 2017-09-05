import mongoose, { Schema } from 'mongoose';

/* @@ Date Range Model
 *
 * @ Description: Defines a range between two dates
 *
 * There is no documentation about it, but is used in activityType.model
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
