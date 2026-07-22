import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
console.log("🔥🔥🔥 NEW DEPLOY WORKING");
import connectDB from './config/db.js';
import authRoutes from './routes/authRoutes.js';
import patientRoutes from './routes/patientRoutes.js';
import doctorRoutes from './routes/doctorRoutes.js';
import appointmentRoutes from './routes/appointmentRoutes.js';
import departmentRoutes from './routes/departmentRoutes.js';
import dashboardRoutes from './routes/dashboardRoutes.js';


// Load environment variables
dotenv.config();

// Create Express app
const app = express();

// Middleware
app.use(cors({
  origin: true,
  credentials: true,
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Connect to MongoDB
connectDB();

// ✅ Root Route
app.get('/', (req, res) => {
  res.status(200).json({
    success: true,
    message: '🏥 Hospital Management Backend is Running Successfully!',
    developer: 'Mohit Dhillon',
    health: '/api/health',
  });
});

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/patients', patientRoutes);
app.use('/api/doctors', doctorRoutes);
app.use('/api/appointments', appointmentRoutes);
app.use('/api/departments', departmentRoutes);
app.use('/api/dashboard', dashboardRoutes);

// Health Check Route
app.get('/api/health', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'Server is running',
  });
});

// Error Handling Middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    success: false,
    message: err.message || 'Server Error',
  });
});

// 404 Route
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: 'Route not found',
  });
});

// Start Server
const PORT = process.env.PORT || 5001;

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running on port ${PORT}`);
});

export default app;