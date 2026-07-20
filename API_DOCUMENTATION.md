# Hospital Management System - API Documentation

## 📚 Complete API Reference

### **Base URL**
```
http://localhost:5000/api
```

### **Authentication**
All protected endpoints require a Bearer token in the Authorization header:
```
Authorization: Bearer <your_jwt_token>
```

---

## 🔐 Authentication Endpoints

### **1. Register Admin User**
- **Endpoint:** `POST /auth/register`
- **Access:** Public
- **Request Body:**
```json
{
  "username": "admin",
  "email": "admin@hospital.com",
  "password": "admin123",
  "confirmPassword": "admin123"
}
```
- **Response (Success - 201):**
```json
{
  "success": true,
  "message": "User registered successfully",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "60d5ec49e7c4d2001c8e5f9a",
    "username": "admin",
    "email": "admin@hospital.com",
    "role": "admin"
  }
}
```

### **2. Login Admin User**
- **Endpoint:** `POST /auth/login`
- **Access:** Public
- **Request Body:**
```json
{
  "email": "admin@hospital.com",
  "password": "admin123"
}
```
- **Response (Success - 200):**
```json
{
  "success": true,
  "message": "Logged in successfully",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "60d5ec49e7c4d2001c8e5f9a",
    "username": "admin",
    "email": "admin@hospital.com",
    "role": "admin"
  }
}
```

### **3. Get Current User**
- **Endpoint:** `GET /auth/me`
- **Access:** Protected ✅
- **Response (Success - 200):**
```json
{
  "success": true,
  "data": {
    "_id": "60d5ec49e7c4d2001c8e5f9a",
    "username": "admin",
    "email": "admin@hospital.com",
    "role": "admin",
    "isActive": true,
    "createdAt": "2024-01-15T10:30:00Z",
    "updatedAt": "2024-01-15T10:30:00Z"
  }
}
```

### **4. Logout**
- **Endpoint:** `GET /auth/logout`
- **Access:** Protected ✅
- **Response (Success - 200):**
```json
{
  "success": true,
  "message": "Logged out successfully"
}
```

---

## 👥 Patient Endpoints

### **1. Get All Patients**
- **Endpoint:** `GET /patients`
- **Access:** Protected ✅
- **Response (Success - 200):**
```json
{
  "success": true,
  "count": 5,
  "data": [
    {
      "_id": "60d5ec49e7c4d2001c8e5f9a",
      "name": "John Doe",
      "age": 45,
      "gender": "Male",
      "phoneNumber": "1234567890",
      "email": "john@email.com",
      "address": "123 Street, City",
      "bloodGroup": "O+",
      "disease": "Heart Disease",
      "admissionDate": "2024-01-15",
      "status": "Admitted",
      "medicalHistory": "Hypertension"
    }
  ]
}
```

### **2. Get Single Patient**
- **Endpoint:** `GET /patients/:id`
- **Access:** Protected ✅
- **Response (Success - 200):**
```json
{
  "success": true,
  "data": {
    "_id": "60d5ec49e7c4d2001c8e5f9a",
    "name": "John Doe",
    "age": 45,
    "gender": "Male",
    "phoneNumber": "1234567890",
    "email": "john@email.com",
    "address": "123 Street, City",
    "bloodGroup": "O+",
    "disease": "Heart Disease",
    "admissionDate": "2024-01-15",
    "status": "Admitted"
  }
}
```

### **3. Create Patient**
- **Endpoint:** `POST /patients`
- **Access:** Protected ✅
- **Request Body:**
```json
{
  "name": "Jane Smith",
  "age": 35,
  "gender": "Female",
  "phoneNumber": "9876543210",
  "email": "jane@email.com",
  "address": "456 Avenue, Town",
  "bloodGroup": "A+",
  "disease": "Diabetes",
  "admissionDate": "2024-01-20",
  "medicalHistory": "None"
}
```
- **Response (Success - 201):**
```json
{
  "success": true,
  "message": "Patient created successfully",
  "data": {
    "_id": "60d5ec49e7c4d2001c8e5f9b",
    "name": "Jane Smith",
    "age": 35,
    "gender": "Female",
    "status": "Admitted"
  }
}
```

### **4. Update Patient**
- **Endpoint:** `PUT /patients/:id`
- **Access:** Protected ✅
- **Request Body:** (Same as Create - send only fields to update)
```json
{
  "disease": "Type 2 Diabetes"
}
```
- **Response (Success - 200):**
```json
{
  "success": true,
  "message": "Patient updated successfully",
  "data": {
    "_id": "60d5ec49e7c4d2001c8e5f9b",
    "name": "Jane Smith",
    "disease": "Type 2 Diabetes"
  }
}
```

### **5. Delete Patient**
- **Endpoint:** `DELETE /patients/:id`
- **Access:** Protected ✅
- **Response (Success - 200):**
```json
{
  "success": true,
  "message": "Patient deleted successfully"
}
```

### **6. Search Patients**
- **Endpoint:** `GET /patients/search/:query`
- **Access:** Protected ✅
- **Example:** `/patients/search/john`
- **Response (Success - 200):**
```json
{
  "success": true,
  "count": 1,
  "data": [
    {
      "_id": "60d5ec49e7c4d2001c8e5f9a",
      "name": "John Doe",
      "email": "john@email.com",
      "phoneNumber": "1234567890"
    }
  ]
}
```

### **7. Get Patient Statistics**
- **Endpoint:** `GET /patients/stats`
- **Access:** Protected ✅
- **Response (Success - 200):**
```json
{
  "success": true,
  "data": {
    "totalPatients": 25,
    "activePatients": 18,
    "dischargedPatients": 7
  }
}
```

---

## 👨‍⚕️ Doctor Endpoints

### **1. Get All Doctors**
- **Endpoint:** `GET /doctors`
- **Access:** Protected ✅
- **Response (Success - 200):**
```json
{
  "success": true,
  "count": 3,
  "data": [
    {
      "_id": "60d5ec49e7c4d2001c8e5f9c",
      "name": "Dr. John Smith",
      "department": {
        "_id": "60d5ec49e7c4d2001c8e5f90",
        "name": "Cardiology"
      },
      "qualification": "MBBS, MD",
      "experience": 10,
      "email": "john.smith@hospital.com",
      "phoneNumber": "9876543210",
      "specialization": "Cardiology",
      "registrationNumber": "MC123456",
      "availability": "Available"
    }
  ]
}
```

### **2. Create Doctor**
- **Endpoint:** `POST /doctors`
- **Access:** Protected ✅
- **Request Body:**
```json
{
  "name": "Dr. Sarah Johnson",
  "department": "60d5ec49e7c4d2001c8e5f90",
  "qualification": "MBBS, MD",
  "experience": 8,
  "email": "sarah@hospital.com",
  "phoneNumber": "8765432109",
  "specialization": "Neurology",
  "registrationNumber": "MC654321",
  "consultationFee": 600
}
```

### **3. Update Doctor**
- **Endpoint:** `PUT /doctors/:id`
- **Access:** Protected ✅

### **4. Delete Doctor**
- **Endpoint:** `DELETE /doctors/:id`
- **Access:** Protected ✅

### **5. Get Doctors by Department**
- **Endpoint:** `GET /doctors/department/:departmentId`
- **Access:** Protected ✅

### **6. Search Doctors**
- **Endpoint:** `GET /doctors/search/:query`
- **Access:** Protected ✅

### **7. Get Doctor Statistics**
- **Endpoint:** `GET /doctors/stats`
- **Access:** Protected ✅
- **Response:**
```json
{
  "success": true,
  "data": {
    "totalDoctors": 10,
    "availableDoctors": 8,
    "onLeaveDoctors": 2
  }
}
```

---

## 📅 Appointment Endpoints

### **1. Get All Appointments**
- **Endpoint:** `GET /appointments`
- **Access:** Protected ✅
- **Response (Success - 200):**
```json
{
  "success": true,
  "count": 5,
  "data": [
    {
      "_id": "60d5ec49e7c4d2001c8e5f9d",
      "patient": {
        "_id": "60d5ec49e7c4d2001c8e5f9a",
        "name": "John Doe",
        "email": "john@email.com"
      },
      "doctor": {
        "_id": "60d5ec49e7c4d2001c8e5f9c",
        "name": "Dr. John Smith",
        "email": "john.smith@hospital.com"
      },
      "department": {
        "_id": "60d5ec49e7c4d2001c8e5f90",
        "name": "Cardiology"
      },
      "appointmentDate": "2024-02-15",
      "appointmentTime": "10:30",
      "reasonForVisit": "Checkup",
      "status": "Scheduled"
    }
  ]
}
```

### **2. Create Appointment**
- **Endpoint:** `POST /appointments`
- **Access:** Protected ✅
- **Request Body:**
```json
{
  "patient": "60d5ec49e7c4d2001c8e5f9a",
  "doctor": "60d5ec49e7c4d2001c8e5f9c",
  "department": "60d5ec49e7c4d2001c8e5f90",
  "appointmentDate": "2024-02-15",
  "appointmentTime": "10:30",
  "reasonForVisit": "Routine Checkup",
  "notes": "Patient has hypertension history"
}
```

### **3. Update Appointment**
- **Endpoint:** `PUT /appointments/:id`
- **Access:** Protected ✅

### **4. Cancel Appointment**
- **Endpoint:** `PATCH /appointments/:id/cancel`
- **Access:** Protected ✅
- **Response:**
```json
{
  "success": true,
  "message": "Appointment cancelled successfully",
  "data": {
    "_id": "60d5ec49e7c4d2001c8e5f9d",
    "status": "Cancelled"
  }
}
```

### **5. Delete Appointment**
- **Endpoint:** `DELETE /appointments/:id`
- **Access:** Protected ✅

### **6. Get Appointments by Patient**
- **Endpoint:** `GET /appointments/patient/:patientId`
- **Access:** Protected ✅

### **7. Get Appointments by Doctor**
- **Endpoint:** `GET /appointments/doctor/:doctorId`
- **Access:** Protected ✅

### **8. Get Appointment Statistics**
- **Endpoint:** `GET /appointments/stats`
- **Access:** Protected ✅

---

## 🏢 Department Endpoints

### **1. Get All Departments**
- **Endpoint:** `GET /departments`
- **Access:** Protected ✅

### **2. Get Single Department**
- **Endpoint:** `GET /departments/:id`
- **Access:** Protected ✅

### **3. Create Department**
- **Endpoint:** `POST /departments`
- **Access:** Protected ✅
- **Request Body:**
```json
{
  "name": "Cardiology",
  "description": "Heart and cardiovascular diseases",
  "floor": 2,
  "totalBeds": 20,
  "availableBeds": 15,
  "phoneNumber": "1234567890"
}
```

### **4. Update Department**
- **Endpoint:** `PUT /departments/:id`
- **Access:** Protected ✅

### **5. Delete Department**
- **Endpoint:** `DELETE /departments/:id`
- **Access:** Protected ✅

### **6. Get Department Statistics**
- **Endpoint:** `GET /departments/stats`
- **Access:** Protected ✅

---

## 📊 Dashboard Endpoint

### **Get All Dashboard Statistics**
- **Endpoint:** `GET /dashboard/stats`
- **Access:** Protected ✅
- **Response (Success - 200):**
```json
{
  "success": true,
  "data": {
    "totalCounts": {
      "totalPatients": 25,
      "totalDoctors": 10,
      "totalAppointments": 50,
      "totalDepartments": 5
    },
    "appointmentStats": {
      "scheduled": 35,
      "completed": 12,
      "cancelled": 3
    },
    "patientStats": {
      "active": 18,
      "discharged": 7
    },
    "doctorStats": {
      "available": 8,
      "onLeave": 2
    },
    "recentAppointments": [...],
    "recentPatients": [...]
  }
}
```

---

## ❌ Error Responses

### **Unauthorized (401)**
```json
{
  "success": false,
  "message": "Not authorized to access this route"
}
```

### **Not Found (404)**
```json
{
  "success": false,
  "message": "Patient not found"
}
```

### **Bad Request (400)**
```json
{
  "success": false,
  "message": "Please provide all required fields"
}
```

### **Server Error (500)**
```json
{
  "success": false,
  "message": "Server error message"
}
```

---

## 🧪 Testing with Postman

1. Create new Postman collection
2. Add environment variable: `base_url = http://localhost:5000/api`
3. Add environment variable: `token` (get from login response)
4. Use `{{base_url}}` and `{{token}}` in requests

Example Postman request:
```
Method: POST
URL: {{base_url}}/auth/login
Headers: Content-Type: application/json
Body: {
  "email": "admin@hospital.com",
  "password": "admin123"
}
```

---

## 📌 Status Codes

- `200` - OK
- `201` - Created
- `400` - Bad Request
- `401` - Unauthorized
- `403` - Forbidden
- `404` - Not Found
- `500` - Server Error

---

**Happy Testing! 🚀**
