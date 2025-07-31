import mongoose from 'mongoose';

const userBadgeSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  badge: { type: mongoose.Schema.Types.ObjectId, ref: 'Badge' },
  earned_at: { type: Date, default: Date.now }
}, { _id: false });

userBadgeSchema.index({ user: 1, badge: 1 }, { unique: true });

export default mongoose.model('UserBadge', userBadgeSchema);
