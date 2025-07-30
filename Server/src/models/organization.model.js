import mongoose from 'mongoose';

const organizationSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: String,
  github_org_name: String,
  contact_email: String,
}, { timestamps: true });

export default mongoose.model('Organization', organizationSchema);
