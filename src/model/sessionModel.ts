import mongoose from 'mongoose';
import { boolean } from 'zod';

const sessionSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  valid: { type: Boolean, default: true },
  userAgent: { type: String },
}, {
  timestamps: true
});


const Session = mongoose.model('Session', sessionSchema);
export default Session;