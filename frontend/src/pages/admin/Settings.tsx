import React, { useState } from 'react';
import AdminLayout from '../../components/admin/AdminLayout';
import { Loader2, KeyRound, ShieldAlert } from 'lucide-react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { API_URL } from '../../config';

type ChangePasswordForm = {
  oldPassword: string;
  newPassword: string;
  confirmPassword: string;
};

const AdminSettings = () => {
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm<ChangePasswordForm>();

  const token = localStorage.getItem('adminToken');

  const onSubmit: SubmitHandler<ChangePasswordForm> = async (data) => {
    setError('');
    setSuccess('');
    
    if (data.newPassword !== data.confirmPassword) {
      setError('New passwords do not match');
      return;
    }

    try {
      const res = await fetch(`${API_URL}/api/auth/change-password`, {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({
          oldPassword: data.oldPassword,
          newPassword: data.newPassword
        })
      });

      const resData = await res.json();

      if (!res.ok) {
        throw new Error(resData.message || 'Failed to update password');
      }
      
      setSuccess('Password updated successfully');
      reset();
    } catch (err: any) {
      setError(err.message || 'Something went wrong');
    }
  };

  return (
    <AdminLayout>
      <div className="mb-8">
        <h2 className="text-3xl font-heading font-extrabold text-white tracking-tight">Account Settings</h2>
        <p className="text-slate-400 mt-1 text-sm font-body">Update your administrative credentials securely.</p>
      </div>

      <div className="glass-dark border border-white/5 rounded-3xl p-8 max-w-2xl shadow-xl">
        <h3 className="text-xl font-heading font-bold text-white mb-6 flex items-center gap-3">
          <KeyRound size={22} className="text-primary" />
          Change Password
        </h3>

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

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2 font-heading">Current Password</label>
            <input 
              type="password" 
              {...register('oldPassword', { required: 'Current password is required' })} 
              className="w-full px-4 py-3 bg-navy-900 border border-white/10 rounded-2xl text-sm text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all font-body" 
              placeholder="••••••••"
            />
            {errors.oldPassword && <p className="text-red-400 text-xs mt-2 font-semibold font-body">⚠️ {errors.oldPassword.message}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2 font-heading">New Password</label>
            <input 
              type="password" 
              {...register('newPassword', { 
                required: 'New password is required',
                minLength: { value: 6, message: 'Password must be at least 6 characters' }
              })} 
              className="w-full px-4 py-3 bg-navy-900 border border-white/10 rounded-2xl text-sm text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all font-body" 
              placeholder="••••••••"
            />
            {errors.newPassword && <p className="text-red-400 text-xs mt-2 font-semibold font-body">⚠️ {errors.newPassword.message}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2 font-heading">Confirm New Password</label>
            <input 
              type="password" 
              {...register('confirmPassword', { required: 'Please confirm your new password' })} 
              className="w-full px-4 py-3 bg-navy-900 border border-white/10 rounded-2xl text-sm text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all font-body" 
              placeholder="••••••••"
            />
            {errors.confirmPassword && <p className="text-red-400 text-xs mt-2 font-semibold font-body">⚠️ {errors.confirmPassword.message}</p>}
          </div>

          <div className="pt-4">
            <button 
              type="submit" 
              disabled={isSubmitting} 
              className="px-6 py-3.5 bg-gradient-to-r from-primary to-primary-dark text-white rounded-2xl text-sm font-semibold hover:shadow-[0_4px_16px_rgba(16,185,129,0.35)] flex items-center justify-center gap-2 cursor-pointer transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? <Loader2 size={16} className="animate-spin" /> : null}
              {isSubmitting ? 'Updating Password...' : 'Update Password'}
            </button>
          </div>
        </form>
      </div>
    </AdminLayout>
  );
};

export default AdminSettings;

