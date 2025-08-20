import mongoose from 'mongoose';

const bookmarkSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  project: { type: mongoose.Schema.Types.ObjectId, ref: 'Project' },
  created_at: { type: Date, default: Date.now }
}, { _id: false });

bookmarkSchema.index({ user: 1, project: 1 }, { unique: true });

export default mongoose.model('Bookmark', bookmarkSchema);
