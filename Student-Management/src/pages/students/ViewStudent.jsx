import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { 
  Edit, 
  Printer, 
  Trash2, 
  Star, 
  CheckCircle, 
  User, 
  Mail, 
  Phone, 
  Building, 
  Map,
  BookOpen,
  DollarSign
} from 'lucide-react';
import StatusBadge from '../../components/common/StatusBadge';
import api from '../../services/api';

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

    if (id) {
      fetchStudent();
    }
  }, [id]);

  if (isLoading) {
    return (
      <div className="flex flex-col gap-6 max-w-7xl mx-auto font-sans pb-12 p-12 items-center justify-center text-gray-400">
        <span className="text-sm font-medium">Loading student record...</span>
      </div>
    );
  }

  if (error || !student) {
    return (
      <div className="flex flex-col gap-6 max-w-7xl mx-auto font-sans pb-12 p-4">
        <div className="p-4 bg-red-50 text-red-600 border border-red-100 rounded-lg text-sm font-medium">
          {error || "Student not found."}
        </div>
        <Link to="/students" className="text-indigo-600 hover:underline text-sm">← Back to Directory</Link>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6 max-w-7xl mx-auto font-sans pb-12">
      <div className="flex justify-between items-center border-b border-gray-200 pb-4">
        <div className="text-sm text-gray-500 flex items-center gap-2">
          <Link to="/students" className="hover:underline">Students</Link> / 
          <span className="font-medium text-gray-900">{student.studentId || id}</span> / 
          {student.firstName} {student.lastName}
        </div>
        <div className="flex items-center gap-2 text-xs text-gray-500">
          <span className="w-2 h-2 bg-green-500 rounded-full"></span>
          <span className="uppercase tracking-wider font-bold">Record Synchronized</span>
          <span>• Last updated recently</span>
        </div>
      </div>

      <div className="flex justify-between items-start">
        <div className="flex gap-6 items-center">
          <img 
            src={student.profileImageUrl || `https://ui-avatars.com/api/?name=${student.firstName}+${student.lastName}&background=4f46e5&color=fff&size=128`} 
            alt={`${student.firstName} ${student.lastName}`} 
            className="w-24 h-24 rounded-xl shadow-sm border border-gray-100"
          />
          <div>
            <div className="flex items-center gap-3 mb-1">
              <h1 className="text-3xl font-bold text-gray-900">{student.firstName} {student.lastName}</h1>
              <span className="bg-gray-100 text-gray-600 px-2 py-0.5 rounded text-sm font-bold border border-gray-200">{student.studentId || id}</span>
              <StatusBadge status={student.status || 'Active'} />
            </div>
            
            <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600 mt-2">
              <span>{student.program || 'Undeclared'}</span>
              <span className="text-gray-300">|</span>
              <span>{student.academicYear || 'Class details pending'}</span>
            </div>
            
            <div className="flex flex-wrap items-center gap-6 mt-3 text-sm font-medium">
              <span className="flex items-center gap-1.5 text-indigo-700 bg-indigo-50 px-2 py-1 rounded-md">
                <Star size={16} className="fill-indigo-700" /> {student.gpa || 'N/A'} Cumulative GPA
              </span>
              <span className="flex items-center gap-1.5 text-gray-700">
                <User size={16} className="text-gray-400" /> {student.advisor || 'Unassigned'} Advisor
              </span>
              <span className="flex items-center gap-1.5 text-green-700">
                <CheckCircle size={16} /> Full Standing
              </span>
            </div>
          </div>
        </div>
        
        <div className="flex gap-3">
          <button className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 shadow-sm">
            <Edit size={16} /> Edit Student
          </button>
          <button className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 shadow-sm">
            <Printer size={16} /> Print Transcript
          </button>
          <button className="flex items-center gap-2 px-4 py-2 bg-white border border-red-200 text-red-600 rounded-md text-sm font-medium hover:bg-red-50 shadow-sm">
            <Trash2 size={16} /> Delete Student
          </button>
        </div>
      </div>

      <div className="flex gap-8 border-b border-gray-200 mt-2">
        <button className="pb-3 border-b-2 border-indigo-600 text-indigo-600 font-bold text-sm flex items-center gap-2">
          <User size={16} /> Personal Info
        </button>
        <button className="pb-3 border-b-2 border-transparent text-gray-500 hover:text-gray-700 font-medium text-sm flex items-center gap-2">
          <BookOpen size={16} /> Enrolled Courses <span className="bg-gray-100 text-gray-600 py-0.5 px-2 rounded-full text-xs">{student.enrolledCoursesCount || 0}</span>
        </button>
        <button className="pb-3 border-b-2 border-transparent text-gray-500 hover:text-gray-700 font-medium text-sm flex items-center gap-2">
          <CheckCircle size={16} /> Grades & Academic History
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 flex flex-col gap-6">
          <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-6">
            <h2 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-4 flex items-center justify-between">
              Primary Demographics <User size={16} />
            </h2>
            <div className="grid grid-cols-2 gap-y-6">
              <div>
                <div className="text-xs font-bold text-gray-500 uppercase">Legal Full Name</div>
                <div className="text-sm font-medium text-gray-900 mt-1">{student.firstName} {student.middleName} {student.lastName}</div>
              </div>
              <div>
                <div className="text-xs font-bold text-gray-500 uppercase">Date of Birth</div>
                <div className="text-sm font-medium text-gray-900 mt-1">{student.dateOfBirth || 'Not provided'}</div>
              </div>
              
              <div className="bg-gray-50 p-3 rounded-lg border border-gray-100 flex justify-between items-center mr-4">
                <div>
                  <div className="text-xs font-bold text-gray-500 uppercase">Campus Email</div>
                  <div className="text-sm font-medium text-indigo-600 mt-1">{student.email || 'N/A'}</div>
                </div>
                <Mail size={16} className="text-gray-400" />
              </div>
              
              <div className="bg-gray-50 p-3 rounded-lg border border-gray-100 flex justify-between items-center ml-4">
                <div>
                  <div className="text-xs font-bold text-gray-500 uppercase">Mobile Phone</div>
                  <div className="text-sm font-medium text-gray-900 mt-1">{student.phoneNumber || 'N/A'}</div>
                </div>
                <Phone size={16} className="text-gray-400" />
              </div>
            </div>

            <div className="border-t border-gray-100 my-6"></div>

            <h2 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-4 flex items-center justify-between">
              Residential & Campus Housing <Building size={16} />
            </h2>
            <div className="grid grid-cols-2 gap-6">
              <div className="bg-gray-50 p-4 rounded-lg border border-gray-100">
                <div className="flex items-center gap-2 mb-2">
                  <Building size={18} className="text-indigo-600" />
                  <span className="font-bold text-gray-900">Campus Address</span>
                </div>
                <div className="text-sm text-gray-600 leading-relaxed mb-4">
                  {student.addressStreet || 'No street provided'}<br/>
                  {student.addressCity || 'No city'}, {student.addressState || 'No state'} {student.addressZip || ''}
                </div>
              </div>
              <div className="bg-gray-100 rounded-lg border border-gray-200 flex items-center justify-center relative overflow-hidden">
                <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>
                <div className="absolute bottom-0 left-0 right-0 bg-gray-900/70 text-white p-3 backdrop-blur-sm flex justify-between items-center">
                  <div>
                    <div className="text-sm font-bold">Location Data</div>
                    <div className="text-xs text-gray-300">Registered Address</div>
                  </div>
                  <Map size={24} className="text-indigo-300" />
                </div>
              </div>
            </div>

            <div className="border-t border-gray-100 my-6"></div>

            <h2 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-4 flex items-center justify-between">
              Emergency Contacts <Phone size={16} />
            </h2>
            <div className="grid grid-cols-2 gap-6">
              {student.emergencyContacts && student.emergencyContacts.length > 0 ? (
                student.emergencyContacts.map((contact, index) => (
                  <div key={index} className="flex justify-between items-center border border-gray-200 p-3 rounded-lg">
                    <div>
                      <div className="text-sm font-bold text-gray-900 flex items-center gap-2">{contact.name} <span className="bg-indigo-100 text-indigo-700 px-2 py-0.5 rounded text-[10px] uppercase">{contact.relation}</span></div>
                      <div className="text-sm text-gray-600 mt-1">{contact.phone}</div>
                      <div className="text-xs text-gray-400">{contact.email || 'No email provided'}</div>
                    </div>
                    <button className="text-gray-400 hover:text-indigo-600"><Phone size={18} /></button>
                  </div>
                ))
              ) : (
                <div className="col-span-2 text-sm text-gray-500">No emergency contacts listed.</div>
              )}
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-4">
          <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-5">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h2 className="text-base font-bold text-gray-900">Degree Progress</h2>
                <div className="text-xs text-gray-500">{student.program || 'Undeclared'}</div>
              </div>
              <span className="bg-indigo-50 text-indigo-700 font-bold px-2 py-1 rounded text-xs">{student.degreeProgressPercentage || 0}%</span>
            </div>
            
            <div className="flex items-center gap-4 mb-6">
              <div className="relative w-20 h-20 flex-shrink-0">
                <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
                  <path className="text-gray-100" strokeWidth="3" stroke="currentColor" fill="none" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
                  <path className="text-indigo-600" strokeDasharray={`${student.degreeProgressPercentage || 0}, 100`} strokeWidth="3" strokeLinecap="round" stroke="currentColor" fill="none" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className="text-lg font-bold text-gray-900 leading-none">{student.completedCredits || 0}</span>
                  <span className="text-[10px] text-gray-500">/ {student.totalRequiredCredits || 120}</span>
                </div>
              </div>
              <div className="flex flex-col gap-2 text-xs">
                <div className="flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-indigo-600"></span><span className="text-gray-600">Completed: {student.completedCredits || 0} Credits</span></div>
                <div className="flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-green-500"></span><span className="text-gray-600">Enrolled: {student.currentCredits || 0} Credits</span></div>
              </div>
            </div>
          </div>

          <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-4 flex gap-3 items-start">
            <div className="bg-indigo-50 p-2 rounded-lg text-indigo-600 mt-1"><BookOpen size={20} /></div>
            <div>
              <div className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">Current Semester Load</div>
              <div className="text-sm font-bold text-gray-900">{student.currentCredits || 0} Credits</div>
              <div className="text-xs text-gray-500 mt-1">Active Enrollment Status</div>
            </div>
          </div>

          <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-4 flex gap-3 items-start">
            <div className="bg-green-50 p-2 rounded-lg text-green-600 mt-1"><DollarSign size={20} /></div>
            <div>
              <div className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">Financial Clearance</div>
              <div className="text-sm font-bold text-gray-900 flex items-center gap-1">{student.financialStatus || 'Cleared'} <CheckCircle size={14} className="text-green-600" /></div>
            </div>
          </div>

          <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-5">
            <h2 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">Primary Academic Advisor</h2>
            <div className="flex gap-3 items-center mb-3">
              <img src={`https://ui-avatars.com/api/?name=${student.advisor?.replace(' ', '+') || 'Advisor'}&background=f3f4f6&color=374151`} className="w-10 h-10 rounded-full border border-gray-200" alt="Advisor" />
              <div>
                <div className="text-sm font-bold text-gray-900">{student.advisor || 'Unassigned'}</div>
                <div className="text-xs text-gray-500">Academic Advising</div>
              </div>
            </div>
          </div>

          <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-4 flex justify-between items-center">
            <div className="flex items-center gap-2">
              <CheckCircle size={18} className="text-gray-400" />
              <div>
                <div className="text-sm font-bold text-gray-900">Holds & Restrictions</div>
                <div className="text-xs text-gray-500">{student.holdsCount || 'Zero Active Registration Flags'}</div>
              </div>
            </div>
            <span className="bg-gray-100 text-gray-500 text-xs font-bold px-2 py-1 rounded">{student.holdsCount > 0 ? student.holdsCount : 'None'}</span>
          </div>
        </div>
      </div>
    </div>
  );
}