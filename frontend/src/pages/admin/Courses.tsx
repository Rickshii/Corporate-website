import React, { useState, useEffect } from 'react';
import AdminLayout from '../../components/admin/AdminLayout';
import { Plus, Pencil, Trash2, X, Loader2 } from 'lucide-react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { API_URL } from '../../config';

type CourseForm = { title: string; description: string; duration: string; fee: number; isActive: boolean };

const AdminCourses = () => {
  const [courses, setCourses] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editItem, setEditItem] = useState<any>(null);
  const { register, handleSubmit, reset, setValue, formState: { isSubmitting } } = useForm<CourseForm>();
  const token = localStorage.getItem('adminToken');

  const fetch_ = async () => {
    try {
      const res = await fetch(`${API_URL}/api/courses`);
      setCourses(await res.json());
    } finally { setLoading(false); }
  };
  useEffect(() => { fetch_(); }, []);

  const openAdd = () => { reset(); setEditItem(null); setShowModal(true); };
  const openEdit = (c: any) => {
    setEditItem(c); setValue('title', c.title); setValue('description', c.description);
    setValue('duration', c.duration || ''); setValue('fee', c.fee || 0); setValue('isActive', c.isActive);
    setShowModal(true);
  };
  const onSubmit: SubmitHandler<CourseForm> = async (data) => {
    const method = editItem ? 'PUT' : 'POST';
    const url = editItem ? `${API_URL}/api/courses/${editItem.id}` : `${API_URL}/api/courses`;
    await fetch(url, { method, headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` }, body: JSON.stringify(data) });
    setShowModal(false); fetch_();
  };
  const del = async (id: number) => {
    if (!confirm('Delete this course?')) return;
    await fetch(`${API_URL}/api/courses/${id}`, { method: 'DELETE', headers: { Authorization: `Bearer ${token}` } });
    fetch_();
  };

  return (
    <AdminLayout>
      <div className="flex items-center justify-between mb-6">
        <div><h1 className="text-2xl font-bold text-gray-800">Manage Courses</h1><p className="text-gray-500">{courses.length} courses</p></div>
        <button onClick={openAdd} className="flex items-center gap-2 btn btn-primary text-sm px-4 py-2"><Plus size={18} /> Add Course</button>
      </div>
      {loading ? <div className="flex justify-center py-20"><Loader2 size={32} className="animate-spin text-primary" /></div> : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          {courses.length === 0 && <div className="col-span-full bg-white rounded-xl p-10 text-center text-gray-400">No courses yet.</div>}
          {courses.map((c) => (
            <div key={c.id} className="bg-white rounded-xl p-5 border border-gray-100 shadow-sm">
              <div className="flex justify-between items-start">
                <h3 className="font-semibold text-gray-800 flex-1 mr-2">{c.title}</h3>
                <div className="flex gap-1">
                  <button onClick={() => openEdit(c)} className="p-1.5 text-blue-500 hover:bg-blue-50 rounded-lg"><Pencil size={15} /></button>
                  <button onClick={() => del(c.id)} className="p-1.5 text-red-500 hover:bg-red-50 rounded-lg"><Trash2 size={15} /></button>
                </div>
              </div>
              <p className="text-sm text-gray-500 mt-2 line-clamp-2">{c.description}</p>
              <div className="flex gap-3 mt-3">
                {c.duration && <span className="text-xs bg-blue-50 text-blue-700 px-2 py-0.5 rounded-full">{c.duration}</span>}
                {c.fee && <span className="text-xs bg-amber-50 text-amber-700 px-2 py-0.5 rounded-full">₹{c.fee}</span>}
                <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${c.isActive ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>{c.isActive ? 'Active' : 'Inactive'}</span>
              </div>
            </div>
          ))}
        </div>
      )}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-lg">
            <div className="flex items-center justify-between p-6 border-b"><h2 className="text-lg font-bold">{editItem ? 'Edit Course' : 'Add Course'}</h2><button onClick={() => setShowModal(false)}><X size={20} /></button></div>
            <form onSubmit={handleSubmit(onSubmit)} className="p-6 space-y-4">
              <div><label className="block text-sm font-medium text-gray-700 mb-1">Title *</label><input {...register('title', { required: true })} className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm" /></div>
              <div><label className="block text-sm font-medium text-gray-700 mb-1">Description *</label><textarea {...register('description', { required: true })} rows={3} className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm resize-none" /></div>
              <div className="grid grid-cols-2 gap-3">
                <div><label className="block text-sm font-medium text-gray-700 mb-1">Duration</label><input {...register('duration')} placeholder="e.g. 3 months" className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm" /></div>
                <div><label className="block text-sm font-medium text-gray-700 mb-1">Fee (₹)</label><input type="number" {...register('fee')} className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm" /></div>
              </div>
              <div className="flex items-center gap-2"><input type="checkbox" {...register('isActive')} id="courseActive" className="rounded text-primary" /><label htmlFor="courseActive" className="text-sm">Active</label></div>
              <div className="flex gap-3 pt-2">
                <button type="button" onClick={() => setShowModal(false)} className="flex-1 px-4 py-2 border border-gray-200 rounded-lg text-sm">Cancel</button>
                <button type="submit" disabled={isSubmitting} className="flex-1 px-4 py-2 bg-primary text-white rounded-lg text-sm flex items-center justify-center gap-2">{isSubmitting && <Loader2 size={16} className="animate-spin" />}{editItem ? 'Update' : 'Create'}</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </AdminLayout>
  );
};

export default AdminCourses;
