import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Mail, Lock, KeyRound, Loader2, ArrowLeft, ShieldAlert } from 'lucide-react';
import logo from '../../assets/compy logo.jpeg';
import { API_URL, apiFetch } from '../../config';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [secretKey, setSecretKey] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleReset = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setLoading(true);
    
    try {
      const res = await apiFetch(`${API_URL}/api/auth/forgot-password`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, secretKey, newPassword })
      });

      const resData = await res.json();

      if (!res.ok) {
        throw new Error(resData.message || 'Reset failed');
      }
      
      setSuccess('Password has been reset successfully! Redirecting to login...');
      setTimeout(() => navigate('/admin/login'), 2500);
    } catch (err: any) {
      setError(err.message || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#070b19] flex items-center justify-center p-4 relative overflow-hidden">
      {/* Background Gradients */}
      <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] rounded-full bg-emerald-500/10 blur-[120px]" />
      <div className="absolute bottom-[-20%] right-[-10%] w-[50%] h-[50%] rounded-full bg-blue-500/10 blur-[120px]" />

      <div className="glass-dark border border-white/5 max-w-md w-full rounded-3xl shadow-2xl overflow-hidden relative">
        <div className="p-8 text-center border-b border-white/5">
          <img src={logo} alt="Values Vruksha" className="h-16 mx-auto mb-4 rounded-2xl" />
          <h2 className="text-2xl font-heading font-extrabold text-white tracking-tight">Reset Password</h2>
          <p className="text-sm text-slate-400 mt-1 font-body">Enter your admin credentials and secret key</p>
        </div>
        
        <div className="p-8">
          {error && (
            <div className="bg-red-500/10 text-red-400 text-sm p-4 rounded-2xl mb-6 border border-red-500/20 flex items-center gap-2 font-body font-semibold">
              <ShieldAlert size={18} /> {error}
            </div>
          )}
          {success && (
            <div className="bg-emerald-500/10 text-emerald-400 text-sm p-4 rounded-2xl mb-6 border border-emerald-500/20 font-body font-semibold">
              ✨ {success}
            </div>
          )}

          <form onSubmit={handleReset} className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2 font-heading">Admin Email</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-slate-500" />
                </div>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="block w-full pl-11 pr-4 py-3 bg-navy-900 border border-white/10 rounded-2xl text-sm text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all font-body"
                  placeholder="admin@valuesvruksha.in"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2 font-heading">Admin Secret Key</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <KeyRound className="h-5 w-5 text-slate-500" />
                </div>
                <input
                  type="password"
                  value={secretKey}
                  onChange={(e) => setSecretKey(e.target.value)}
                  className="block w-full pl-11 pr-4 py-3 bg-navy-900 border border-white/10 rounded-2xl text-sm text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all font-body"
                  placeholder="Enter system secret key"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2 font-heading">New Password</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-slate-500" />
                </div>
                <input
                  type="password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className="block w-full pl-11 pr-4 py-3 bg-navy-900 border border-white/10 rounded-2xl text-sm text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all font-body"
                  placeholder="••••••••"
                  minLength={6}
                  required
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading || !!success}
              className="w-full flex justify-center items-center gap-2 py-3.5 px-4 bg-gradient-to-r from-primary to-primary-dark text-white rounded-2xl text-sm font-semibold hover:shadow-[0_4px_16px_rgba(16,185,129,0.35)] transition-all cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading && <Loader2 size={16} className="animate-spin" />}
              {loading ? 'Resetting Password...' : 'Reset Password'}
            </button>
          </form>
          
          <div className="mt-6 text-center">
            <Link to="/admin/login" className="text-sm text-emerald-400 hover:text-emerald-300 font-medium flex items-center justify-center gap-1 transition-colors">
              <ArrowLeft size={16} /> Back to Login
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;

