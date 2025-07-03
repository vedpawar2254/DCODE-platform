import express from 'express';
import {
  joinWaitlist,
  getWaitlistCount
} from '../controllers/waitlistController.js';

const router = express.Router();

router.post('/waitlist', joinWaitlist);
router.get('/waitlist/count', getWaitlistCount);

export default router;
