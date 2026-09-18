import React from 'react';

export default function Button({ 
  text, 
  onClick, 
  type = 'button', 
  className = '', 
  disabled = false 
}) {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-md px-4 py-2 transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 ${className}`}
    >
      {text}
    </button>
  );
}