import React, { useState } from 'react';
import AdminLayout from '../../components/admin/AdminLayout';
import { Loader2, KeyRound } from 'lucide-react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { supabase } from '../../lib/supabase';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

type ChangePasswordForm = {
  oldPassword: string;
  newPassword: string;
  confirmPassword: string;
};

const AdminSettings = () => {
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm<ChangePasswordForm>();

  const onSubmit: SubmitHandler<ChangePasswordForm> = async (data) => {
    setError('');
    setSuccess('');
    
    if (data.newPassword !== data.confirmPassword) {
      setError('New passwords do not match');
      return;
    }

    try {
      // With Supabase Auth, you don't need the old password to update the password if you're logged in
      const { error: updateError } = await supabase.auth.updateUser({
        password: data.newPassword
      });
      
      if (updateError) {
        throw new Error(updateError.message);
      }
      
      setSuccess('Password changed successfully');
      reset();
    } catch (err: any) {
      setError(err.message || 'Something went wrong');
    }
  };

  return (
    <AdminLayout>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Settings</h1>
        <p className="text-gray-500 mt-1">Manage your account preferences</p>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 max-w-2xl">
        <h2 className="text-lg font-bold text-gray-800 mb-6 flex items-center gap-2">
          <KeyRound size={20} className="text-primary" />
          Change Password
        </h2>

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

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">New Password</label>
            <input 
              type="password" 
              {...register('newPassword', { 
                required: 'New password is required',
                minLength: { value: 6, message: 'Password must be at least 6 characters' }
              })} 
              className="w-full px-4 py-2 border border-gray-200 rounded-lg text-sm focus:ring-primary focus:border-primary" 
              placeholder="••••••••"
            />
            {errors.newPassword && <p className="text-red-500 text-xs mt-1">{errors.newPassword.message}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Confirm New Password</label>
            <input 
              type="password" 
              {...register('confirmPassword', { required: 'Please confirm your new password' })} 
              className="w-full px-4 py-2 border border-gray-200 rounded-lg text-sm focus:ring-primary focus:border-primary" 
              placeholder="••••••••"
            />
          </div>

          <div className="pt-2">
            <button 
              type="submit" 
              disabled={isSubmitting} 
              className="px-6 py-2.5 bg-primary text-white rounded-lg text-sm font-medium hover:bg-[#0d655e] flex items-center justify-center gap-2 transition-colors disabled:opacity-50"
            >
              {isSubmitting ? <Loader2 size={16} className="animate-spin" /> : null}
              {isSubmitting ? 'Updating...' : 'Update Password'}
            </button>
          </div>
        </form>
      </div>
    </AdminLayout>
  );
};

export default AdminSettings;
