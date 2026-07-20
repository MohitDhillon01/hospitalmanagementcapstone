import api from './api';

// Get all departments
export const getAllDepartments = async () => {
  try {
    const response = await api.get('/departments');
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};

// Get single department
export const getDepartment = async (id) => {
  try {
    const response = await api.get(`/departments/${id}`);
    return response.data.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};

// Create department
export const createDepartment = async (departmentData) => {
  try {
    const response = await api.post('/departments', departmentData);
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};

// Update department
export const updateDepartment = async (id, departmentData) => {
  try {
    const response = await api.put(`/departments/${id}`, departmentData);
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};

// Delete department
export const deleteDepartment = async (id) => {
  try {
    const response = await api.delete(`/departments/${id}`);
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};

// Get department statistics
export const getDepartmentStats = async () => {
  try {
    const response = await api.get('/departments/stats');
    return response.data.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};
