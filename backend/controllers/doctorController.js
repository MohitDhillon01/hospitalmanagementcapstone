import Doctor from '../models/Doctor.js';
import Department from '../models/Department.js';

/**
 * Get All Doctors
 * GET /api/doctors
 */
export const getAllDoctors = async (req, res) => {
  try {
    const doctors = await Doctor.find()
      .populate('department', 'name')
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: doctors.length,
      data: doctors,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

/**
 * Get Single Doctor
 * GET /api/doctors/:id
 */
export const getDoctor = async (req, res) => {
  try {
    const doctor = await Doctor.findById(req.params.id).populate(
      'department',
      'name'
    );

    if (!doctor) {
      return res.status(404).json({
        success: false,
        message: 'Doctor not found',
      });
    }

    res.status(200).json({
      success: true,
      data: doctor,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

/**
 * Create Doctor
 * POST /api/doctors
 */
export const createDoctor = async (req, res) => {
  try {
    const {
      name,
      department,
      qualification,
      experience,
      email,
      phoneNumber,
      specialization,
      registrationNumber,
      consultationFee,
    } = req.body;

    // Validate required fields
    if (
      !name ||
      !department ||
      !qualification ||
      experience === undefined ||
      !email ||
      !phoneNumber ||
      !registrationNumber
    ) {
      return res.status(400).json({
        success: false,
        message: 'Please provide all required fields',
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

    // Check if doctor with same email already exists
    const existingDoctor = await Doctor.findOne({ email });
    if (existingDoctor) {
      return res.status(400).json({
        success: false,
        message: 'Doctor with this email already exists',
      });
    }

    // Check if registration number already exists
    const regExists = await Doctor.findOne({ registrationNumber });
    if (regExists) {
      return res.status(400).json({
        success: false,
        message: 'Doctor with this registration number already exists',
      });
    }

    const doctor = await Doctor.create({
      name,
      department,
      qualification,
      experience,
      email,
      phoneNumber,
      specialization,
      registrationNumber,
      consultationFee,
    });

    res.status(201).json({
      success: true,
      message: 'Doctor created successfully',
      data: doctor,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

/**
 * Update Doctor
 * PUT /api/doctors/:id
 */
export const updateDoctor = async (req, res) => {
  try {
    let doctor = await Doctor.findById(req.params.id);

    if (!doctor) {
      return res.status(404).json({
        success: false,
        message: 'Doctor not found',
      });
    }

    // Check if email is being changed and if new email already exists
    if (req.body.email && req.body.email !== doctor.email) {
      const existingDoctor = await Doctor.findOne({ email: req.body.email });
      if (existingDoctor) {
        return res.status(400).json({
          success: false,
          message: 'Doctor with this email already exists',
        });
      }
    }

    // Check if department exists
    if (req.body.department) {
      const deptExists = await Department.findById(req.body.department);
      if (!deptExists) {
        return res.status(404).json({
          success: false,
          message: 'Department not found',
        });
      }
    }

    // Update doctor
    doctor = await Doctor.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    }).populate('department', 'name');

    res.status(200).json({
      success: true,
      message: 'Doctor updated successfully',
      data: doctor,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

/**
 * Delete Doctor
 * DELETE /api/doctors/:id
 */
export const deleteDoctor = async (req, res) => {
  try {
    const doctor = await Doctor.findByIdAndDelete(req.params.id);

    if (!doctor) {
      return res.status(404).json({
        success: false,
        message: 'Doctor not found',
      });
    }

    res.status(200).json({
      success: true,
      message: 'Doctor deleted successfully',
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

/**
 * Get Doctors by Department
 * GET /api/doctors/department/:departmentId
 */
export const getDoctorsByDepartment = async (req, res) => {
  try {
    const doctors = await Doctor.find({ department: req.params.departmentId })
      .populate('department', 'name')
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: doctors.length,
      data: doctors,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

/**
 * Search Doctors
 * GET /api/doctors/search/:query
 */
export const searchDoctors = async (req, res) => {
  try {
    const { query } = req.params;

    const doctors = await Doctor.find({
      $or: [
        { name: { $regex: query, $options: 'i' } },
        { email: { $regex: query, $options: 'i' } },
        { specialization: { $regex: query, $options: 'i' } },
      ],
    }).populate('department', 'name');

    res.status(200).json({
      success: true,
      count: doctors.length,
      data: doctors,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

/**
 * Get Doctor Statistics
 * GET /api/doctors/stats
 */
export const getDoctorStats = async (req, res) => {
  try {
    const totalDoctors = await Doctor.countDocuments();
    const availableDoctors = await Doctor.countDocuments({
      availability: 'Available',
    });
    const onLeaveDoctors = await Doctor.countDocuments({
      availability: 'On Leave',
    });

    res.status(200).json({
      success: true,
      data: {
        totalDoctors,
        availableDoctors,
        onLeaveDoctors,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
