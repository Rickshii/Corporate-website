import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { supabase } from './lib/supabase';

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
  const [session, setSession] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      if (session) {
        localStorage.setItem('adminToken', session.access_token);
      } else {
        localStorage.removeItem('adminToken');
      }
      setLoading(false);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      if (session) {
        localStorage.setItem('adminToken', session.access_token);
      } else {
        localStorage.removeItem('adminToken');
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center bg-gray-100">Loading...</div>;
  }

  if (!session) {
    return <Navigate to="/admin/login" replace />;
  }
  
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
