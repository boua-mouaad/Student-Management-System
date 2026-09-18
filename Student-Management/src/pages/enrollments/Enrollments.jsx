import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  Search, 
  ChevronDown, 
  Download, 
  UserPlus, 
  Eye, 
  Menu,
  Users,
  PieChart,
  List,
  FileWarning,
  X
} from 'lucide-react';
import StatusBadge from '../../components/common/StatusBadge';
import api from '../../services/api';

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
          <div className="flex items-center gap-3 mb-2">
            <h1 className="text-3xl font-bold text-gray-900 leading-tight">Enrollments Directory</h1>
            <span className="bg-indigo-50 text-indigo-700 px-2 py-0.5 rounded text-xs font-bold border border-indigo-100 uppercase tracking-wider">Live Feed</span>
          </div>
          <p className="text-sm text-gray-500 max-w-md">All active student registrations across university departments for Spring 2025.</p>
        </div>
        
        <div className="flex gap-3">
          <button className="flex items-center gap-2 px-3 py-2 bg-white border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 shadow-sm">
            <Download size={16} /> Batch Export
          </button>
          <Link 
            to="/enrollments/new" 
            className="flex items-center gap-2 px-4 py-2 bg-indigo-600 border border-transparent rounded-md text-sm font-medium text-white hover:bg-indigo-700 shadow-sm"
          >
            <UserPlus size={16} /> Enroll Student
          </Link>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-4 flex flex-col justify-between">
          <div className="flex justify-between items-start mb-2">
            <span className="text-xs font-bold text-gray-500 uppercase">Total Enrollments</span>
            <Users size={16} className="text-indigo-500" />
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-bold text-gray-900">12,940</span>
            <span className="text-xs font-medium text-green-600 flex items-center">↗ +3.8%</span>
          </div>
        </div>

        <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-4 flex flex-col justify-between">
          <div className="flex justify-between items-start mb-2">
            <span className="text-xs font-bold text-gray-500 uppercase">Average Class Fill</span>
            <PieChart size={16} className="text-emerald-500" />
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-bold text-gray-900">91.4%</span>
            <span className="text-xs text-gray-500">Capacity cap<br/>95%</span>
          </div>
        </div>

        <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-4 flex flex-col justify-between">
          <div className="flex justify-between items-start mb-2">
            <span className="text-xs font-bold text-gray-500 uppercase">Waitlisted</span>
            <List size={16} className="text-indigo-400" />
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-bold text-gray-900">318</span>
            <span className="text-xs text-gray-500">Across 18 depts</span>
          </div>
        </div>

        <div className="bg-white border border-red-200 rounded-xl shadow-sm p-4 flex flex-col justify-between">
          <div className="flex justify-between items-start mb-2">
            <span className="text-xs font-bold text-red-500 uppercase">Grade Submissions Pending</span>
            <FileWarning size={16} className="text-red-500" />
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-bold text-red-600">84</span>
            <span className="text-xs text-red-500 font-medium bg-red-50 px-1.5 py-0.5 rounded">Requires Sign-off</span>
          </div>
        </div>
      </div>

      <div className="bg-white border border-gray-200 rounded-t-lg shadow-sm p-4 flex flex-col gap-3">
        <div className="flex gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
            <input 
              type="text" 
              placeholder="Filter by student name, ID, or course code..." 
              className="w-full pl-9 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-md text-sm focus:bg-white focus:border-indigo-500 focus:outline-none"
            />
          </div>
          
          <button className="flex items-center gap-2 px-3 py-2 bg-white border border-gray-200 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50">
            All Courses <ChevronDown size={14} className="text-gray-400" />
          </button>
          <button className="flex items-center gap-2 px-3 py-2 bg-white border border-gray-200 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50">
            All Depts <ChevronDown size={14} className="text-gray-400" />
          </button>
          <button className="flex items-center gap-2 px-3 py-2 bg-white border border-gray-200 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50">
            Status: All <ChevronDown size={14} className="text-gray-400" />
          </button>
          <button className="flex items-center gap-2 px-3 py-2 bg-indigo-50 border border-indigo-100 text-indigo-700 rounded-md text-sm font-medium hover:bg-indigo-100">
            Spring 2025 <ChevronDown size={14} className="text-indigo-400" />
          </button>
        </div>
        
        <div className="flex items-center gap-3 text-sm">
          <span className="font-bold text-gray-500 uppercase text-xs tracking-wider">Active Filters:</span>
          <span className="bg-indigo-50 text-indigo-700 px-3 py-1 rounded-full flex items-center gap-2 text-xs font-medium border border-indigo-100">
            Term: Spring 2025 <X size={12} className="cursor-pointer hover:text-indigo-900" />
          </span>
          <span className="bg-indigo-50 text-indigo-700 px-3 py-1 rounded-full flex items-center gap-2 text-xs font-medium border border-indigo-100">
            Undergrad Registry <X size={12} className="cursor-pointer hover:text-indigo-900" />
          </span>
          <button className="text-indigo-600 hover:underline text-xs font-medium">Clear all</button>
        </div>
      </div>

      <div className="bg-white border border-gray-200 border-t-0 rounded-b-lg shadow-sm overflow-hidden flex flex-col -mt-6">
        {error && (
          <div className="p-4 bg-red-50 text-red-600 border-b border-red-100 text-sm font-medium mt-6">
            {error}
          </div>
        )}

        {isLoading ? (
          <div className="p-12 flex justify-center items-center text-gray-400 mt-6">
            <span className="text-sm font-medium">Loading enrollments data...</span>
          </div>
        ) : (
          <div className="overflow-x-auto mt-2">
            <table className="w-full text-left border-collapse">
              <thead className="bg-gray-50/50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-3 w-12"><input type="checkbox" className="rounded border-gray-300" /></th>
                  <th className="px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Student</th>
                  <th className="px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Course Module</th>
                  <th className="px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Enrollment Date</th>
                  <th className="px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Current Grade</th>
                  <th className="px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {enrollments.map((row, i) => (
                  <tr key={row.id || i} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4"><input type="checkbox" className="rounded border-gray-300" /></td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        {row.student?.img || row.studentImg ? (
                          <img src={row.student?.img || row.studentImg} alt={row.student?.name || row.studentName} className="w-8 h-8 rounded-full" />
                        ) : (
                          <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold ${row.student?.bg || 'bg-gray-100 text-gray-700'}`}>
                            {row.student?.initials || (row.student?.name || row.studentName || 'U').charAt(0)}
                          </div>
                        )}
                        <div>
                          <div className="text-sm font-bold text-gray-900">{row.student?.name || row.studentName}</div>
                          <div className="text-xs text-gray-500">{row.student?.id || row.studentId}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex flex-col">
                        <span className="text-sm font-bold text-gray-900">{row.course?.code || row.courseCode}</span>
                        <span className="text-xs text-gray-500">{row.course?.title || row.courseTitle}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">{row.date || row.enrollmentDate}</td>
                    <td className="px-6 py-4">
                      <StatusBadge status={row.status || 'Active'} />
                    </td>
                    <td className="px-6 py-4">
                      <span className={`text-sm font-bold ${
                        (row.grade || '').includes('A') ? 'text-indigo-600' :
                        (row.grade || '').includes('B') ? 'text-blue-600' :
                        row.grade === 'Pending' ? 'text-amber-500' : 'text-gray-500'
                      }`}>
                        {row.grade || 'N/A'}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex justify-end gap-3 text-gray-400">
                        <Link to={`/enrollments/${row.id}`} className="hover:text-indigo-600"><Eye size={16} /></Link>
                        <button className="hover:text-gray-600"><Menu size={16} /></button>
                        <button className="hover:text-gray-600 flex flex-col gap-0.5">
                          <span className="w-1 h-1 bg-gray-400 rounded-full"></span>
                          <span className="w-1 h-1 bg-gray-400 rounded-full"></span>
                          <span className="w-1 h-1 bg-gray-400 rounded-full"></span>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
        
        <div className="px-6 py-4 border-t border-gray-100 flex items-center justify-between bg-gray-50/50 text-sm text-gray-500">
          <div>Showing <span className="font-medium text-gray-900">1</span> to <span className="font-medium text-gray-900">{enrollments.length}</span> of <span className="font-medium text-gray-900">12,940</span> enrollments</div>
          <div className="flex gap-1 items-center">
            <span className="text-gray-400 mr-2 text-xl">&lt;</span>
            <button className="w-8 h-8 flex items-center justify-center bg-indigo-600 text-white rounded font-medium">1</button>
            <button className="w-8 h-8 flex items-center justify-center hover:bg-white rounded border border-transparent hover:border-gray-200 text-gray-700">2</button>
            <button className="w-8 h-8 flex items-center justify-center hover:bg-white rounded border border-transparent hover:border-gray-200 text-gray-700">3</button>
            <span className="px-1 text-gray-400">...</span>
            <button className="w-auto px-2 h-8 flex items-center justify-center hover:bg-white rounded border border-transparent hover:border-gray-200 text-gray-700">1,618</button>
            <span className="text-gray-900 font-medium ml-2 hover:underline cursor-pointer text-xl">&gt;</span>
          </div>
        </div>
      </div>

    </div>
  );
}