import { useState, useEffect } from 'react';
import {
  getAllDoctors,
  createDoctor,
  updateDoctor,
  deleteDoctor,
  searchDoctors,
} from '../services/doctorService';
import { getAllDepartments } from '../services/departmentService';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';
import LoadingSpinner from '../components/LoadingSpinner';
import Toast from '../components/Toast';
import '../styles/CRUD.css';

const Doctor = () => {
  const [doctors, setDoctors] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [toast, setToast] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    department: '',
    qualification: '',
    experience: '',
    email: '',
    phoneNumber: '',
    specialization: '',
    registrationNumber: '',
    consultationFee: '',
  });

  useEffect(() => {
    fetchDoctors();
    fetchDepartments();
  }, []);

  const fetchDoctors = async () => {
    try {
      const data = await getAllDoctors();
      setDoctors(data.data || []);
    } catch (error) {
      setToast({ message: 'Failed to load doctors', type: 'error' });
    } finally {
      setLoading(false);
    }
  };

  const fetchDepartments = async () => {
    try {
      const data = await getAllDepartments();
      setDepartments(data.data || []);
    } catch (error) {
      setToast({ message: 'Failed to load departments', type: 'error' });
    }
  };

  const handleSearch = async (e) => {
    const query = e.target.value;
    setSearchQuery(query);

    if (query.trim()) {
      try {
        const data = await searchDoctors(query);
        setDoctors(data.data || []);
      } catch (error) {
        setToast({ message: 'Search failed', type: 'error' });
      }
    } else {
      fetchDoctors();
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
        await updateDoctor(editingId, formData);
        setToast({ message: 'Doctor updated successfully', type: 'success' });
        setEditingId(null);
      } else {
        await createDoctor(formData);
        setToast({ message: 'Doctor created successfully', type: 'success' });
      }

      setFormData({
        name: '',
        department: '',
        qualification: '',
        experience: '',
        email: '',
        phoneNumber: '',
        specialization: '',
        registrationNumber: '',
        consultationFee: '',
      });
      setShowForm(false);
      fetchDoctors();
    } catch (error) {
      setToast({ message: error.message || 'Operation failed', type: 'error' });
    }
  };

  const handleEdit = (doctor) => {
    setFormData({
      name: doctor.name || '',
      department: doctor.department?._id || doctor.department || '',
      qualification: doctor.qualification || '',
      experience: doctor.experience || '',
      email: doctor.email || '',
      phoneNumber: doctor.phoneNumber || '',
      specialization: doctor.specialization || '',
      registrationNumber: doctor.registrationNumber || '',
      consultationFee: doctor.consultationFee || '',
    });
    setEditingId(doctor._id);
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this doctor?')) {
      try {
        await deleteDoctor(id);
        setToast({ message: 'Doctor deleted successfully', type: 'success' });
        fetchDoctors();
      } catch (error) {
        setToast({ message: 'Failed to delete doctor', type: 'error' });
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
            <h1>Doctor Management</h1>
            <button
              className="btn-primary"
              onClick={() => {
                setShowForm(!showForm);
                setEditingId(null);
                setFormData({
                  name: '',
                  department: '',
                  qualification: '',
                  experience: '',
                  email: '',
                  phoneNumber: '',
                  specialization: '',
                  registrationNumber: '',
                  consultationFee: '',
                });
              }}
            >
              {showForm ? 'Cancel' : '+ Add New Doctor'}
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
              <h2>{editingId ? 'Edit Doctor' : 'Add New Doctor'}</h2>
              <form onSubmit={handleSubmit} className="crud-form">
                <div className="form-row">
                  <div className="form-group">
                    <label>Name</label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label>Department</label>
                    <select
                      name="department"
                      value={formData.department}
                      onChange={handleChange}
                      required
                    >
                      <option value="">Select Department</option>
                      {departments.map((dept) => (
                        <option key={dept._id} value={dept._id}>
                          {dept.name}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label>Qualification</label>
                    <input
                      type="text"
                      name="qualification"
                      value={formData.qualification}
                      onChange={handleChange}
                      placeholder="e.g., MBBS, MD"
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label>Experience (Years)</label>
                    <input
                      type="number"
                      name="experience"
                      value={formData.experience}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label>Email</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label>Phone Number</label>
                    <input
                      type="text"
                      name="phoneNumber"
                      value={formData.phoneNumber}
                      onChange={handleChange}
                      placeholder="10-digit number"
                      required
                    />
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label>Specialization</label>
                    <input
                      type="text"
                      name="specialization"
                      value={formData.specialization}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="form-group">
                    <label>Registration Number</label>
                    <input
                      type="text"
                      name="registrationNumber"
                      value={formData.registrationNumber}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label>Consultation Fee</label>
                  <input
                    type="number"
                    name="consultationFee"
                    value={formData.consultationFee}
                    onChange={handleChange}
                  />
                </div>

                <button type="submit" className="btn-submit">
                  {editingId ? 'Update Doctor' : 'Create Doctor'}
                </button>
              </form>
            </div>
          )}

          <div className="search-container">
            <input
              type="text"
              placeholder="Search doctors..."
              value={searchQuery}
              onChange={handleSearch}
              className="search-input"
            />
          </div>

          <div className="table-responsive">
            <table className="data-table">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Department</th>
                  <th>Qualification</th>
                  <th>Experience</th>
                  <th>Email</th>
                  <th>Phone</th>
                  <th>Availability</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {doctors.map((doctor) => (
                  <tr key={doctor._id}>
                    <td>{doctor.name}</td>
                    <td>{doctor.department?.name}</td>
                    <td>{doctor.qualification}</td>
                    <td>{doctor.experience} yrs</td>
                    <td>{doctor.email}</td>
                    <td>{doctor.phoneNumber}</td>
                    <td>
                      <span className={`status status-${doctor.availability.toLowerCase()}`}>
                        {doctor.availability}
                      </span>
                    </td>
                    <td className="actions">
                      <button
                        className="btn-edit"
                        onClick={() => handleEdit(doctor)}
                      >
                        Edit
                      </button>
                      <button
                        className="btn-delete"
                        onClick={() => handleDelete(doctor._id)}
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

export default Doctor;
