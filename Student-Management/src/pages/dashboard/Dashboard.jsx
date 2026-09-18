import React, { useState, useEffect } from 'react';
import { 
  AlertTriangle, 
  Users, 
  BookOpen, 
  GraduationCap, 
  FileText, 
  Filter, 
  Download, 
  Plus,
  ArrowUpRight,
  Clock,
  CheckCircle,
  FileCheck
} from 'lucide-react';
import StatusBadge from '../../components/common/StatusBadge';
import api from '../../services/api';

export default function Dashboard() {
  const [stats, setStats] = useState(null);
  const [recentEnrollments, setRecentEnrollments] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setIsLoading(true);
        const [statsRes, enrollmentsRes] = await Promise.all([
          api.get('/dashboard/stats').catch(() => ({ data: {} })),
          api.get('/enrollments/recent').catch(() => ({ data: [] }))
        ]);
        
        setStats(statsRes.data);
        setRecentEnrollments(enrollmentsRes.data);
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
      <div className="flex justify-between items-end">
        <div>
          <div className="text-sm text-gray-500 mb-1">Dashboard / Overview</div>
          <h1 className="text-3xl font-bold text-gray-900 leading-tight">Spring Semester 2025<br/>Overview</h1>
        </div>
        <div className="flex gap-3">
          <button className="flex items-center gap-2 px-3 py-2 bg-white border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 shadow-sm">
            <Filter size={16} /> Filter View
          </button>
          <button className="flex items-center gap-2 px-3 py-2 bg-white border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 shadow-sm">
            <Download size={16} /> Export Sheet
          </button>
          <button className="flex items-center gap-2 px-4 py-2 bg-indigo-600 rounded-md text-sm font-medium text-white hover:bg-indigo-700 shadow-sm">
            <Plus size={16} /> Quick Enroll
          </button>
        </div>
      </div>

      <div className="bg-red-50 border border-red-100 rounded-lg p-4 flex gap-4 items-start">
        <div className="mt-0.5 text-red-500"><AlertTriangle size={20} /></div>
        <div>
          <h3 className="text-sm font-bold text-red-900 flex items-center gap-2">
            Urgent Registrar Advisory
            <span className="text-[10px] bg-red-200 text-red-800 px-2 py-0.5 rounded uppercase tracking-wider">Mandatory</span>
          </h3>
          <p className="text-sm text-red-700 mt-1">
            Spring Midterm Grade Submission closes Friday at 11:59 PM EST. Faculty reminders have been queued automatically.
          </p>
        </div>
        <button className="ml-auto text-sm text-red-700 font-medium hover:underline whitespace-nowrap">
          View Schedule ✕
        </button>
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
        <>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm flex flex-col justify-between">
              <div className="flex justify-between items-start mb-2">
                <span className="text-sm font-medium text-gray-500">Total Students</span>
                <Users size={18} className="text-indigo-500" />
              </div>
              <div className="flex items-baseline gap-2 mb-4">
                <span className="text-3xl font-bold text-gray-900">{stats?.totalStudents || 0}</span>
                <span className="text-xs font-bold text-green-600 bg-green-50 px-1.5 py-0.5 rounded flex items-center">
                  <ArrowUpRight size={12} className="mr-0.5"/> {stats?.studentGrowthPercentage || '0.0'}%
                </span>
              </div>
              <div className="text-xs text-gray-500 flex justify-between border-t border-gray-100 pt-3">
                <span>From previous cohort</span>
                <span className="font-medium text-gray-700">{stats?.retentionRate || '0.0'}% retention</span>
              </div>
            </div>

            <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm flex flex-col justify-between">
              <div className="flex justify-between items-start mb-2">
                <span className="text-sm font-medium text-gray-500">Total Courses</span>
                <BookOpen size={18} className="text-gray-400" />
              </div>
              <div className="flex items-baseline gap-2 mb-4">
                <span className="text-3xl font-bold text-gray-900">{stats?.totalCourses || 0}</span>
                <span className="text-xs text-gray-500">Active Catalogue</span>
              </div>
              <div className="text-xs text-gray-500 flex justify-between border-t border-gray-100 pt-3">
                <span>{stats?.activeDepartments || 0} departments active</span>
                <span className="font-medium text-gray-700">{stats?.honorsLabs || 0} honors labs</span>
              </div>
            </div>

            <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm flex flex-col justify-between">
              <div className="flex justify-between items-start mb-2">
                <span className="text-sm font-medium text-gray-500">Active Enrollments</span>
                <GraduationCap size={18} className="text-gray-400" />
              </div>
              <div className="flex items-baseline gap-2 mb-4">
                <span className="text-3xl font-bold text-gray-900">{stats?.activeEnrollments || 0}</span>
                <span className="text-xs font-bold text-indigo-600">{stats?.enrollmentFillRate || '0.0'}% fill</span>
              </div>
              <div className="text-xs text-gray-500 flex justify-between border-t border-gray-100 pt-3">
                <span>Total classroom seats</span>
                <span className="font-medium text-indigo-600">{stats?.openSeats || 0} seats open</span>
              </div>
            </div>

            <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm flex flex-col justify-between">
              <div className="flex justify-between items-start mb-2">
                <span className="text-sm font-medium text-gray-500">Pending Grades</span>
                <FileText size={18} className="text-gray-400" />
              </div>
              <div className="flex items-baseline gap-2 mb-4">
                <span className="text-3xl font-bold text-gray-900">{stats?.pendingGrades || 0}</span>
                <span className="text-xs font-bold text-red-600 bg-red-50 px-1.5 py-0.5 rounded flex items-center">
                  <Clock size={12} className="mr-1"/> Due soon
                </span>
              </div>
              <div className="text-xs text-gray-500 flex justify-between border-t border-gray-100 pt-3">
                <span>{stats?.unassignedSections || 0} sections unassigned</span>
                <span className="font-medium text-red-600">{stats?.notifiedInstructors || 0} instructors notified</span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-2">
            <div className="lg:col-span-2 bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden flex flex-col">
              <div className="px-6 py-4 border-b border-gray-100 flex justify-between items-center">
                <div>
                  <h2 className="text-base font-bold text-gray-900">Recent Enrollments</h2>
                  <p className="text-xs text-gray-500">Latest registrar entries across departments</p>
                </div>
                <button className="text-sm font-medium text-indigo-600 hover:underline">View All Enrollments →</button>
              </div>
              
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead className="bg-gray-50/50 border-b border-gray-100">
                    <tr>
                      <th className="px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Student</th>
                      <th className="px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Course Details</th>
                      <th className="px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Date</th>
                      <th className="px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {recentEnrollments.map((row, i) => (
                      <tr key={row.id || i} className="hover:bg-gray-50/50">
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-full bg-indigo-100 text-indigo-700 flex items-center justify-center text-xs font-bold">
                              {row.studentInitials || row.studentName?.charAt(0) || 'U'}
                            </div>
                            <div>
                              <div className="text-sm font-medium text-gray-900">{row.studentName}</div>
                              <div className="text-xs text-gray-500">ID: #{row.studentId}</div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="text-sm font-medium text-gray-900">{row.courseCode}</div>
                          <div className="text-xs text-gray-500">{row.courseTitle}</div>
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-600">{row.enrollmentDate}</td>
                        <td className="px-6 py-4">
                          <StatusBadge status={row.status || 'Pending'} />
                        </td>
                      </tr>
                    ))}
                    {recentEnrollments.length === 0 && (
                      <tr>
                        <td colSpan="4" className="px-6 py-8 text-center text-sm text-gray-500">
                          No recent enrollments found.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>

            <div className="flex flex-col gap-4">
              <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm h-64 flex flex-col justify-between">
                <div>
                  <div className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">Velocity Trend</div>
                  <h3 className="text-base font-bold text-gray-900">Enrollments Per Month</h3>
                </div>
                <div className="flex-1 flex items-center justify-center border-2 border-dashed border-gray-100 rounded-lg mt-4 bg-gray-50">
                  <span className="text-sm text-gray-400 font-medium">Chart Visualization Area</span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="bg-indigo-50 p-4 rounded-xl border border-indigo-100 flex flex-col items-start gap-2 cursor-pointer hover:bg-indigo-100 transition-colors">
                  <CheckCircle size={20} className="text-indigo-600" />
                  <div>
                    <div className="text-sm font-bold text-indigo-900">Batch Clear</div>
                    <div className="text-xs text-indigo-700 mt-0.5">{stats?.approvalsReady || 0} approvals ready</div>
                  </div>
                </div>
                <div className="bg-green-50 p-4 rounded-xl border border-green-100 flex flex-col items-start gap-2 cursor-pointer hover:bg-green-100 transition-colors">
                  <FileCheck size={20} className="text-green-600" />
                  <div>
                    <div className="text-sm font-bold text-green-900">Syllabus Audit</div>
                    <div className="text-xs text-green-700 mt-0.5">{stats?.syllabusIndexPercentage || 0}% indexed</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}