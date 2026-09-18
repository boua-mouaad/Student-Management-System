import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  Search, 
  ChevronDown, 
  Download, 
  Plus, 
  Eye, 
  Edit2, 
  MoreVertical,
  Users
} from 'lucide-react';
import StatusBadge from '../../components/common/StatusBadge';
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
          <p className="text-sm text-gray-500 max-w-md">Manage academic curriculum, course sections, and faculty assignments for the active term.</p>
        </div>
        
        <div className="flex gap-8">
          <div className="flex flex-col">
            <span className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">Total Courses</span>
            <span className="text-2xl font-bold text-gray-900">184</span>
          </div>
          <div className="flex flex-col">
            <span className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">Active Sections</span>
            <span className="text-2xl font-bold text-green-600">312</span>
          </div>
          <div className="flex flex-col">
            <span className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">Seats Available</span>
            <span className="text-2xl font-bold text-indigo-600">798</span>
          </div>
        </div>
      </div>

      <div className="flex justify-between items-center bg-white p-3 border border-gray-200 rounded-lg shadow-sm">
        <div className="flex gap-3 flex-1">
          <div className="relative w-80">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
            <input 
              type="text" 
              placeholder="Search by course code, title, or instructor" 
              className="w-full pl-9 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-md text-sm focus:bg-white focus:border-indigo-500 focus:outline-none"
            />
          </div>
          
          <button className="flex items-center gap-2 px-3 py-2 bg-white border border-gray-200 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50">
            All Departments <ChevronDown size={14} className="text-gray-400" />
          </button>
          <button className="flex items-center gap-2 px-3 py-2 bg-white border border-gray-200 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50">
            Spring 2025 <ChevronDown size={14} className="text-gray-400" />
          </button>
          <button className="flex items-center gap-2 px-3 py-2 bg-white border border-gray-200 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50">
            Status: All <ChevronDown size={14} className="text-gray-400" />
          </button>
        </div>
        
        <div className="flex gap-3">
          <button className="flex items-center gap-2 px-3 py-2 bg-white border border-gray-200 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50">
            <Download size={16} /> Export CSV
          </button>
          <Link 
            to="/courses/new" 
            className="flex items-center gap-2 px-4 py-2 bg-indigo-600 border border-transparent rounded-md text-sm font-medium text-white hover:bg-indigo-700 shadow-sm"
          >
            <Plus size={16} /> Add Course
          </Link>
        </div>
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
                  <th className="px-6 py-3 w-12"><input type="checkbox" className="rounded border-gray-300" /></th>
                  <th className="px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Course Title & Code</th>
                  <th className="px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Department</th>
                  <th className="px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Instructor</th>
                  <th className="px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Credits</th>
                  <th className="px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Enrollment</th>
                  <th className="px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {courses.map((course, i) => (
                  <tr key={course.id || i} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4"><input type="checkbox" className="rounded border-gray-300" /></td>
                    <td className="px-6 py-4">
                      <div className="flex flex-col">
                        <span className="text-sm font-bold text-gray-900">{course.title}</span>
                        <span className="text-xs font-medium text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded-md w-fit mt-1 border border-indigo-100">{course.code}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">{course.dept || course.department}</td>
                    <td className="px-6 py-4 text-sm text-gray-600">{course.instructor}</td>
                    <td className="px-6 py-4 text-sm text-gray-600">{course.credits} CR</td>
                    <td className="px-6 py-4 text-sm text-gray-600">
                      <div className="flex items-center gap-2">
                        <Users size={14} className="text-gray-400" />
                        {course.enrolled || 0}
                      </div>
                    </td>
                    <td className="px-6 py-4"><StatusBadge status={course.status || 'Active'} /></td>
                    <td className="px-6 py-4">
                      <div className="flex justify-end gap-2 text-gray-400">
                        <Link to={`/courses/${course.id || course.code?.replace(' ', '')}`} className="hover:text-indigo-600"><Eye size={16} /></Link>
                        <button className="hover:text-indigo-600"><Edit2 size={16} /></button>
                        <button className="hover:text-gray-600"><MoreVertical size={16} /></button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
        
        <div className="px-6 py-4 border-t border-gray-100 flex items-center justify-between bg-white text-sm text-gray-500">
          <div>Showing <span className="font-medium text-gray-900">1</span> to <span className="font-medium text-gray-900">{courses.length}</span> of <span className="font-medium text-gray-900">184</span> courses</div>
          <div className="flex gap-1 items-center">
            <span className="text-gray-400 mr-2">Previous</span>
            <button className="w-8 h-8 flex items-center justify-center bg-indigo-600 text-white rounded font-medium">1</button>
            <button className="w-8 h-8 flex items-center justify-center hover:bg-gray-100 rounded text-gray-700">2</button>
            <button className="w-8 h-8 flex items-center justify-center hover:bg-gray-100 rounded text-gray-700">3</button>
            <span className="px-1 text-gray-400">...</span>
            <button className="w-8 h-8 flex items-center justify-center hover:bg-gray-100 rounded text-gray-700">23</button>
            <span className="text-gray-900 font-medium ml-2 hover:underline cursor-pointer">Next &gt;</span>
          </div>
        </div>
      </div>
    </div>
  );
}