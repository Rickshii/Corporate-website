import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

// Client
import Layout from './components/layout/Layout';
import Home from './pages/client/Home';
import About from './pages/client/About';
import Services from './pages/client/Services';
import Training from './pages/client/Training';
import Placement from './pages/client/Placement';
import Contact from './pages/client/Contact';
import ClientGallery from './pages/client/Gallery';

// Admin
import AdminLayout from './components/admin/AdminLayout';
import AdminLogin from './pages/admin/Login';
import AdminDashboard from './pages/admin/Dashboard';
import AdminServices from './pages/admin/Services';
import AdminCourses from './pages/admin/Courses';
import AdminEnquiries from './pages/admin/Enquiries';
import AdminGallery from './pages/admin/Gallery';
import AdminSettings from './pages/admin/Settings';
import ForgotPassword from './pages/admin/ForgotPassword';
import AdminRegister from './pages/admin/Register';

// Protected Route Guard
const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const token = localStorage.getItem('adminToken');
  if (!token) return <Navigate to="/admin/login" replace />;
  return <>{children}</>;
};

function App() {
  return (
    <Router>
      <Routes>
        {/* Public Client Routes */}
        <Route element={<Layout><Home /></Layout>} path="/" />
        <Route element={<Layout><About /></Layout>} path="/about" />
        <Route element={<Layout><Services /></Layout>} path="/services" />
        <Route element={<Layout><Training /></Layout>} path="/training" />
        <Route element={<Layout><Placement /></Layout>} path="/placement" />
        <Route element={<Layout><ClientGallery /></Layout>} path="/gallery" />
        <Route element={<Layout><Contact /></Layout>} path="/contact" />

        {/* Admin Routes */}
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin/register" element={<AdminRegister />} />
        <Route path="/admin/forgot-password" element={<ForgotPassword />} />
        <Route path="/admin" element={<ProtectedRoute><AdminDashboard /></ProtectedRoute>} />
        <Route path="/admin/services" element={<ProtectedRoute><AdminServices /></ProtectedRoute>} />
        <Route path="/admin/courses" element={<ProtectedRoute><AdminCourses /></ProtectedRoute>} />
        <Route path="/admin/enquiries" element={<ProtectedRoute><AdminEnquiries /></ProtectedRoute>} />
        <Route path="/admin/gallery" element={<ProtectedRoute><AdminGallery /></ProtectedRoute>} />
        <Route path="/admin/settings" element={<ProtectedRoute><AdminSettings /></ProtectedRoute>} />
        <Route path="/admin/*" element={<Navigate to="/admin" replace />} />

        {/* Fallback */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}

export default App;
