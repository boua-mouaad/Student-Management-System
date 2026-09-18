import React from 'react';
import { NavLink } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Users, 
  BookOpen, 
  GraduationCap, 
  Settings,
  HelpCircle
} from 'lucide-react';

export default function Sidebar() {
  const navItems = [
    { name: 'Dashboard', path: '/dashboard', icon: LayoutDashboard },
    { name: 'Students', path: '/students', icon: Users },
    { name: 'Courses', path: '/courses', icon: BookOpen },
    { name: 'Enrollments', path: '/enrollments', icon: GraduationCap },
  ];

  return (
    <div className="w-64 bg-white border-r border-gray-200 flex flex-col h-full z-20">
      <div className="h-16 flex items-center px-6 border-b border-gray-200">
        <div className="flex items-center gap-2 text-indigo-600">
          <BookOpen size={24} strokeWidth={2.5} />
          <span className="text-lg font-bold text-gray-900 tracking-tight">AcademiaOS</span>
        </div>
      </div>

      <div className="flex-1 py-6 px-4 flex flex-col gap-1 overflow-y-auto">
        <div className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2 px-2">Core Registry</div>
        
        {navItems.map((item) => (
          <NavLink
            key={item.name}
            to={item.path}
            className={({ isActive }) => 
              `flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                isActive 
                  ? 'bg-indigo-50 text-indigo-700' 
                  : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
              }`
            }
          >
            <item.icon size={18} />
            {item.name}
          </NavLink>
        ))}
      </div>

      <div className="p-4 border-t border-gray-200 flex flex-col gap-1">
        <NavLink to="/settings" className="flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium text-gray-600 hover:bg-gray-50 transition-colors">
          <Settings size={18} />
          System Settings
        </NavLink>
        <button className="flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium text-gray-600 hover:bg-gray-50 transition-colors w-full text-left">
          <HelpCircle size={18} />
          Support Helpdesk
        </button>
      </div>
    </div>
  );
}