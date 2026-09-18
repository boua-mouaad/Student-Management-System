import React from 'react';
import { Link } from 'react-router-dom';
import { ServerCrash, RotateCw, ArrowLeft, ExternalLink } from 'lucide-react';

export default function ServerError500() {
  return (
    <div className="min-h-screen bg-[#fafafa] flex items-center justify-center p-4 font-sans relative overflow-hidden">
      
      {/* Background grid pattern matching the image */}
      <div className="absolute inset-0 z-0 opacity-[0.03]" style={{ backgroundImage: 'linear-gradient(#000 1px, transparent 1px), linear-gradient(90deg, #000 1px, transparent 1px)', backgroundSize: '20px 20px' }}></div>
      
      <div className="bg-white rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100 max-w-md w-full p-8 z-10 relative flex flex-col items-center">
        
        {/* Icon Circle */}
        <div className="w-20 h-20 bg-red-50 rounded-full flex items-center justify-center mb-6 relative mt-4">
          <ServerCrash size={32} className="text-red-600" />
          <div className="absolute -bottom-2 -right-2 bg-white px-2 py-0.5 rounded-full shadow-sm border border-red-100 text-[10px] font-bold text-red-600 flex items-center gap-1">
            <span className="w-1.5 h-1.5 bg-red-500 rounded-full"></span> 500
          </div>
        </div>
        
        {/* Top Status Pill */}
        <div className="bg-red-50 border border-red-100 text-red-700 px-3 py-1 rounded-full text-[10px] font-bold tracking-wider uppercase mb-4 flex items-center gap-1.5">
          <span className="text-red-500 text-xs">⚠️</span> HTTP 500 • INTERNAL SERVER FAULT
        </div>
        
        <h1 className="text-2xl font-bold text-gray-900 mb-3 text-center">500 — Something Went<br/>Wrong</h1>
        <p className="text-sm text-gray-500 text-center mb-8 leading-relaxed px-4">
          An unexpected internal server error occurred while processing this registrar transaction. Our administrative engineering team has been notified.
        </p>
        
        {/* Action Buttons */}
        <div className="flex gap-3 w-full mb-8">
          <button onClick={() => window.location.reload()} className="flex-1 flex justify-center items-center gap-2 px-4 py-2.5 bg-indigo-600 border border-transparent rounded-lg text-sm font-medium text-white hover:bg-indigo-700 shadow-sm transition-colors">
            <RotateCw size={16} /> Retry Request
          </button>
          <Link to="/dashboard" className="flex-1 flex justify-center items-center gap-2 px-4 py-2.5 bg-white border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 shadow-sm transition-colors">
            <ArrowLeft size={16} /> Back to Dashboard
          </Link>
        </div>
        
        {/* Diagnostic Telemetry Table */}
        <div className="w-full bg-gray-50 border border-gray-100 rounded-xl p-4 mb-6">
          <div className="flex justify-between items-center mb-3">
            <h3 className="text-[10px] font-bold text-gray-500 uppercase tracking-wider flex items-center gap-1.5">
              <ServerCrash size={12} className="text-indigo-600" /> Diagnostic Telemetry
            </h3>
            <span className="text-[10px] font-bold text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded uppercase tracking-wider">Autolog</span>
          </div>
          
          <div className="space-y-3">
            <div className="flex justify-between text-xs">
              <span className="text-gray-500">Incident Tracker</span>
              <span className="font-mono text-gray-900 font-medium">#INC-84920</span>
            </div>
            <div className="flex justify-between text-xs border-t border-gray-200 pt-3">
              <span className="text-gray-500">Incident Severity</span>
              <span className="font-medium text-gray-900 flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full"></span> Non-blocking • Mainframe database online
              </span>
            </div>
            <div className="flex justify-between text-xs border-t border-gray-200 pt-3">
              <span className="text-gray-500">Origin Gateway</span>
              <span className="font-mono text-gray-600">reg-srv-cluster-04.internal</span>
            </div>
          </div>
        </div>
        
        <div className="w-full flex justify-between items-center text-xs">
          <div className="flex items-center gap-1.5 text-gray-600 font-medium">
            <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full"></span> All Academic Hubs Operational
          </div>
          <button className="flex items-center gap-1 font-medium text-indigo-600 hover:underline">
            Status Portal <ExternalLink size={12} />
          </button>
        </div>
        
      </div>
    </div>
  );
}