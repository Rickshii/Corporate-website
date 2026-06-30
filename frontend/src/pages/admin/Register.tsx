import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Mail, Lock, User, Loader2, ArrowLeft } from 'lucide-react';
import logo from '../../assets/compy logo.jpeg';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

const AdminRegister = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setLoading(true);

    try {
      const res = await fetch(`${API_URL}/api/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password }),
      });
      
      const data = await res.json();
      
      if (!res.ok) {
        throw new Error(data.message || 'Registration failed');
      }
      
      setSuccess('Account created successfully! You can now log in.');
      setTimeout(() => navigate('/admin/login'), 2000);
    } catch (err: any) {
      setError(err.message || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="bg-white max-w-md w-full rounded-2xl shadow-xl overflow-hidden">
        <div className="p-8 text-center bg-gray-50 border-b border-gray-100">
          <img src={logo} alt="Values Vruksha" className="h-16 mx-auto mb-4" />
          <h2 className="text-2xl font-heading font-bold text-gray-800">Create Admin Account</h2>
          <p className="text-sm text-gray-500 mt-1">Register a new administrator</p>
        </div>
        
        <div className="p-8">
          {error && (
            <div className="bg-red-50 text-red-600 text-sm p-3 rounded-lg mb-6 border border-red-100">
              {error}
            </div>
          )}
          {success && (
            <div className="bg-green-50 text-green-600 text-sm p-3 rounded-lg mb-6 border border-green-100">
              {success}
            </div>
          )}

          <form onSubmit={handleRegister} className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <User className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="block w-full pl-10 pr-3 py-2.5 border border-gray-200 rounded-lg focus:ring-primary focus:border-primary sm:text-sm bg-gray-50"
                  placeholder="John Doe"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="block w-full pl-10 pr-3 py-2.5 border border-gray-200 rounded-lg focus:ring-primary focus:border-primary sm:text-sm bg-gray-50"
                  placeholder="admin@valuesvruksha.in"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="block w-full pl-10 pr-3 py-2.5 border border-gray-200 rounded-lg focus:ring-primary focus:border-primary sm:text-sm bg-gray-50"
                  placeholder="••••••••"
                  minLength={6}
                  required
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading || !!success}
              className="w-full flex justify-center items-center gap-2 py-2.5 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-primary hover:bg-[#0d655e] focus:outline-none transition-colors disabled:opacity-50"
            >
              {loading && <Loader2 size={16} className="animate-spin" />}
              {loading ? 'Creating Account...' : 'Create Account'}
            </button>
          </form>
          
          <div className="mt-6 text-center">
            <Link to="/admin/login" className="text-sm text-primary hover:text-[#0d655e] font-medium flex items-center justify-center gap-1">
              <ArrowLeft size={16} /> Back to Login
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminRegister;
