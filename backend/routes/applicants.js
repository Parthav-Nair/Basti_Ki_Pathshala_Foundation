import express from 'express';
import Applicant from '../models/Applicant.js';
import auth from '../middleware/Auth.js';

const router = express.Router();

// POST /api/applicants - public route
router.post('/', async (req, res) => {
  try {
    const { name, email, phone, role, availability, message } = req.body;
    if (!name || !email) {
      return res.status(400).json({ msg: 'Name and email are required' });
    }
    const newApplicant = new Applicant({ name, email, phone, role, availability, message });
    const saved = await newApplicant.save();
    return res.status(201).json(saved);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ msg: 'Server error' });
  }
});

// GET /api/applicants - admin only
router.get('/', auth, async (req, res) => {
  try {
    const applicants = await Applicant.find().sort({ createdAt: -1 });
    res.json(applicants);
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: 'Server error' });
  }
});

export default router;
