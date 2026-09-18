import React from 'react';

function StatusBadge(props) {
  // Default colors (Gray)
  let bgColor = "bg-gray-100";
  let textColor = "text-gray-700";
  let dotColor = "bg-gray-400";

  // Change colors based on the status text
  if (props.status === "Active") {
    bgColor = "bg-green-100";
    textColor = "text-green-700";
    dotColor = "bg-green-500";
  } else if (props.status === "Inactive") {
    bgColor = "bg-red-100";
    textColor = "text-red-700";
    dotColor = "bg-red-500";
  }

  return (
    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium border border-white ${bgColor} ${textColor}`}>
      <span className={`w-1.5 h-1.5 rounded-full ${dotColor}`}></span>
      {props.status}
    </span>
  );
}
export default StatusBadge;