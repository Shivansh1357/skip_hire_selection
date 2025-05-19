import React from 'react';

// SVG skip images based on size
export const SkipImage = ({ size }: { size: number }) => {
  // Skip colors based on type
  const skipColor = size <= 8 ? "#FFC107" : size <= 14 ? "#EFB839" : "#F0A830";
  
  if (size >= 20) {
    return (
      <svg viewBox="0 0 300 200" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
        <rect x="20" y="60" width="260" height="120" rx="4" fill={skipColor} />
        <rect x="30" y="70" width="240" height="100" rx="2" fill="#222" fillOpacity="0.2" />
        <rect x="15" y="180" width="270" height="10" rx="2" fill="#555" />
        <rect x="40" y="140" width="220" height="5" rx="1" fill="#333" />
        <rect x="40" y="120" width="220" height="5" rx="1" fill="#333" />
        <rect x="40" y="100" width="220" height="5" rx="1" fill="#333" />
        <rect x="40" y="80" width="220" height="5" rx="1" fill="#333" />
        <path d="M15 180 L30 60 L50 60 L35 180 Z" fill="#666" />
        <path d="M270 180 L285 60 L265 60 L250 180 Z" fill="#666" />
        <text x="150" y="40" fontSize="16" textAnchor="middle" fill="white">Roll-On Roll-Off</text>
      </svg>
    );
  }
  
  // Standard skip representation for smaller skips
  return (
    <svg viewBox="0 0 300 200" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      <path d="M40 60 L260 60 L240 180 L60 180 Z" fill={skipColor} />
      <path d="M60 60 L240 60 L225 160 L75 160 Z" fill="#222" fillOpacity="0.2" />
      <path d="M40 60 L60 60 L60 180 L40 180 Z" fill="#666" />
      <path d="M260 60 L240 60 L240 180 L260 180 Z" fill="#666" />
      <line x1="60" y1="100" x2="240" y2="100" stroke="#333" strokeWidth="5" />
      <line x1="60" y1="140" x2="240" y2="140" stroke="#333" strokeWidth="5" />
      {/* Company logo representation */}
      <circle cx="150" cy="120" r="20" fill="#1E40AF" />
      <text x="150" y="125" fontSize="14" textAnchor="middle" fill="white">WWW</text>
    </svg>
  );
}; 