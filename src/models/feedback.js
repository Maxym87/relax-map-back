
// models/feedbackSchema.js
import { Schema, model } from 'mongoose';

const feedbackSchema = new Schema({
  rate: { type: Number, required: true },
  description: { type: String, required: true, trim: true },
  userName: { type: String, required: true, trim: true },
  locationId: { type: Schema.Types.ObjectId, ref: 'Location', required: true },
}, {
  timestamps: true,
  versionKey: false,
});

export const Feedback = model('Feedback', feedbackSchema);
