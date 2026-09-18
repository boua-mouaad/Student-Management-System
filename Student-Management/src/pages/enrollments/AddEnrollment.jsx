import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { BookOpen, AlertCircle } from 'lucide-react';
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
    enrollmentDate: new Date().toISOString().split('T')[0],
    status: 'ACTIVE',
    grade: ''
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
        setError("Failed to load options");
      }
    };
    fetchSelectOptions();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
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
      navigate(`/enrollments/${response.data.id}`);
    } catch (err) {
      setError("Failed to create enrollment.");
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex flex-col gap-6 max-w-4xl mx-auto font-sans pb-24">
      <div className="flex justify-between items-end border-b border-gray-200 pb-4">
        <div>
          <div className="text-sm font-bold text-gray-500 tracking-wider uppercase mb-1 flex items-center gap-2">
            <Link to="/enrollments" className="hover:underline text-indigo-600">Enrollments</Link> &gt; 
            New Enrollment
          </div>
          <h2 className="text-3xl font-bold text-gray-900 leading-tight">Enroll Student in Course</h2>
        </div>
      </div>

      {error && (
        <div className="bg-red-50 text-red-600 border border-red-100 p-4 rounded-lg flex items-center gap-3 text-sm font-medium">
          <AlertCircle size={18} />
          {error}
        </div>
      )}

      <div className="flex flex-col gap-6">
        <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-6">
          <div className="flex gap-2 items-center mb-6">
            <BookOpen size={20} className="text-indigo-600" />
            <h2 className="text-base font-bold text-gray-900">Enrollment Details</h2>
          </div>

          <div className="mb-6">
            <label className="text-xs font-bold text-gray-500 uppercase tracking-wider block mb-2">Student *</label>
            <select name="studentId" value={formData.studentId} onChange={handleChange} className="w-full border border-gray-300 px-3 py-3 rounded-md bg-white focus:outline-none focus:border-indigo-500 text-sm">
              <option value="">-- Select Student --</option>
              {students.map(student => (
                <option key={student.id} value={student.id}>
                  {student.firstName} {student.lastName} ({student.registrationNumber})
                </option>
              ))}
            </select>
          </div>

          <div className="mb-6">
            <label className="text-xs font-bold text-gray-500 uppercase tracking-wider block mb-2">Course *</label>
            <select name="courseId" value={formData.courseId} onChange={handleChange} className="w-full border border-gray-300 px-3 py-3 rounded-md bg-white focus:outline-none focus:border-indigo-500 text-sm">
              <option value="">-- Select Course --</option>
              {courses.map(course => (
                <option key={course.id} value={course.id}>
                  {course.courseCode} - {course.courseName}
                </option>
              ))}
            </select>
          </div>

          <div className="grid grid-cols-2 gap-x-6 gap-y-4 mb-6">
            <InputField label="Enrollment Date" type="date" name="enrollmentDate" value={formData.enrollmentDate} onChange={handleChange} />
            <div className="flex flex-col gap-1">
              <label className="text-sm font-medium text-gray-700">Status</label>
              <select name="status" value={formData.status} onChange={handleChange} className="border border-gray-300 px-3 py-2 rounded-md bg-gray-50 focus:bg-white focus:outline-none focus:border-indigo-500 text-sm">
                <option value="ACTIVE">ACTIVE</option>
                <option value="COMPLETED">COMPLETED</option>
                <option value="DROPPED">DROPPED</option>
              </select>
            </div>
            <InputField label="Initial Grade (Optional)" type="text" name="grade" value={formData.grade} onChange={handleChange} />
          </div>
        </div>
      </div>

      <div className="fixed bottom-0 right-0 left-64 bg-white border-t border-gray-200 p-4 flex justify-between items-center z-10">
        <div className="flex items-center gap-4 text-sm text-gray-500 ml-8">
          <span>Complete all required fields (*)</span>
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