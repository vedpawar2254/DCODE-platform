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
      html: `<!DOCTYPE html>
                <html lang="en">
                  <head>
                    <meta charset="UTF-8" />
                    <title>Welcome to DCODE</title>
                    <style>
                      body {
                        font-family: Arial, sans-serif;
                        background-color: #f8f9fa;
                        margin: 0;
                        padding: 0;
                      }
                      .container {
                        max-width: 600px;
                        margin: 40px auto;
                        background: #ffffff;
                        border-radius: 8px;
                        padding: 40px;
                        box-shadow: 0 0 10px rgba(0,0,0,0.05);
                      }
                      h1 {
                        color: #333333;
                      }
                      p {
                        color: #555555;
                        line-height: 1.6;
                      }
                      .button {
                          display: inline-block;
                          padding: 12px 24px;
                          margin-top: 20px;
                          background-color: #f8f9fa; 
                          color: #007bff;            
                          text-align: center;
                          text-decoration: none;
                          border-radius: 4px;
                          border: 1px solid #007bff;
                        }
                        .button:hover {
                            background-color: #e2e6ea; 
                            color: #0056b3;          
                            border-color: #0056b3;    
                          }
                      .footer {
                        margin-top: 30px;
                        font-size: 12px;
                        color: #999999;
                        text-align: center;
                      }
                    </style>
                  </head>
                  <body>
                    <div class="container">
                      <h1>Welcome to the DCODE Community! 👋</h1>
                      <p>Hey ${name},</p>
                      <p>
                        Thank you for joining the DCODE waitlist! We're excited to have you on board.
                        You're now part of a community of developers, designers, and learners building the future together.
                      </p>
                      <p>
                        👉 <strong>Next step:</strong> Join our WhatsApp community to stay in the loop, get early updates, and connect with others.
                      </p>
                      <a class="button" href="https://chat.whatsapp.com/KJNLA2R4hDE3M6FK4PK801" target="_blank">
                        Join the WhatsApp Community
                      </a>
                      <p>
                        If you have any questions, feel free to reply to this email. We're always here to help.
                      </p>
                      <p>Cheers,<br/>The DCODE Team</p>
                      <div class="footer">
                        © 2025 DCODE. All rights reserved.
                      </div>
                    </div>
                  </body>
                </html>
                `
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

export const getWaitlistCount = async (req, res) => {
  try {
    const count = await Waitlist.countDocuments();
    res.json({ count });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};
