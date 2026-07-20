import { useState, useEffect } from 'react';
import { getDashboardStats } from '../services/dashboardService';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';
import LoadingSpinner from '../components/LoadingSpinner';
import Toast from '../components/Toast';
import '../styles/Dashboard.css';

const Dashboard = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [toast, setToast] = useState(null);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const data = await getDashboardStats();
        setStats(data);
      } catch (error) {
        setToast({
          message: 'Failed to load dashboard statistics',
          type: 'error',
        });
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  if (loading) return <LoadingSpinner />;

  return (
    <div className="dashboard-container">
      <Navbar />
      
      <div className="dashboard-content">
        <Sidebar />
        
        <main className="main-content">
          <div className="dashboard-header">
            <h1>Dashboard</h1>
            <p>Welcome back! Here's your hospital overview</p>
          </div>

          {toast && (
            <Toast
              message={toast.message}
              type={toast.type}
              onClose={() => setToast(null)}
            />
          )}

          {/* Statistics Cards */}
          <div className="stats-grid">
            <div className="stat-card primary">
              <div className="stat-icon">👥</div>
              <div className="stat-info">
                <h3>Total Patients</h3>
                <p className="stat-number">{stats?.totalCounts?.totalPatients || 0}</p>
              </div>
            </div>

            <div className="stat-card secondary">
              <div className="stat-icon">👨‍⚕️</div>
              <div className="stat-info">
                <h3>Total Doctors</h3>
                <p className="stat-number">{stats?.totalCounts?.totalDoctors || 0}</p>
              </div>
            </div>

            <div className="stat-card success">
              <div className="stat-icon">📅</div>
              <div className="stat-info">
                <h3>Total Appointments</h3>
                <p className="stat-number">{stats?.totalCounts?.totalAppointments || 0}</p>
              </div>
            </div>

            <div className="stat-card warning">
              <div className="stat-icon">🏢</div>
              <div className="stat-info">
                <h3>Total Departments</h3>
                <p className="stat-number">{stats?.totalCounts?.totalDepartments || 0}</p>
              </div>
            </div>
          </div>

          {/* Secondary Statistics */}
          <div className="secondary-stats">
            <div className="stats-section">
              <h2>Appointment Status</h2>
              <div className="sub-stats">
                <div className="sub-stat">
                  <span>Scheduled</span>
                  <span className="number">{stats?.appointmentStats?.scheduled || 0}</span>
                </div>
                <div className="sub-stat">
                  <span>Completed</span>
                  <span className="number">{stats?.appointmentStats?.completed || 0}</span>
                </div>
                <div className="sub-stat">
                  <span>Cancelled</span>
                  <span className="number">{stats?.appointmentStats?.cancelled || 0}</span>
                </div>
              </div>
            </div>

            <div className="stats-section">
              <h2>Doctor Availability</h2>
              <div className="sub-stats">
                <div className="sub-stat">
                  <span>Available</span>
                  <span className="number">{stats?.doctorStats?.available || 0}</span>
                </div>
                <div className="sub-stat">
                  <span>On Leave</span>
                  <span className="number">{stats?.doctorStats?.onLeave || 0}</span>
                </div>
              </div>
            </div>

            <div className="stats-section">
              <h2>Patient Status</h2>
              <div className="sub-stats">
                <div className="sub-stat">
                  <span>Active</span>
                  <span className="number">{stats?.patientStats?.active || 0}</span>
                </div>
                <div className="sub-stat">
                  <span>Discharged</span>
                  <span className="number">{stats?.patientStats?.discharged || 0}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Recent Data */}
          <div className="recent-section">
            <h2>Recent Appointments</h2>
            <div className="table-responsive">
              <table className="data-table">
                <thead>
                  <tr>
                    <th>Patient</th>
                    <th>Doctor</th>
                    <th>Date</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {stats?.recentAppointments?.slice(0, 5).map((apt) => (
                    <tr key={apt._id}>
                      <td>{apt.patient?.name}</td>
                      <td>{apt.doctor?.name}</td>
                      <td>{new Date(apt.appointmentDate).toLocaleDateString()}</td>
                      <td className={`status status-${apt.status.toLowerCase()}`}>
                        {apt.status}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
