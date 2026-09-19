import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { User, Mail } from 'lucide-react';
import api from '../../services/api';
import StatusBadge from '../../components/common/StatusBadge';

export default function ViewStudent() {
  const { id } = useParams();
  const [student, setStudent] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchStudent = async () => {
      try {
        setIsLoading(true);
        const response = await api.get(`/students/${id}`);
        setStudent(response.data);
      } catch (err) {
        setError("Could not load student details.");
      } finally {
        setIsLoading(false);
      }
    };
    if (id) fetchStudent();
  }, [id]);

  if (isLoading) return <div className="p-12 text-center text-gray-400">Loading...</div>;
  if (error || !student) return <div className="p-4 text-red-600">{error || "Not found"}</div>;

  return (
    <div className="flex flex-col gap-6 max-w-4xl mx-auto font-sans pb-12">
      <div className="flex justify-between items-center border-b border-gray-200 pb-4">
        <div className="text-sm text-gray-500">
          <Link to="/students" className="hover:underline text-indigo-600">Students</Link> / <span className="font-medium text-gray-900">{student.registrationNumber}</span>
        </div>
      </div>

      <div className="flex items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">{student.firstName} {student.lastName}</h1>
          <span className="bg-gray-100 text-gray-600 px-2 py-0.5 rounded text-sm font-bold border border-gray-200 mt-2 inline-block">{student.registrationNumber}</span>
        </div>
      </div>

      <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-6 mt-2">
        <h2 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-4 flex items-center justify-between">
          Personal Information <User size={16} />
        </h2>
        <div className="grid grid-cols-2 gap-y-6">
          <div>
            <div className="text-xs font-bold text-gray-500 uppercase">First Name</div>
            <div className="text-sm font-medium text-gray-900 mt-1">{student.firstName}</div>
          </div>
          <div>
            <div className="text-xs font-bold text-gray-500 uppercase">Last Name</div>
            <div className="text-sm font-medium text-gray-900 mt-1">{student.lastName}</div>
          </div>
          <div>
            <div className="text-xs font-bold text-gray-500 uppercase">Date of Birth</div>
            <div className="text-sm font-medium text-gray-900 mt-1">{student.dateOfBirth || '-'}</div>
          </div>
          <div className="bg-gray-50 p-3 rounded-lg border border-gray-100 flex justify-between items-center">
            <div>
              <div className="text-xs font-bold text-gray-500 uppercase">Email Address</div>
              <div className="text-sm font-medium text-indigo-600 mt-1">{student.email}</div>
            </div>
            <Mail size={16} className="text-gray-400" />
          </div>
        </div>
      </div>

      <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden mt-2">
        <div className="p-6 border-b border-gray-200 flex justify-between items-center">
          <h2 className="text-base font-bold text-gray-900">Enrolled Courses</h2>
          <Link to="/enrollments/new" className="text-xs font-medium text-indigo-600 hover:underline">
            + Enroll in Course
          </Link>
        </div>
        {(!student.enrolledCourses || student.enrolledCourses.length === 0) ? (
          <div className="p-6 text-center text-sm text-gray-500">No course enrollments found for this student.</div>
        ) : (
          <table className="w-full text-left border-collapse">
            <thead className="bg-gray-50 text-xs font-semibold text-gray-500 uppercase border-b border-gray-200">
              <tr>
                <th className="px-6 py-3">Code</th>
                <th className="px-6 py-3">Course Name</th>
                <th className="px-6 py-3">Status</th>
                <th className="px-6 py-3">Grade</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 text-sm">
              {student.enrolledCourses.map((c, i) => (
                <tr key={i} className="hover:bg-gray-50">
                  <td className="px-6 py-3 font-bold text-indigo-600">{c.courseCode}</td>
                  <td className="px-6 py-3 text-gray-900">{c.courseName}</td>
                  <td className="px-6 py-3">
                    <StatusBadge status={c.status} />
                  </td>
                  <td className="px-6 py-3 font-semibold">{c.grade || '-'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}