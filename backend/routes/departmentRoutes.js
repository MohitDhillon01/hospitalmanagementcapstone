import express from 'express';
import {
  getAllDepartments,
  getDepartment,
  createDepartment,
  updateDepartment,
  deleteDepartment,
  getDepartmentStats,
} from '../controllers/departmentController.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

// All routes are protected
router.use(protect);

// Statistics route
router.get('/stats', getDepartmentStats);

// CRUD routes
router.get('/', getAllDepartments);
router.post('/', createDepartment);
router.get('/:id', getDepartment);
router.put('/:id', updateDepartment);
router.delete('/:id', deleteDepartment);

export default router;
