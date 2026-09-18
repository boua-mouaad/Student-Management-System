import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  User, 
  MapPin, 
  Phone, 
  BookOpen, 
  Calendar, 
  CheckCircle, 
  Save, 
  AlertCircle
} from 'lucide-react';
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
    dateOfBirth: '',
    email: '',
    phoneNumber: '',
    addressStreet: '',
    addressCity: '',
    addressState: '',
    addressZip: '',
    program: 'Computer Science B.S.',
    academicYear: 'Freshman',
    advisor: '',
    enrollmentStatus: 'Active',
    expectedGraduation: ''
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
      navigate(`/students/${response.data.studentId || response.data.id}`);
    } catch (err) {
      setError("Failed to create student record. Please verify the provided information.");
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex flex-col gap-6 max-w-7xl mx-auto font-sans pb-24">
      <div className="flex justify-between items-end">
        <div>
          <div className="text-sm font-bold text-gray-500 tracking-wider uppercase mb-1 flex items-center gap-2">
            <Link to="/students" className="hover:underline text-indigo-600">Directory</Link> &gt; 
            Add New Student
          </div>
          <div className="flex items-center gap-3 mb-1">
            <h1 className="text-3xl font-bold text-gray-900 leading-tight">Student Registration</h1>
            <span className="bg-emerald-100 text-emerald-700 px-2 py-0.5 rounded text-xs font-bold border border-emerald-200 mt-1 flex items-center gap-1">
              <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full"></span> Active Term
            </span>
          </div>
          <p className="text-sm text-gray-500">Create a new institutional profile and establish academic ledger entries.</p>
        </div>
      </div>

      {error && (
        <div className="bg-red-50 text-red-600 border border-red-100 p-4 rounded-lg flex items-center gap-3 text-sm font-medium">
          <AlertCircle size={18} />
          {error}
        </div>
      )}

      <form id="student-form" onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 flex flex-col gap-6">
          
          <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-6">
            <div className="flex gap-3 mb-6">
              <div className="bg-indigo-50 p-2 rounded-lg text-indigo-600 h-fit"><User size={20} /></div>
              <div>
                <h2 className="text-lg font-bold text-gray-900">Personal Identity</h2>
                <p className="text-sm text-gray-500">Legal name and core demographic markers</p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-4">
              <InputField label="First Name *" name="firstName" value={formData.firstName} onChange={handleChange} required />
              <InputField label="Last Name *" name="lastName" value={formData.lastName} onChange={handleChange} required />
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <InputField label="Date of Birth *" type="date" name="dateOfBirth" value={formData.dateOfBirth} onChange={handleChange} required />
              <InputField label="Expected Graduation Term" name="expectedGraduation" placeholder="e.g. Spring 2029" value={formData.expectedGraduation} onChange={handleChange} />
            </div>
          </div>

          <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-6">
            <div className="flex gap-3 mb-6">
              <div className="bg-emerald-50 p-2 rounded-lg text-emerald-600 h-fit"><BookOpen size={20} /></div>
              <div>
                <h2 className="text-lg font-bold text-gray-900">Academic Trajectory</h2>
                <p className="text-sm text-gray-500">Program alignment and advising assignments</p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-4">
              <div className="flex flex-col gap-1">
                <label className="text-sm font-medium text-gray-700">Academic Program *</label>
                <select name="program" value={formData.program} onChange={handleChange} className="border border-gray-300 px-3 py-2 rounded-md bg-gray-50 focus:bg-white focus:outline-none focus:border-indigo-500 text-sm">
                  <option value="Computer Science B.S.">Computer Science B.S.</option>
                  <option value="Software Engineering B.S.">Software Engineering B.S.</option>
                  <option value="Data Science B.S.">Data Science B.S.</option>
                  <option value="Mathematics B.S.">Mathematics B.S.</option>
                  <option value="Undeclared">Undeclared</option>
                </select>
              </div>
              <div className="flex flex-col gap-1">
                <label className="text-sm font-medium text-gray-700">Academic Year *</label>
                <select name="academicYear" value={formData.academicYear} onChange={handleChange} className="border border-gray-300 px-3 py-2 rounded-md bg-gray-50 focus:bg-white focus:outline-none focus:border-indigo-500 text-sm">
                  <option value="Freshman">Freshman</option>
                  <option value="Sophomore">Sophomore</option>
                  <option value="Junior">Junior</option>
                  <option value="Senior">Senior</option>
                  <option value="Graduate">Graduate</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <InputField label="Primary Academic Advisor" name="advisor" placeholder="e.g. Dr. Alan Turing" value={formData.advisor} onChange={handleChange} />
              <div className="flex flex-col gap-1">
                <label className="text-sm font-medium text-gray-700">Initial Enrollment Status</label>
                <select name="enrollmentStatus" value={formData.enrollmentStatus} onChange={handleChange} className="border border-gray-300 px-3 py-2 rounded-md bg-gray-50 focus:bg-white focus:outline-none focus:border-indigo-500 text-sm">
                  <option value="Active">Active</option>
                  <option value="Pending">Pending</option>
                  <option value="Deferred">Deferred</option>
                </select>
              </div>
            </div>
          </div>

          <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-6">
            <div className="flex gap-3 mb-6">
              <div className="bg-blue-50 p-2 rounded-lg text-blue-600 h-fit"><Phone size={20} /></div>
              <div>
                <h2 className="text-lg font-bold text-gray-900">Contact & Residential Details</h2>
                <p className="text-sm text-gray-500">Communication endpoints and physical addresses</p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-4">
              <InputField label="Personal Email" type="email" name="email" value={formData.email} onChange={handleChange} />
              <InputField label="Mobile Phone" type="tel" name="phoneNumber" value={formData.phoneNumber} onChange={handleChange} />
            </div>

            <InputField label="Street Address" name="addressStreet" value={formData.addressStreet} onChange={handleChange} />
            
            <div className="grid grid-cols-3 gap-4 mt-4">
              <div className="col-span-2">
                <InputField label="City" name="addressCity" value={formData.addressCity} onChange={handleChange} />
              </div>
              <InputField label="Zip Code" name="addressZip" value={formData.addressZip} onChange={handleChange} />
            </div>
          </div>
        </div>

        <div className="lg:col-span-1 flex flex-col gap-6">
          <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-5">
            <h2 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-4">Profile Generation Checks</h2>
            
            <div className="flex flex-col gap-3">
              <div className="flex gap-2">
                <CheckCircle size={16} className="text-emerald-500 flex-shrink-0 mt-0.5" />
                <span className="text-sm font-medium text-gray-700">Unique Institutional ID will be generated</span>
              </div>
              <div className="flex gap-2">
                <CheckCircle size={16} className="text-emerald-500 flex-shrink-0 mt-0.5" />
                <span className="text-sm font-medium text-gray-700">University email address will be provisioned</span>
              </div>
              <div className="flex gap-2">
                <CheckCircle size={16} className="text-emerald-500 flex-shrink-0 mt-0.5" />
                <span className="text-sm font-medium text-gray-700">Financial ledger account initialized</span>
              </div>
            </div>
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