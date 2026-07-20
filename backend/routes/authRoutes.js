import express from 'express';
import {
  register,
  login,
  getMe,
  logout,
} from '../controllers/authController.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

// Public Routes
router.post('/register', register);
router.post('/login', login);

// Protected Routes
router.get('/me', protect, getMe);
router.get('/logout', protect, logout);

export default router;
