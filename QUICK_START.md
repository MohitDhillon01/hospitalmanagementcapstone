# Quick Setup Guide

## 🚀 Get Started in 5 Minutes

### **Step 1: Install Dependencies**

#### Backend
```bash
cd backend
npm install
```

#### Frontend
```bash
cd frontend
npm install
```

### **Step 2: Setup Environment**

Create `.env` file in the `backend` folder:

```
MONGODB_URI=mongodb://localhost:27017/hospital_management
JWT_SECRET=your_jwt_secret_key_here
PORT=5000
NODE_ENV=development
```

### **Step 3: Start MongoDB**

```bash
# On Windows (if installed)
mongod

# Or use MongoDB Atlas (Cloud)
# Update MONGODB_URI in .env with your connection string
```

### **Step 4: Run Backend**

```bash
cd backend
npm start

# Or with auto-reload
npm run dev
```

**Backend running on:** `http://localhost:5000`

### **Step 5: Run Frontend**

```bash
cd frontend
npm run dev
```

**Frontend running on:** `http://localhost:3000`

### **Step 6: Login**

- **Email:** admin@hospital.com
- **Password:** admin123

Or register a new account.

---

## 📦 NPM Packages Used

### Backend Packages
- `express` - Web framework
- `mongoose` - MongoDB ODM
- `bcryptjs` - Password hashing
- `jsonwebtoken` - JWT authentication
- `cors` - Cross-origin requests
- `dotenv` - Environment variables
- `express-validator` - Input validation

### Frontend Packages
- `react` - UI library
- `react-router-dom` - Routing
- `axios` - HTTP client
- `vite` - Build tool

---

## ⚡ Key Features Ready to Use

✅ User Authentication (Login/Register)
✅ Patient Management (CRUD + Search)
✅ Doctor Management (CRUD + Search)
✅ Appointment Booking & Management
✅ Department Management
✅ Dashboard with Statistics
✅ Responsive UI
✅ Toast Notifications
✅ Loading Spinners

---

## 🔧 Common Issues & Solutions

### Issue: "Cannot connect to MongoDB"
**Solution:** 
- Start MongoDB service: `mongod`
- Or use MongoDB Atlas connection string

### Issue: "Port 5000/3000 already in use"
**Solution:**
- Change port in backend/.env or frontend/vite.config.js
- Kill process using the port

### Issue: "CORS error"
**Solution:**
- Ensure backend is running
- Check backend CORS configuration

### Issue: "Blank page after login"
**Solution:**
- Clear browser cache
- Check browser console for errors
- Ensure backend is running

---

## 📝 Database Setup (Optional - Auto-created)

MongoDB automatically creates:
- Database: `hospital_management`
- Collections: users, patients, doctors, appointments, departments

No manual setup needed!

---

## 🎯 Next Steps

1. Explore the Dashboard
2. Create a Department first
3. Add Doctors to the Department
4. Add Patients
5. Book Appointments

---

## 📞 Support

For issues or questions, check:
- README.md for detailed documentation
- API endpoints in README.md
- Postman examples in README.md

Happy coding! 🚀
