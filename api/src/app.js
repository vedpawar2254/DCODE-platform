import express from 'express';
import dotenv from 'dotenv';
import connectDB from './db/db.js';
import waitlistRoutes from './routes/waitlistRoutes.js';

dotenv.config();

connectDB();

const app = express();
app.use(express.json());

app.post('/waitlist', joinWaitlist);
app.use('/api', waitlistRoutes);

export default app;
