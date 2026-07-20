import { useState, useEffect } from 'react';
import {
  getAllAppointments,
  createAppointment,
  updateAppointment,
  cancelAppointment,
  deleteAppointment,
} from '../services/appointmentService';
import { getAllPatients } from '../services/patientService';
import { getAllDoctors } from '../services/doctorService';
import { getAllDepartments } from '../services/departmentService';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';
import LoadingSpinner from '../components/LoadingSpinner';
import Toast from '../components/Toast';
import '../styles/CRUD.css';

const Appointment = () => {
  const [appointments, setAppointments] = useState([]);
  const [patients, setPatients] = useState([]);
  const [doctors, setDoctors] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [toast, setToast] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({
    patient: '',
    doctor: '',
    department: '',
    appointmentDate: '',
    appointmentTime: '',
    reasonForVisit: '',
    notes: '',
  });

  useEffect(() => {
    fetchAllData();
  }, []);

  const fetchAllData = async () => {
    try {
      const [aptsData, patientsData, doctorsData, deptsData] = await Promise.all([
        getAllAppointments(),
        getAllPatients(),
        getAllDoctors(),
        getAllDepartments(),
      ]);
      setAppointments(aptsData.data || []);
      setPatients(patientsData.data || []);
      setDoctors(doctorsData.data || []);
      setDepartments(deptsData.data || []);
    } catch (error) {
      setToast({ message: 'Failed to load data', type: 'error' });
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (editingId) {
        await updateAppointment(editingId, formData);
        setToast({ message: 'Appointment updated successfully', type: 'success' });
        setEditingId(null);
      } else {
        await createAppointment(formData);
        setToast({ message: 'Appointment created successfully', type: 'success' });
      }

      setFormData({
        patient: '',
        doctor: '',
        department: '',
        appointmentDate: '',
        appointmentTime: '',
        reasonForVisit: '',
        notes: '',
      });
      setShowForm(false);
      fetchAllData();
    } catch (error) {
      setToast({ message: error.message || 'Operation failed', type: 'error' });
    }
  };

  const handleEdit = (apt) => {
    setFormData({
      patient: apt.patient?._id || apt.patient || '',
      doctor: apt.doctor?._id || apt.doctor || '',
      department: apt.department?._id || apt.department || '',
      appointmentDate: apt.appointmentDate
        ? new Date(apt.appointmentDate).toISOString().split('T')[0]
        : '',
      appointmentTime: apt.appointmentTime || '',
      reasonForVisit: apt.reasonForVisit || '',
      notes: apt.notes || '',
    });
    setEditingId(apt._id);
    setShowForm(true);
  };

  const handleCancel = async (id) => {
    if (window.confirm('Cancel this appointment?')) {
      try {
        await cancelAppointment(id);
        setToast({ message: 'Appointment cancelled', type: 'success' });
        fetchAllData();
      } catch (error) {
        setToast({ message: 'Failed to cancel appointment', type: 'error' });
      }
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Delete this appointment?')) {
      try {
        await deleteAppointment(id);
        setToast({ message: 'Appointment deleted', type: 'success' });
        fetchAllData();
      } catch (error) {
        setToast({ message: 'Failed to delete appointment', type: 'error' });
      }
    }
  };

  if (loading) return <LoadingSpinner />;

  return (
    <div className="dashboard-container">
      <Navbar />
      <div className="dashboard-content">
        <Sidebar />
        <main className="main-content">
          <div className="page-header">
            <h1>Appointment Management</h1>
            <button
              className="btn-primary"
              onClick={() => {
                setShowForm(!showForm);
                setEditingId(null);
                setFormData({
                  patient: '',
                  doctor: '',
                  department: '',
                  appointmentDate: '',
                  appointmentTime: '',
                  reasonForVisit: '',
                  notes: '',
                });
              }}
            >
              {showForm ? 'Cancel' : '+ Book Appointment'}
            </button>
          </div>

          {toast && (
            <Toast
              message={toast.message}
              type={toast.type}
              onClose={() => setToast(null)}
            />
          )}

          {showForm && (
            <div className="form-container">
              <h2>{editingId ? 'Edit Appointment' : 'Book Appointment'}</h2>
              <form onSubmit={handleSubmit} className="crud-form">
                <div className="form-row">
                  <div className="form-group">
                    <label>Patient</label>
                    <select
                      name="patient"
                      value={formData.patient}
                      onChange={handleChange}
                      required
                    >
                      <option value="">Select Patient</option>
                      {patients.map((p) => (
                        <option key={p._id} value={p._id}>
                          {p.name}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="form-group">
                    <label>Doctor</label>
                    <select
                      name="doctor"
                      value={formData.doctor}
                      onChange={handleChange}
                      required
                    >
                      <option value="">Select Doctor</option>
                      {doctors.map((d) => (
                        <option key={d._id} value={d._id}>
                          {d.name}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label>Department</label>
                    <select
                      name="department"
                      value={formData.department}
                      onChange={handleChange}
                      required
                    >
                      <option value="">Select Department</option>
                      {departments.map((d) => (
                        <option key={d._id} value={d._id}>
                          {d.name}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label>Appointment Date</label>
                    <input
                      type="date"
                      name="appointmentDate"
                      value={formData.appointmentDate}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label>Appointment Time</label>
                    <input
                      type="time"
                      name="appointmentTime"
                      value={formData.appointmentTime}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label>Reason for Visit</label>
                  <input
                    type="text"
                    name="reasonForVisit"
                    value={formData.reasonForVisit}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="form-group">
                  <label>Notes</label>
                  <textarea
                    name="notes"
                    value={formData.notes}
                    onChange={handleChange}
                    rows="3"
                  ></textarea>
                </div>

                <button type="submit" className="btn-submit">
                  {editingId ? 'Update Appointment' : 'Book Appointment'}
                </button>
              </form>
            </div>
          )}

          <div className="table-responsive">
            <table className="data-table">
              <thead>
                <tr>
                  <th>Patient</th>
                  <th>Doctor</th>
                  <th>Department</th>
                  <th>Date</th>
                  <th>Time</th>
                  <th>Reason</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {appointments.map((apt) => (
                  <tr key={apt._id}>
                    <td>{apt.patient?.name}</td>
                    <td>{apt.doctor?.name}</td>
                    <td>{apt.department?.name}</td>
                    <td>{new Date(apt.appointmentDate).toLocaleDateString()}</td>
                    <td>{apt.appointmentTime}</td>
                    <td>{apt.reasonForVisit}</td>
                    <td>
                      <span className={`status status-${apt.status.toLowerCase()}`}>
                        {apt.status}
                      </span>
                    </td>
                    <td className="actions">
                      <button
                        className="btn-edit"
                        onClick={() => handleEdit(apt)}
                      >
                        Edit
                      </button>
                      {apt.status === 'Scheduled' && (
                        <button
                          className="btn-cancel"
                          onClick={() => handleCancel(apt._id)}
                        >
                          Cancel
                        </button>
                      )}
                      <button
                        className="btn-delete"
                        onClick={() => handleDelete(apt._id)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Appointment;
