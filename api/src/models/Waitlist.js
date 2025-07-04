import mongoose from 'mongoose';

const waitlistSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true
    },
    name: {
      type: String,
      required: true
    },
    github: {
      type: String
    },
    college: {
      type: String
    }
  },
  { timestamps: true }
);

const Waitlist = mongoose.model('Waitlist', waitlistSchema);

export default Waitlist;
