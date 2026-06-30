import React, { useState, useEffect } from 'react';
import AdminLayout from '../../components/admin/AdminLayout';
import { Mail, Phone, Eye, CheckCircle2, Clock, Loader2 } from 'lucide-react';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

const AdminEnquiries = () => {
  const [enquiries, setEnquiries] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState<any>(null);
  const token = localStorage.getItem('adminToken');

  const fetch_ = async () => {
    try {
      const res = await fetch(`${API_URL}/api/enquiries`, { headers: { Authorization: `Bearer ${token}` } });
      setEnquiries(await res.json());
    } finally { setLoading(false); }
  };
  useEffect(() => { fetch_(); }, []);

  const updateStatus = async (id: number, status: string) => {
    await fetch(`${API_URL}/api/enquiries/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
      body: JSON.stringify({ status })
    });
    fetch_();
  };

  const statusColors: Record<string, string> = {
    PENDING: 'bg-yellow-100 text-yellow-700',
    REVIEWED: 'bg-blue-100 text-blue-700',
    RESOLVED: 'bg-green-100 text-green-700',
  };

  return (
    <AdminLayout>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Contact Enquiries</h1>
        <p className="text-gray-500">{enquiries.length} total enquiries</p>
      </div>

      {loading ? <div className="flex justify-center py-20"><Loader2 size={32} className="animate-spin text-primary" /></div> : (
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
          {enquiries.length === 0 ? (
            <div className="p-10 text-center text-gray-400">No enquiries yet. They will appear here when visitors submit the contact form.</div>
          ) : (
            <div className="divide-y divide-gray-50">
              {enquiries.map((e) => (
                <div key={e.id} className="p-5 hover:bg-gray-50 transition-colors">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-3 flex-wrap">
                        <h3 className="font-semibold text-gray-800">{e.name}</h3>
                        <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${statusColors[e.status] || 'bg-gray-100 text-gray-600'}`}>{e.status}</span>
                      </div>
                      {e.subject && <p className="text-sm font-medium text-gray-700 mt-1">{e.subject}</p>}
                      <p className="text-sm text-gray-500 mt-1 line-clamp-2">{e.message}</p>
                      <div className="flex items-center gap-4 mt-2 text-xs text-gray-400">
                        <span className="flex items-center gap-1"><Mail size={12} />{e.email}</span>
                        {e.phone && <span className="flex items-center gap-1"><Phone size={12} />{e.phone}</span>}
                        <span className="flex items-center gap-1"><Clock size={12} />{new Date(e.createdAt).toLocaleDateString()}</span>
                      </div>
                    </div>
                    <div className="flex gap-2 flex-shrink-0">
                      <button onClick={() => setSelected(e)} className="p-2 text-blue-500 hover:bg-blue-50 rounded-lg"><Eye size={16} /></button>
                      {e.status !== 'RESOLVED' && (
                        <button onClick={() => updateStatus(e.id, e.status === 'PENDING' ? 'REVIEWED' : 'RESOLVED')} className="p-2 text-green-500 hover:bg-green-50 rounded-lg"><CheckCircle2 size={16} /></button>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Enquiry Detail Modal */}
      {selected && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-lg">
            <div className="p-6 border-b flex items-center justify-between">
              <h2 className="text-lg font-bold">Enquiry Details</h2>
              <button onClick={() => setSelected(null)} className="text-gray-400 hover:text-gray-700">✕</button>
            </div>
            <div className="p-6 space-y-3 text-sm">
              <div className="grid grid-cols-2 gap-3">
                <div><p className="text-gray-500">Name</p><p className="font-medium">{selected.name}</p></div>
                <div><p className="text-gray-500">Status</p><p className="font-medium">{selected.status}</p></div>
                <div><p className="text-gray-500">Email</p><p className="font-medium">{selected.email}</p></div>
                {selected.phone && <div><p className="text-gray-500">Phone</p><p className="font-medium">{selected.phone}</p></div>}
                {selected.subject && <div className="col-span-2"><p className="text-gray-500">Subject</p><p className="font-medium">{selected.subject}</p></div>}
              </div>
              <div><p className="text-gray-500 mb-1">Message</p><p className="bg-gray-50 p-3 rounded-lg text-gray-700">{selected.message}</p></div>
              <p className="text-gray-400 text-xs">Received on {new Date(selected.createdAt).toLocaleString()}</p>
            </div>
            <div className="p-4 border-t flex gap-3">
              <button onClick={() => setSelected(null)} className="flex-1 px-4 py-2 border border-gray-200 rounded-lg text-sm">Close</button>
              <a href={`mailto:${selected.email}`} className="flex-1 px-4 py-2 bg-primary text-white rounded-lg text-sm text-center">Reply via Email</a>
            </div>
          </div>
        </div>
      )}
    </AdminLayout>
  );
};

export default AdminEnquiries;
