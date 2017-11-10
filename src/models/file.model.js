import mongoose, { Schema } from 'mongoose';

/**
 * @@ File Model
 * Represents a uploaded file by a user
 *
 * @ Log
 * Maradona Morais '2017-11-10' >> First definition
 */

const fileSchema = new Schema({
  fileRequirement: { // The file requirement that generates that file
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'FileRequirement',
  },
  ownUser: { // the user who uploaded this file
    type: Schema.Types.ObjectId,
    required: true,
  },
  extension: { // File extension
    type: String,
    required: true,
  },
});

const fileModel = mongoose.model('File', fileSchema);
export { fileSchema };
export default fileModel;
