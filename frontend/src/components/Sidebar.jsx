import { Link } from 'react-router-dom';
import '../styles/Sidebar.css';

const Sidebar = () => {
  return (
    <aside className="sidebar">
      <nav className="sidebar-nav">
        <h3 className="sidebar-title">Menu</h3>
        
        <Link to="/dashboard" className="sidebar-link">
          <span className="link-icon">📊</span>
          Dashboard
        </Link>
        
        <Link to="/patients" className="sidebar-link">
          <span className="link-icon">👥</span>
          Patients
        </Link>
        
        <Link to="/doctors" className="sidebar-link">
          <span className="link-icon">👨‍⚕️</span>
          Doctors
        </Link>
        
        <Link to="/appointments" className="sidebar-link">
          <span className="link-icon">📅</span>
          Appointments
        </Link>
        
        <Link to="/departments" className="sidebar-link">
          <span className="link-icon">🏢</span>
          Departments
        </Link>
      </nav>
    </aside>
  );
};

export default Sidebar;
