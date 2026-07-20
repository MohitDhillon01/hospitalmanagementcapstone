import api from './api';

// Get all patients
export const getAllPatients = async () => {
  try {
    const response = await api.get('/patients');
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};

// Get single patient
export const getPatient = async (id) => {
  try {
    const response = await api.get(`/patients/${id}`);
    return response.data.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};

// Create patient
export const createPatient = async (patientData) => {
  try {
    const response = await api.post('/patients', patientData);
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};

// Update patient
export const updatePatient = async (id, patientData) => {
  try {
    const response = await api.put(`/patients/${id}`, patientData);
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};

// Delete patient
export const deletePatient = async (id) => {
  try {
    const response = await api.delete(`/patients/${id}`);
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};

// Search patients
export const searchPatients = async (query) => {
  try {
    const response = await api.get(`/patients/search/${query}`);
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};

// Get patient statistics
export const getPatientStats = async () => {
  try {
    const response = await api.get('/patients/stats');
    return response.data.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};
