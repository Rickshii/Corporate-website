import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { LayoutDashboard, Briefcase, GraduationCap, Users, Image, MessageSquare, Menu, X, LogOut, CheckCircle, Settings } from 'lucide-react';
import { supabase } from '../../lib/supabase';

const AdminLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await supabase.auth.signOut();
    localStorage.removeItem('adminToken');
    navigate('/admin/login');
  };

  const navItems = [
    { name: 'Dashboard', path: '/admin', icon: LayoutDashboard },
    { name: 'Services', path: '/admin/services', icon: Briefcase },
    { name: 'Courses', path: '/admin/courses', icon: GraduationCap },
    { name: 'Placements', path: '/admin/placements', icon: CheckCircle },
    { name: 'Gallery', path: '/admin/gallery', icon: Image },
    { name: 'Enquiries', path: '/admin/enquiries', icon: MessageSquare },
    { name: 'Users', path: '/admin/users', icon: Users },
    { name: 'Settings', path: '/admin/settings', icon: Settings },
  ];

  return (
    <div className="min-h-screen bg-gray-100 flex">
      {/* Sidebar */}
      <aside className={`bg-secondary text-white transition-all duration-300 ${sidebarOpen ? 'w-64' : 'w-20'} flex flex-col`}>
        <div className="h-16 flex items-center justify-between px-4 border-b border-secondary-light/30">
          {sidebarOpen && <span className="font-heading font-bold text-lg truncate">Admin Panel</span>}
          <button onClick={() => setSidebarOpen(!sidebarOpen)} className="p-2 hover:bg-secondary-light/20 rounded-lg">
            {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

        <nav className="flex-1 py-4 overflow-y-auto">
          <ul className="space-y-2 px-2">
            {navItems.map((item) => {
              const isActive = location.pathname === item.path;
              return (
                <li key={item.path}>
                  <Link 
                    to={item.path}
                    className={`flex items-center gap-3 px-3 py-3 rounded-lg transition-colors ${isActive ? 'bg-primary text-white' : 'hover:bg-secondary-light/20 text-gray-300'}`}
                  >
                    <item.icon size={20} className="flex-shrink-0" />
                    {sidebarOpen && <span>{item.name}</span>}
                  </Link>
                </li>
              )
            })}
          </ul>
        </nav>

        <div className="p-4 border-t border-secondary-light/30">
          <button 
            onClick={handleLogout}
            className="flex items-center gap-3 px-3 py-3 w-full text-left rounded-lg text-red-400 hover:bg-red-500/10 transition-colors"
          >
            <LogOut size={20} className="flex-shrink-0" />
            {sidebarOpen && <span>Logout</span>}
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col min-w-0 overflow-hidden">
        <header className="h-16 bg-white shadow-sm flex items-center px-8">
          <h1 className="text-xl font-heading font-semibold text-gray-800">Values Vruksha Administration</h1>
        </header>
        <div className="flex-1 overflow-y-auto p-8 bg-gray-50">
          {children}
        </div>
      </main>
    </div>
  );
};

export default AdminLayout;
