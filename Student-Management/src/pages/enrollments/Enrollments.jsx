import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Eye, UserPlus } from 'lucide-react';
import api from '../../services/api';
import StatusBadge from '../../components/common/StatusBadge';

export default function Enrollments() {
  const [enrollments, setEnrollments] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchEnrollments = async () => {
      try {
        setIsLoading(true);
        const response = await api.get('/enrollments');
        setEnrollments(response.data);
      } catch (err) {
        setError("Could not load enrollments directory.");
      } finally {
        setIsLoading(false);
      }
    };
    fetchEnrollments();
  }, []);

  return (
    <div className="flex flex-col gap-6 max-w-7xl mx-auto font-sans pb-8">
      <div className="flex justify-between items-start">
        <div>
          <div className="text-sm font-bold text-indigo-600 tracking-wider uppercase mb-1">Registrar &gt; Enrollments</div>
          <h1 className="text-3xl font-bold text-gray-900 leading-tight">Enrollments Directory</h1>
        </div>
        <Link to="/enrollments/new" className="flex items-center gap-2 px-4 py-2 bg-indigo-600 rounded-md text-sm font-medium text-white hover:bg-indigo-700 shadow-sm">
          <UserPlus size={16} /> Enroll Student
        </Link>
      </div>

      <div className="bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden flex flex-col mt-4">
        {error && (
          <div className="p-4 bg-red-50 text-red-600 border-b border-red-100 text-sm font-medium">
            {error}
          </div>
        )}

        {isLoading ? (
          <div className="p-12 flex justify-center items-center text-gray-400">
            <span className="text-sm font-medium">Loading enrollments data...</span>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead className="bg-gray-50/50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Student</th>
                  <th className="px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Course</th>
                  <th className="px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Date</th>
                  <th className="px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Grade</th>
                  <th className="px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {enrollments.map((row) => {
                  const studentDisplayName = row.studentName || (row.student ? `${row.student.firstName} ${row.student.lastName}` : 'Unknown Student');
                  const regNo = row.registrationNumber || row.student?.registrationNumber || `ID: ${row.studentId}`;
                  const courseDisplayCode = row.courseCode || row.course?.courseCode || 'Course';
                  const courseDisplayName = row.courseName || row.course?.courseName || '';

                  return (
                    <tr key={row.id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4">
                        <div className="text-sm font-bold text-gray-900">{studentDisplayName}</div>
                        <div className="text-xs text-gray-500">{regNo}</div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm font-bold text-gray-900">{courseDisplayCode}</div>
                        <div className="text-xs text-gray-500">{courseDisplayName}</div>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-600">{row.enrollmentDate}</td>
                      <td className="px-6 py-4">
                        <StatusBadge status={row.status} />
                      </td>
                      <td className="px-6 py-4 text-sm font-bold text-indigo-600">{row.grade || '-'}</td>
                      <td className="px-6 py-4">
                        <div className="flex justify-end gap-3 text-gray-400">
                          <Link to={`/enrollments/${row.id}`} className="hover:text-indigo-600"><Eye size={16} /></Link>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}