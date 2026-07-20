import Patient from '../models/Patient.js';
import Doctor from '../models/Doctor.js';
import Appointment from '../models/Appointment.js';
import Department from '../models/Department.js';

/**
 * Get Dashboard Statistics
 * GET /api/dashboard/stats
 */
export const getDashboardStats = async (req, res) => {
  try {
    // Count total records
    const totalPatients = await Patient.countDocuments();
    const totalDoctors = await Doctor.countDocuments();
    const totalAppointments = await Appointment.countDocuments();
    const totalDepartments = await Department.countDocuments();

    // Count appointments by status
    const scheduledAppointments = await Appointment.countDocuments({
      status: 'Scheduled',
    });
    const completedAppointments = await Appointment.countDocuments({
      status: 'Completed',
    });
    const cancelledAppointments = await Appointment.countDocuments({
      status: 'Cancelled',
    });

    // Count patient status
    const activePatients = await Patient.countDocuments({ status: 'Admitted' });
    const dischargedPatients = await Patient.countDocuments({
      status: 'Discharged',
    });

    // Count doctor availability
    const availableDoctors = await Doctor.countDocuments({
      availability: 'Available',
    });
    const onLeaveDoctors = await Doctor.countDocuments({
      availability: 'On Leave',
    });

    // Get recent appointments
    const recentAppointments = await Appointment.find()
      .populate('patient', 'name email phoneNumber')
      .populate('doctor', 'name email specialization')
      .populate('department', 'name')
      .limit(10)
      .sort({ appointmentDate: -1 });

    // Get recent patients
    const recentPatients = await Patient.find()
      .limit(10)
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      data: {
        totalCounts: {
          totalPatients,
          totalDoctors,
          totalAppointments,
          totalDepartments,
        },
        appointmentStats: {
          scheduled: scheduledAppointments,
          completed: completedAppointments,
          cancelled: cancelledAppointments,
        },
        patientStats: {
          active: activePatients,
          discharged: dischargedPatients,
        },
        doctorStats: {
          available: availableDoctors,
          onLeave: onLeaveDoctors,
        },
        recentAppointments,
        recentPatients,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
