import mongoose, { Schema } from 'mongoose';

const certConnectorSchema = new Schema({
  code: {
    type: String,
  },
  event: {
    type: Schema.Types.ObjectId,
    default: null,
  },
  module: {
    type: String,
    default: null,
  },
  entity: {
    type: String,
    default: null,
  },
  certType: {
    type: String,
    default: null,
  },
  object: {
    type: Schema.Types.ObjectId,
    default: null,
  },
  user: {
    type: Schema.Types.ObjectId,
    default: null,
  },
});

const certConnectorModel = mongoose.model('CertConnector', certConnectorSchema);
export default certConnectorModel;
