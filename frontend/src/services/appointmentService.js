import api from './api';

// Get all appointments
export const getAllAppointments = async () => {
  try {
    const response = await api.get('/appointments');
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};

// Get single appointment
export const getAppointment = async (id) => {
  try {
    const response = await api.get(`/appointments/${id}`);
    return response.data.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};

// Create appointment
export const createAppointment = async (appointmentData) => {
  try {
    const response = await api.post('/appointments', appointmentData);
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};

// Update appointment
export const updateAppointment = async (id, appointmentData) => {
  try {
    const response = await api.put(`/appointments/${id}`, appointmentData);
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};

// Cancel appointment
export const cancelAppointment = async (id) => {
  try {
    const response = await api.patch(`/appointments/${id}/cancel`);
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};

// Delete appointment
export const deleteAppointment = async (id) => {
  try {
    const response = await api.delete(`/appointments/${id}`);
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};

// Get appointments by patient
export const getAppointmentsByPatient = async (patientId) => {
  try {
    const response = await api.get(`/appointments/patient/${patientId}`);
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};

// Get appointments by doctor
export const getAppointmentsByDoctor = async (doctorId) => {
  try {
    const response = await api.get(`/appointments/doctor/${doctorId}`);
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};

// Get appointment statistics
export const getAppointmentStats = async () => {
  try {
    const response = await api.get('/appointments/stats');
    return response.data.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};
