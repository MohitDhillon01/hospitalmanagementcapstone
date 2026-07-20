import mongoose from 'mongoose';

/**
 * Appointment Schema
 */
const appointmentSchema = new mongoose.Schema(
  {
    patient: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Patient',
      required: [true, 'Please select a patient'],
    },
    doctor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Doctor',
      required: [true, 'Please select a doctor'],
    },
    department: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Department',
      required: [true, 'Please select a department'],
    },
    appointmentDate: {
      type: Date,
      required: [true, 'Please provide appointment date'],
    },
    appointmentTime: {
      type: String,
      required: [true, 'Please provide appointment time'],
      match: [/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/, 'Please provide time in HH:MM format'],
    },
    status: {
      type: String,
      enum: ['Scheduled', 'Completed', 'Cancelled', 'No Show'],
      default: 'Scheduled',
    },
    notes: {
      type: String,
      default: '',
    },
    reasonForVisit: {
      type: String,
      required: [true, 'Please provide reason for visit'],
    },
    prescription: {
      type: String,
      default: '',
    },
    followUpRequired: {
      type: Boolean,
      default: false,
    },
    followUpDate: {
      type: Date,
      default: null,
    },
  },
  { timestamps: true }
);

const Appointment = mongoose.model('Appointment', appointmentSchema);

export default Appointment;
