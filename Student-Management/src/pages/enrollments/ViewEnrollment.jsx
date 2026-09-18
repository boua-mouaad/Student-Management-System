import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import api from '../../services/api';

export default function ViewEnrollment() {
  const { id } = useParams();
  const [enrollment, setEnrollment] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchEnrollment = async () => {
      try {
        setIsLoading(true);
        const response = await api.get(`/enrollments/${id}`);
        setEnrollment(response.data);
      } catch (err) {
        setError("Could not load enrollment details.");
      } finally {
        setIsLoading(false);
      }
    };
    if (id) fetchEnrollment();
  }, [id]);

  if (isLoading) return <div className="p-12 text-center text-gray-400">Loading...</div>;
  if (error || !enrollment) return <div className="p-4 text-red-600">{error || "Not found"}</div>;

  return (
    <div className="flex flex-col gap-6 max-w-4xl mx-auto font-sans pb-12">
      <div className="flex justify-between items-start border-b border-gray-200 pb-4">
        <div>
          <div className="text-sm text-gray-500 flex items-center gap-2 mb-2">
            <Link to="/enrollments" className="hover:underline">Enrollments</Link> / 
            <span className="font-medium text-gray-900">{id}</span>
          </div>
          <h1 className="text-3xl font-bold text-gray-900 leading-tight">Enrollment Record #{id}</h1>
          <span className="bg-gray-100 px-3 py-1 rounded-full text-xs font-bold border mt-2 inline-block">{enrollment.status}</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
        <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-6">
          <h2 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-4">Student Info</h2>
          <div className="text-base font-bold text-gray-900">{enrollment.student?.firstName} {enrollment.student?.lastName}</div>
          <div className="text-sm text-gray-500 mt-1">{enrollment.student?.registrationNumber}</div>
        </div>

        <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-6">
          <h2 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-4">Course Info</h2>
          <div className="text-base font-bold text-gray-900">{enrollment.course?.courseCode}</div>
          <div className="text-sm text-gray-500 mt-1">{enrollment.course?.courseName}</div>
        </div>
      </div>

      <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-6">
        <div className="grid grid-cols-2 gap-6">
          <div>
            <div className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">Enrollment Date</div>
            <div className="text-sm font-bold text-gray-900">{enrollment.enrollmentDate}</div>
          </div>
          <div>
            <div className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">Assigned Grade</div>
            <div className="text-2xl font-bold text-indigo-700">{enrollment.grade || 'N/A'}</div>
          </div>
        </div>
      </div>
    </div>
  );
}