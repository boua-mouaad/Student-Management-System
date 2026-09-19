import React from 'react';
import { Outlet, Navigate } from 'react-router-dom';
import Sidebar from './Sidebar';
import Navbar from './Navbar';

export default function MainLayout() {
  const token = localStorage.getItem('jwt_token');
  const userRole = localStorage.getItem('user_role');

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  if (userRole === 'ROLE_STUDENT') {
    return <Navigate to="/student/schedule" replace />;
  }

  return (
    <div className="flex h-screen bg-[#fafafa]">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Navbar />
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-[#fafafa] p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}