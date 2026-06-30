import React, { useState, useEffect } from 'react';
import AdminLayout from '../../components/admin/AdminLayout';
import { Plus, Pencil, Trash2, X, Loader2, Image as ImageIcon } from 'lucide-react';
import { useForm, SubmitHandler } from 'react-hook-form';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

type GalleryForm = {
  title: string;
  category: string;
};

const AdminGallery = () => {
  const [gallery, setGallery] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editItem, setEditItem] = useState<any>(null);
  
  // For file upload
  const [selectedFileBase64, setSelectedFileBase64] = useState<string | null>(null);
  const [fileError, setFileError] = useState('');

  const { register, handleSubmit, reset, setValue, formState: { errors, isSubmitting } } = useForm<GalleryForm>();

  const token = localStorage.getItem('adminToken');

  const fetchGallery = async () => {
    try {
      const res = await fetch(`${API_URL}/api/gallery`);
      const data = await res.json();
      setGallery(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchGallery(); }, []);

  const openAdd = () => { 
    reset(); 
    setEditItem(null); 
    setSelectedFileBase64(null);
    setFileError('');
    setShowModal(true); 
  };
  
  const openEdit = (g: any) => {
    setEditItem(g);
    setValue('title', g.title || '');
    setValue('category', g.category || '');
    setSelectedFileBase64(g.imageUrl);
    setFileError('');
    setShowModal(true);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    setFileError('');
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      setFileError('Please select a valid image file.');
      return;
    }

    // Limit size to 5MB
    if (file.size > 5 * 1024 * 1024) {
      setFileError('Image size should be less than 5MB.');
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      setSelectedFileBase64(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  const onSubmit: SubmitHandler<GalleryForm> = async (data) => {
    if (!selectedFileBase64) {
      setFileError('Image is required.');
      return;
    }

    const method = editItem ? 'PUT' : 'POST';
    const url = editItem ? `${API_URL}/api/gallery/${editItem.id}` : `${API_URL}/api/gallery`;
    try {
      await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify({ ...data, imageUrl: selectedFileBase64 })
      });
      setShowModal(false);
      fetchGallery();
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm('Delete this image?')) return;
    await fetch(`${API_URL}/api/gallery/${id}`, {
      method: 'DELETE',
      headers: { Authorization: `Bearer ${token}` }
    });
    fetchGallery();
  };

  return (
    <AdminLayout>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Manage Gallery</h1>
          <p className="text-gray-500 mt-1">{gallery.length} images</p>
        </div>
        <button onClick={openAdd} className="flex items-center gap-2 btn btn-primary text-sm px-4 py-2">
          <Plus size={18} /> Add Image
        </button>
      </div>

      {loading ? (
        <div className="flex justify-center py-20"><Loader2 size={32} className="animate-spin text-primary" /></div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {gallery.length === 0 && <div className="col-span-full bg-white rounded-xl p-10 text-center text-gray-400">No images yet. Click "Add Image" to get started.</div>}
          {gallery.map((g) => (
            <div key={g.id} className="bg-white rounded-xl overflow-hidden border border-gray-100 shadow-sm flex flex-col">
              <div className="aspect-video w-full bg-gray-100 overflow-hidden relative group">
                <img src={g.imageUrl} alt={g.title || 'Gallery image'} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
              </div>
              <div className="p-4 flex flex-col flex-1">
                <h3 className="font-semibold text-gray-800 truncate">{g.title || 'Untitled'}</h3>
                <span className="text-xs text-primary font-medium mt-1 uppercase tracking-wide">{g.category || 'Uncategorized'}</span>
                
                <div className="flex gap-2 mt-4 pt-4 border-t border-gray-100 justify-end">
                  <button onClick={() => openEdit(g)} className="p-2 text-blue-500 hover:bg-blue-50 rounded-lg transition-colors"><Pencil size={18} /></button>
                  <button onClick={() => handleDelete(g.id)} className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"><Trash2 size={18} /></button>
                </div>
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
              <h2 className="text-lg font-bold text-gray-800">{editItem ? 'Edit Image' : 'Add New Image'}</h2>
              <button onClick={() => setShowModal(false)} className="p-2 hover:bg-gray-100 rounded-lg"><X size={20} /></button>
            </div>
            <form onSubmit={handleSubmit(onSubmit)} className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
                <input {...register('title')} placeholder="Event title..." className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:ring-primary focus:border-primary" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                <input {...register('category')} placeholder="e.g. CSR, Training" className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:ring-primary focus:border-primary" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Image Upload *</label>
                <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-lg hover:bg-gray-50 transition-colors">
                  <div className="space-y-1 text-center">
                    {selectedFileBase64 ? (
                       <img src={selectedFileBase64} alt="Preview" className="mx-auto h-32 w-auto object-contain rounded" />
                    ) : (
                      <ImageIcon className="mx-auto h-12 w-12 text-gray-400" />
                    )}
                    <div className="flex text-sm text-gray-600 justify-center mt-4">
                      <label htmlFor="file-upload" className="relative cursor-pointer bg-white rounded-md font-medium text-primary hover:text-[#0d655e] focus-within:outline-none">
                        <span>Upload a file</span>
                        <input id="file-upload" name="file-upload" type="file" accept="image/*" className="sr-only" onChange={handleFileChange} />
                      </label>
                    </div>
                    <p className="text-xs text-gray-500">PNG, JPG, GIF up to 5MB</p>
                  </div>
                </div>
                {fileError && <p className="text-red-500 text-xs mt-1">{fileError}</p>}
              </div>
              
              <div className="flex gap-3 pt-4 border-t border-gray-100">
                <button type="button" onClick={() => setShowModal(false)} className="flex-1 px-4 py-2 border border-gray-200 rounded-lg text-sm hover:bg-gray-50">Cancel</button>
                <button type="submit" disabled={isSubmitting} className="flex-1 px-4 py-2 bg-primary text-white rounded-lg text-sm hover:bg-[#0d655e] flex items-center justify-center gap-2">
                  {isSubmitting ? <Loader2 size={16} className="animate-spin" /> : null}
                  {editItem ? 'Update' : 'Upload'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </AdminLayout>
  );
};

export default AdminGallery;
