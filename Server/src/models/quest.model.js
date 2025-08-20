import mongoose from 'mongoose';

const questSchema = new mongoose.Schema({
  name: String,
  description: String,
  progress: Number,
  rewards: String,
  users_completed: Number,
}, { timestamps: true });

export default mongoose.model('Quest', questSchema);
