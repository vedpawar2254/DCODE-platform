import express from 'express';
import dotenv from 'dotenv';
import connectDB from './db/db.js';
import waitlistRoutes from './routes/waitlistRoutes.js';
import cors from 'cors';

dotenv.config();

connectDB();

const app = express();
app.use(express.json());
app.use(
  cors({
    origin: [
      'https://dcode.codes',
      'https://api.dcode.codes',
      'http://localhost:5173'
    ],
    credentials: true
  })
);

app.get('/', (req, res) => {
  res.send('backend up');
});

app.use('/api', waitlistRoutes);

export default app;
