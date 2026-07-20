import mongoose from 'mongoose';

/**
 * Doctor Schema
 */
const doctorSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Please provide doctor name'],
      trim: true,
    },
    department: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Department',
      required: [true, 'Please select a department'],
    },
    qualification: {
      type: String,
      required: [true, 'Please provide qualification (e.g., MBBS, MD)'],
    },
    experience: {
      type: Number,
      required: [true, 'Please provide years of experience'],
      min: 0,
    },
    email: {
      type: String,
      required: [true, 'Please provide email'],
      unique: true,
      lowercase: true,
      match: [
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        'Please provide a valid email',
      ],
    },
    phoneNumber: {
      type: String,
      required: [true, 'Please provide phone number'],
      match: [/^[0-9]{10}$/, 'Please provide a valid 10-digit phone number'],
    },
    availability: {
      type: String,
      enum: ['Available', 'On Leave', 'Off Duty'],
      default: 'Available',
    },
    consultationFee: {
      type: Number,
      default: 500,
      min: 0,
    },
    specialization: {
      type: String,
      default: '',
    },
    registrationNumber: {
      type: String,
      required: [true, 'Please provide registration number'],
      unique: true,
    },
  },
  { timestamps: true }
);

const Doctor = mongoose.model('Doctor', doctorSchema);

export default Doctor;
