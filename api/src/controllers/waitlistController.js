import Waitlist from '../models/Waitlist.js';
import transporter from '../utils/mailer.js';

export const joinWaitlist = async (req, res) => {
  const { name, email, phone, college } = req.body;

  if (!email || !email.includes('@')) {
    return res.status(400).json({ message: 'Invalid email' });
  }

  try {
    const exists = await Waitlist.findOne({ email });
    if (exists) {
      return res
        .status(409)
        .json({ message: 'You’re already on the waitlist!' });
    }

    const newEntry = new Waitlist({ name, email, phone, college });
    await newEntry.save();

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: 'You’re on the waitlist!',
      text: `Hey ${name}! Thanks for signing up. We'll keep you updated!`
    };

    transporter.sendMail(mailOptions, (err, info) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ message: 'Failed to send email' });
      }
      console.log(`Email sent: ${info.response}`);
      res.json({
        message: 'Successfully joined the waitlist. Check your inbox!'
      });
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};
