import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  Search, 
  ChevronDown, 
  Download, 
  UserPlus, 
  Eye, 
  Edit2, 
  MoreVertical,
  CalendarCheck,
  ShieldCheck,
  AlertTriangle
} from 'lucide-react';
import StatusBadge from '../../components/common/StatusBadge';
import api from '../../services/api';

export default function Students() {
  const [students, setStudents] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        setIsLoading(true);
        const response = await api.get('/students'); 
        setStudents(response.data);
      } catch (err) {
        setError("Could not load student directory.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchStudents();
  }, []);

  return (
    <div className="flex flex-col gap-6 max-w-7xl mx-auto font-sans pb-8">
      <div className="flex justify-between items-start">
        <div>
          <div className="text-sm font-bold text-indigo-600 tracking-wider uppercase mb-1">Registrar &gt; Directory</div>
          <h1 className="text-3xl font-bold text-gray-900 leading-tight mb-2">Students</h1>
          <p className="text-sm text-gray-500 max-w-md">Manage student records, academic standings, and active enrollments across university divisions.</p>
        </div>
        
        <div className="flex gap-8">
          <div className="flex flex-col">
            <span className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">Total Enrolled</span>
            <span className="text-2xl font-bold text-gray-900">4,820</span>
          </div>
          <div className="flex flex-col">
            <span className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">Good Standing</span>
            <span className="text-2xl font-bold text-green-600">96.4%</span>
          </div>
          <div className="flex flex-col">
            <span className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">Under Review</span>
            <span className="text-2xl font-bold text-red-600">18</span>
          </div>
        </div>
      </div>

      <div className="flex justify-between items-center bg-white p-3 border border-gray-200 rounded-lg shadow-sm">
        <div className="flex gap-3 flex-1">
          <div className="relative w-80">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
            <input 
              type="text" 
              placeholder="Search by student name, ID, or email" 
              className="w-full pl-9 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-md text-sm focus:bg-white focus:border-indigo-500 focus:outline-none"
            />
          </div>
          
          <button className="flex items-center gap-2 px-3 py-2 bg-white border border-gray-200 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50">
            All Departments <ChevronDown size={14} className="text-gray-400" />
          </button>
          <button className="flex items-center gap-2 px-3 py-2 bg-white border border-gray-200 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50">
            All Status <ChevronDown size={14} className="text-gray-400" />
          </button>
          <button className="flex items-center gap-2 px-3 py-2 bg-white border border-gray-200 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50">
            All Academic Years <ChevronDown size={14} className="text-gray-400" />
          </button>
        </div>
        
        <div className="flex gap-3">
          <button className="flex items-center gap-2 px-3 py-2 bg-white border border-gray-200 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50">
            <Download size={16} /> Export CSV
          </button>
          <Link 
            to="/students/new" 
            className="flex items-center gap-2 px-4 py-2 bg-indigo-600 border border-transparent rounded-md text-sm font-medium text-white hover:bg-indigo-700 shadow-sm"
          >
            <UserPlus size={16} /> Add Student
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
            <span className="text-sm font-medium">Loading student records...</span>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-3 w-12"><input type="checkbox" className="rounded border-gray-300" /></th>
                  <th className="px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Student Name</th>
                  <th className="px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Student ID</th>
                  <th className="px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Institutional Email</th>
                  <th className="px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Academic Program</th>
                  <th className="px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Term Load</th>
                  <th className="px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {students.map((student, i) => (
                  <tr key={student.id || i} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4"><input type="checkbox" className="rounded border-gray-300" /></td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        {student.img ? (
                          <img src={student.img} alt={student.name} className="w-9 h-9 rounded-full" />
                        ) : (
                          <div className={`w-9 h-9 rounded-full flex items-center justify-center text-xs font-bold ${student.bg || 'bg-gray-100 text-gray-700'}`}>
                            {student.initials || student.name?.charAt(0) || 'U'}
                          </div>
                        )}
                        <div>
                          <div className="text-sm font-bold text-gray-900">{student.name}</div>
                          <div className="text-xs text-gray-500">{student.year}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">{student.studentId || student.id}</td>
                    <td className="px-6 py-4 text-sm text-gray-600">{student.email}</td>
                    <td className="px-6 py-4 text-sm text-gray-600 max-w-[150px] truncate">{student.program}</td>
                    <td className="px-6 py-4 text-sm text-gray-600">{student.load}</td>
                    <td className="px-6 py-4"><StatusBadge status={student.status} /></td>
                    <td className="px-6 py-4">
                      <div className="flex justify-end gap-2 text-gray-400">
                        <Link to={`/students/${student.studentId || student.id}`} className="hover:text-indigo-600"><Eye size={16} /></Link>
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
          <div>Showing <span className="font-medium text-gray-900">1</span> to <span className="font-medium text-gray-900">{students.length || 0}</span> of <span className="font-medium text-gray-900">4,820</span> students</div>
          <div className="flex gap-1 items-center">
            <span className="text-gray-400 mr-2">Previous</span>
            <button className="w-8 h-8 flex items-center justify-center bg-indigo-600 text-white rounded font-medium">1</button>
            <button className="w-8 h-8 flex items-center justify-center hover:bg-gray-100 rounded text-gray-700">2</button>
            <button className="w-8 h-8 flex items-center justify-center hover:bg-gray-100 rounded text-gray-700">3</button>
            <span className="px-1 text-gray-400">...</span>
            <button className="w-8 h-8 flex items-center justify-center hover:bg-gray-100 rounded text-gray-700">602</button>
            <span className="text-gray-900 font-medium ml-2 hover:underline cursor-pointer">Next &gt;</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-2">
        <div className="bg-white border border-gray-200 rounded-lg p-5 flex items-start gap-4 shadow-sm">
          <div className="bg-indigo-50 p-2 rounded-lg text-indigo-600"><CalendarCheck size={24} /></div>
          <div>
            <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">Registration Window</h3>
            <div className="text-sm font-bold text-gray-900">Spring Priority Phase</div>
            <p className="text-xs text-gray-500 mt-1">Closes Friday, 5:00 PM EST • 92% submission complete</p>
          </div>
        </div>

        <div className="bg-white border border-gray-200 rounded-lg p-5 flex items-start gap-4 shadow-sm">
          <div className="bg-emerald-50 p-2 rounded-lg text-emerald-600"><ShieldCheck size={24} /></div>
          <div>
            <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">Degree Audits</h3>
            <div className="text-sm font-bold text-gray-900">314 Seniors Cleared</div>
            <p className="text-xs text-gray-500 mt-1">42 audit verifications pending registrar signoff</p>
          </div>
        </div>

        <div className="bg-white border border-gray-200 rounded-lg p-5 flex items-start gap-4 shadow-sm">
          <div className="bg-red-50 p-2 rounded-lg text-red-600"><AlertTriangle size={24} /></div>
          <div>
            <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">Academic Alerts</h3>
            <div className="text-sm font-bold text-gray-900">Attendance Flags</div>
            <p className="text-xs text-gray-500 mt-1">7 automated mid-semester alerts sent to advisors</p>
          </div>
        </div>
      </div>
    </div>
  );
}