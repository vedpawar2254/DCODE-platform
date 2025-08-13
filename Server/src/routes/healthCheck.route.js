import express from 'express';
const healthCheckRoutes = express.Router();

healthCheckRoutes.get('/', (req, res) => {
  res.status(200).json({ status: 'ok', message: 'Server is healthy' });
});

export default healthCheckRoutes;
