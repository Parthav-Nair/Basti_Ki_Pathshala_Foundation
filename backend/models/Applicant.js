import mongoose from 'mongoose';

const ApplicantSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String },
  role: { type: String },
  availability: { type: String },
  message: { type: String },
  createdAt: { type: Date, default: Date.now }
});

const Applicant = mongoose.model('Applicant', ApplicantSchema);

export default Applicant;
