// frontend/src/App.jsx
import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import Home from './pages/Home';
import Register from './pages/Register';
import AdminLogin from './pages/AdminLogin';
import AdminDashboard from './pages/AdminDashboard';

// Placeholder for the logo - assuming the image is in the public folder
const logoUrl = "/basti-pathshala-logo.jpg";

const pageVariants = {
  initial: { opacity: 0, x: '-100vw' },
  in: { opacity: 1, x: 0 },
  out: { opacity: 0, x: '100vw' },
};

const pageTransition = {
  type: 'tween',
  ease: 'anticipate',
  duration: 0.5,
};

export default function App() {
  return (
    <div className="flex flex-col min-h-screen">
      <nav className="navbar bg-base-100 shadow-md">
        <div className="flex-1">
          <Link to="/" className="flex items-center gap-2 normal-case">
            <img src={logoUrl} alt="Basti Ki Pathshala Logo" className="h-10" />
            <span className="text-xl font-bold">Basti Ki Pathshala</span>
          </Link>
        </div>
        <div className="flex-none">
          <ul className="menu menu-horizontal px-1">
            <li><Link to="/">Home</Link></li>
            <li><Link to="/register">Register</Link></li>
            <li><Link to="/admin">Admin</Link></li>
          </ul>
        </div>
      </nav>

      <div className="flex-grow p-6 md:p-10 flex items-center justify-center">
        <AnimatePresence mode="wait">
          <Routes>
            <Route path="/" element={<AnimatedPage><Home /></AnimatedPage>} />
            <Route path="/register" element={<AnimatedPage><Register /></AnimatedPage>} />
            <Route path="/admin" element={<AnimatedPage><AdminLogin /></AnimatedPage>} />
            <Route path="/admin/dashboard" element={<AnimatedPage><AdminDashboard /></AnimatedPage>} />
          </Routes>
        </AnimatePresence>
      </div>

      <footer className="footer footer-center p-4 bg-base-300 text-base-content">
        <aside>
          <p>Copyright © {new Date().getFullYear()} - All rights reserved by Basti Ki Pathshala Foundation</p>
        </aside>
      </footer>
    </div>
  );
}

const AnimatedPage = ({ children }) => (
  <motion.div
    initial="initial"
    animate="in"
    exit="out"
    variants={pageVariants}
    transition={pageTransition}
  >
    {children}
  </motion.div>
);