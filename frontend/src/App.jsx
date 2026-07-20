import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import ProtectedRoute from './components/ProtectedRoute';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import Patient from './pages/Patient';
import Doctor from './pages/Doctor';
import Appointment from './pages/Appointment';
import Department from './pages/Department';
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        
        <Route
          path="/patients"
          element={
            <ProtectedRoute>
              <Patient />
            </ProtectedRoute>
          }
        />
        
        <Route
          path="/doctors"
          element={
            <ProtectedRoute>
              <Doctor />
            </ProtectedRoute>
          }
        />
        
        <Route
          path="/appointments"
          element={
            <ProtectedRoute>
              <Appointment />
            </ProtectedRoute>
          }
        />
        
        <Route
          path="/departments"
          element={
            <ProtectedRoute>
              <Department />
            </ProtectedRoute>
          }
        />
        
        <Route path="/" element={<Navigate to="/dashboard" replace />} />
        <Route path="*" element={<Navigate to="/dashboard" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
