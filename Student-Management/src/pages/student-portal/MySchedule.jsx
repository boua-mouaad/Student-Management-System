import React, { useState, useEffect } from 'react';
import { Clock, MapPin, Calendar as CalendarIcon, BookOpen } from 'lucide-react';
import api from '../../services/api';

export default function MySchedule() {
  const [enrollments, setEnrollments] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchMySchedule = async () => {
      try {
        setIsLoading(true);
        // Note: For production, this should point to a specific '/enrollments/me' endpoint
        // that automatically filters by the authenticated user's token ID.
        const response = await api.get('/enrollments');
        
        // Simulating filtering for active courses
        const activeCourses = response.data.filter(e => e.status === 'ACTIVE' || e.status === 'Pending');
        setEnrollments(activeCourses);
      } catch (err) {
        console.error("Failed to load schedule", err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchMySchedule();
  }, []);

  return (
    <div className="flex flex-col gap-6">
      <div className="flex justify-between items-end mb-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 leading-tight">Spring 2025 Schedule</h1>
          <p className="text-sm text-gray-500 mt-1">Your current active course registrations.</p>
        </div>
      </div>

      {isLoading ? (
        <div className="p-12 text-center text-gray-400">Loading schedule...</div>
      ) : enrollments.length === 0 ? (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-12 text-center flex flex-col items-center">
          <BookOpen size={48} className="text-gray-300 mb-4" />
          <h3 className="text-lg font-bold text-gray-900">No Active Courses</h3>
          <p className="text-sm text-gray-500 mt-1">You are not currently registered for any classes this term.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {enrollments.map((enrollment) => (
            <div key={enrollment.id} className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden flex flex-col hover:shadow-md transition-shadow">
              <div className="bg-indigo-600 px-5 py-4">
                <span className="text-indigo-100 text-xs font-bold uppercase tracking-wider">{enrollment.course?.courseCode}</span>
                <h3 className="text-white text-lg font-bold leading-tight mt-1">{enrollment.course?.courseName}</h3>
              </div>
              
              <div className="p-5 flex flex-col gap-4 flex-1">
                <div className="flex items-start gap-3">
                  <CalendarIcon size={18} className="text-gray-400 mt-0.5" />
                  <div>
                    <div className="text-sm font-bold text-gray-900">{enrollment.course?.meetingDays || 'Mon, Wed, Fri'}</div>
                    <div className="text-xs text-gray-500">Regular Academic Term</div>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Clock size={18} className="text-gray-400 mt-0.5" />
                  <div>
                    <div className="text-sm font-bold text-gray-900">{enrollment.course?.startTime || '10:00 AM'} - {enrollment.course?.endTime || '11:30 AM'}</div>
                    <div className="text-xs text-gray-500">{enrollment.course?.credits} Credit Hours</div>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <MapPin size={18} className="text-gray-400 mt-0.5" />
                  <div>
                    <div className="text-sm font-bold text-gray-900">{enrollment.course?.facility || 'Main Campus Hall'}</div>
                    <div className="text-xs text-gray-500">Prof. {enrollment.course?.instructor || 'Staff'}</div>
                  </div>
                </div>
              </div>
              
              <div className="px-5 py-3 bg-gray-50 border-t border-gray-100 flex justify-between items-center">
                <span className="text-xs font-bold text-emerald-600 bg-emerald-100 px-2 py-1 rounded uppercase">Enrolled</span>
                <button className="text-xs font-bold text-indigo-600 hover:underline">Syllabus</button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}