import mongoose, { Schema } from 'mongoose';

const certTemplateSchema = new Schema({
  text: String,
  topImage: String,
  bottomImage: String,
});

const certTemplateModel = mongoose.model('CertTemplate', certTemplateSchema);
export { certTemplateSchema };
export default certTemplateModel;
