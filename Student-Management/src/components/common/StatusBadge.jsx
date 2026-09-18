import React from 'react';

export default function StatusBadge({ status }) {
  const getStyles = () => {
    switch (status?.toUpperCase()) {
      case 'ACTIVE':
        return 'bg-emerald-100 text-emerald-700 border-emerald-200';
      case 'COMPLETED':
        return 'bg-indigo-100 text-indigo-700 border-indigo-200';
      case 'DROPPED':
        return 'bg-red-100 text-red-700 border-red-200';
      default:
        return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  return (
    <span className={`px-2 py-1 rounded text-xs font-bold border uppercase tracking-wider ${getStyles()}`}>
      {status || 'UNKNOWN'}
    </span>
  );
}