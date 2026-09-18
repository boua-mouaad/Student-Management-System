import React, { useState, useEffect } from 'react';
import { Users, BookOpen, GraduationCap } from 'lucide-react';
import api from '../../services/api';

export default function Dashboard() {
  const [stats, setStats] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setIsLoading(true);
        const res = await api.get('/dashboard/summary');
        setStats(res.data);
      } catch (err) {
        setError("Could not load dashboard metrics.");
      } finally {
        setIsLoading(false);
      }
    };
    fetchDashboardData();
  }, []);

  return (
    <div className="flex flex-col gap-6 max-w-7xl mx-auto font-sans">
      <div>
        <div className="text-sm text-gray-500 mb-1">Dashboard / Overview</div>
        <h1 className="text-3xl font-bold text-gray-900 leading-tight">System Overview</h1>
      </div>

      {error && (
        <div className="p-4 bg-red-50 text-red-600 border border-red-100 rounded-lg text-sm font-medium">
          {error}
        </div>
      )}

      {isLoading ? (
        <div className="p-12 flex justify-center items-center text-gray-400 bg-white rounded-xl border border-gray-200">
          <span className="text-sm font-medium">Loading dashboard metrics...</span>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
            <div className="flex justify-between items-start mb-4">
              <span className="text-sm font-medium text-gray-500">Total Students</span>
              <Users size={18} className="text-indigo-500" />
            </div>
            <span className="text-4xl font-bold text-gray-900">{stats?.totalStudents || 0}</span>
          </div>

          <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
            <div className="flex justify-between items-start mb-4">
              <span className="text-sm font-medium text-gray-500">Total Courses</span>
              <BookOpen size={18} className="text-gray-400" />
            </div>
            <span className="text-4xl font-bold text-gray-900">{stats?.totalCourses || 0}</span>
          </div>

          <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
            <div className="flex justify-between items-start mb-4">
              <span className="text-sm font-medium text-gray-500">Total Enrollments</span>
              <GraduationCap size={18} className="text-gray-400" />
            </div>
            <span className="text-4xl font-bold text-gray-900">{stats?.totalEnrollments || 0}</span>
          </div>
        </div>
      )}
    </div>
  );
}