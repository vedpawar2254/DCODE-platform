import mongoose from 'mongoose';

const orgMemberSchema = new mongoose.Schema({
  organization: { type: mongoose.Schema.Types.ObjectId, ref: 'Organization' },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  role: String,
  created_at: { type: Date, default: Date.now }
}, { _id: false });

orgMemberSchema.index({ organization: 1, user: 1 }, { unique: true });

export default mongoose.model('OrganizationMember', orgMemberSchema);
