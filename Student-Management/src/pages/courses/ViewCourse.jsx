import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import api from '../../services/api';

export default function ViewCourse() {
  const { id } = useParams();
  const [course, setCourse] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        setIsLoading(true);
        const response = await api.get(`/courses/${id}`);
        setCourse(response.data);
      } catch (err) {
        setError("Could not load course details.");
      } finally {
        setIsLoading(false);
      }
    };
    if (id) fetchCourse();
  }, [id]);

  if (isLoading) return <div className="p-12 text-center text-gray-400">Loading...</div>;
  if (error || !course) return <div className="p-4 text-red-600">{error || "Not found"}</div>;

  return (
    <div className="flex flex-col gap-6 max-w-4xl mx-auto font-sans pb-12">
      <div className="flex justify-between items-center border-b border-gray-200 pb-4">
        <div className="text-sm text-gray-500">
          <Link to="/courses" className="hover:underline">Courses</Link> / <span className="font-medium text-gray-900">{course.courseCode}</span>
        </div>
      </div>

      <div>
        <span className="bg-indigo-50 text-indigo-700 px-2 py-0.5 rounded text-xs font-bold border border-indigo-100 uppercase mb-2 inline-block">{course.courseCode}</span>
        <h1 className="text-3xl font-bold text-gray-900 leading-tight">{course.courseName}</h1>
      </div>

      <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-6 mt-4">
        <div className="grid grid-cols-2 gap-y-6">
          <div>
            <div className="text-xs font-bold text-gray-500 uppercase">Course Code</div>
            <div className="text-sm font-medium text-gray-900 mt-1">{course.courseCode}</div>
          </div>
          <div>
            <div className="text-xs font-bold text-gray-500 uppercase">Credits</div>
            <div className="text-sm font-medium text-gray-900 mt-1">{course.credits} CR</div>
          </div>
          <div className="col-span-2">
            <div className="text-xs font-bold text-gray-500 uppercase">Description</div>
            <div className="text-sm text-gray-700 mt-2 bg-gray-50 p-4 rounded-lg">{course.description || 'No description provided.'}</div>
          </div>
        </div>
      </div>
    </div>
  );
}