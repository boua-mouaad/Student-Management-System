import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Eye, Edit2, Plus } from 'lucide-react';
import api from '../../services/api';

export default function Courses() {
  const [courses, setCourses] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        setIsLoading(true);
        const response = await api.get('/courses');
        setCourses(response.data);
      } catch (err) {
        setError("Could not load courses directory.");
      } finally {
        setIsLoading(false);
      }
    };
    fetchCourses();
  }, []);

  return (
    <div className="flex flex-col gap-6 max-w-7xl mx-auto font-sans pb-8">
      <div className="flex justify-between items-start">
        <div>
          <div className="text-sm font-bold text-indigo-600 tracking-wider uppercase mb-1">Registrar &gt; Catalog</div>
          <h1 className="text-3xl font-bold text-gray-900 leading-tight mb-2">Courses</h1>
        </div>
        <Link to="/courses/new" className="flex items-center gap-2 px-4 py-2 bg-indigo-600 rounded-md text-sm font-medium text-white hover:bg-indigo-700 shadow-sm">
          <Plus size={16} /> Add Course
        </Link>
      </div>

      <div className="bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden flex flex-col">
        {error && (
          <div className="p-4 bg-red-50 text-red-600 border-b border-red-100 text-sm font-medium">
            {error}
          </div>
        )}

        {isLoading ? (
          <div className="p-12 flex justify-center items-center text-gray-400">
            <span className="text-sm font-medium">Loading course catalog...</span>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Course Code</th>
                  <th className="px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Course Name</th>
                  <th className="px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Credits</th>
                  <th className="px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {courses.map((course) => (
                  <tr key={course.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 text-sm font-bold text-indigo-600">{course.courseCode}</td>
                    <td className="px-6 py-4 text-sm font-bold text-gray-900">{course.courseName}</td>
                    <td className="px-6 py-4 text-sm text-gray-600">{course.credits} CR</td>
                    <td className="px-6 py-4">
                      <div className="flex justify-end gap-2 text-gray-400">
                        <Link to={`/courses/${course.id}`} className="hover:text-indigo-600"><Eye size={16} /></Link>
                        <button className="hover:text-indigo-600"><Edit2 size={16} /></button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}