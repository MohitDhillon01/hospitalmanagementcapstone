import Department from '../models/Department.js';
import Doctor from '../models/Doctor.js';

/**
 * Get All Departments
 * GET /api/departments
 */
export const getAllDepartments = async (req, res) => {
  try {
    const departments = await Department.find()
      .populate('head', 'name email')
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: departments.length,
      data: departments,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

/**
 * Get Single Department
 * GET /api/departments/:id
 */
export const getDepartment = async (req, res) => {
  try {
    const department = await Department.findById(req.params.id).populate(
      'head',
      'name email'
    );

    if (!department) {
      return res.status(404).json({
        success: false,
        message: 'Department not found',
      });
    }

    res.status(200).json({
      success: true,
      data: department,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

/**
 * Create Department
 * POST /api/departments
 */
export const createDepartment = async (req, res) => {
  try {
    const {
      name,
      description,
      head,
      floor,
      totalBeds,
      availableBeds,
      phoneNumber,
    } = req.body;

    // Validate required fields
    if (!name) {
      return res.status(400).json({
        success: false,
        message: 'Please provide department name',
      });
    }

    // Check if department already exists
    const existingDept = await Department.findOne({ name });
    if (existingDept) {
      return res.status(400).json({
        success: false,
        message: 'Department with this name already exists',
      });
    }

    // Check if head (doctor) exists
    if (head) {
      const headExists = await Doctor.findById(head);
      if (!headExists) {
        return res.status(404).json({
          success: false,
          message: 'Doctor (head) not found',
        });
      }
    }

    const department = await Department.create({
      name,
      description,
      head,
      floor,
      totalBeds,
      availableBeds,
      phoneNumber,
    });

    res.status(201).json({
      success: true,
      message: 'Department created successfully',
      data: department,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

/**
 * Update Department
 * PUT /api/departments/:id
 */
export const updateDepartment = async (req, res) => {
  try {
    let department = await Department.findById(req.params.id);

    if (!department) {
      return res.status(404).json({
        success: false,
        message: 'Department not found',
      });
    }

    // Check if name is being changed and if new name already exists
    if (req.body.name && req.body.name !== department.name) {
      const existingDept = await Department.findOne({ name: req.body.name });
      if (existingDept) {
        return res.status(400).json({
          success: false,
          message: 'Department with this name already exists',
        });
      }
    }

    // Check if head (doctor) exists
    if (req.body.head) {
      const headExists = await Doctor.findById(req.body.head);
      if (!headExists) {
        return res.status(404).json({
          success: false,
          message: 'Doctor (head) not found',
        });
      }
    }

    // Update department
    department = await Department.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    }).populate('head', 'name email');

    res.status(200).json({
      success: true,
      message: 'Department updated successfully',
      data: department,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

/**
 * Delete Department
 * DELETE /api/departments/:id
 */
export const deleteDepartment = async (req, res) => {
  try {
    const department = await Department.findByIdAndDelete(req.params.id);

    if (!department) {
      return res.status(404).json({
        success: false,
        message: 'Department not found',
      });
    }

    res.status(200).json({
      success: true,
      message: 'Department deleted successfully',
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

/**
 * Get Department Statistics
 * GET /api/departments/stats
 */
export const getDepartmentStats = async (req, res) => {
  try {
    const totalDepartments = await Department.countDocuments();
    const activeDepartments = await Department.countDocuments({
      isActive: true,
    });

    res.status(200).json({
      success: true,
      data: {
        totalDepartments,
        activeDepartments,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
