import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { login } from '../services/authService';
import Toast from '../components/Toast';
import '../styles/Auth.css';

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
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
    setLoading(true);

    try {
      const response = await login(formData.email, formData.password);
      
      if (response.success) {
        setToast({
          message: 'Login successful!',
          type: 'success',
        });
        
        setTimeout(() => {
          navigate('/dashboard');
        }, 1500);
      }
    } catch (error) {
      setToast({
        message: error.message || 'Login failed. Please try again.',
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
          <p>Admin Login</p>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="email">Email Address</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              placeholder="Enter your email"
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
              placeholder="Enter your password"
            />
          </div>

          <button type="submit" className="btn-submit" disabled={loading}>
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>

        <p className="auth-link">
          Don't have an account? <Link to="/register">Register here</Link>
        </p>

        <div className="demo-credentials">
          <p><strong>Demo Credentials:</strong></p>
          <p>Email: admin@hospital.com</p>
          <p>Password: admin123</p>
        </div>
      </div>
    </div>
  );
};

export default Login;
