import mongoose, { Schema } from 'mongoose';

const newObjectSchema = new Schema({
  title: { // New's title
    type: String,
    required: true,
  },
  text: { // New's content
    type: String,
    required: true,
  },
  created_at: {
    type: Date,
    default: Date.now,
  },
  highlighted: {
    type: Boolean,
    required: true,
    default: false,
  },
});

const newObjectModel = mongoose.model('NewObject', newObjectSchema);
export { newObjectSchema };
export default newObjectModel;
