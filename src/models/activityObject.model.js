import mongoose, { Schema } from 'mongoose';
import { fieldSchema } from './field.model';
import { activityConsolidationSchema } from './activityConsolidation.model';

// Representa a inscrição de um usuário à atividade
const enrollmentSchema = new Schema({
  user: Schema.Types.ObjectId,
  attended: false, // registro de presença (default: false)
});

const activityObjectSchema = new Schema({
  title: String,
  shift: Number, // turno
  syllabus: String, // ementa
  vacancies: { // vagas
    type: Number,
    default: 0,
  },
  ofFields: [fieldSchema],
  ofFiles: [Schema.Types.ObjectId],
  ofProposersUsers: [Schema.Types.ObjectId], // propositores (incluindo o usuário logado)
  status: { // waiting, consolidated
    type: String,
    default: 'waiting',
  },
  consolidation: {
    type: activityConsolidationSchema,
    default: null,
  },
  ofEnrollments: [enrollmentSchema],
});

const activityObjectModel = mongoose.model('ActivityObject', activityObjectSchema);

export { enrollmentSchema, activityObjectSchema };
export default activityObjectModel;
