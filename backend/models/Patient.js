import mongoose from 'mongoose';

/**
 * Patient Schema
 */
const patientSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Please provide patient name'],
      trim: true,
    },
    age: {
      type: Number,
      required: [true, 'Please provide patient age'],
      min: 0,
      max: 150,
    },
    gender: {
      type: String,
      enum: ['Male', 'Female', 'Other'],
      required: [true, 'Please select gender'],
    },
    phoneNumber: {
      type: String,
      required: [true, 'Please provide phone number'],
      unique: true,
      match: [/^[0-9]{10}$/, 'Please provide a valid 10-digit phone number'],
    },
    email: {
      type: String,
      required: [true, 'Please provide email'],
      lowercase: true,
      match: [
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        'Please provide a valid email',
      ],
    },
    address: {
      type: String,
      required: [true, 'Please provide address'],
    },
    bloodGroup: {
      type: String,
      enum: ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'],
      required: [true, 'Please select blood group'],
    },
    disease: {
      type: String,
      required: [true, 'Please provide disease/medical condition'],
    },
    admissionDate: {
      type: Date,
      required: [true, 'Please provide admission date'],
    },
    status: {
      type: String,
      enum: ['Active', 'Discharged', 'Admitted'],
      default: 'Admitted',
    },
    medicalHistory: {
      type: String,
      default: '',
    },
  },
  { timestamps: true }
);

const Patient = mongoose.model('Patient', patientSchema);

export default Patient;
