import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { User, CheckCircle, AlertCircle } from 'lucide-react';
import InputField from '../../components/common/InputField';
import Button from '../../components/common/Button';
import api from '../../services/api';

export default function AddStudent() {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    dateOfBirth: '',
    registrationNumber: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      const response = await api.post('/students', formData);
      navigate(`/students/${response.data.id}`);
    } catch (err) {
      setError("Failed to create student record. Please verify the provided information.");
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex flex-col gap-6 max-w-4xl mx-auto font-sans pb-24">
      <div className="flex justify-between items-end">
        <div>
          <div className="text-sm font-bold text-gray-500 tracking-wider uppercase mb-1 flex items-center gap-2">
            <Link to="/students" className="hover:underline text-indigo-600">Directory</Link> &gt; 
            Add New Student
          </div>
          <h1 className="text-3xl font-bold text-gray-900 leading-tight">Student Registration</h1>
        </div>
      </div>

      {error && (
        <div className="bg-red-50 text-red-600 border border-red-100 p-4 rounded-lg flex items-center gap-3 text-sm font-medium">
          <AlertCircle size={18} />
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="flex flex-col gap-6">
        <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-6">
          <div className="flex gap-3 mb-6">
            <div className="bg-indigo-50 p-2 rounded-lg text-indigo-600 h-fit"><User size={20} /></div>
            <div>
              <h2 className="text-lg font-bold text-gray-900">Personal & Academic Identity</h2>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 mb-4">
            <InputField label="First Name *" name="firstName" value={formData.firstName} onChange={handleChange} required />
            <InputField label="Last Name *" name="lastName" value={formData.lastName} onChange={handleChange} required />
          </div>
          
          <div className="grid grid-cols-2 gap-4 mb-4">
            <InputField label="Email Address *" type="email" name="email" value={formData.email} onChange={handleChange} required />
            <InputField label="Date of Birth *" type="date" name="dateOfBirth" value={formData.dateOfBirth} onChange={handleChange} required />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <InputField label="Registration Number *" name="registrationNumber" value={formData.registrationNumber} onChange={handleChange} required />
          </div>
        </div>
      </form>

      <div className="fixed bottom-0 right-0 left-64 bg-white border-t border-gray-200 p-4 flex justify-between items-center z-10">
        <div className="flex items-center gap-4 text-sm text-gray-500 ml-8">
          <span>Complete all required fields (*)</span>
        </div>
        <div className="flex gap-3 mr-8">
          <Link to="/students" className="px-4 py-2 bg-white border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50">
            Cancel
          </Link>
          <Button 
            text={isSubmitting ? "Processing..." : "Create Student Record"} 
            className={`flex items-center gap-2 px-6 ${isSubmitting ? 'opacity-70 cursor-not-allowed' : ''}`} 
            onClick={handleSubmit}
            disabled={isSubmitting}
          />
        </div>
      </div>
    </div>
  );
}