import React from 'react';
import AdminLayout from '../../components/admin/AdminLayout';
import { Users, Briefcase, GraduationCap, MessageSquare } from 'lucide-react';

const StatCard = ({ title, value, icon: Icon, colorClass }: any) => (
  <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex items-center gap-4">
    <div className={`p-4 rounded-lg ${colorClass}`}>
      <Icon size={24} />
    </div>
    <div>
      <p className="text-sm text-gray-500 font-medium">{title}</p>
      <h3 className="text-2xl font-bold text-gray-800">{value}</h3>
    </div>
  </div>
);

const AdminDashboard = () => {
  return (
    <AdminLayout>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-800">Dashboard Overview</h1>
        <p className="text-gray-500 mt-1">Welcome back to your administration panel.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatCard title="Total Services" value="12" icon={Briefcase} colorClass="bg-blue-100 text-blue-600" />
        <StatCard title="Active Courses" value="8" icon={GraduationCap} colorClass="bg-green-100 text-green-600" />
        <StatCard title="New Enquiries" value="24" icon={MessageSquare} colorClass="bg-orange-100 text-orange-600" />
        <StatCard title="Total Users" value="3" icon={Users} colorClass="bg-purple-100 text-purple-600" />
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <h2 className="text-lg font-bold text-gray-800 mb-4">Recent Activity</h2>
        <div className="space-y-4">
          <p className="text-gray-500 italic">No recent activity to show.</p>
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminDashboard;
