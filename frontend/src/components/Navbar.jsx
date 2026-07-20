import { Link, useNavigate } from 'react-router-dom';
import { logout } from '../services/authService';
import '../styles/Navbar.css';

const Navbar = () => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('user') || '{}');

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/dashboard" className="navbar-logo">
          <span className="logo-icon">🏥</span>
          Hospital Management
        </Link>
        
        <div className="navbar-menu">
          <div className="navbar-user">
            <span className="user-welcome">Welcome, {user.username || 'Admin'}</span>
            <button className="logout-btn" onClick={handleLogout}>
              Logout
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
