import express from 'express';
import {
  getAllDoctors,
  getDoctor,
  createDoctor,
  updateDoctor,
  deleteDoctor,
  getDoctorsByDepartment,
  searchDoctors,
  getDoctorStats,
} from '../controllers/doctorController.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

// All routes are protected
router.use(protect);

// Statistics route
router.get('/stats', getDoctorStats);

// Search route
router.get('/search/:query', searchDoctors);

// Get doctors by department
router.get('/department/:departmentId', getDoctorsByDepartment);

// CRUD routes
router.get('/', getAllDoctors);
router.post('/', createDoctor);
router.get('/:id', getDoctor);
router.put('/:id', updateDoctor);
router.delete('/:id', deleteDoctor);

export default router;
