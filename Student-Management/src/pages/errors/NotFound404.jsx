import React from 'react';
import { Link } from 'react-router-dom';
import { FileQuestion, Search, Home, FileText, Calendar } from 'lucide-react';

export default function NotFound404() {
  return (
    <div className="min-h-screen bg-[#fafafa] flex items-center justify-center p-4 font-sans relative overflow-hidden">
      
      {/* Background grid pattern matching the image */}
      <div className="absolute inset-0 z-0 opacity-[0.03]" style={{ backgroundImage: 'linear-gradient(#000 1px, transparent 1px), linear-gradient(90deg, #000 1px, transparent 1px)', backgroundSize: '20px 20px' }}></div>
      
      <div className="bg-white rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100 max-w-md w-full p-8 z-10 relative flex flex-col items-center">
        
        {/* Top Status Pill */}
        <div className="bg-indigo-50 border border-indigo-100 text-indigo-700 px-3 py-1 rounded-full text-[10px] font-bold tracking-wider uppercase mb-8 flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 bg-indigo-500 rounded-full"></span> Status 404
        </div>
        
        {/* Icon Circle */}
        <div className="w-20 h-20 bg-indigo-50 rounded-full flex items-center justify-center mb-6 relative">
          <FileQuestion size={32} className="text-indigo-600" />
          <div className="absolute -bottom-1 -right-1 bg-white p-1 rounded-full shadow-sm">
            <div className="w-6 h-6 bg-indigo-100 rounded-full flex items-center justify-center">
              <Search size={12} className="text-indigo-600" />
            </div>
          </div>
        </div>
        
        <h1 className="text-2xl font-bold text-gray-900 mb-3 text-center">404 — Page Not Found</h1>
        <p className="text-sm text-gray-500 text-center mb-8 leading-relaxed px-4">
          The academic record, course section, or directory page you are looking for has been moved, archived, or does not exist.
        </p>
        
        {/* Search Input */}
        <div className="w-full relative mb-6">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
          <input 
            type="text" 
            placeholder="Jump to student, course, or room" 
            className="w-full pl-9 pr-12 py-2.5 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:bg-white focus:border-indigo-500 focus:outline-none"
          />
          <div className="absolute right-3 top-1/2 transform -translate-y-1/2 flex items-center gap-1 text-[10px] font-bold text-gray-400 bg-white border border-gray-200 px-1.5 py-0.5 rounded shadow-sm">
            ⌘K
          </div>
        </div>
        
        {/* Action Buttons */}
        <div className="flex gap-3 w-full mb-8">
          <Link to="/dashboard" className="flex-1 flex justify-center items-center gap-2 px-4 py-2.5 bg-indigo-600 border border-transparent rounded-lg text-sm font-medium text-white hover:bg-indigo-700 shadow-sm transition-colors">
            <Home size={16} /> Return to Dashboard
          </Link>
          <Link to="/students" className="flex-1 flex justify-center items-center gap-2 px-4 py-2.5 bg-white border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 shadow-sm transition-colors">
            <Search size={16} /> Search Directory
          </Link>
        </div>
        
        <div className="w-full border-t border-gray-100 pt-6">
          <h3 className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-4">Common Destinations</h3>
          <div className="flex flex-col gap-3">
            <Link to="/enrollments" className="flex items-center gap-3 text-sm text-gray-600 hover:text-indigo-600 font-medium transition-colors">
              <FileText size={16} className="text-gray-400" /> Term Enrollment Rosters
            </Link>
            <Link to="/courses" className="flex items-center gap-3 text-sm text-gray-600 hover:text-indigo-600 font-medium transition-colors">
              <Calendar size={16} className="text-gray-400" /> Academic Scheduling Index
            </Link>
          </div>
        </div>
        
        <div className="mt-8 text-[9px] text-gray-400 uppercase tracking-wider text-center w-full">
          Error code: HTTP_404_PAGE_NOT_FOUND <span className="mx-2">|</span> Node: US-EAST-01
        </div>
        
      </div>
    </div>
  );
}