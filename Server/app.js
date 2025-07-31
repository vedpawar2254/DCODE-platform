import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import healthCheckRoutes from './src/routes/healthCheck.route.js'; // combine all routes

const app = express();
app.use(express.json());
app.use(cors());
app.use(morgan('dev'));
app.use('/api/v1', healthCheckRoutes); // versioned routing

export default app;
