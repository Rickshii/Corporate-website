import React, { useState, useEffect } from 'react';
import AdminLayout from '../../components/admin/AdminLayout';
import { Plus, Pencil, Trash2, X, Loader2 } from 'lucide-react';
import { useForm, SubmitHandler } from 'react-hook-form';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

type ServiceForm = {
  title: string;
  description: string;
  icon: string;
  features: string;
  isActive: boolean;
};

const AdminServices = () => {
  const [services, setServices] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editItem, setEditItem] = useState<any>(null);
  const { register, handleSubmit, reset, setValue, formState: { errors, isSubmitting } } = useForm<ServiceForm>();

  const token = localStorage.getItem('adminToken');

  const fetchServices = async () => {
    try {
      const res = await fetch(`${API_URL}/api/services`);
      const data = await res.json();
      setServices(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchServices(); }, []);

  const openAdd = () => { reset(); setEditItem(null); setShowModal(true); };
  const openEdit = (s: any) => {
    setEditItem(s);
    setValue('title', s.title);
    setValue('description', s.description);
    setValue('icon', s.icon || '');
    setValue('features', s.features || '');
    setValue('isActive', s.isActive);
    setShowModal(true);
  };

  const onSubmit: SubmitHandler<ServiceForm> = async (data) => {
    const method = editItem ? 'PUT' : 'POST';
    const url = editItem ? `${API_URL}/api/services/${editItem.id}` : `${API_URL}/api/services`;
    try {
      await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify({ ...data, features: data.features.split('\n').filter(Boolean) })
      });
      setShowModal(false);
      fetchServices();
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm('Delete this service?')) return;
    await fetch(`${API_URL}/api/services/${id}`, {
      method: 'DELETE',
      headers: { Authorization: `Bearer ${token}` }
    });
    fetchServices();
  };

  return (
    <AdminLayout>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Manage Services</h1>
          <p className="text-gray-500 mt-1">{services.length} services</p>
        </div>
        <button onClick={openAdd} className="flex items-center gap-2 btn btn-primary text-sm px-4 py-2">
          <Plus size={18} /> Add Service
        </button>
      </div>

      {loading ? (
        <div className="flex justify-center py-20"><Loader2 size={32} className="animate-spin text-primary" /></div>
      ) : (
        <div className="grid gap-4">
          {services.length === 0 && <div className="bg-white rounded-xl p-10 text-center text-gray-400">No services yet. Click "Add Service" to get started.</div>}
          {services.map((s) => (
            <div key={s.id} className="bg-white rounded-xl p-5 border border-gray-100 shadow-sm flex items-center justify-between">
              <div>
                <h3 className="font-semibold text-gray-800">{s.title}</h3>
                <p className="text-sm text-gray-500 mt-1 line-clamp-2 max-w-xl">{s.description}</p>
                <span className={`text-xs mt-2 inline-block px-2 py-0.5 rounded-full font-medium ${s.isActive ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                  {s.isActive ? 'Active' : 'Inactive'}
                </span>
              </div>
              <div className="flex gap-2 ml-4">
                <button onClick={() => openEdit(s)} className="p-2 text-blue-500 hover:bg-blue-50 rounded-lg transition-colors"><Pencil size={18} /></button>
                <button onClick={() => handleDelete(s.id)} className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"><Trash2 size={18} /></button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-lg max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between p-6 border-b border-gray-100">
              <h2 className="text-lg font-bold text-gray-800">{editItem ? 'Edit Service' : 'Add New Service'}</h2>
              <button onClick={() => setShowModal(false)} className="p-2 hover:bg-gray-100 rounded-lg"><X size={20} /></button>
            </div>
            <form onSubmit={handleSubmit(onSubmit)} className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Title *</label>
                <input {...register('title', { required: 'Title is required' })} className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:ring-primary focus:border-primary" />
                {errors.title && <p className="text-red-500 text-xs mt-1">{errors.title.message}</p>}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Description *</label>
                <textarea {...register('description', { required: 'Description is required' })} rows={3} className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:ring-primary focus:border-primary resize-none" />
                {errors.description && <p className="text-red-500 text-xs mt-1">{errors.description.message}</p>}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Icon Name (Lucide)</label>
                <input {...register('icon')} placeholder="e.g. Calculator" className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:ring-primary focus:border-primary" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Features (one per line)</label>
                <textarea {...register('features')} rows={5} placeholder="Bookkeeping & Accounting&#10;Bank Reconciliation" className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm font-mono focus:ring-primary focus:border-primary resize-none" />
              </div>
              <div className="flex items-center gap-2">
                <input type="checkbox" {...register('isActive')} id="isActive" className="rounded text-primary" />
                <label htmlFor="isActive" className="text-sm text-gray-700">Active</label>
              </div>
              <div className="flex gap-3 pt-2">
                <button type="button" onClick={() => setShowModal(false)} className="flex-1 px-4 py-2 border border-gray-200 rounded-lg text-sm hover:bg-gray-50">Cancel</button>
                <button type="submit" disabled={isSubmitting} className="flex-1 px-4 py-2 bg-primary text-white rounded-lg text-sm hover:bg-[#0d655e] flex items-center justify-center gap-2">
                  {isSubmitting ? <Loader2 size={16} className="animate-spin" /> : null}
                  {editItem ? 'Update' : 'Create'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </AdminLayout>
  );
};

export default AdminServices;
