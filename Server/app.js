import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import routes from './routes/index.js'; // combine all routes

const app = express();
app.use(express.json());
app.use(cors());
app.use(morgan('dev'));
app.use('/api/v1', routes); // versioned routing

export default app;
