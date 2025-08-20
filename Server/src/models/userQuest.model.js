import mongoose from 'mongoose';

const userQuestSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  quest: { type: mongoose.Schema.Types.ObjectId, ref: 'Quest' },
  completed_at: { type: Date, default: Date.now }
}, { _id: false });

userQuestSchema.index({ user: 1, quest: 1 }, { unique: true });

export default mongoose.model('UserQuest', userQuestSchema);
