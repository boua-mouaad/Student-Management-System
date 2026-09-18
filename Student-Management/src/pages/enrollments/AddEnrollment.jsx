import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  CheckCircle, 
  Clock, 
  ShieldCheck, 
  AlertCircle,
  Save,
  Info,
  CheckSquare,
  BookOpen
} from 'lucide-react';
import InputField from '../../components/common/InputField';
import Button from '../../components/common/Button';
import api from '../../services/api';

export default function AddEnrollment() {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const [students, setStudents] = useState([]);
  const [courses, setCourses] = useState([]);

  const [formData, setFormData] = useState({
    studentId: '',
    courseId: '',
    termSection: 'Spring 2025 - Section 01',
    enrollmentDate: new Date().toISOString().split('T')[0],
    gradingBasis: 'Letter Grade (A - F)',
    override: false
  });

  useEffect(() => {
    const fetchSelectOptions = async () => {
      try {
        const [studentsRes, coursesRes] = await Promise.all([
          api.get('/students'),
          api.get('/courses')
        ]);
        setStudents(studentsRes.data);
        setCourses(coursesRes.data);
      } catch (err) {
        console.error("Failed to load options");
      }
    };
    fetchSelectOptions();
  }, []);

  const handleChange = (e) => {
    const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
    setFormData({ ...formData, [e.target.name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.studentId || !formData.courseId) {
      setError("Please select both a student and a course.");
      return;
    }
    
    setIsSubmitting(true);
    setError(null);

    try {
      const response = await api.post('/enrollments', formData);
      navigate(`/enrollments/${response.data.id || response.data.enrollmentId}`);
    } catch (err) {
      setError("Failed to create enrollment record. Please check availability and prerequisites.");
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex flex-col gap-6 max-w-7xl mx-auto font-sans pb-24">
      <div className="flex justify-between items-end border-b border-gray-200 pb-4">
        <div>
          <div className="text-sm font-bold text-gray-500 tracking-wider uppercase mb-1 flex items-center gap-2">
            <Link to="/enrollments" className="hover:underline text-indigo-600">Enrollments</Link> &gt; 
            New Enrollment &gt; 
            <span className="text-emerald-700 bg-emerald-50 border border-emerald-100 px-2 py-0.5 rounded text-[10px] flex items-center gap-1">
              <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full"></span> Term: Spring 2025
            </span>
          </div>
          <div className="flex items-center gap-3 mb-1 mt-3">
            <BookOpen size={20} className="text-indigo-600" />
            <h1 className="text-sm font-bold text-indigo-600 uppercase tracking-wider">Academic Registrar System</h1>
          </div>
          <h2 className="text-3xl font-bold text-gray-900 leading-tight">Enroll Student in Course</h2>
          <p className="text-sm text-gray-500 mt-1">Register an enrolled student into validated course sections for the active semester.</p>
        </div>
        
        <div className="flex gap-4 text-sm font-medium">
          <button className="flex items-center gap-1.5 text-gray-500 hover:text-gray-900"><Clock size={16}/> Recent Registrations</button>
          <button className="flex items-center gap-1.5 text-gray-500 hover:text-gray-900"><Info size={16}/> Policy Handbook</button>
        </div>
      </div>

      {error && (
        <div className="bg-red-50 text-red-600 border border-red-100 p-4 rounded-lg flex items-center gap-3 text-sm font-medium">
          <AlertCircle size={18} />
          {error}
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 flex flex-col gap-6">
          <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-6">
            <div className="flex justify-between items-start mb-6">
              <div className="flex gap-2 items-center">
                <span className="w-2 h-2 bg-indigo-600 rounded-full"></span>
                <h2 className="text-base font-bold text-gray-900">Enrollment Specification</h2>
              </div>
            </div>

            <div className="mb-6">
              <label className="text-xs font-bold text-gray-500 uppercase tracking-wider block mb-2">Student Profile *</label>
              <select name="studentId" value={formData.studentId} onChange={handleChange} className="w-full border border-gray-300 px-3 py-3 rounded-md bg-white focus:outline-none focus:border-indigo-500 text-sm">
                <option value="">-- Select Student --</option>
                {students.map(student => (
                  <option key={student.id || student.studentId} value={student.id || student.studentId}>
                    {student.firstName} {student.lastName} ({student.studentId || student.id})
                  </option>
                ))}
              </select>
            </div>

            <div className="mb-6">
              <label className="text-xs font-bold text-gray-500 uppercase tracking-wider block mb-2">Course Catalog Selection *</label>
              <select name="courseId" value={formData.courseId} onChange={handleChange} className="w-full border border-gray-300 px-3 py-3 rounded-md bg-white focus:outline-none focus:border-indigo-500 text-sm">
                <option value="">-- Select Course --</option>
                {courses.map(course => (
                  <option key={course.id || course.code} value={course.id || course.code}>
                    {course.code} - {course.title}
                  </option>
                ))}
              </select>
            </div>

            <div className="grid grid-cols-2 gap-x-6 gap-y-4 mb-6">
              <div className="flex flex-col gap-1">
                <label className="text-sm font-medium text-gray-700">Term & Section</label>
                <select name="termSection" value={formData.termSection} onChange={handleChange} className="border border-gray-300 px-3 py-2 rounded-md bg-gray-50 focus:bg-white focus:outline-none focus:border-indigo-500 text-sm">
                  <option value="Spring 2025 - Section 01">Spring 2025 - Section 01</option>
                  <option value="Fall 2025 - Section 01">Fall 2025 - Section 01</option>
                </select>
              </div>
              
              <InputField label="Effective Enrollment Date" type="date" name="enrollmentDate" value={formData.enrollmentDate} onChange={handleChange} />
              
              <div className="flex flex-col gap-1">
                <label className="text-sm font-medium text-gray-700">Grading Basis</label>
                <select name="gradingBasis" value={formData.gradingBasis} onChange={handleChange} className="border border-gray-300 px-3 py-2 rounded-md bg-gray-50 focus:bg-white focus:outline-none focus:border-indigo-500 text-sm">
                  <option value="Letter Grade (A - F)">Letter Grade (A - F)</option>
                  <option value="Pass / Fail">Pass / Fail</option>
                  <option value="Audit">Audit</option>
                </select>
              </div>
            </div>

            <div className="bg-blue-50 border border-blue-100 rounded-lg p-4 flex gap-3 items-start">
              <input type="checkbox" name="override" checked={formData.override} onChange={handleChange} className="mt-1 w-4 h-4 rounded border-blue-300 text-blue-600 focus:ring-blue-500" />
              <div>
                <div className="text-sm font-bold text-blue-900">Override prerequisite requirements <span className="text-xs font-normal text-blue-700">(Dean Approval Required)</span></div>
                <div className="text-xs text-blue-800 mt-1">Bypass automated prerequisite gatekeeper for this enrollment.</div>
              </div>
            </div>

          </div>
        </div>

        <div className="lg:col-span-1 flex flex-col gap-6">
          <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-5">
            <div className="flex justify-between items-center mb-6">
              <div className="flex gap-2 items-center">
                <span className="w-2 h-2 bg-emerald-500 rounded-full"></span>
                <h2 className="text-sm font-bold text-gray-900">Validation Status</h2>
              </div>
            </div>

            <div className="space-y-4 text-sm">
              <div className="flex gap-3">
                <CheckCircle size={18} className="text-emerald-500 flex-shrink-0" />
                <div>
                  <div className="flex justify-between">
                    <span className="font-medium text-gray-900">System Ready</span>
                  </div>
                  <div className="text-xs text-gray-500 mt-0.5">Please ensure all required selections are made before proceeding.</div>
                </div>
              </div>

              <div className="flex gap-3">
                <CheckSquare size={18} className="text-emerald-500 flex-shrink-0" />
                <div className="w-full">
                  <div className="flex justify-between">
                    <span className="font-medium text-gray-900">Tuition & Billing Impact</span>
                    <span className="text-emerald-600 font-medium text-xs">Standard</span>
                  </div>
                  <div className="text-xs text-gray-500 mt-0.5">Updates to credit load will automatically sync with billing ledger.</div>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-4 flex justify-between items-center">
            <div className="flex items-center gap-3">
              <div className="bg-emerald-50 p-2 rounded-lg text-emerald-600"><CheckCircle size={18} /></div>
              <div>
                <div className="text-sm font-bold text-gray-900">Auto-Sync to Student Portal</div>
                <div className="text-[10px] text-gray-500 leading-tight mt-0.5">Changes reflect immediately.</div>
              </div>
            </div>
            <span className="bg-gray-100 text-gray-500 px-2 py-1 rounded text-[10px] font-bold uppercase tracking-wider">Instant Sync</span>
          </div>
        </div>
      </div>

      <div className="fixed bottom-0 right-0 left-64 bg-white border-t border-gray-200 p-4 flex justify-between items-center z-10">
        <div className="flex items-center gap-4 text-sm text-gray-500 ml-8">
          <div className="flex items-center gap-2">
            <ShieldCheck size={18} className="text-emerald-500" />
            <div>
              <div className="text-xs font-bold text-gray-900 uppercase tracking-wider">Registration Window</div>
              <div className="text-[10px]">Standard Add/Drop</div>
            </div>
          </div>
        </div>
        <div className="flex gap-3 mr-8">
          <Link to="/enrollments" className="px-4 py-2 bg-white border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50">
            Cancel
          </Link>
          <Button 
            text={isSubmitting ? "Processing..." : "Enroll Student"} 
            className={`flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2 rounded-md font-medium ${isSubmitting ? 'opacity-70 cursor-not-allowed' : ''}`}
            onClick={handleSubmit}
            disabled={isSubmitting}
          />
        </div>
      </div>
    </div>
  );
}