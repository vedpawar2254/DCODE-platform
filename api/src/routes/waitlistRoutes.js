import express from 'express';
import {
  joinWaitlist,
  getWaitlistCount,
  WaitlistExtraInfo
} from '../controllers/waitlist.controller.js';


const router = express.Router();

router.post('/waitlist/join', joinWaitlist);
router.get('/waitlist/count', getWaitlistCount);
router.patch("/waitlist/update", WaitlistExtraInfo)

export default router;
