import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  BookOpen, 
  Calendar, 
  Clock, 
  MapPin, 
  CheckCircle, 
  Save,
  AlertCircle
} from 'lucide-react';
import InputField from '../../components/common/InputField';
import Button from '../../components/common/Button';
import api from '../../services/api';

export default function AddCourse() {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);

  const [formData, setFormData] = useState({
    courseCode: '',
    department: 'Computer Science & Engineering',
    courseTitle: '',
    abstract: '',
    credits: '',
    maxSeats: '',
    term: 'Spring 2025',
    instructor: '',
    startTime: '',
    endTime: '',
    startDate: '',
    endDate: '',
    facility: ''
  });

  const [selectedDays, setSelectedDays] = useState(['Mon', 'Wed', 'Fri']);
  const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  const toggleDay = (day) => {
    if (selectedDays.includes(day)) {
      setSelectedDays(selectedDays.filter(d => d !== day));
    } else {
      setSelectedDays([...selectedDays, day]);
    }
  };

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
        meetingDays: selectedDays.join(', ')
      };
      const response = await api.post('/courses', payload);
      navigate(`/courses/${response.data.id || response.data.code?.replace(' ', '')}`);
    } catch (err) {
      setError("Failed to create course record. Please verify the provided information.");
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex flex-col gap-6 max-w-7xl mx-auto font-sans pb-24">
      <div className="flex justify-between items-end">
        <div>
          <div className="text-sm font-bold text-gray-500 tracking-wider uppercase mb-1 flex items-center gap-2">
            <Link to="/courses" className="hover:underline text-indigo-600">Courses</Link> &gt; 
            Add New Course &gt; 
            <span className="text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded text-[10px]">NEW DRAFT</span>
          </div>
          <div className="flex items-center gap-3 mb-1">
            <h1 className="text-3xl font-bold text-gray-900 leading-tight">Add Course</h1>
            <span className="bg-emerald-100 text-emerald-700 px-2 py-0.5 rounded text-xs font-bold border border-emerald-200 mt-1 flex items-center gap-1">
              <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full"></span> Registrar Ready
            </span>
          </div>
          <p className="text-sm text-gray-500 flex items-center gap-1.5">
            <Clock size={14} /> Editing new course in current draft buffer.
          </p>
        </div>
        
        <div className="flex gap-3 text-sm font-medium">
          <button className="text-gray-500 hover:text-gray-900 px-2">Clear Form</button>
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
              <div className="flex gap-3">
                <div className="bg-indigo-50 p-2 rounded-lg text-indigo-600 h-fit"><BookOpen size={20} /></div>
                <div>
                  <h2 className="text-lg font-bold text-gray-900">Course Identity</h2>
                  <p className="text-sm text-gray-500">Core identifier codes, department affiliation, and catalog overview</p>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-4">
              <div>
                <InputField label="Course Code *" name="courseCode" value={formData.courseCode} onChange={handleChange} required />
                <p className="text-xs text-gray-400 -mt-2">Unique academic shorthand within catalog</p>
              </div>
              <div>
                <div className="flex flex-col gap-1 mb-4">
                  <label className="text-sm font-medium text-gray-700">Department *</label>
                  <select name="department" value={formData.department} onChange={handleChange} className="border border-gray-300 px-3 py-2 rounded-md bg-gray-50 focus:bg-white focus:outline-none focus:border-indigo-500 text-sm">
                    <option value="Computer Science & Engineering">Computer Science & Engineering</option>
                    <option value="Mathematics">Mathematics</option>
                    <option value="Biology">Biology</option>
                    <option value="Physics">Physics</option>
                    <option value="History">History</option>
                  </select>
                </div>
                <p className="text-xs text-gray-400 -mt-4">Responsible academic division</p>
              </div>
            </div>

            <InputField label="Course Title *" name="courseTitle" value={formData.courseTitle} onChange={handleChange} required />
            
            <div className="flex flex-col gap-1 mt-4">
              <div className="flex justify-between items-center">
                <label className="text-sm font-medium text-gray-700">Syllabus Abstract & Catalog Description</label>
                <span className="text-xs text-gray-400">{formData.abstract.length} / 500 chars</span>
              </div>
              <textarea 
                name="abstract"
                value={formData.abstract}
                onChange={handleChange}
                rows="4"
                maxLength="500"
                className="border border-gray-300 px-3 py-2 rounded-md bg-gray-50 focus:bg-white focus:outline-none focus:border-indigo-500 text-sm resize-none"
              ></textarea>
            </div>
          </div>

          <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-6">
            <div className="flex justify-between items-start mb-6">
              <div className="flex gap-3">
                <div className="bg-emerald-50 p-2 rounded-lg text-emerald-600 h-fit"><Calendar size={20} /></div>
                <div>
                  <h2 className="text-lg font-bold text-gray-900">Curriculum, Instructor & Schedule</h2>
                  <p className="text-sm text-gray-500">Seat limits, pedagogical lead, weekly recurrence pattern, and facility location</p>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4 mb-6">
              <InputField label="Credit Hours *" type="number" name="credits" value={formData.credits} onChange={handleChange} required />
              <InputField label="Max Seat Limit *" type="number" name="maxSeats" value={formData.maxSeats} onChange={handleChange} required />
              <div className="flex flex-col gap-1">
                <label className="text-sm font-medium text-gray-700">Academic Term *</label>
                <select name="term" value={formData.term} onChange={handleChange} className="border border-gray-300 px-3 py-2 rounded-md bg-gray-50 focus:bg-white focus:outline-none focus:border-indigo-500 text-sm">
                  <option value="Spring 2025">Spring 2025</option>
                  <option value="Fall 2025">Fall 2025</option>
                </select>
              </div>
            </div>

            <div className="flex flex-col gap-1 mb-6">
              <InputField label="Primary Faculty Instructor *" name="instructor" value={formData.instructor} onChange={handleChange} required />
            </div>

            <div className="border-t border-gray-100 pt-6">
              <label className="text-sm font-medium text-gray-700 mb-2 block">Weekly Lecture Days</label>
              <div className="flex gap-2 mb-6">
                {daysOfWeek.map((day) => (
                  <button 
                    key={day}
                    type="button"
                    onClick={() => toggleDay(day)}
                    className={`flex-1 py-2 text-sm font-medium rounded border transition-colors ${
                      selectedDays.includes(day) 
                        ? 'bg-indigo-600 text-white border-indigo-600' 
                        : 'bg-white text-gray-600 border-gray-300 hover:bg-gray-50'
                    }`}
                  >
                    {day}
                  </button>
                ))}
              </div>

              <div className="grid grid-cols-2 gap-4 mb-4">
                <div className="grid grid-cols-2 gap-2">
                  <InputField label="Start Time" type="time" name="startTime" value={formData.startTime} onChange={handleChange} />
                  <InputField label="End Time" type="time" name="endTime" value={formData.endTime} onChange={handleChange} />
                </div>
                <InputField label="Facility & Room" name="facility" value={formData.facility} onChange={handleChange} />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <InputField label="Term Start Date" type="date" name="startDate" value={formData.startDate} onChange={handleChange} />
                <InputField label="Term End Date" type="date" name="endDate" value={formData.endDate} onChange={handleChange} />
              </div>
            </div>
          </div>
        </div>

        <div className="lg:col-span-1 flex flex-col gap-6">
          <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden flex flex-col">
            <div className="flex justify-between items-center p-4 border-b border-gray-100">
              <h2 className="text-xs font-bold text-gray-400 uppercase tracking-wider">Roster Card Preview</h2>
              <span className="flex items-center gap-1 text-[10px] font-bold text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded uppercase">
                <span className="w-1.5 h-1.5 bg-indigo-500 rounded-full"></span> Auto-Syncing
              </span>
            </div>
            
            <div className="relative h-32 bg-gray-200">
              <div className="absolute inset-0 bg-linear-to-t from-gray-900/60 to-transparent flex items-end p-3">
                <div className="flex gap-2">
                  <span className="bg-white/90 text-indigo-900 text-[10px] font-bold px-2 py-0.5 rounded backdrop-blur-sm shadow-sm">{formData.courseCode || 'XXX 000'} • {formData.credits || '0'} CR</span>
                  <span className="bg-white/90 text-gray-700 text-[10px] font-bold px-2 py-0.5 rounded backdrop-blur-sm shadow-sm flex items-center gap-1"><MapPin size={10} /> {formData.facility || 'TBA'}</span>
                </div>
              </div>
            </div>
            
            <div className="p-4">
              <h3 className="text-base font-bold text-gray-900 truncate">{formData.courseTitle || 'Untitled Course'}</h3>
              <p className="text-xs text-gray-500 mt-1 line-clamp-2">{formData.abstract || 'No description provided.'}</p>
              
              <div className="mt-4 pt-4 border-t border-gray-100">
                <div className="flex justify-between items-center text-xs mb-1">
                  <span className="text-gray-500">Class Capacity</span>
                  <span className="font-bold text-gray-900">0 / {formData.maxSeats || 0} Enrolled</span>
                </div>
                <div className="w-full bg-gray-100 rounded-full h-1.5 mb-2"><div className="bg-indigo-600 h-1.5 rounded-full w-[0%]"></div></div>
              </div>

              <div className="mt-4 space-y-2 text-xs">
                <div className="flex justify-between">
                  <span className="text-gray-500">Primary Faculty</span>
                  <span className="font-medium text-gray-900">{formData.instructor || 'TBA'}</span>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-5">
            <h2 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-4">Catalog Prerequisites</h2>
            
            <div className="flex flex-col gap-3">
              <div className="flex gap-2">
                <CheckCircle size={16} className="text-emerald-500 shrink-0 mt-0.5" />
                <span className="text-sm font-medium text-gray-700">Course namespace validated</span>
              </div>
              <div className="flex gap-2">
                <CheckCircle size={16} className="text-emerald-500 shrink-0 mt-0.5" />
                <span className="text-sm font-medium text-gray-700">Schedule format verified</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="fixed bottom-0 right-0 left-64 bg-white border-t border-gray-200 p-4 flex justify-between items-center z-10">
        <div className="flex items-center gap-4 text-sm text-gray-500 ml-8">
          <span>Complete all required fields (*)</span>
        </div>
        <div className="flex gap-3 mr-8">
          <Link to="/courses" className="px-4 py-2 bg-white border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50">
            Cancel
          </Link>
          <Button 
            text={isSubmitting ? "Saving..." : "Save & Publish Course"} 
            className={`flex items-center gap-2 ${isSubmitting ? 'opacity-70 cursor-not-allowed' : ''}`}
            onClick={handleSubmit}
            disabled={isSubmitting}
          />
        </div>
      </div>

    </div>
  );
}