import api from './api';

// Get dashboard statistics
export const getDashboardStats = async () => {
  try {
    const response = await api.get('/dashboard/stats');
    return response.data.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};
