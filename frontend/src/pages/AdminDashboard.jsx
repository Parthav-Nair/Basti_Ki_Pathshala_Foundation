import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import API from '../services/api';
import toast from 'react-hot-toast';
import { motion, AnimatePresence } from 'framer-motion';

const rowVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.3 } },
};

export default function AdminDashboard() {
  const [applicants, setApplicants] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const fetchApplicants = async () => {
    try {
      const res = await API.get('/applicants');
      setApplicants(res.data);
    } catch (error) {
      toast.error(error.response?.data?.msg || 'Could not load applicants');
      if (error.response?.status === 401) {
        localStorage.removeItem('admin_token');
        navigate('/admin');
      }
    } finally {
      setLoading(false);
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
    toast.success('Logged out successfully');
  };

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-4xl font-bold">Applicants Dashboard</h2>
        <button onClick={handleLogout} className="btn btn-warning">Logout</button>
      </div>

      {loading ? (
        <div className="flex flex-col gap-4">
          <div className="skeleton h-10 w-full"></div>
          <div className="skeleton h-10 w-full"></div>
          <div className="skeleton h-10 w-full"></div>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="table w-full table-zebra">
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Role</th>
                <th>Availability</th>
                <th>Message</th>
                <th>Applied On</th>
              </tr>
            </thead>
            <AnimatePresence>
              <tbody>
                {applicants.length === 0 ? (
                  <tr><td colSpan="7" className="text-center">No applicants yet</td></tr>
                ) : (
                  applicants.map(a => (
                    <motion.tr
                      key={a._id}
                      variants={rowVariants}
                      initial="hidden"
                      animate="visible"
                      exit="hidden"
                      layout
                    >
                      <td>{a.name}</td>
                      <td>{a.email}</td>
                      <td>{a.phone}</td>
                      <td>{a.role}</td>
                      <td>{a.availability}</td>
                      <td>{a.message}</td>
                      <td>{new Date(a.createdAt).toLocaleString()}</td>
                    </motion.tr>
                  ))
                )}
              </tbody>
            </AnimatePresence>
          </table>
        </div>
      )}
    </div>
  );
}