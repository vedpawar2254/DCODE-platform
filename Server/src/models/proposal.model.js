import mongoose from 'mongoose';

const proposalSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  project: { type: mongoose.Schema.Types.ObjectId, ref: 'Project' },
  proposal_link: String,
  status: String,
}, { timestamps: true });

export default mongoose.model('Proposal', proposalSchema);
