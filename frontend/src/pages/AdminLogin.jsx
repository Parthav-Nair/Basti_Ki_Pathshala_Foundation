// frontend/src/pages/AdminLogin.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import API from '../services/api';
import toast from 'react-hot-toast';
import { motion } from 'framer-motion';

const schema = z.object({
  email: z.string().email({ message: 'Invalid email address' }),
  password: z.string().min(1, { message: 'Password is required' }),
});

const formVariants = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.5, ease: "easeOut" } },
};

export default function AdminLogin() {
  const navigate = useNavigate();
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data) => {
    try {
      const res = await API.post('/admin/login', data);
      localStorage.setItem('admin_token', res.data.token);
      toast.success('Login successful!');
      navigate('/admin/dashboard');
    } catch (error) {
      toast.error(error.response?.data?.msg || 'Login failed');
    }
  };

  return (
    <motion.div
      className="card w-full max-w-md mx-auto bg-base-100 shadow-xl p-6 md:p-10"
      variants={formVariants}
      initial="hidden"
      animate="visible"
    >
      <h2 className="text-3xl font-bold text-center mb-6">Admin Login</h2>
      
      {/* Demo Credentials Info Section */}
      <div className="alert alert-info mb-6 text-sm">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="stroke-current shrink-0 w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
        <div>
          <h3 className="font-bold">Demo Login</h3>
          <p>Email: admin@example.com</p>
          <p>Password: QMNW1iEByBE5jQCE</p>
        </div>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div className="form-control">
          <label className="label">
            <span className="label-text">Email</span>
          </label>
          <input
            {...register('email')}
            type="email"
            className="input input-bordered w-full"
            placeholder="Admin Email"
          />
          {errors.email && <p className="text-error mt-1">{errors.email.message}</p>}
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text">Password</span>
          </label>
          <input
            {...register('password')}
            type="password"
            className="input input-bordered w-full"
            placeholder="Password"
          />
          {errors.password && <p className="text-error mt-1">{errors.password.message}</p>}
        </div>
        <button type="submit" className="btn btn-primary w-full mt-4">
          Login
        </button>
      </form>
    </motion.div>
  );
}