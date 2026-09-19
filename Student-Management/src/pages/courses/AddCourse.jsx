import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { BookOpen, AlertCircle } from 'lucide-react';
import InputField from '../../components/common/InputField';
import Button from '../../components/common/Button';
import api from '../../services/api';

export default function AddCourse() {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);

  const [formData, setFormData] = useState({
    courseCode: '',
    courseName: '',
    description: '',
    credits: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      const payload = {
        ...formData,
        credits: parseInt(formData.credits, 10) || 1
      };
      const response = await api.post('/courses', payload);
      navigate(`/courses/${response.data.id}`);
    } catch (err) {
      const msg = err.response?.data?.message || "Failed to create course record.";
      setError(msg);
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex flex-col gap-6 max-w-4xl mx-auto font-sans pb-24">
      <div className="flex justify-between items-end">
        <div>
          <div className="text-sm font-bold text-gray-500 tracking-wider uppercase mb-1 flex items-center gap-2">
            <Link to="/courses" className="hover:underline text-indigo-600">Courses</Link> &gt; 
            Add New Course
          </div>
          <h1 className="text-3xl font-bold text-gray-900 leading-tight">Add Course</h1>
        </div>
      </div>

      {error && (
        <div className="bg-red-50 text-red-600 border border-red-100 p-4 rounded-lg flex items-center gap-3 text-sm font-medium">
          <AlertCircle size={18} />
          {error}
        </div>
      )}

      <form id="course-form" onSubmit={handleSubmit} className="flex flex-col gap-6">
        <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-6">
          <div className="flex gap-3 mb-6">
            <div className="bg-indigo-50 p-2 rounded-lg text-indigo-600 h-fit"><BookOpen size={20} /></div>
            <div>
              <h2 className="text-lg font-bold text-gray-900">Course Identity</h2>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 mb-4">
            <InputField label="Course Code *" name="courseCode" value={formData.courseCode} onChange={handleChange} required />
            <InputField label="Credits *" type="number" name="credits" value={formData.credits} onChange={handleChange} required />
          </div>

          <InputField label="Course Name *" name="courseName" value={formData.courseName} onChange={handleChange} required />
          
          <div className="flex flex-col gap-1 mt-4">
            <label className="text-sm font-medium text-gray-700">Course Description</label>
            <textarea 
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows="4"
              maxLength="1000"
              className="border border-gray-300 px-3 py-2 rounded-md bg-gray-50 focus:bg-white focus:outline-none focus:border-indigo-500 text-sm resize-none"
            ></textarea>
          </div>
        </div>
      </form>

      <div className="fixed bottom-0 right-0 left-64 bg-white border-t border-gray-200 p-4 flex justify-between items-center z-10">
        <div className="flex items-center gap-4 text-sm text-gray-500 ml-8">
          <span>Complete all required fields (*)</span>
        </div>
        <div className="flex gap-3 mr-8">
          <Link to="/courses" className="px-4 py-2 bg-white border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50">
            Cancel
          </Link>
          <Button 
            type="submit"
            form="course-form"
            text={isSubmitting ? "Saving..." : "Save Course"} 
            className={`flex items-center gap-2 ${isSubmitting ? 'opacity-70 cursor-not-allowed' : ''}`}
            disabled={isSubmitting}
          />
        </div>
      </div>
    </div>
  );
}