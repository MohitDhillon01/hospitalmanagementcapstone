import Patient from '../models/Patient.js';

/**
 * Get All Patients
 * GET /api/patients
 */
export const getAllPatients = async (req, res) => {
  try {
    const patients = await Patient.find().sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: patients.length,
      data: patients,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

/**
 * Get Single Patient
 * GET /api/patients/:id
 */
export const getPatient = async (req, res) => {
  try {
    const patient = await Patient.findById(req.params.id);

    if (!patient) {
      return res.status(404).json({
        success: false,
        message: 'Patient not found',
      });
    }

    res.status(200).json({
      success: true,
      data: patient,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

/**
 * Create Patient
 * POST /api/patients
 */
export const createPatient = async (req, res) => {
  try {
    const {
      name,
      age,
      gender,
      phoneNumber,
      email,
      address,
      bloodGroup,
      disease,
      admissionDate,
      medicalHistory,
    } = req.body;

    // Validate required fields
    if (
      !name ||
      !age ||
      !gender ||
      !phoneNumber ||
      !email ||
      !address ||
      !bloodGroup ||
      !disease ||
      !admissionDate
    ) {
      return res.status(400).json({
        success: false,
        message: 'Please provide all required fields',
      });
    }

    // Check if patient with same phone already exists
    const existingPatient = await Patient.findOne({ phoneNumber });
    if (existingPatient) {
      return res.status(400).json({
        success: false,
        message: 'Patient with this phone number already exists',
      });
    }

    const patient = await Patient.create({
      name,
      age,
      gender,
      phoneNumber,
      email,
      address,
      bloodGroup,
      disease,
      admissionDate,
      medicalHistory,
    });

    res.status(201).json({
      success: true,
      message: 'Patient created successfully',
      data: patient,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

/**
 * Update Patient
 * PUT /api/patients/:id
 */
export const updatePatient = async (req, res) => {
  try {
    let patient = await Patient.findById(req.params.id);

    if (!patient) {
      return res.status(404).json({
        success: false,
        message: 'Patient not found',
      });
    }

    // Check if phone number is being changed and if new phone already exists
    if (req.body.phoneNumber && req.body.phoneNumber !== patient.phoneNumber) {
      const existingPatient = await Patient.findOne({
        phoneNumber: req.body.phoneNumber,
      });
      if (existingPatient) {
        return res.status(400).json({
          success: false,
          message: 'Patient with this phone number already exists',
        });
      }
    }

    // Update patient
    patient = await Patient.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    res.status(200).json({
      success: true,
      message: 'Patient updated successfully',
      data: patient,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

/**
 * Delete Patient
 * DELETE /api/patients/:id
 */
export const deletePatient = async (req, res) => {
  try {
    const patient = await Patient.findByIdAndDelete(req.params.id);

    if (!patient) {
      return res.status(404).json({
        success: false,
        message: 'Patient not found',
      });
    }

    res.status(200).json({
      success: true,
      message: 'Patient deleted successfully',
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

/**
 * Search Patients
 * GET /api/patients/search/:query
 */
export const searchPatients = async (req, res) => {
  try {
    const { query } = req.params;

    const patients = await Patient.find({
      $or: [
        { name: { $regex: query, $options: 'i' } },
        { email: { $regex: query, $options: 'i' } },
        { phoneNumber: { $regex: query, $options: 'i' } },
        { address: { $regex: query, $options: 'i' } },
      ],
    });

    res.status(200).json({
      success: true,
      count: patients.length,
      data: patients,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

/**
 * Get Patient Statistics
 * GET /api/patients/stats
 */
export const getPatientStats = async (req, res) => {
  try {
    const totalPatients = await Patient.countDocuments();
    const activePatients = await Patient.countDocuments({ status: 'Admitted' });
    const dischargedPatients = await Patient.countDocuments({
      status: 'Discharged',
    });

    res.status(200).json({
      success: true,
      data: {
        totalPatients,
        activePatients,
        dischargedPatients,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
