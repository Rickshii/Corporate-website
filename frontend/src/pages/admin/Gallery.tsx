import React, { useState, useEffect } from 'react';
import AdminLayout from '../../components/admin/AdminLayout';
import { Plus, Pencil, Trash2, X, Loader2, Image as ImageIcon } from 'lucide-react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { API_URL, apiFetch } from '../../config';


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
  const [selectedFilePreview, setSelectedFilePreview] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [fileError, setFileError] = useState('');

  const { register, handleSubmit, reset, setValue, formState: { errors, isSubmitting } } = useForm<GalleryForm>();

  const token = localStorage.getItem('adminToken');

  // Handle all image URL formats: base64 data URLs, absolute URLs, and legacy relative /uploads/ paths
  const getFullImageUrl = (url: string) => {
    if (!url) return '';
    if (url.startsWith('data:') || url.startsWith('http')) return url;
    return `${API_URL}${url}`;
  };

  const fetchGallery = async () => {
    try {
      const res = await apiFetch(`${API_URL}/api/gallery`);
      const data = await res.json();
      if (Array.isArray(data)) {
        setGallery(data);
      }
    } catch (err) {
      console.error('Error fetching gallery:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchGallery(); }, []);

  const openAdd = () => { 
    reset(); 
    setEditItem(null); 
    setSelectedFilePreview(null);
    setSelectedFile(null);
    setFileError('');
    setShowModal(true); 
  };
  
  const openEdit = (g: any) => {
    setEditItem(g);
    setValue('title', g.title || '');
    setValue('category', g.category || '');
    setSelectedFilePreview(getFullImageUrl(g.imageUrl));
    setSelectedFile(null);
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

    if (file.size > 5 * 1024 * 1024) {
      setFileError('Image size should be less than 5MB.');
      return;
    }

    setSelectedFile(file);

    const reader = new FileReader();
    reader.onloadend = () => {
      setSelectedFilePreview(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  const onSubmit: SubmitHandler<GalleryForm> = async (data) => {
    if (!selectedFile && !editItem) {
      setFileError('Image file is required.');
      return;
    }

    // Prepare multipart FormData
    const formData = new FormData();
    formData.append('title', data.title || '');
    formData.append('category', data.category || '');
    
    if (selectedFile) {
      formData.append('image', selectedFile);
    }

    const method = editItem ? 'PUT' : 'POST';
    const url = editItem ? `${API_URL}/api/gallery/${editItem._id}` : `${API_URL}/api/gallery`;
    
    try {
      const res = await apiFetch(url, {
        method,
        headers: { 
          Authorization: `Bearer ${token}` 
        },
        body: formData
      });

      if (!res.ok) {
        const errData = await res.json();
        throw new Error(errData.message || 'Failed to save gallery item.');
      }

      setShowModal(false);
      fetchGallery();
    } catch (err: any) {
      console.error(err);
      setFileError(err.message || 'An error occurred while uploading.');
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this image?')) return;
    try {
      const res = await apiFetch(`${API_URL}/api/gallery/${id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` }
      });

      if (!res.ok) {
        throw new Error('Failed to delete item');
      }

      fetchGallery();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <AdminLayout>
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
        <div>
          <h2 className="text-3xl font-heading font-extrabold text-white tracking-tight">Manage Gallery</h2>
          <p className="text-slate-400 mt-1 text-sm font-body">{gallery.length} images uploaded permanently</p>
        </div>
        <button onClick={openAdd} className="flex items-center justify-center gap-2 px-5 py-3 rounded-2xl bg-gradient-to-r from-primary to-primary-dark font-heading font-semibold text-sm text-white hover:shadow-[0_4px_16px_rgba(16,185,129,0.35)] transform hover:-translate-y-0.5 active:translate-y-0 transition-all cursor-pointer">
          <Plus size={18} /> Add Image
        </button>
      </div>

      {loading ? (
        <div className="flex justify-center py-20"><Loader2 size={32} className="animate-spin text-primary" /></div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {gallery.length === 0 && (
            <div className="col-span-full glass-dark border border-white/5 rounded-2xl p-16 text-center text-slate-500 font-body">
              <ImageIcon className="mx-auto h-12 w-12 text-slate-600 mb-3" />
              <p className="text-base">No images yet. Click "Add Image" to get started.</p>
            </div>
          )}
          {gallery.map((g) => (
            <div key={g._id} className="glass-dark border border-white/5 rounded-2xl overflow-hidden shadow-lg flex flex-col hover:border-white/10 transition-colors">
              <div className="aspect-video w-full bg-navy-900/50 overflow-hidden relative group border-b border-white/5">
                <img src={getFullImageUrl(g.imageUrl)} alt={g.title || 'Gallery image'} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                <div className="absolute inset-0 bg-gradient-to-t from-navy-950/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>
              <div className="p-5 flex flex-col flex-1">
                <h3 className="font-heading font-bold text-white truncate text-base">{g.title || 'Untitled'}</h3>
                <span className="inline-block mt-2 self-start px-3 py-1 rounded-full text-[10px] font-extrabold uppercase tracking-wider bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">{g.category || 'General'}</span>
                
                <div className="flex gap-3 mt-5 pt-4 border-t border-white/5 justify-end">
                  <button onClick={() => openEdit(g)} className="p-2.5 text-blue-400 hover:bg-blue-500/10 rounded-xl transition-all cursor-pointer"><Pencil size={18} /></button>
                  <button onClick={() => handleDelete(g._id)} className="p-2.5 text-red-400 hover:bg-red-500/10 rounded-xl transition-all cursor-pointer"><Trash2 size={18} /></button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-navy-950/80 backdrop-blur-md flex items-center justify-center z-50 p-4">
          <div className="glass-dark border border-white/10 rounded-3xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto relative">
            <div className="flex items-center justify-between p-6 border-b border-white/5">
              <h3 className="text-xl font-heading font-extrabold text-white">{editItem ? 'Edit Image Info' : 'Upload New Image'}</h3>
              <button onClick={() => setShowModal(false)} className="p-2 hover:bg-white/5 rounded-xl text-slate-400 hover:text-white transition-colors cursor-pointer"><X size={20} /></button>
            </div>
            
            <form onSubmit={handleSubmit(onSubmit)} className="p-6 space-y-5">
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2 font-heading">Title</label>
                <input {...register('title')} placeholder="Enter event or course title..." className="w-full px-4 py-3 bg-navy-900 border border-white/10 rounded-2xl text-sm text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all font-body" />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2 font-heading">Category</label>
                <input {...register('category')} placeholder="e.g. Training, Placement, CSR" className="w-full px-4 py-3 bg-navy-900 border border-white/10 rounded-2xl text-sm text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all font-body" />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2 font-heading">Image Upload *</label>
                <div className="mt-1 flex justify-center px-6 pt-6 pb-6 border-2 border-white/10 border-dashed rounded-2xl hover:bg-white/5 transition-colors cursor-pointer relative">
                  <div className="space-y-2 text-center">
                    {selectedFilePreview ? (
                       <img src={selectedFilePreview} alt="Preview" className="mx-auto h-36 w-auto object-contain rounded-xl border border-white/10 shadow-lg" />
                    ) : (
                      <ImageIcon className="mx-auto h-12 w-12 text-slate-500" />
                    )}
                    <div className="flex text-sm text-slate-300 justify-center mt-4">
                      <label htmlFor="file-upload" className="relative cursor-pointer bg-transparent rounded-md font-semibold text-emerald-400 hover:text-emerald-300 transition-colors">
                        <span>Upload a file</span>
                        <input id="file-upload" name="file-upload" type="file" accept="image/*" className="sr-only" onChange={handleFileChange} />
                      </label>
                    </div>
                    <p className="text-xs text-slate-500 font-body">PNG, JPG, GIF or WEBP up to 5MB</p>
                  </div>
                </div>
                {fileError && <p className="text-red-400 text-xs mt-2 font-semibold font-body">⚠️ {fileError}</p>}
              </div>
              
              <div className="flex gap-3 pt-5 border-t border-white/5">
                <button type="button" onClick={() => setShowModal(false)} className="flex-1 px-4 py-3 border border-white/10 bg-transparent text-slate-300 rounded-2xl text-sm font-semibold hover:bg-white/5 hover:text-white transition-all cursor-pointer">Cancel</button>
                <button type="submit" disabled={isSubmitting} className="flex-1 px-4 py-3 bg-gradient-to-r from-primary to-primary-dark text-white rounded-2xl text-sm font-semibold hover:shadow-[0_4px_16px_rgba(16,185,129,0.35)] flex items-center justify-center gap-2 cursor-pointer transition-all disabled:opacity-50 disabled:cursor-not-allowed">
                  {isSubmitting ? <Loader2 size={16} className="animate-spin" /> : null}
                  {editItem ? 'Update Details' : 'Upload Image'}
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

