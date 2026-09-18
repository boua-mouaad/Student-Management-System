import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { 
  Printer, 
  Download, 
  ShieldCheck, 
  User, 
  BookOpen, 
  CheckCircle, 
  Save, 
  Undo,
  Info,
  Lock,
  UserMinus
} from 'lucide-react';
import StatusBadge from '../../components/common/StatusBadge';
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

    if (id) {
      fetchEnrollment();
    }
  }, [id]);

  if (isLoading) {
    return (
      <div className="flex flex-col gap-6 max-w-7xl mx-auto font-sans pb-12 p-12 items-center justify-center text-gray-400">
        <span className="text-sm font-medium">Loading enrollment record...</span>
      </div>
    );
  }

  if (error || !enrollment) {
    return (
      <div className="flex flex-col gap-6 max-w-7xl mx-auto font-sans pb-12 p-4">
        <div className="p-4 bg-red-50 text-red-600 border border-red-100 rounded-lg text-sm font-medium">
          {error || "Enrollment not found."}
        </div>
        <Link to="/enrollments" className="text-indigo-600 hover:underline text-sm">← Back to Enrollments</Link>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6 max-w-7xl mx-auto font-sans pb-12">
      <div className="flex justify-between items-start border-b border-gray-200 pb-4">
        <div>
          <div className="text-sm text-gray-500 flex items-center gap-2 mb-2">
            <Link to="/enrollments" className="hover:underline">Enrollments</Link> / 
            <span className="font-medium text-gray-900">{enrollment.enrollmentId || id}</span> / 
            Details
          </div>
          <div className="flex items-center gap-3">
            <h1 className="text-3xl font-bold text-gray-900 leading-tight">Enrollment Record #{enrollment.enrollmentId || id}</h1>
            <span className="bg-emerald-50 text-emerald-700 px-3 py-1 rounded-full text-xs font-bold border border-emerald-100 flex items-center gap-1.5 self-start mt-2">
              <span className="w-2 h-2 bg-emerald-500 rounded-full"></span> {enrollment.status || 'Confirmed'}
            </span>
          </div>
        </div>
        
        <div className="flex gap-3 mt-4">
          <button className="flex items-center gap-2 px-3 py-2 bg-white border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 shadow-sm">
            <Printer size={16} /> Official Slip
          </button>
          <button className="flex items-center gap-2 px-3 py-2 bg-white border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 shadow-sm">
            <Download size={16} /> Export Transcript Slice
          </button>
          <button className="flex items-center gap-2 px-4 py-2 bg-indigo-600 border border-transparent rounded-md text-sm font-medium text-white hover:bg-indigo-700 shadow-sm">
            <ShieldCheck size={16} /> Re-verify Degree Audit
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-5 relative overflow-hidden">
          <div className="absolute top-0 right-0 p-4">
            <span className="text-[10px] font-bold text-emerald-600 uppercase tracking-wider bg-emerald-50 px-2 py-1 rounded">{enrollment.student?.academicStanding || 'Good Standing'}</span>
          </div>
          <h2 className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-4">Student Dossier</h2>
          
          <div className="flex items-center gap-4 mb-4">
            <img src={enrollment.student?.profileImageUrl || `https://ui-avatars.com/api/?name=${enrollment.student?.firstName}+${enrollment.student?.lastName}&background=4f46e5&color=fff`} className="w-12 h-12 rounded-full border border-gray-200" alt="Student" />
            <div>
              <div className="text-base font-bold text-gray-900 flex items-center gap-2">{enrollment.student?.firstName} {enrollment.student?.lastName} <span className="text-xs text-gray-500 font-normal">{enrollment.student?.studentId}</span></div>
              <div className="text-xs text-gray-600 mt-0.5">{enrollment.student?.academicYear} • {enrollment.student?.program}</div>
              <div className="text-xs text-indigo-600 mt-0.5">@ {enrollment.student?.email}</div>
            </div>
          </div>
          
          <div className="flex justify-between items-center pt-4 border-t border-gray-100 mt-2">
            <div className="flex items-center gap-2 text-xs text-gray-600">
              <User size={14} className="text-gray-400" /> Primary Advisor: <strong>{enrollment.student?.advisor || 'Unassigned'}</strong>
            </div>
            <Link to={`/students/${enrollment.student?.studentId}`} className="text-xs font-bold text-indigo-600 hover:underline">Profile Dossier →</Link>
          </div>
        </div>

        <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-5 relative overflow-hidden">
          <div className="absolute top-0 right-0 p-4">
            <span className="text-[10px] font-bold text-indigo-600 uppercase tracking-wider bg-indigo-50 px-2 py-1 rounded">{enrollment.course?.credits || 0} Credits</span>
          </div>
          <h2 className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-4">Course Section</h2>
          
          <div className="flex items-center gap-4 mb-4">
            <div className="w-12 h-12 bg-indigo-50 text-indigo-600 rounded-lg flex items-center justify-center font-bold text-sm border border-indigo-100">
              <BookOpen size={20} />
            </div>
            <div>
              <div className="text-xs font-bold text-indigo-600 uppercase tracking-wider mb-0.5">{enrollment.course?.code} • Section {enrollment.course?.section || '01'}</div>
              <div className="text-base font-bold text-gray-900 leading-tight">{enrollment.course?.title}</div>
              <div className="text-xs text-gray-600 mt-1">{enrollment.course?.instructor} • {enrollment.course?.location}</div>
            </div>
          </div>
          
          <div className="flex justify-between items-center pt-4 border-t border-gray-100 mt-2">
            <div className="flex items-center gap-2 text-xs text-gray-600">
              <span className="w-3 h-3 bg-gray-200 rounded-full flex items-center justify-center"><Clock size={8} /></span> 
              Schedule & Cohort: <strong>{enrollment.course?.schedule}</strong>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 bg-gray-50 p-4 rounded-xl border border-gray-200">
        <div>
          <div className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1">Enrollment Date</div>
          <div className="text-sm font-bold text-gray-900">{enrollment.enrollmentDate}</div>
          <div className="text-[10px] text-gray-500 mt-0.5">Web Registrar</div>
        </div>
        <div>
          <div className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1">Registration Type</div>
          <div className="text-sm font-bold text-gray-900">{enrollment.registrationType || 'Regular Add/Drop'}</div>
        </div>
        <div>
          <div className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1">Grading Basis</div>
          <div className="text-sm font-bold text-gray-900">{enrollment.gradingBasis || 'Letter Grade'}</div>
        </div>
        <div>
          <div className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1">Prerequisite Check</div>
          <div className="text-sm font-bold text-emerald-600 flex items-center gap-1"><CheckCircle size={12} /> {enrollment.prerequisiteStatus || 'Passed'}</div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white border border-gray-200 rounded-xl shadow-sm p-6">
          <div className="flex justify-between items-start mb-6">
            <div>
              <h2 className="text-lg font-bold text-gray-900 flex items-center gap-2">
                <CheckCircle size={20} className="text-indigo-600" /> Assign & Update Academic Grade
              </h2>
              <p className="text-xs text-gray-500 mt-1">Modify the official academic ledger grade. Updates will instantly post to the official student transcript and trigger a permanent ledger event.</p>
            </div>
            
            <div className="bg-gray-50 border border-gray-200 rounded-lg p-3 text-center min-w-[100px]">
              <div className="text-[10px] font-bold text-emerald-600 uppercase tracking-wider mb-1 flex items-center justify-center gap-1">
                <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full"></span> Current Record
              </div>
              <div className="text-3xl font-bold text-indigo-700 flex items-baseline justify-center gap-1">
                {enrollment.grade || 'N/A'}
              </div>
            </div>
          </div>

          <div className="max-w-md">
            <div className="flex justify-between items-end mb-1">
              <label className="text-sm font-bold text-gray-700">Select Ledger Grade</label>
              <span className="text-[10px] text-gray-400 uppercase tracking-wider">Standard 4.0 Scale</span>
            </div>
            <select className="w-full border border-gray-300 px-3 py-2 rounded-md bg-gray-50 text-sm font-medium text-gray-900 mb-4 outline-none focus:border-indigo-500" defaultValue={enrollment.grade || ''}>
              <option value="A">A — 4.00 Quality Points</option>
              <option value="A-">A- — 3.67 Quality Points</option>
              <option value="B+">B+ — 3.33 Quality Points</option>
              <option value="B">B — 3.00 Quality Points</option>
              <option value="B-">B- — 2.67 Quality Points</option>
              <option value="C+">C+ — 2.33 Quality Points</option>
              <option value="C">C — 2.00 Quality Points</option>
              <option value="F">F — 0.00 Quality Points</option>
            </select>

            <div className="flex justify-between items-end mb-1">
              <label className="text-sm font-bold text-gray-700">Registrar Grade Audit Notes</label>
              <span className="text-[10px] text-gray-400 uppercase tracking-wider">Required for manual overrides</span>
            </div>
            <textarea 
              className="w-full border border-gray-300 px-3 py-2 rounded-md bg-gray-50 text-sm text-gray-700 mb-6 outline-none focus:border-indigo-500 resize-none" 
              rows="2"
            ></textarea>

            <div className="flex gap-3">
              <button className="flex items-center gap-2 px-4 py-2 bg-indigo-600 border border-transparent rounded-md text-sm font-medium text-white hover:bg-indigo-700 shadow-sm">
                <Save size={16} /> Save Grade Change
              </button>
              <button className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 shadow-sm">
                <Undo size={16} /> Revert Changes
              </button>
            </div>
          </div>
        </div>

        <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-6">
          <div className="flex justify-between items-end mb-4">
            <h2 className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Course Assessment Weights</h2>
            <span className="text-[10px] font-bold text-gray-500">Weighted Mean: {enrollment.weightedMean || '0'}%</span>
          </div>

          <div className="space-y-4">
            <div>
              <div className="flex justify-between items-center text-xs mb-1.5">
                <span className="font-medium text-gray-700">Midterm Examination</span>
                <span className="font-bold text-indigo-700">{enrollment.midtermScore || 0}%</span>
              </div>
              <div className="w-full bg-gray-100 rounded-full h-1.5"><div className="bg-indigo-600 h-1.5 rounded-full" style={{ width: `${enrollment.midtermScore || 0}%` }}></div></div>
            </div>
            
            <div>
              <div className="flex justify-between items-center text-xs mb-1.5">
                <span className="font-medium text-gray-700">Homework & Assignments</span>
                <span className="font-bold text-indigo-700">{enrollment.homeworkScore || 0}%</span>
              </div>
              <div className="w-full bg-gray-100 rounded-full h-1.5"><div className="bg-indigo-600 h-1.5 rounded-full" style={{ width: `${enrollment.homeworkScore || 0}%` }}></div></div>
            </div>
            
            <div>
              <div className="flex justify-between items-center text-xs mb-1.5">
                <span className="font-medium text-gray-700">Practicum & Problem Sets</span>
                <span className="font-bold text-indigo-700">{enrollment.practicumScore || 0}%</span>
              </div>
              <div className="w-full bg-gray-100 rounded-full h-1.5"><div className="bg-indigo-600 h-1.5 rounded-full" style={{ width: `${enrollment.practicumScore || 0}%` }}></div></div>
            </div>
          </div>

          <div className="mt-6 bg-indigo-50/50 border border-indigo-100 rounded-lg p-3 flex gap-2 items-start">
            <Info size={14} className="text-indigo-600 mt-0.5 shrink-0" />
            <p className="text-[10px] text-indigo-800 leading-relaxed">
              Faculty submit preliminary marks via Canvas LMS. Grades become legally immutable 30 days after the final examination period without formal Academic Appeals Board review.
            </p>
          </div>
        </div>
      </div>

      <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-6 relative">
        <div className="flex justify-between items-end mb-6">
          <h2 className="text-sm font-bold text-gray-900 flex items-center gap-2">
            <ShieldCheck size={16} className="text-gray-400" /> Institutional Audit Trail & Sign-offs
          </h2>
        </div>

        <div className="pl-2 border-l-2 border-gray-100 ml-2 space-y-6 relative">
          {enrollment.auditTrail?.map((event, idx) => (
            <div key={idx} className="relative pl-6">
              <div className="absolute -left-[11px] top-1 w-5 h-5 bg-gray-100 rounded-full flex items-center justify-center">
                <span className="w-2 h-2 bg-gray-500 rounded-full"></span>
              </div>
              <div className="flex justify-between items-start">
                <div>
                  <div className="text-sm font-bold text-gray-900 flex items-center gap-2">
                    {event.action}
                    <span className="text-[10px] bg-gray-100 text-gray-600 px-1.5 py-0.5 rounded uppercase tracking-wider font-bold">{event.status}</span>
                  </div>
                  <div className="text-xs text-gray-500 mt-0.5">{event.description}</div>
                </div>
                <div className="text-xs text-gray-500 text-right whitespace-nowrap">
                  {event.timestamp}
                </div>
              </div>
            </div>
          ))}
          {(!enrollment.auditTrail || enrollment.auditTrail.length === 0) && (
            <div className="text-sm text-gray-500 pl-6">No audit history available.</div>
          )}
        </div>
      </div>

      <div className="flex justify-between items-center text-xs px-2 pt-2">
        <div className="flex items-center gap-2 text-gray-400">
          <Lock size={12} /> Immutable SIS Record • Tamper-evident ledger encryption active
        </div>
        <button className="flex items-center gap-1.5 text-red-500 font-medium hover:underline hover:text-red-700">
          <UserMinus size={14} /> Withdraw Student from Course
        </button>
      </div>

    </div>
  );
}