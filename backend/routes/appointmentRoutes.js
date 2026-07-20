import express from 'express';
import {
  getAllAppointments,
  getAppointment,
  createAppointment,
  updateAppointment,
  cancelAppointment,
  deleteAppointment,
  getAppointmentsByPatient,
  getAppointmentsByDoctor,
  getAppointmentStats,
} from '../controllers/appointmentController.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

// All routes are protected
router.use(protect);

// Statistics route
router.get('/stats', getAppointmentStats);

// Get appointments by patient
router.get('/patient/:patientId', getAppointmentsByPatient);

// Get appointments by doctor
router.get('/doctor/:doctorId', getAppointmentsByDoctor);

// Cancel appointment
router.patch('/:id/cancel', cancelAppointment);

// CRUD routes
router.get('/', getAllAppointments);
router.post('/', createAppointment);
router.get('/:id', getAppointment);
router.put('/:id', updateAppointment);
router.delete('/:id', deleteAppointment);

export default router;
