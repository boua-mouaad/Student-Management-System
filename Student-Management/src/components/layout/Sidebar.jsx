import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { LayoutDashboard, Users, BookOpen, GraduationCap, Settings, LogOut } from 'lucide-react';

export default function Sidebar() {
  const location = useLocation();
  const isActive = (path) => location.pathname.includes(path);

  return (
    <aside className="w-64 bg-white border-r border-gray-200 flex flex-col justify-between">
      <div>
        <div className="h-16 flex items-center px-6 border-b border-gray-100">
          <div className="bg-indigo-600 w-8 h-8 rounded flex items-center justify-center mr-3">
            <span className="text-white font-bold">A</span>
          </div>
          <span className="font-bold text-gray-900 text-lg">AcademiaOS</span>
        </div>
        
        <div className="px-6 py-4 text-xs font-semibold text-gray-400 tracking-wider">
          WORKSPACE
        </div>
        
        <nav className="px-3 flex flex-col gap-1">
          <Link to="/dashboard" className={`flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium transition-colors ${isActive('/dashboard') ? 'bg-indigo-600 text-white' : 'text-gray-600 hover:bg-gray-100'}`}>
            <LayoutDashboard size={18} /> Dashboard
          </Link>
          <Link to="/students" className={`flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium transition-colors ${isActive('/students') ? 'bg-indigo-600 text-white' : 'text-gray-600 hover:bg-gray-100'}`}>
            <Users size={18} /> Students
          </Link>
          <Link to="/courses" className={`flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium transition-colors ${isActive('/courses') ? 'bg-indigo-600 text-white' : 'text-gray-600 hover:bg-gray-100'}`}>
            <BookOpen size={18} /> Courses
          </Link>
          <Link to="/enrollments" className={`flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium transition-colors ${isActive('/enrollments') ? 'bg-indigo-600 text-white' : 'text-gray-600 hover:bg-gray-100'}`}>
            <GraduationCap size={18} /> Enrollments
          </Link>
        </nav>
      </div>

      <div className="p-4 border-t border-gray-200">
        <button className="flex items-center gap-3 px-3 py-2 w-full text-sm font-medium text-gray-600 hover:bg-gray-100 rounded-md">
          <Settings size={18} /> System Settings
        </button>
        <Link to="/login" className="flex items-center gap-3 px-3 py-2 w-full text-sm font-medium text-red-600 hover:bg-red-50 rounded-md mt-1">
          <LogOut size={18} /> Logout
        </Link>
      </div>
    </aside>
  );
}