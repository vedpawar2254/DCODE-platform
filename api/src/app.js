import express from 'express';
import dotenv from 'dotenv';
import connectDB from './db/db.js';
import waitlistRoutes from './routes/waitlistRoutes.js';
import cors from 'cors';

dotenv.config();

connectDB();

const app = express();
app.use(express.json());
app.use(cors());

app.use('/api', waitlistRoutes);

export default app;
