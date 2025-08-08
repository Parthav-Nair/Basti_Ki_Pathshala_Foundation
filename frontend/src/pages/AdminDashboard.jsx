// frontend/src/pages/AdminDashboard.jsx
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import API from '../services/api';

export default function AdminDashboard() {
  const [applicants, setApplicants] = useState([]);
  const [err, setErr] = useState(null);
  const navigate = useNavigate();

  const fetchApplicants = async () => {
    setErr(null);
    try {
      const res = await API.get('/applicants');
      setApplicants(res.data);
    } catch (error) {
      setErr(error.response?.data?.msg || 'Could not load applicants');
      if (error.response?.status === 401) {
        // token invalid or expired
        localStorage.removeItem('admin_token');
        navigate('/admin');
      }
    }
  };

  useEffect(() => {
    const token = localStorage.getItem('admin_token');
    if (!token) {
      navigate('/admin');
      return;
    }
    fetchApplicants();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('admin_token');
    navigate('/');
  };

  return (
    <div>
      <h2>Applicants</h2>
      <button onClick={handleLogout}>Logout</button>
      {err && <div style={{ color: 'red' }}>{err}</div>}
      <table border="1" cellPadding="6" style={{ marginTop: 10, width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr>
            <th>Name</th><th>Email</th><th>Phone</th><th>Role</th><th>Availability</th><th>Message</th><th>Applied</th>
          </tr>
        </thead>
        <tbody>
          {applicants.length === 0 && <tr><td colSpan="7">No applicants yet</td></tr>}
          {applicants.map(a => (
            <tr key={a._id}>
              <td>{a.name}</td>
              <td>{a.email}</td>
              <td>{a.phone}</td>
              <td>{a.role}</td>
              <td>{a.availability}</td>
              <td>{a.message}</td>
              <td>{new Date(a.createdAt).toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
