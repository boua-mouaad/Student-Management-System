import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Bell, Search, LogOut } from 'lucide-react';

export default function Navbar() {
  const navigate = useNavigate();
  const userEmail = localStorage.getItem('user_email') || 'Admin User';
  const userRole = localStorage.getItem('user_role') || 'ROLE_ADMIN';

  const handleLogout = () => {
    localStorage.removeItem('jwt_token');
    localStorage.removeItem('user_email');
    localStorage.removeItem('user_role');
    navigate('/login');
  };

  return (
    <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-6 z-10">
      <div className="flex items-center w-96 relative">
        <Search className="absolute left-3 text-gray-400" size={16} />
        <input 
          type="text" 
          placeholder="Search students, courses..." 
          className="w-full bg-gray-50 border border-gray-200 rounded-md pl-9 pr-4 py-1.5 text-sm focus:outline-none focus:border-indigo-500 focus:bg-white"
        />
      </div>

      <div className="flex items-center gap-4">
        <button className="relative p-2 text-gray-500 hover:text-indigo-600 transition-colors">
          <Bell size={20} />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full border border-white"></span>
        </button>
        
        <div className="h-8 w-px bg-gray-200"></div>

        <div className="flex items-center gap-3">
          <div className="text-right">
            <div className="text-sm font-bold text-gray-900">{userEmail}</div>
            <div className="text-xs text-gray-500">{userRole.replace('ROLE_', '')}</div>
          </div>
          <div className="w-9 h-9 rounded-full bg-indigo-100 text-indigo-700 flex items-center justify-center font-bold border border-indigo-200">
            {userEmail.charAt(0).toUpperCase()}
          </div>
        </div>

        <button 
          onClick={handleLogout}
          className="ml-2 p-2 text-gray-400 hover:text-red-600 transition-colors"
          title="Logout"
        >
          <LogOut size={18} />
        </button>
      </div>
    </header>
  );
}