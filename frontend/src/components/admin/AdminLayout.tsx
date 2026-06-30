import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { LayoutDashboard, Briefcase, GraduationCap, Users, Image, MessageSquare, Menu, X, LogOut, CheckCircle, Settings } from 'lucide-react';

const AdminLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = () => {
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
    <div className="min-h-screen bg-navy-950 flex text-slate-100 font-body relative overflow-hidden bg-grid-pattern">
      {/* Sidebar */}
      <aside className={`bg-navy-900/90 border-r border-white/10 backdrop-blur-xl transition-all duration-300 ${sidebarOpen ? 'w-64' : 'w-20'} flex flex-col z-20 relative`}>
        <div className="h-20 flex items-center justify-between px-4 border-b border-white/5">
          {sidebarOpen && (
            <div className="flex flex-col pl-2">
              <span className="font-heading font-extrabold text-white text-lg tracking-wide">Values Vruksha</span>
              <span className="text-[10px] text-emerald-400 font-bold uppercase tracking-wider">Admin Panel</span>
            </div>
          )}
          <button onClick={() => setSidebarOpen(!sidebarOpen)} className="p-2 hover:bg-white/5 text-slate-400 hover:text-white rounded-xl transition-colors">
            {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

        <nav className="flex-1 py-6 overflow-y-auto">
          <ul className="space-y-1.5 px-3">
            {navItems.map((item) => {
              const isActive = location.pathname === item.path;
              return (
                <li key={item.path}>
                  <Link 
                    to={item.path}
                    className={`flex items-center gap-3.5 px-4 py-3 rounded-2xl transition-all duration-200 ${
                      isActive 
                        ? 'bg-gradient-to-r from-primary to-primary-dark text-white shadow-[0_4px_16px_rgba(16,185,129,0.25)] font-semibold' 
                        : 'text-slate-400 hover:text-slate-200 hover:bg-white/5'
                    }`}
                  >
                    <item.icon size={20} className="flex-shrink-0" />
                    {sidebarOpen && <span className="text-sm font-heading">{item.name}</span>}
                  </Link>
                </li>
              )
            })}
          </ul>
        </nav>

        <div className="p-4 border-t border-white/5">
          <button 
            onClick={handleLogout}
            className="flex items-center gap-3.5 px-4 py-3 w-full text-left rounded-2xl text-red-400 hover:bg-red-500/10 hover:text-red-300 transition-all font-semibold"
          >
            <LogOut size={20} className="flex-shrink-0" />
            {sidebarOpen && <span className="text-sm font-heading">Logout</span>}
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col min-w-0 overflow-hidden relative z-10">
        <header className="h-20 bg-navy-900/40 border-b border-white/5 flex items-center px-8 justify-between backdrop-blur-md">
          <h1 className="text-xl font-heading font-extrabold text-white tracking-wide">
            System Administration
          </h1>
          <div className="flex items-center gap-3">
            <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse"></span>
            <span className="text-xs text-slate-400 font-semibold tracking-wider uppercase">Live Backend</span>
          </div>
        </header>
        <div className="flex-1 overflow-y-auto p-8 bg-navy-950/40">
          {children}
        </div>
      </main>
    </div>
  );
};

export default AdminLayout;

