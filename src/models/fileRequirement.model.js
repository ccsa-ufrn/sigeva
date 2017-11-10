import mongoose, { Schema } from 'mongoose';

const fileRequirementSchema = new Schema({
  name: { // File requirement name
    type: String,
    required: true,
  },
  description: String, // Description about the file requirement
  fileType: { // Type of file, that defines the store location e.g. 'submission', 'receipt'
    type: String,
    required: true,
  },
  acceptedExtensions: { // Accepted extensions e.g. '.pdf .img .png'
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  active: {
    type: Boolean,
    default: true,
  },
});

const fileRequirementModel = mongoose.model('FileRequirement', fileRequirementSchema);
export { fileRequirementSchema };
export default fileRequirementModel;
