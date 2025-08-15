import express from 'express';
import {
  githubStart,
  githubCallback,
  logout
} from '../controllers/auth.controller.js';

const router = express.Router();
router.get('/github', githubStart);
router.get('/github/callback', githubCallback);
router.post('/logout', logout);

export default router;
