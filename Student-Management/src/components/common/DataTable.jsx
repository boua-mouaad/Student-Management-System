import React from 'react';

export default function DataTable(props) {
  return (
    <div className="bg-white border border-gray-200 rounded-lg overflow-hidden shadow-sm">
      <table className="w-full text-left border-collapse">
        <thead className="bg-gray-50 border-b border-gray-200">
          <tr>
            {props.headers.map((header, index) => (
              <th key={index} className="px-6 py-3 text-xs font-medium text-gray-500 uppercase">
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {props.rows.map((row, rowIndex) => (
            <tr key={rowIndex} className="hover:bg-gray-50">
              {row.map((cell, cellIndex) => (
                <td key={cellIndex} className="px-6 py-4 text-sm text-gray-700">
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}