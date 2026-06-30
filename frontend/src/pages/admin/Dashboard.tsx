import React from 'react';
import AdminLayout from '../../components/admin/AdminLayout';
import { Users, Briefcase, GraduationCap, MessageSquare, Image, BarChart3 } from 'lucide-react';

const StatCard = ({ title, value, icon: Icon, colorClass }: any) => (
  <div className="glass-dark border border-white/5 p-6 rounded-2xl shadow-xl flex items-center gap-5 hover:scale-[1.02] hover:border-emerald-500/20 transition-all duration-300">
    <div className={`p-4 rounded-xl ${colorClass}`}>
      <Icon size={26} />
    </div>
    <div>
      <p className="text-sm text-slate-400 font-medium font-heading">{title}</p>
      <h3 className="text-3xl font-extrabold text-white mt-1 tracking-tight">{value}</h3>
    </div>
  </div>
);

const AdminDashboard = () => {
  return (
    <AdminLayout>
      <div className="mb-8">
        <h2 className="text-3xl font-heading font-extrabold text-white tracking-tight">Dashboard Overview</h2>
        <p className="text-slate-400 mt-1 text-sm font-body">Welcome back to your administration panel. Manage all content dynamically.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatCard title="Total Services" value="6" icon={Briefcase} colorClass="bg-blue-500/10 text-blue-400" />
        <StatCard title="Active Courses" value="15" icon={GraduationCap} colorClass="bg-emerald-500/10 text-emerald-400" />
        <StatCard title="New Enquiries" value="24" icon={MessageSquare} colorClass="bg-amber-500/10 text-amber-400" />
        <StatCard title="Gallery Items" value="12" icon={Image} colorClass="bg-purple-500/10 text-purple-400" />
      </div>

      <div className="glass-dark border border-white/5 rounded-2xl p-6 shadow-xl">
        <div className="flex items-center gap-3 mb-6">
          <BarChart3 className="text-emerald-400" size={22} />
          <h3 className="text-lg font-heading font-bold text-white">System Performance & Updates</h3>
        </div>
        <div className="space-y-4 font-body text-sm text-slate-400">
          <div className="flex items-center justify-between py-3 border-b border-white/5">
            <span>Database Connection (MongoDB)</span>
            <span className="text-emerald-400 font-bold">CONNECTED</span>
          </div>
          <div className="flex items-center justify-between py-3 border-b border-white/5">
            <span>Media Storage (Local Uploads)</span>
            <span className="text-emerald-400 font-bold">READY</span>
          </div>
          <div className="flex items-center justify-between py-3">
            <span>Prisma SQLite Client</span>
            <span className="text-emerald-400 font-bold">ACTIVE</span>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminDashboard;

