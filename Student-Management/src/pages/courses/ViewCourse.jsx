import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { 
  Edit2, 
  Mail, 
  Lock, 
  Search, 
  Download,
  Calendar,
  MapPin,
  Clock,
  BarChart2,
  CheckCircle,
  AlertCircle
} from 'lucide-react';
import StatusBadge from '../../components/common/StatusBadge';
import api from '../../services/api';

export default function ViewCourse() {
  const { id } = useParams();
  const [course, setCourse] = useState(null);
  const [enrolledStudents, setEnrolledStudents] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCourseDetails = async () => {
      try {
        setIsLoading(true);
        const [courseRes, studentsRes] = await Promise.all([
          api.get(`/courses/${id}`),
          api.get(`/courses/${id}/students`)
        ]);
        
        setCourse(courseRes.data);
        setEnrolledStudents(studentsRes.data);
      } catch (err) {
        setError("Could not load course details.");
      } finally {
        setIsLoading(false);
      }
    };

    if (id) {
      fetchCourseDetails();
    }
  }, [id]);

  if (isLoading) {
    return (
      <div className="flex flex-col gap-6 max-w-7xl mx-auto font-sans pb-12 p-12 items-center justify-center text-gray-400">
        <span className="text-sm font-medium">Loading course record...</span>
      </div>
    );
  }

  if (error || !course) {
    return (
      <div className="flex flex-col gap-6 max-w-7xl mx-auto font-sans pb-12 p-4">
        <div className="p-4 bg-red-50 text-red-600 border border-red-100 rounded-lg text-sm font-medium">
          {error || "Course not found."}
        </div>
        <Link to="/courses" className="text-indigo-600 hover:underline text-sm">← Back to Courses</Link>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6 max-w-7xl mx-auto font-sans pb-12">
      <div className="flex justify-between items-center">
        <div className="text-sm text-gray-500 flex items-center gap-2">
          <Link to="/courses" className="hover:underline">Courses</Link> / 
          <span className="font-medium text-gray-900">{course.code || id}</span> / 
          Details
        </div>
      </div>

      <div className="flex justify-between items-start">
        <div>
          <div className="flex items-center gap-3 mb-3">
            <span className="bg-indigo-50 text-indigo-700 px-2 py-0.5 rounded text-xs font-bold border border-indigo-100 uppercase tracking-wider">{course.code} • {course.credits} Credits</span>
            <span className="bg-emerald-50 text-emerald-700 px-2 py-0.5 rounded text-xs font-bold border border-emerald-100 flex items-center gap-1">
              <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full"></span> Active Section {course.section || '01'}
            </span>
            <span className="text-xs text-gray-500 font-medium">CRN: {course.crn || 'N/A'}</span>
          </div>
          
          <h1 className="text-3xl font-bold text-gray-900 leading-tight mb-4">{course.title}</h1>
          
          <div className="flex items-center gap-3">
            <img src={`https://ui-avatars.com/api/?name=${course.instructor?.replace(' ', '+') || 'Instructor'}&background=f3f4f6&color=374151`} className="w-8 h-8 rounded-full border border-gray-300" alt="Instructor" />
            <div>
              <div className="text-sm font-bold text-gray-900 flex items-center gap-1">
                {course.instructor} <CheckCircle size={14} className="text-indigo-600" />
              </div>
              <div className="text-xs text-gray-500">{course.department || 'Department'} • Faculty</div>
            </div>
          </div>
        </div>
        
        <div className="flex flex-col gap-2 items-end">
          <div className="flex gap-3">
            <button className="flex items-center gap-2 px-3 py-2 bg-white border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 shadow-sm">
              <Edit2 size={16} /> Edit Course Details
            </button>
            <button className="flex items-center gap-2 px-3 py-2 bg-white border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 shadow-sm">
              <Mail size={16} /> Email Enrolled Roster
            </button>
          </div>
          <button className="flex items-center gap-2 px-3 py-1.5 text-red-600 hover:bg-red-50 rounded-md text-sm font-medium transition-colors">
            <Lock size={14} /> Close Enrollment
          </button>
        </div>
      </div>

      <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-5 mt-2">
        <div className="flex gap-8 mb-5">
          <div className="flex items-center gap-3">
            <div className="bg-indigo-50 p-2 rounded-lg text-indigo-600"><Calendar size={18} /></div>
            <div>
              <div className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Term</div>
              <div className="text-sm font-medium text-gray-900">{course.term || 'Spring 2025'}</div>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="bg-emerald-50 p-2 rounded-lg text-emerald-600"><MapPin size={18} /></div>
            <div>
              <div className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Hall</div>
              <div className="text-sm font-medium text-gray-900">{course.location || 'TBA'}</div>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="bg-amber-50 p-2 rounded-lg text-amber-600"><Clock size={18} /></div>
            <div>
              <div className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Schedule</div>
              <div className="text-sm font-medium text-gray-900">{course.schedule || 'TBA'}</div>
            </div>
          </div>
        </div>

        <div className="bg-gray-50 rounded-lg p-4 border border-gray-100">
          <div className="flex justify-between items-end mb-2">
            <div className="flex items-center gap-2">
              <span className="text-sm font-bold text-gray-900">Seat Utilization</span>
              <span className="bg-emerald-100 text-emerald-700 px-2 py-0.5 rounded text-xs font-bold">{course.fillPercentage || 0}% Capacity</span>
            </div>
            <div className="text-xs text-gray-500">
              <span className="font-bold text-gray-900 text-sm">{course.enrolledCount || 0} / {course.maxSeats || 0}</span> Seats Enrolled ({course.waitlistCount || 0} on Waitlist)
            </div>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2.5 overflow-hidden">
            <div className="bg-indigo-600 h-2.5 rounded-full" style={{ width: `${course.fillPercentage || 0}%` }}></div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden flex flex-col">
          <div className="px-6 py-4 border-b border-gray-100 flex justify-between items-center bg-white">
            <div className="flex items-center gap-3">
              <h2 className="text-lg font-bold text-gray-900">Enrolled Student Roster</h2>
              <span className="bg-gray-100 text-gray-600 px-2 py-0.5 rounded text-xs font-medium">{enrolledStudents.length} Students</span>
            </div>
            
            <div className="flex gap-2">
              <div className="relative w-64">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={14} />
                <input 
                  type="text" 
                  placeholder="Filter by student or ID..." 
                  className="w-full pl-8 pr-3 py-1.5 bg-gray-50 border border-gray-200 rounded-md text-xs focus:bg-white focus:border-indigo-500 focus:outline-none"
                />
              </div>
              <button className="p-1.5 bg-white border border-gray-200 rounded-md text-gray-500 hover:bg-gray-50">
                <Download size={14} />
              </button>
            </div>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead className="bg-gray-50/50 border-b border-gray-100">
                <tr>
                  <th className="px-6 py-3 text-[10px] font-bold text-gray-400 uppercase tracking-wider">Student Name</th>
                  <th className="px-6 py-3 text-[10px] font-bold text-gray-400 uppercase tracking-wider">ID</th>
                  <th className="px-6 py-3 text-[10px] font-bold text-gray-400 uppercase tracking-wider">Program</th>
                  <th className="px-6 py-3 text-[10px] font-bold text-gray-400 uppercase tracking-wider">Enrolled</th>
                  <th className="px-6 py-3 text-[10px] font-bold text-gray-400 uppercase tracking-wider">Midterm</th>
                  <th className="px-6 py-3 text-[10px] font-bold text-gray-400 uppercase tracking-wider">Attendance</th>
                  <th className="px-6 py-3"></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {enrolledStudents.map((student, i) => (
                  <tr key={student.id || i} className="hover:bg-gray-50/50 transition-colors">
                    <td className="px-6 py-3">
                      <div className="flex items-center gap-3">
                        <img src={student.profileImageUrl || `https://ui-avatars.com/api/?name=${student.name?.replace(' ', '+')}&background=4f46e5&color=fff`} alt={student.name} className="w-8 h-8 rounded-full" />
                        <div>
                          <div className="text-sm font-bold text-gray-900">{student.name}</div>
                          <div className="text-xs text-gray-500">{student.email}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-3 text-xs text-gray-500">{student.studentId}</td>
                    <td className="px-6 py-3 text-xs text-gray-600 max-w-30 truncate">{student.program}</td>
                    <td className="px-6 py-3 text-xs text-gray-600">{student.enrollmentDate}</td>
                    <td className="px-6 py-3">
                      <span className={`px-2 py-1 rounded text-xs font-bold ${
                        (student.midtermGrade || '').includes('A') ? 'bg-emerald-100 text-emerald-700' :
                        (student.midtermGrade || '').includes('B') ? 'bg-indigo-100 text-indigo-700' : 'bg-gray-100 text-gray-700'
                      }`}>
                        {student.midtermGrade || 'N/A'}
                      </span>
                    </td>
                    <td className="px-6 py-3">
                      <div className="flex items-center gap-1.5 text-xs text-gray-600">
                        <span className={`w-1.5 h-1.5 rounded-full ${parseInt(student.attendancePercentage || 0) > 90 ? 'bg-emerald-500' : 'bg-amber-500'}`}></span>
                        {student.attendancePercentage || 0}%
                      </div>
                    </td>
                    <td className="px-6 py-3 text-right">
                      <Link to={`/enrollments/${student.enrollmentId}`} className="text-gray-400 hover:text-indigo-600 transition-colors">&lt;</Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="flex flex-col gap-6">
          <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-5">
            <div className="flex justify-between items-start mb-4">
              <h2 className="text-base font-bold text-gray-900">Course Performance</h2>
              <BarChart2 size={18} className="text-indigo-600" />
            </div>
            
            <div className="bg-gray-50 rounded-lg p-4 border border-gray-100 text-center mb-4">
              <div className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1 flex justify-center items-center gap-2">
                Average Course GPA <span className="bg-emerald-100 text-emerald-700 px-1.5 py-0.5 rounded normal-case text-[9px] flex items-center gap-0.5"><BarChart2 size={10} /> +0.18</span>
              </div>
              <div className="text-4xl font-bold text-gray-900">{course.averageGpa || '0.00'}</div>
              
              <div className="mt-4 pt-4 border-t border-gray-200 text-left">
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-gray-500">Grade Distribution</span>
                  <span className="font-medium text-gray-900">Calculated</span>
                </div>
                <div className="w-full h-1.5 flex rounded-full overflow-hidden bg-gray-200">
                  <div className="bg-emerald-500 h-full w-[45%]"></div>
                  <div className="bg-indigo-500 h-full w-[29%]"></div>
                  <div className="bg-amber-400 h-full w-[18%]"></div>
                  <div className="bg-red-400 h-full w-[8%]"></div>
                </div>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-white border border-gray-100 rounded-lg p-3 shadow-sm">
                <div className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1">Total Delivered</div>
                <div className="text-lg font-bold text-gray-900">{course.totalHoursDelivered || 0} hrs</div>
                <div className="text-[10px] text-gray-500">{course.enrolledCount || 0} students</div>
              </div>
              <div className="bg-white border border-gray-100 rounded-lg p-3 shadow-sm">
                <div className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1">Avg Attendance</div>
                <div className="text-lg font-bold text-indigo-600">{course.averageAttendance || 0}%</div>
                <div className="text-[10px] text-gray-500">Participation rate</div>
              </div>
            </div>
          </div>

          <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-5">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-sm font-bold text-gray-900">Teaching Staff</h2>
              <button className="text-xs font-medium text-indigo-600 hover:underline">Manage</button>
            </div>
            
            <div className="flex flex-col gap-4">
              {course.teachingStaff?.map((staff, idx) => (
                <div key={idx} className="flex justify-between items-center">
                  <div className="flex items-center gap-3">
                    <img src={`https://ui-avatars.com/api/?name=${staff.name?.replace(' ', '+')}&background=f3f4f6&color=374151`} className="w-8 h-8 rounded-full border border-gray-200" alt={staff.name} />
                    <div>
                      <div className="text-sm font-bold text-gray-900">{staff.name}</div>
                      <div className="text-[10px] text-gray-500 uppercase">{staff.role}</div>
                    </div>
                  </div>
                  <div className="text-[10px] text-gray-500">{staff.officeHours || 'TBA'}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}