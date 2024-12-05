import React from 'react';
import { Menu, X, Users, Shield, Settings, LogOut } from 'lucide-react';
import { useApp } from '../../context/AppContext';

const DashboardLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { isSidebarOpen, setIsSidebarOpen } = useApp();

  return (
    <div className="min-h-screen bg-[#1E1B2E] text-white">
      {/* Mobile Menu Button */}
      <button
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        className="md:hidden fixed top-4 left-4 z-50 p-2 bg-[#2D2A3E] rounded-lg"
      >
        {isSidebarOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
      </button>

      {/* Sidebar */}
      <aside className={`fixed left-0 top-0 h-full w-64 bg-[#2D2A3E] p-4 transition-transform duration-300 ease-in-out z-40
        ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0`}>
        <div className="flex items-center gap-3 mb-8">
          <Shield className="w-8 h-8 text-[#8B5CF6]" />
          <h1 className="text-xl font-bold">RBAC Admin</h1>
        </div>
        
        <nav className="space-y-2">
          {[
            { icon: Menu, label: 'Dashboard', href: '/' },
            { icon: Users, label: 'Users', href: '/users' },
            { icon: Shield, label: 'Roles', href: '/roles' },
            { icon: Settings, label: 'Settings', href: '/settings' },
          ].map((item) => (
            <a
              key={item.label}
              href={item.href}
              className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-[#3D3A4E] transition-colors"
              onClick={() => setIsSidebarOpen(false)}
            >
              <item.icon className="w-5 h-5" />
              <span>{item.label}</span>
            </a>
          ))}
        </nav>
      </aside>

      {/* Main Content */}
      <main className={`transition-all duration-300 ease-in-out ${isSidebarOpen ? 'ml-0 md:ml-64' : 'ml-0 md:ml-64'} p-8`}>
        <header className="flex justify-between items-center mb-8 mt-12 md:mt-0">
          <div>
            <h1 className="text-2xl font-bold">Dashboard</h1>
            <p className="text-gray-400">Manage your system access control</p>
          </div>
          
          <button className="flex items-center gap-2 px-4 py-2 rounded-lg bg-[#8B5CF6] hover:bg-[#7C3AED] transition-colors">
            <LogOut className="w-4 h-4" />
            <span className="hidden sm:inline">Logout</span>
          </button>
        </header>
        
        {children}
      </main>

      {/* Overlay */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-30 md:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}
    </div>
  );
}

export default DashboardLayout;