import api from './api';

// Get all doctors
export const getAllDoctors = async () => {
  try {
    const response = await api.get('/doctors');
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};

// Get single doctor
export const getDoctor = async (id) => {
  try {
    const response = await api.get(`/doctors/${id}`);
    return response.data.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};

// Create doctor
export const createDoctor = async (doctorData) => {
  try {
    const response = await api.post('/doctors', doctorData);
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};

// Update doctor
export const updateDoctor = async (id, doctorData) => {
  try {
    const response = await api.put(`/doctors/${id}`, doctorData);
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};

// Delete doctor
export const deleteDoctor = async (id) => {
  try {
    const response = await api.delete(`/doctors/${id}`);
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};

// Get doctors by department
export const getDoctorsByDepartment = async (departmentId) => {
  try {
    const response = await api.get(`/doctors/department/${departmentId}`);
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};

// Search doctors
export const searchDoctors = async (query) => {
  try {
    const response = await api.get(`/doctors/search/${query}`);
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};

// Get doctor statistics
export const getDoctorStats = async () => {
  try {
    const response = await api.get('/doctors/stats');
    return response.data.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};
