import mongoose from 'mongoose';

const badgeSchema = new mongoose.Schema({
  name: String,
  description: String,
  criteria: String,
}, { timestamps: true });

export default mongoose.model('Badge', badgeSchema);
