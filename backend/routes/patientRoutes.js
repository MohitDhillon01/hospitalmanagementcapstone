import express from 'express';
import {
  getAllPatients,
  getPatient,
  createPatient,
  updatePatient,
  deletePatient,
  searchPatients,
  getPatientStats,
} from '../controllers/patientController.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

// All routes are protected
router.use(protect);

// Statistics route
router.get('/stats', getPatientStats);

// Search route
router.get('/search/:query', searchPatients);

// CRUD routes
router.get('/', getAllPatients);
router.post('/', createPatient);
router.get('/:id', getPatient);
router.put('/:id', updatePatient);
router.delete('/:id', deletePatient);

export default router;
