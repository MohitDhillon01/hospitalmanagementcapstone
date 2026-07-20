import { useState, useEffect } from 'react';
import {
  getAllPatients,
  createPatient,
  updatePatient,
  deletePatient,
  searchPatients,
} from '../services/patientService';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';
import LoadingSpinner from '../components/LoadingSpinner';
import Toast from '../components/Toast';
import '../styles/CRUD.css';

const Patient = () => {
  const [patients, setPatients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [toast, setToast] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    age: '',
    gender: '',
    phoneNumber: '',
    email: '',
    address: '',
    bloodGroup: '',
    disease: '',
    admissionDate: '',
    medicalHistory: '',
  });

  useEffect(() => {
    fetchPatients();
  }, []);

  const fetchPatients = async () => {
    try {
      const data = await getAllPatients();
      setPatients(data.data || []);
    } catch (error) {
      setToast({
        message: 'Failed to load patients',
        type: 'error',
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = async (e) => {
    const query = e.target.value;
    setSearchQuery(query);

    if (query.trim()) {
      try {
        const data = await searchPatients(query);
        setPatients(data.data || []);
      } catch (error) {
        setToast({
          message: 'Search failed',
          type: 'error',
        });
      }
    } else {
      fetchPatients();
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      if (editingId) {
        await updatePatient(editingId, formData);
        setToast({
          message: 'Patient updated successfully',
          type: 'success',
        });
        setEditingId(null);
      } else {
        await createPatient(formData);
        setToast({
          message: 'Patient created successfully',
          type: 'success',
        });
      }

      setFormData({
        name: '',
        age: '',
        gender: '',
        phoneNumber: '',
        email: '',
        address: '',
        bloodGroup: '',
        disease: '',
        admissionDate: '',
        medicalHistory: '',
      });
      setShowForm(false);
      fetchPatients();
    } catch (error) {
      setToast({
        message: error.message || 'Operation failed',
        type: 'error',
      });
    }
  };

  const handleEdit = (patient) => {
    setFormData(patient);
    setEditingId(patient._id);
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this patient?')) {
      try {
        await deletePatient(id);
        setToast({
          message: 'Patient deleted successfully',
          type: 'success',
        });
        fetchPatients();
      } catch (error) {
        setToast({
          message: 'Failed to delete patient',
          type: 'error',
        });
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
            <h1>Patient Management</h1>
            <button
              className="btn-primary"
              onClick={() => {
                setShowForm(!showForm);
                setEditingId(null);
                setFormData({
                  name: '',
                  age: '',
                  gender: '',
                  phoneNumber: '',
                  email: '',
                  address: '',
                  bloodGroup: '',
                  disease: '',
                  admissionDate: '',
                  medicalHistory: '',
                });
              }}
            >
              {showForm ? 'Cancel' : '+ Add New Patient'}
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
              <h2>{editingId ? 'Edit Patient' : 'Add New Patient'}</h2>
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
                    <label>Age</label>
                    <input
                      type="number"
                      name="age"
                      value={formData.age}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label>Gender</label>
                    <select
                      name="gender"
                      value={formData.gender}
                      onChange={handleChange}
                      required
                    >
                      <option value="">Select Gender</option>
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>
                </div>

                <div className="form-row">
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
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label>Address</label>
                    <input
                      type="text"
                      name="address"
                      value={formData.address}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label>Blood Group</label>
                    <select
                      name="bloodGroup"
                      value={formData.bloodGroup}
                      onChange={handleChange}
                      required
                    >
                      <option value="">Select Blood Group</option>
                      <option value="A+">A+</option>
                      <option value="A-">A-</option>
                      <option value="B+">B+</option>
                      <option value="B-">B-</option>
                      <option value="AB+">AB+</option>
                      <option value="AB-">AB-</option>
                      <option value="O+">O+</option>
                      <option value="O-">O-</option>
                    </select>
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label>Disease/Medical Condition</label>
                    <input
                      type="text"
                      name="disease"
                      value={formData.disease}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label>Admission Date</label>
                    <input
                      type="date"
                      name="admissionDate"
                      value={formData.admissionDate}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label>Medical History</label>
                  <textarea
                    name="medicalHistory"
                    value={formData.medicalHistory}
                    onChange={handleChange}
                    rows="3"
                  ></textarea>
                </div>

                <button type="submit" className="btn-submit">
                  {editingId ? 'Update Patient' : 'Create Patient'}
                </button>
              </form>
            </div>
          )}

          <div className="search-container">
            <input
              type="text"
              placeholder="Search patients by name, email, or phone..."
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
                  <th>Age</th>
                  <th>Gender</th>
                  <th>Phone</th>
                  <th>Email</th>
                  <th>Blood Group</th>
                  <th>Disease</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {patients.map((patient) => (
                  <tr key={patient._id}>
                    <td>{patient.name}</td>
                    <td>{patient.age}</td>
                    <td>{patient.gender}</td>
                    <td>{patient.phoneNumber}</td>
                    <td>{patient.email}</td>
                    <td>{patient.bloodGroup}</td>
                    <td>{patient.disease}</td>
                    <td>
                      <span className={`status status-${patient.status.toLowerCase()}`}>
                        {patient.status}
                      </span>
                    </td>
                    <td className="actions">
                      <button
                        className="btn-edit"
                        onClick={() => handleEdit(patient)}
                      >
                        Edit
                      </button>
                      <button
                        className="btn-delete"
                        onClick={() => handleDelete(patient._id)}
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

export default Patient;
