// frontend/src/pages/AdminLogin.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import API from '../services/api';

export default function AdminLogin() {
  const [form, setForm] = useState({ email: '', password: '' });
  const [err, setErr] = useState(null);
  const navigate = useNavigate();

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async e => {
    e.preventDefault();
    setErr(null);
    try {
      const res = await API.post('/admin/login', form);
      localStorage.setItem('admin_token', res.data.token);
      navigate('/admin/dashboard');
    } catch (error) {
      setErr(error.response?.data?.msg || 'Login failed');
    }
  };

  return (
    <div style={{ maxWidth: 400 }}>
      <h2>Admin Login</h2>
      {err && <div style={{ color: 'red' }}>{err}</div>}
      <form onSubmit={handleSubmit}>
        <div>
          <label>Email</label><br />
          <input name="email" value={form.email} onChange={handleChange} required />
        </div>
        <div>
          <label>Password</label><br />
          <input name="password" type="password" value={form.password} onChange={handleChange} required />
        </div>
        <button type="submit" style={{ marginTop: 10 }}>Login</button>
      </form>
    </div>
  );
}
