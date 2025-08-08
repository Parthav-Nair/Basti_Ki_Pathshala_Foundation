// frontend/src/pages/Register.jsx
import React, { useState } from 'react';
import API from '../services/api';

export default function Register() {
  const [form, setForm] = useState({
    name: '', email: '', phone: '', role: '', availability: '', message: ''
  });
  const [status, setStatus] = useState(null);

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async e => {
    e.preventDefault();
    setStatus(null);
    try {
      const res = await API.post('/applicants', form);
      setStatus({ type: 'success', msg: 'Application submitted! Thank you.' });
      setForm({ name: '', email: '', phone: '', role: '', availability: '', message: '' });
    } catch (err) {
      setStatus({ type: 'error', msg: err.response?.data?.msg || 'Submission failed' });
    }
  };

  return (
    <div style={{ maxWidth: 700 }}>
      <h2>Register as Intern / Volunteer</h2>
      {status && <div style={{ padding: 8, color: status.type === 'success' ? 'green' : 'red' }}>{status.msg}</div>}
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name*</label><br />
          <input name="name" value={form.name} onChange={handleChange} required />
        </div>
        <div>
          <label>Email*</label><br />
          <input name="email" type="email" value={form.email} onChange={handleChange} required />
        </div>
        <div>
          <label>Phone</label><br />
          <input name="phone" value={form.phone} onChange={handleChange} />
        </div>
        <div>
          <label>Role</label><br />
          <input name="role" value={form.role} onChange={handleChange} />
        </div>
        <div>
          <label>Availability</label><br />
          <input name="availability" value={form.availability} onChange={handleChange} />
        </div>
        <div>
          <label>Message</label><br />
          <textarea name="message" value={form.message} onChange={handleChange} />
        </div>
        <button type="submit" style={{ marginTop: 10 }}>Submit</button>
      </form>
    </div>
  );
}
