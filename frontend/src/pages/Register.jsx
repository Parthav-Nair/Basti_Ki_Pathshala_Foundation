// frontend/src/pages/Register.jsx
import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import API from '../services/api';
import toast from 'react-hot-toast';
import { motion } from 'framer-motion';

const schema = z.object({
  name: z.string().min(1, { message: 'Name is required' }),
  email: z.string().email({ message: 'Invalid email address' }),
  phone: z.string().optional(),
  role: z.string().optional(),
  availability: z.string().optional(),
  message: z.string().optional(),
});

const formVariants = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.5, ease: "easeOut" } },
};

export default function Register() {
  const { register, handleSubmit, formState: { errors }, reset } = useForm({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data) => {
    try {
      await API.post('/applicants', data);
      toast.success('Application submitted successfully!');
      reset();
    } catch (err) {
      toast.error(err.response?.data?.msg || 'Submission failed');
    }
  };

  return (
    <motion.div
      className="card w-full max-w-lg mx-auto bg-base-100 shadow-xl p-6 md:p-10"
      variants={formVariants}
      initial="hidden"
      animate="visible"
    >
      <h2 className="text-3xl font-bold text-center mb-6">Register as Intern / Volunteer</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div className="form-control">
          <label className="label">
            <span className="label-text">Name*</span>
          </label>
          <input
            {...register('name')}
            type="text"
            className="input input-bordered w-full"
            placeholder="Your Name"
          />
          {errors.name && <p className="text-error mt-1">{errors.name.message}</p>}
        </div>

        <div className="form-control">
          <label className="label">
            <span className="label-text">Email*</span>
          </label>
          <input
            {...register('email')}
            type="email"
            className="input input-bordered w-full"
            placeholder="you@example.com"
          />
          {errors.email && <p className="text-error mt-1">{errors.email.message}</p>}
        </div>

        <div className="form-control">
          <label className="label">
            <span className="label-text">Phone</span>
          </label>
          <input
            {...register('phone')}
            type="tel"
            className="input input-bordered w-full"
            placeholder="Phone Number"
          />
          {errors.phone && <p className="text-error mt-1">{errors.phone.message}</p>}
        </div>

        <div className="form-control">
          <label className="label">
            <span className="label-text">Role</span>
          </label>
          <input
            {...register('role')}
            type="text"
            className="input input-bordered w-full"
            placeholder="e.g., Tutor, Event Coordinator"
          />
          {errors.role && <p className="text-error mt-1">{errors.role.message}</p>}
        </div>

        <div className="form-control">
          <label className="label">
            <span className="label-text">Availability</span>
          </label>
          <input
            {...register('availability')}
            type="text"
            className="input input-bordered w-full"
            placeholder="e.g., Weekends, Mon-Wed"
          />
          {errors.availability && <p className="text-error mt-1">{errors.availability.message}</p>}
        </div>

        <div className="form-control">
          <label className="label">
            <span className="label-text">Message</span>
          </label>
          <textarea
            {...register('message')}
            className="textarea textarea-bordered h-24 w-full"
            placeholder="Tell us a little about yourself"
          ></textarea>
          {errors.message && <p className="text-error mt-1">{errors.message.message}</p>}
        </div>

        <button type="submit" className="btn btn-primary w-full mt-4">
          Submit Application
        </button>
      </form>
    </motion.div>
  );
}