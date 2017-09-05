import mongoose, { Schema } from 'mongoose';
import { dateRangeSchema } from './dateRange.model';

/* @@ Activity Type Model
 *
 * @ Description: An Activity Type defines how a activity proposal and vinculation must be.
 *
 * Read the docs to have a full description: /docs/atividade.br.md (in portuguese)
 * Mongoose Models documentation: http://mongoosejs.com/docs/models.html
 *
 * @ Log
 * Maradona Morais '2017-08-20 00:40': Start definition
 * Maradona Morais '2017-08-20 14:34': Inserts fieldRequest link + initial definition done
 */

const activityTypeSchema = new Schema({
  name: { // Activity Type name (e.g.: "Minicurso")
    type: String,
    required: true,
  },
  slugName: { // Activity Type "URL slug" (e.g.: "mesa-redonda")
    type: String,
    required: true,
  },
  description: String, // Activity Type brief description
  ofProposalRequiredFiles: [Schema.Types.Mixed], // Required files to make a proposal TODO: Create FileRequirement schema
  ofProposalRequiredFields: [Schema.Types.ObjectId], // Required fields to make a proposal
  proposalPeriod: dateRangeSchema, // Date range to make a proposal
  enrollmentPeriod: dateRangeSchema, // Date range to enroll a activity of this type
  ofProposeRules: Schema.Types.Mixed, // Rules to make a proposal TODO: Create Rule schema
  ofEnrollmentRules: Schema.Types.Mixed, // Rules to enroll a activity TODO: Create Rule schema
  active: { // Tells if the instance is active
    type: Boolean,
    default: true,
  },
  createdAt: { // Date of creation of the instance
    type: Date,
    default: Date.now,
  },
});

const activityTypeModel = mongoose.model('ActivityType', activityTypeSchema);
export { activityTypeSchema };
export default activityTypeModel;
