import React from 'react';
import { Search, Bell } from 'lucide-react';

export default function Header() {
  return (
    <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-8">
      <div className="relative w-96">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
        <input 
          type="text" 
          placeholder="Search records, students, classes..." 
          className="w-full pl-9 pr-4 py-2 bg-gray-100 border-transparent rounded-md text-sm focus:bg-white focus:border-indigo-500 focus:outline-none transition-colors"
        />
      </div>
      
      <div className="flex items-center gap-6">
        <div className="flex items-center gap-2 px-3 py-1 bg-green-50 text-green-700 rounded-full text-xs font-medium border border-green-200">
          <span className="w-2 h-2 rounded-full bg-green-500"></span>
          Spring 2025 Term - Active
        </div>
        
        <button className="text-gray-400 hover:text-gray-600 relative">
          <Bell size={20} />
          <span className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full"></span>
        </button>
        
        <div className="flex items-center gap-3 border-l border-gray-200 pl-6">
          <div className="text-right hidden md:block">
            <div className="text-sm font-medium text-gray-900">Elena Vance</div>
            <div className="text-xs text-gray-500">Registrar</div>
          </div>
          <img 
            src="https://ui-avatars.com/api/?name=Elena+Vance&background=4f46e5&color=fff" 
            alt="User Avatar" 
            className="w-9 h-9 rounded-full"
          />
        </div>
      </div>
    </header>
  );
}