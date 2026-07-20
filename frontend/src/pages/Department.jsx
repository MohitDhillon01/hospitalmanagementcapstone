import { useState, useEffect } from 'react';
import {
  getAllDepartments,
  createDepartment,
  updateDepartment,
  deleteDepartment,
} from '../services/departmentService';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';
import LoadingSpinner from '../components/LoadingSpinner';
import Toast from '../components/Toast';
import '../styles/CRUD.css';

const Department = () => {
  const [departments, setDepartments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [toast, setToast] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    floor: '',
    totalBeds: '',
    availableBeds: '',
    phoneNumber: '',
  });

  useEffect(() => {
    fetchDepartments();
  }, []);

  const fetchDepartments = async () => {
    try {
      const data = await getAllDepartments();
      setDepartments(data.data || []);
    } catch (error) {
      setToast({ message: 'Failed to load departments', type: 'error' });
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
        await updateDepartment(editingId, formData);
        setToast({ message: 'Department updated successfully', type: 'success' });
        setEditingId(null);
      } else {
        await createDepartment(formData);
        setToast({ message: 'Department created successfully', type: 'success' });
      }

      setFormData({
        name: '',
        description: '',
        floor: '',
        totalBeds: '',
        availableBeds: '',
        phoneNumber: '',
      });
      setShowForm(false);
      fetchDepartments();
    } catch (error) {
      setToast({ message: error.message || 'Operation failed', type: 'error' });
    }
  };

  const handleEdit = (dept) => {
    setFormData({
      name: dept.name || '',
      description: dept.description || '',
      floor: dept.floor || '',
      totalBeds: dept.totalBeds || '',
      availableBeds: dept.availableBeds || '',
      phoneNumber: dept.phoneNumber || '',
    });
    setEditingId(dept._id);
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this department?')) {
      try {
        await deleteDepartment(id);
        setToast({ message: 'Department deleted successfully', type: 'success' });
        fetchDepartments();
      } catch (error) {
        setToast({ message: 'Failed to delete department', type: 'error' });
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
            <h1>Department Management</h1>
            <button
              className="btn-primary"
              onClick={() => {
                setShowForm(!showForm);
                setEditingId(null);
                setFormData({
                  name: '',
                  description: '',
                  floor: '',
                  totalBeds: '',
                  availableBeds: '',
                  phoneNumber: '',
                });
              }}
            >
              {showForm ? 'Cancel' : '+ Add New Department'}
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
              <h2>{editingId ? 'Edit Department' : 'Add New Department'}</h2>
              <form onSubmit={handleSubmit} className="crud-form">
                <div className="form-row">
                  <div className="form-group">
                    <label>Department Name</label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label>Floor Number</label>
                    <input
                      type="number"
                      name="floor"
                      value={formData.floor}
                      onChange={handleChange}
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label>Description</label>
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    rows="3"
                  ></textarea>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label>Total Beds</label>
                    <input
                      type="number"
                      name="totalBeds"
                      value={formData.totalBeds}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="form-group">
                    <label>Available Beds</label>
                    <input
                      type="number"
                      name="availableBeds"
                      value={formData.availableBeds}
                      onChange={handleChange}
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label>Phone Number</label>
                  <input
                    type="text"
                    name="phoneNumber"
                    value={formData.phoneNumber}
                    onChange={handleChange}
                  />
                </div>

                <button type="submit" className="btn-submit">
                  {editingId ? 'Update Department' : 'Create Department'}
                </button>
              </form>
            </div>
          )}

          <div className="table-responsive">
            <table className="data-table">
              <thead>
                <tr>
                  <th>Department Name</th>
                  <th>Floor</th>
                  <th>Total Beds</th>
                  <th>Available Beds</th>
                  <th>Phone</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {departments.map((dept) => (
                  <tr key={dept._id}>
                    <td>{dept.name}</td>
                    <td>{dept.floor}</td>
                    <td>{dept.totalBeds}</td>
                    <td>{dept.availableBeds}</td>
                    <td>{dept.phoneNumber}</td>
                    <td>
                      <span className={`status status-${dept.isActive ? 'active' : 'inactive'}`}>
                        {dept.isActive ? 'Active' : 'Inactive'}
                      </span>
                    </td>
                    <td className="actions">
                      <button
                        className="btn-edit"
                        onClick={() => handleEdit(dept)}
                      >
                        Edit
                      </button>
                      <button
                        className="btn-delete"
                        onClick={() => handleDelete(dept._id)}
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

export default Department;
