import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import crypto from 'crypto';

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    github_username: String,
    role: String,
    experience_level: String,
    github_token: String,
    github_token_iv: String,
    github_token_tag: String,
    tokenChanged: Date

    // college: { type: mongoose.Schema.Types.ObjectId, ref: 'College' }
  },
  { timestamps: true }
);

userSchema.pre('save', async function (next) {
  if (!this.isModified('github_token')) return next();

  this.github_token = await bcrypt.hash(this.github_token, 12);

  next();
});

userSchema.methods.correctToken = async function (candidateToken, userToken) {
  return await bcrypt.compare(candidateToken, userToken);
};

export default mongoose.model('User', userSchema);
