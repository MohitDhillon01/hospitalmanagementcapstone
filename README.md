# Hospital Management System

A complete Hospital Management System built with the MERN Stack (MongoDB, Express.js, React.js, Node.js).

## 🎯 Features

### 1. **Authentication & Authorization**
- Admin user registration and login
- JWT-based authentication
- Password encryption with bcrypt
- Protected routes

### 2. **Dashboard**
- Real-time statistics
- Total patients, doctors, appointments, departments count
- Appointment status overview
- Doctor availability status
- Recent appointments display

### 3. **Patient Management**
- ✅ Add new patients
- ✅ View all patients
- ✅ Edit patient information
- ✅ Delete patients
- ✅ Search patients by name, email, or phone

**Patient Fields:**
- Name, Age, Gender, Phone Number, Email
- Address, Blood Group, Disease
- Admission Date, Medical History, Status

### 4. **Doctor Management**
- ✅ Add new doctors
- ✅ View all doctors
- ✅ Edit doctor details
- ✅ Delete doctors
- ✅ Search doctors
- ✅ Filter by department

**Doctor Fields:**
- Name, Department, Qualification, Experience
- Email, Phone Number, Specialization
- Registration Number, Consultation Fee, Availability

### 5. **Appointment Management**
- ✅ Book appointments
- ✅ View all appointments
- ✅ Update appointment details
- ✅ Cancel appointments
- ✅ Delete appointments
- ✅ Filter by patient/doctor

**Appointment Fields:**
- Patient, Doctor, Department, Date, Time
- Reason for Visit, Notes, Status
- Prescription, Follow-up Details

### 6. **Department Management**
- ✅ Add new departments
- ✅ View all departments
- ✅ Edit department information
- ✅ Delete departments

**Department Fields:**
- Name, Description, Floor, Total Beds
- Available Beds, Phone Number, Status

### 7. **Additional Features**
- Responsive UI for mobile and desktop
- Loading spinners for better UX
- Toast notifications for user feedback
- Search functionality across modules
- Modern and clean interface

## 🛠️ Tech Stack

### **Backend**
- **Runtime:** Node.js
- **Framework:** Express.js
- **Database:** MongoDB with Mongoose ODM
- **Authentication:** JWT (JSON Web Tokens) + bcrypt
- **Validation:** express-validator
- **CORS:** Enabled for frontend communication

### **Frontend**
- **Library:** React.js 18
- **Bundler:** Vite
- **Routing:** React Router v6
- **HTTP Client:** Axios
- **Styling:** CSS3 (Responsive Design)

### **Architecture**
- **Backend:** MVC (Model-View-Controller)
- **Frontend:** Component-based architecture
- **Database:** MongoDB Atlas (Cloud) or Local MongoDB

## 📁 Project Structure

```
Hospital-Management-System/
│
├── backend/
│   ├── config/
│   │   └── db.js                 # Database connection
│   ├── controllers/
│   │   ├── authController.js     # Authentication logic
│   │   ├── patientController.js  # Patient CRUD
│   │   ├── doctorController.js   # Doctor CRUD
│   │   ├── appointmentController.js # Appointment CRUD
│   │   ├── departmentController.js  # Department CRUD
│   │   └── dashboardController.js   # Dashboard stats
│   ├── middleware/
│   │   └── auth.js               # JWT verification
│   ├── models/
│   │   ├── User.js               # User schema
│   │   ├── Patient.js            # Patient schema
│   │   ├── Doctor.js             # Doctor schema
│   │   ├── Appointment.js        # Appointment schema
│   │   └── Department.js         # Department schema
│   ├── routes/
│   │   ├── authRoutes.js         # Auth endpoints
│   │   ├── patientRoutes.js      # Patient endpoints
│   │   ├── doctorRoutes.js       # Doctor endpoints
│   │   ├── appointmentRoutes.js  # Appointment endpoints
│   │   ├── departmentRoutes.js   # Department endpoints
│   │   └── dashboardRoutes.js    # Dashboard endpoints
│   ├── server.js                 # Express app setup
│   ├── .env                      # Environment variables
│   └── package.json
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Navbar.jsx        # Navigation bar
│   │   │   ├── Sidebar.jsx       # Side navigation
│   │   │   ├── LoadingSpinner.jsx # Loading indicator
│   │   │   ├── Toast.jsx         # Notifications
│   │   │   └── ProtectedRoute.jsx # Route protection
│   │   ├── pages/
│   │   │   ├── Login.jsx         # Login page
│   │   │   ├── Register.jsx      # Registration page
│   │   │   ├── Dashboard.jsx     # Dashboard
│   │   │   ├── Patient.jsx       # Patient management
│   │   │   ├── Doctor.jsx        # Doctor management
│   │   │   ├── Appointment.jsx   # Appointment management
│   │   │   └── Department.jsx    # Department management
│   │   ├── services/
│   │   │   ├── api.js            # Axios configuration
│   │   │   ├── authService.js    # Auth API calls
│   │   │   ├── patientService.js # Patient API calls
│   │   │   ├── doctorService.js  # Doctor API calls
│   │   │   ├── appointmentService.js # Appointment API calls
│   │   │   ├── departmentService.js  # Department API calls
│   │   │   └── dashboardService.js   # Dashboard API calls
│   │   ├── styles/
│   │   │   ├── Navbar.css
│   │   │   ├── Sidebar.css
│   │   │   ├── LoadingSpinner.css
│   │   │   ├── Toast.css
│   │   │   ├── Auth.css
│   │   │   ├── Dashboard.css
│   │   │   └── CRUD.css
│   │   ├── App.jsx               # Main app component
│   │   ├── App.css               # Global styles
│   │   ├── main.jsx              # Entry point
│   │   └── index.css             # Base styles
│   ├── index.html
│   ├── vite.config.js
│   ├── package.json
│   └── .gitignore
│
└── README.md
```

## 🚀 Installation & Setup

### **Prerequisites**
- Node.js (v14 or higher)
- npm or yarn
- MongoDB (Local or MongoDB Atlas)

### **1. Backend Setup**

```bash
# Navigate to backend directory
cd backend

# Install dependencies
npm install

# Create .env file with the following content:
MONGODB_URI=mongodb://localhost:27017/hospital_management
JWT_SECRET=your_jwt_secret_key_change_this_in_production
PORT=5000
NODE_ENV=development

# Create admin user (optional - you can register via API)
# Update the .env file with your MongoDB connection string

# Start the backend server
npm start

# For development with hot reload
npm run dev
```

**Backend will run on:** `http://localhost:5000`

### **2. Frontend Setup**

```bash
# Navigate to frontend directory
cd frontend

# Install dependencies
npm install

# Start the development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

**Frontend will run on:** `http://localhost:3000`

## 📊 API Endpoints

### **Authentication**
```
POST   /api/auth/register       # Create new admin user
POST   /api/auth/login          # Login admin user
GET    /api/auth/me             # Get current user (Protected)
GET    /api/auth/logout         # Logout (Protected)
```

### **Patients**
```
GET    /api/patients            # Get all patients (Protected)
POST   /api/patients            # Create patient (Protected)
GET    /api/patients/:id        # Get single patient (Protected)
PUT    /api/patients/:id        # Update patient (Protected)
DELETE /api/patients/:id        # Delete patient (Protected)
GET    /api/patients/search/:query # Search patients (Protected)
GET    /api/patients/stats      # Get patient statistics (Protected)
```

### **Doctors**
```
GET    /api/doctors             # Get all doctors (Protected)
POST   /api/doctors             # Create doctor (Protected)
GET    /api/doctors/:id         # Get single doctor (Protected)
PUT    /api/doctors/:id         # Update doctor (Protected)
DELETE /api/doctors/:id         # Delete doctor (Protected)
GET    /api/doctors/search/:query # Search doctors (Protected)
GET    /api/doctors/department/:deptId # Get by department (Protected)
GET    /api/doctors/stats       # Get doctor statistics (Protected)
```

### **Appointments**
```
GET    /api/appointments        # Get all appointments (Protected)
POST   /api/appointments        # Create appointment (Protected)
GET    /api/appointments/:id    # Get single appointment (Protected)
PUT    /api/appointments/:id    # Update appointment (Protected)
PATCH  /api/appointments/:id/cancel # Cancel appointment (Protected)
DELETE /api/appointments/:id    # Delete appointment (Protected)
GET    /api/appointments/patient/:patientId # By patient (Protected)
GET    /api/appointments/doctor/:doctorId   # By doctor (Protected)
GET    /api/appointments/stats  # Get statistics (Protected)
```

### **Departments**
```
GET    /api/departments         # Get all departments (Protected)
POST   /api/departments         # Create department (Protected)
GET    /api/departments/:id     # Get single department (Protected)
PUT    /api/departments/:id     # Update department (Protected)
DELETE /api/departments/:id     # Delete department (Protected)
GET    /api/departments/stats   # Get statistics (Protected)
```

### **Dashboard**
```
GET    /api/dashboard/stats     # Get all statistics (Protected)
```

## 🔑 Environment Variables

### **Backend (.env)**
```
MONGODB_URI=mongodb://localhost:27017/hospital_management
JWT_SECRET=your_jwt_secret_key_change_this_in_production
PORT=5000
NODE_ENV=development
```

### **Frontend**
The frontend connects to the backend at `http://localhost:5000/api` (configured in `src/services/api.js`)

## 💾 MongoDB Setup

### **Local MongoDB**
```bash
# Install MongoDB Community Edition
# https://docs.mongodb.com/manual/installation/

# Start MongoDB service
mongod

# Create database (automatically created on first insert)
# Database name: hospital_management
```

### **MongoDB Atlas (Cloud)**
```
1. Go to https://www.mongodb.com/cloud/atlas
2. Create a free account
3. Create a new cluster
4. Get connection string
5. Update MONGODB_URI in .env:
   MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/hospital_management
```

## 📝 Demo Credentials

Use these credentials to test the application:

**Email:** `admin@hospital.com`
**Password:** `admin123`

Or register your own account using the registration page.

## 🧪 API Testing with Postman

### **1. Import Collection**
- Download Postman
- Create new collection "Hospital Management"

### **2. Register Admin**
```
POST http://localhost:5000/api/auth/register
Content-Type: application/json

{
  "username": "admin",
  "email": "admin@hospital.com",
  "password": "admin123",
  "confirmPassword": "admin123"
}
```

### **3. Login**
```
POST http://localhost:5000/api/auth/login
Content-Type: application/json

{
  "email": "admin@hospital.com",
  "password": "admin123"
}
```

### **4. Add Department**
```
POST http://localhost:5000/api/departments
Authorization: Bearer <token>
Content-Type: application/json

{
  "name": "Cardiology",
  "description": "Heart and cardiovascular diseases",
  "floor": 2,
  "totalBeds": 20,
  "availableBeds": 15,
  "phoneNumber": "1234567890"
}
```

### **5. Add Doctor**
```
POST http://localhost:5000/api/doctors
Authorization: Bearer <token>
Content-Type: application/json

{
  "name": "Dr. John Smith",
  "department": "<department_id>",
  "qualification": "MBBS, MD",
  "experience": 10,
  "email": "john@hospital.com",
  "phoneNumber": "9876543210",
  "specialization": "Cardiology",
  "registrationNumber": "MC123456",
  "consultationFee": 500
}
```

### **6. Add Patient**
```
POST http://localhost:5000/api/patients
Authorization: Bearer <token>
Content-Type: application/json

{
  "name": "John Doe",
  "age": 45,
  "gender": "Male",
  "phoneNumber": "1234567890",
  "email": "john.doe@email.com",
  "address": "123 Street, City",
  "bloodGroup": "O+",
  "disease": "Heart Disease",
  "admissionDate": "2024-01-15",
  "medicalHistory": "Hypertension, Diabetes"
}
```

### **7. Book Appointment**
```
POST http://localhost:5000/api/appointments
Authorization: Bearer <token>
Content-Type: application/json

{
  "patient": "<patient_id>",
  "doctor": "<doctor_id>",
  "department": "<department_id>",
  "appointmentDate": "2024-02-15",
  "appointmentTime": "10:30",
  "reasonForVisit": "Checkup",
  "notes": "Regular checkup needed"
}
```

## 📸 Project Screenshots

### **Login Page**
- Clean and modern login interface
- Demo credentials displayed
- Registration link for new users
- Responsive design

### **Dashboard**
- Statistics cards showing:
  - Total Patients
  - Total Doctors
  - Total Appointments
  - Total Departments
- Secondary statistics showing appointment and doctor status
- Recent appointments table
- Navigation sidebar with all modules

### **Patient Management**
- List of all patients in a table
- Add new patient form
- Edit patient functionality
- Delete patient with confirmation
- Search patients by name, email, or phone
- Responsive table with all patient details

### **Doctor Management**
- List of all doctors
- Add new doctor form
- Edit doctor details
- Delete doctors
- Search functionality
- Display doctor availability status

### **Appointment Management**
- List of all appointments
- Book new appointment form
- Dropdown selections for patient, doctor, department
- Date and time picker
- Cancel appointment button
- Appointment status display

### **Department Management**
- List of all departments
- Add new department form
- Edit department details
- Delete departments
- Display bed availability

### **Responsive Design**
- Mobile-friendly layout
- Sidebar converts to hamburger menu on mobile
- Tables become scrollable on small screens
- Forms stack vertically on mobile

## 🔒 Security Features

1. **Password Encryption:** Passwords are hashed using bcrypt
2. **JWT Authentication:** Secure token-based authentication
3. **Protected Routes:** All API endpoints are protected with JWT verification
4. **CORS Enabled:** Cross-Origin Resource Sharing configured
5. **Input Validation:** All user inputs are validated
6. **Error Handling:** Comprehensive error handling and logging

## 📦 Dependencies

### **Backend**
```
express: ^4.18.2
mongoose: ^8.0.0
bcryptjs: ^2.4.3
jsonwebtoken: ^9.1.2
dotenv: ^16.3.1
cors: ^2.8.5
express-validator: ^7.0.0
nodemon: ^3.0.1 (dev)
```

### **Frontend**
```
react: ^18.2.0
react-dom: ^18.2.0
react-router-dom: ^6.20.0
axios: ^1.6.2
vite: ^5.0.8
@vitejs/plugin-react: ^4.2.1
```

## ⚠️ Important Notes

1. **Change JWT Secret:** Update the JWT_SECRET in .env before production
2. **MongoDB Connection:** Ensure MongoDB is running before starting the backend
3. **Port Conflicts:** If ports 5000 or 3000 are in use, update in respective config files
4. **CORS:** Currently allows localhost:3000, update for production domains
5. **API Base URL:** Frontend is configured for http://localhost:5000/api

## 🐛 Troubleshooting

### **Backend won't start**
- Check if MongoDB is running
- Verify .env file has correct MongoDB URI
- Check if port 5000 is available

### **Frontend shows blank page**
- Check if backend is running on http://localhost:5000
- Clear browser cache and refresh
- Check browser console for errors

### **API calls failing**
- Verify JWT token is saved in localStorage
- Check if backend server is running
- Verify MongoDB connection is active

### **CORS errors**
- Ensure backend has CORS enabled
- Check frontend API URL in services/api.js

## 📚 Learning Resources

- [Express.js Documentation](https://expressjs.com/)
- [MongoDB Documentation](https://docs.mongodb.com/)
- [React Documentation](https://react.dev/)
- [JWT Guide](https://jwt.io/introduction)
- [Mongoose Documentation](https://mongoosejs.com/)

## 🎓 Getting Started

1. Clone or download the project
2. Follow the installation steps for both backend and frontend
3. Start MongoDB
4. Start the backend server (`npm start`)
5. Start the frontend server (`npm run dev`)
6. Open http://localhost:3000 in your browser
7. Register or login with demo credentials
8. Explore the application!

## 🤝 Contributing

Feel free to contribute to this project. Submit issues, suggestions, or pull requests.

## 📄 License

This project is open source and available for educational purposes.

---

**Happy Coding! 🚀**

For any questions or issues, feel free to reach out or open an issue in the repository.
