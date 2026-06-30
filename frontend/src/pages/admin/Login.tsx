import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Lock, Mail, Loader2, KeyRound } from 'lucide-react';
import logo from '../../assets/compy logo.jpeg';
import { API_URL, apiFetch } from '../../config';

const AdminLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    
    try {
      const res = await apiFetch(`${API_URL}/api/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || 'Invalid email or password');
      }

      if (data.token) {
        localStorage.setItem('adminToken', data.token);
        
        // Wait briefly for local storage to persist and navigate to admin dashboard
        setTimeout(() => {
          navigate('/admin');
        }, 100);
      }
    } catch (err: any) {
      setError(err.message || 'Invalid email or password');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-navy-950 flex items-center justify-center p-4 relative overflow-hidden bg-grid-pattern">
      {/* Decorative Blobs */}
      <div className="blob bg-primary w-[300px] h-[300px] -top-20 -left-20 opacity-20"></div>
      <div className="blob bg-secondary-light w-[400px] h-[400px] -bottom-40 -right-20 opacity-30"></div>

      <div className="w-full max-w-md relative z-10">
        <div className="glass-dark border border-white/10 rounded-3xl p-8 backdrop-blur-xl shadow-2xl relative">
          
          {/* Logo / Header */}
          <div className="text-center mb-8">
            <div className="inline-block relative p-1 bg-white/10 rounded-2xl border border-white/20 mb-4 shadow-lg">
              <img src={logo} alt="Values Vruksha" className="h-16 w-auto object-contain rounded-xl" />
              <div className="absolute inset-0 rounded-2xl opacity-50 shadow-[0_0_16px_rgba(16,185,129,0.5)]"></div>
            </div>
            <h2 className="text-3xl font-heading font-extrabold text-white tracking-tight">Admin Portal</h2>
            <p className="text-sm text-emerald-400 font-heading font-semibold tracking-wider mt-1 uppercase">Values Vruksha</p>
          </div>
          
          {error && (
            <div className="bg-red-500/10 border border-red-500/30 text-red-300 text-sm p-4 rounded-xl mb-6 flex items-start gap-2.5">
              <span className="font-bold">⚠️</span>
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2 font-heading">Email Address</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-emerald-400/70" />
                </div>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="block w-full pl-11 pr-4 py-3.5 bg-navy-900/60 border border-white/10 rounded-2xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all text-sm font-body"
                  placeholder="admin@valuesvruksha.in"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2 font-heading">Password</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-emerald-400/70" />
                </div>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="block w-full pl-11 pr-4 py-3.5 bg-navy-900/60 border border-white/10 rounded-2xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all text-sm font-body"
                  placeholder="••••••••"
                  required
                />
              </div>
              <div className="mt-2.5 text-right">
                <Link to="/admin/forgot-password" className="text-xs font-semibold text-emerald-400 hover:text-emerald-300 transition-colors">
                  Forgot Password?
                </Link>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full flex justify-center items-center gap-2.5 py-3.5 px-6 border-none rounded-2xl text-sm font-semibold text-white bg-gradient-to-r from-primary to-primary-dark shadow-[0_4px_20px_rgba(16,185,129,0.3)] hover:shadow-[0_8px_30px_rgba(16,185,129,0.5)] transform hover:-translate-y-0.5 active:translate-y-0 transition-all cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
            >
              {loading ? (
                <>
                  <Loader2 size={18} className="animate-spin" />
                  <span>Signing In...</span>
                </>
              ) : (
                <>
                  <KeyRound size={18} />
                  <span>Sign In</span>
                </>
              )}
            </button>
          </form>

          <div className="mt-8 pt-6 border-t border-white/5 text-center">
            <p className="text-xs text-slate-400 font-body">
              For security reasons, always logout after finishing your session.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
