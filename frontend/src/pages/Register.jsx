import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { register } from '../services/authService';
import Toast from '../components/Toast';
import '../styles/Auth.css';

const Register = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validate passwords
    if (formData.password !== formData.confirmPassword) {
      setToast({
        message: 'Passwords do not match',
        type: 'error',
      });
      return;
    }

    if (formData.password.length < 6) {
      setToast({
        message: 'Password must be at least 6 characters',
        type: 'error',
      });
      return;
    }

    setLoading(true);

    try {
      const response = await register(
        formData.username,
        formData.email,
        formData.password,
        formData.confirmPassword
      );
      
      if (response.success) {
        setToast({
          message: 'Registration successful!',
          type: 'success',
        });
        
        setTimeout(() => {
          navigate('/dashboard');
        }, 1500);
      }
    } catch (error) {
      setToast({
        message: error.message || 'Registration failed. Please try again.',
        type: 'error',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container">
      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}
      
      <div className="auth-box">
        <div className="auth-header">
          <h1>🏥 Hospital Management System</h1>
          <p>Create Admin Account</p>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="username">Username</label>
            <input
              type="text"
              id="username"
              name="username"
              value={formData.username}
              onChange={handleChange}
              required
              placeholder="Enter username"
            />
          </div>

          <div className="form-group">
            <label htmlFor="email">Email Address</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              placeholder="Enter email"
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              placeholder="Enter password (min 6 characters)"
            />
          </div>

          <div className="form-group">
            <label htmlFor="confirmPassword">Confirm Password</label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
              placeholder="Confirm password"
            />
          </div>

          <button type="submit" className="btn-submit" disabled={loading}>
            {loading ? 'Registering...' : 'Register'}
          </button>
        </form>

        <p className="auth-link">
          Already have an account? <Link to="/login">Login here</Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
