import React, { useState, useEffect } from 'react';
import { Award, Download } from 'lucide-react';
import api from '../../services/api';

export default function MyGrades() {
  const [enrollments, setEnrollments] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchGrades = async () => {
      try {
        setIsLoading(true);
        const response = await api.get('/enrollments');
        // Filter for completed or graded courses
        const completed = response.data.filter(e => e.grade && e.grade !== 'Pending');
        setEnrollments(completed);
      } catch (err) {
        console.error("Failed to load grades", err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchGrades();
  }, []);

  return (
    <div className="flex flex-col gap-6">
      <div className="flex justify-between items-end mb-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 leading-tight">Academic Transcripts</h1>
          <p className="text-sm text-gray-500 mt-1">Official ledger of completed coursework and grades.</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 shadow-sm">
          <Download size={16} /> Official Transcript
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-2">
        <div className="bg-indigo-600 rounded-xl shadow-sm p-6 text-white flex flex-col justify-between">
          <div className="flex justify-between items-start">
            <span className="text-sm font-medium text-indigo-200">Cumulative GPA</span>
            <Award size={20} className="text-indigo-200" />
          </div>
          <span className="text-4xl font-bold mt-2">3.84</span>
        </div>
        
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 flex flex-col justify-between">
          <div className="flex justify-between items-start">
            <span className="text-sm font-medium text-gray-500">Credits Earned</span>
          </div>
          <div className="flex items-baseline gap-2 mt-2">
            <span className="text-4xl font-bold text-gray-900">42</span>
            <span className="text-sm text-gray-500">/ 120 Required</span>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 flex flex-col justify-between">
          <div className="flex justify-between items-start">
            <span className="text-sm font-medium text-gray-500">Academic Standing</span>
          </div>
          <span className="text-2xl font-bold text-emerald-600 mt-2">Good Standing</span>
        </div>
      </div>

      <div className="bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden flex flex-col">
        {isLoading ? (
          <div className="p-12 text-center text-gray-400">Loading transcript records...</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Term</th>
                  <th className="px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Course Code</th>
                  <th className="px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Course Title</th>
                  <th className="px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Credits</th>
                  <th className="px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Final Grade</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {enrollments.length === 0 ? (
                  <tr>
                    <td colSpan="5" className="px-6 py-8 text-center text-gray-500 text-sm">No graded courses found.</td>
                  </tr>
                ) : (
                  enrollments.map((row) => (
                    <tr key={row.id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4 text-sm text-gray-600">{row.termSection || 'Historical Term'}</td>
                      <td className="px-6 py-4 text-sm font-bold text-indigo-600">{row.course?.courseCode}</td>
                      <td className="px-6 py-4 text-sm font-bold text-gray-900">{row.course?.courseName}</td>
                      <td className="px-6 py-4 text-sm text-gray-600">{row.course?.credits}</td>
                      <td className="px-6 py-4">
                        <span className="text-sm font-bold text-gray-900 bg-gray-100 px-2 py-1 rounded">{row.grade}</span>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}