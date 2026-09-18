import React from 'react';
import { Outlet, Navigate, NavLink, useNavigate } from 'react-router-dom';
import { BookOpen, Calendar, Award, LogOut, User } from 'lucide-react';

export default function StudentLayout() {
  const navigate = useNavigate();
  const token = localStorage.getItem('jwt_token');
  const userRole = localStorage.getItem('user_role');
  const userEmail = localStorage.getItem('user_email') || 'Student';

  if (!token || userRole !== 'ROLE_STUDENT') {
    return <Navigate to="/login" replace />;
  }

  const handleLogout = () => {
    localStorage.clear();
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col font-sans">
      <header className="bg-indigo-600 text-white shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-3">
              <div className="bg-white/20 p-2 rounded-lg">
                <BookOpen size={24} className="text-white" />
              </div>
              <span className="text-xl font-bold tracking-tight">AcademiaOS</span>
              <span className="ml-2 px-2 py-0.5 rounded text-[10px] font-bold bg-indigo-500 uppercase tracking-wider">Student Portal</span>
            </div>
            
            <div className="flex items-center gap-6">
              <nav className="flex gap-4">
                <NavLink to="/student/schedule" className={({isActive}) => `flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium transition-colors ${isActive ? 'bg-indigo-700 text-white' : 'text-indigo-100 hover:bg-indigo-500'}`}>
                  <Calendar size={18} /> My Schedule
                </NavLink>
                <NavLink to="/student/grades" className={({isActive}) => `flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium transition-colors ${isActive ? 'bg-indigo-700 text-white' : 'text-indigo-100 hover:bg-indigo-500'}`}>
                  <Award size={18} /> Grades & Transcripts
                </NavLink>
              </nav>
              
              <div className="w-px h-8 bg-indigo-500"></div>
              
              <div className="flex items-center gap-3">
                <div className="text-right hidden sm:block">
                  <div className="text-sm font-bold">{userEmail}</div>
                </div>
                <button onClick={handleLogout} className="p-2 text-indigo-100 hover:text-white hover:bg-indigo-500 rounded-full transition-colors">
                  <LogOut size={18} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Outlet />
      </main>
    </div>
  );
}