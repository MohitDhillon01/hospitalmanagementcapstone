import Appointment from '../models/Appointment.js';
import Patient from '../models/Patient.js';
import Doctor from '../models/Doctor.js';
import Department from '../models/Department.js';

/**
 * Get All Appointments
 * GET /api/appointments
 */
export const getAllAppointments = async (req, res) => {
  try {
    const appointments = await Appointment.find()
      .populate('patient', 'name email phoneNumber')
      .populate('doctor', 'name email specialization')
      .populate('department', 'name')
      .sort({ appointmentDate: -1 });

    res.status(200).json({
      success: true,
      count: appointments.length,
      data: appointments,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

/**
 * Get Single Appointment
 * GET /api/appointments/:id
 */
export const getAppointment = async (req, res) => {
  try {
    const appointment = await Appointment.findById(req.params.id)
      .populate('patient')
      .populate('doctor')
      .populate('department');

    if (!appointment) {
      return res.status(404).json({
        success: false,
        message: 'Appointment not found',
      });
    }

    res.status(200).json({
      success: true,
      data: appointment,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

/**
 * Create Appointment
 * POST /api/appointments
 */
export const createAppointment = async (req, res) => {
  try {
    const {
      patient,
      doctor,
      department,
      appointmentDate,
      appointmentTime,
      reasonForVisit,
      notes,
    } = req.body;

    // Validate required fields
    if (
      !patient ||
      !doctor ||
      !department ||
      !appointmentDate ||
      !appointmentTime ||
      !reasonForVisit
    ) {
      return res.status(400).json({
        success: false,
        message: 'Please provide all required fields',
      });
    }

    // Check if patient exists
    const patientExists = await Patient.findById(patient);
    if (!patientExists) {
      return res.status(404).json({
        success: false,
        message: 'Patient not found',
      });
    }

    // Check if doctor exists
    const doctorExists = await Doctor.findById(doctor);
    if (!doctorExists) {
      return res.status(404).json({
        success: false,
        message: 'Doctor not found',
      });
    }

    // Check if department exists
    const deptExists = await Department.findById(department);
    if (!deptExists) {
      return res.status(404).json({
        success: false,
        message: 'Department not found',
      });
    }

    // Check if appointment date is in future
    const appointmentDateObj = new Date(appointmentDate);
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    if (appointmentDateObj < today) {
      return res.status(400).json({
        success: false,
        message: 'Appointment date must be in the future',
      });
    }

    const appointment = await Appointment.create({
      patient,
      doctor,
      department,
      appointmentDate,
      appointmentTime,
      reasonForVisit,
      notes,
    });

    res.status(201).json({
      success: true,
      message: 'Appointment created successfully',
      data: appointment,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

/**
 * Update Appointment
 * PUT /api/appointments/:id
 */
export const updateAppointment = async (req, res) => {
  try {
    let appointment = await Appointment.findById(req.params.id);

    if (!appointment) {
      return res.status(404).json({
        success: false,
        message: 'Appointment not found',
      });
    }

    // Validate doctor if being changed
    if (req.body.doctor && req.body.doctor !== appointment.doctor.toString()) {
      const doctorExists = await Doctor.findById(req.body.doctor);
      if (!doctorExists) {
        return res.status(404).json({
          success: false,
          message: 'Doctor not found',
        });
      }
    }

    // Update appointment
    appointment = await Appointment.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    })
      .populate('patient', 'name email phoneNumber')
      .populate('doctor', 'name email specialization')
      .populate('department', 'name');

    res.status(200).json({
      success: true,
      message: 'Appointment updated successfully',
      data: appointment,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

/**
 * Cancel Appointment
 * PATCH /api/appointments/:id/cancel
 */
export const cancelAppointment = async (req, res) => {
  try {
    const appointment = await Appointment.findByIdAndUpdate(
      req.params.id,
      { status: 'Cancelled' },
      { new: true }
    )
      .populate('patient', 'name email phoneNumber')
      .populate('doctor', 'name email specialization')
      .populate('department', 'name');

    if (!appointment) {
      return res.status(404).json({
        success: false,
        message: 'Appointment not found',
      });
    }

    res.status(200).json({
      success: true,
      message: 'Appointment cancelled successfully',
      data: appointment,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

/**
 * Delete Appointment
 * DELETE /api/appointments/:id
 */
export const deleteAppointment = async (req, res) => {
  try {
    const appointment = await Appointment.findByIdAndDelete(req.params.id);

    if (!appointment) {
      return res.status(404).json({
        success: false,
        message: 'Appointment not found',
      });
    }

    res.status(200).json({
      success: true,
      message: 'Appointment deleted successfully',
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

/**
 * Get Appointments by Patient
 * GET /api/appointments/patient/:patientId
 */
export const getAppointmentsByPatient = async (req, res) => {
  try {
    const appointments = await Appointment.find({ patient: req.params.patientId })
      .populate('patient', 'name email phoneNumber')
      .populate('doctor', 'name email specialization')
      .populate('department', 'name')
      .sort({ appointmentDate: -1 });

    res.status(200).json({
      success: true,
      count: appointments.length,
      data: appointments,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

/**
 * Get Appointments by Doctor
 * GET /api/appointments/doctor/:doctorId
 */
export const getAppointmentsByDoctor = async (req, res) => {
  try {
    const appointments = await Appointment.find({ doctor: req.params.doctorId })
      .populate('patient', 'name email phoneNumber')
      .populate('doctor', 'name email specialization')
      .populate('department', 'name')
      .sort({ appointmentDate: -1 });

    res.status(200).json({
      success: true,
      count: appointments.length,
      data: appointments,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

/**
 * Get Appointment Statistics
 * GET /api/appointments/stats
 */
export const getAppointmentStats = async (req, res) => {
  try {
    const totalAppointments = await Appointment.countDocuments();
    const scheduledAppointments = await Appointment.countDocuments({
      status: 'Scheduled',
    });
    const completedAppointments = await Appointment.countDocuments({
      status: 'Completed',
    });
    const cancelledAppointments = await Appointment.countDocuments({
      status: 'Cancelled',
    });

    res.status(200).json({
      success: true,
      data: {
        totalAppointments,
        scheduledAppointments,
        completedAppointments,
        cancelledAppointments,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
