import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import api from '../../services/api';
import StatusBadge from '../../components/common/StatusBadge';
import Button from '../../components/common/Button';

export default function ViewEnrollment() {
  const { id } = useParams();
  const [enrollment, setEnrollment] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [newGrade, setNewGrade] = useState('');
  const [isUpdatingGrade, setIsUpdatingGrade] = useState(false);
  const [gradeSuccess, setGradeSuccess] = useState('');

  const fetchEnrollment = async () => {
    try {
      setIsLoading(true);
      const response = await api.get(`/enrollments/${id}`);
      setEnrollment(response.data);
      if (response.data.grade) {
        setNewGrade(response.data.grade);
      }
    } catch (err) {
      setError("Could not load enrollment details.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (id) fetchEnrollment();
  }, [id]);

  const handleUpdateGrade = async (e) => {
    e.preventDefault();
    if (!newGrade.trim()) return;

    setIsUpdatingGrade(true);
    setGradeSuccess('');
    setError(null);

    try {
      const res = await api.put(`/enrollments/${id}/grade`, { grade: newGrade.trim() });
      setEnrollment(res.data);
      setGradeSuccess('Grade successfully updated!');
      setTimeout(() => setGradeSuccess(''), 3000);
    } catch (err) {
      setError("Failed to update grade.");
    } finally {
      setIsUpdatingGrade(false);
    }
  };

  if (isLoading) return <div className="p-12 text-center text-gray-400">Loading...</div>;
  if (error && !enrollment) return <div className="p-4 text-red-600">{error || "Not found"}</div>;

  const studentDisplayName = enrollment.studentName || (enrollment.student ? `${enrollment.student.firstName} ${enrollment.student.lastName}` : `Student #${enrollment.studentId}`);
  const regNo = enrollment.registrationNumber || enrollment.student?.registrationNumber || `ID: ${enrollment.studentId}`;
  const courseDisplayCode = enrollment.courseCode || enrollment.course?.courseCode || `Course #${enrollment.courseId}`;
  const courseDisplayName = enrollment.courseName || enrollment.course?.courseName || '';

  return (
    <div className="flex flex-col gap-6 max-w-4xl mx-auto font-sans pb-12">
      <div className="flex justify-between items-start border-b border-gray-200 pb-4">
        <div>
          <div className="text-sm text-gray-500 flex items-center gap-2 mb-2">
            <Link to="/enrollments" className="hover:underline text-indigo-600">Enrollments</Link> / 
            <span className="font-medium text-gray-900">#{id}</span>
          </div>
          <h1 className="text-3xl font-bold text-gray-900 leading-tight">Enrollment Record #{id}</h1>
          <div className="mt-2">
            <StatusBadge status={enrollment.status} />
          </div>
        </div>
      </div>

      {error && (
        <div className="p-3 bg-red-50 text-red-600 rounded-lg text-sm border border-red-100">
          {error}
        </div>
      )}

      {gradeSuccess && (
        <div className="p-3 bg-green-50 text-green-700 rounded-lg text-sm border border-green-200">
          {gradeSuccess}
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-2">
        <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-6">
          <h2 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-4">Student Info</h2>
          <div className="text-base font-bold text-gray-900">{studentDisplayName}</div>
          <div className="text-sm text-gray-500 mt-1">{regNo}</div>
          {enrollment.studentId && (
            <Link to={`/students/${enrollment.studentId}`} className="text-xs text-indigo-600 hover:underline mt-3 inline-block font-medium">
              View Student Profile →
            </Link>
          )}
        </div>

        <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-6">
          <h2 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-4">Course Info</h2>
          <div className="text-base font-bold text-gray-900">{courseDisplayCode}</div>
          <div className="text-sm text-gray-500 mt-1">{courseDisplayName}</div>
          {enrollment.courseId && (
            <Link to={`/courses/${enrollment.courseId}`} className="text-xs text-indigo-600 hover:underline mt-3 inline-block font-medium">
              View Course Details →
            </Link>
          )}
        </div>
      </div>

      <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
          <div>
            <div className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">Enrollment Date</div>
            <div className="text-sm font-bold text-gray-900">{enrollment.enrollmentDate}</div>
            
            <div className="text-xs font-bold text-gray-400 uppercase tracking-wider mt-4 mb-1">Current Grade</div>
            <div className="text-2xl font-bold text-indigo-700">{enrollment.grade || 'Not Graded'}</div>
          </div>

          <form onSubmit={handleUpdateGrade} className="bg-gray-50 p-4 rounded-lg border border-gray-200">
            <h3 className="text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">Assign or Update Grade</h3>
            <div className="flex gap-2">
              <input
                type="text"
                placeholder="e.g. A, B+, 92"
                value={newGrade}
                onChange={(e) => setNewGrade(e.target.value)}
                className="flex-1 border border-gray-300 px-3 py-2 rounded-md bg-white text-sm focus:outline-none focus:border-indigo-500"
                required
              />
              <Button
                type="submit"
                text={isUpdatingGrade ? "Saving..." : "Save Grade"}
                disabled={isUpdatingGrade}
                className="px-4 py-2 text-sm whitespace-nowrap"
              />
            </div>
            <p className="text-[11px] text-gray-500 mt-2">Saving a grade marks the enrollment as COMPLETED.</p>
          </form>
        </div>
      </div>
    </div>
  );
}