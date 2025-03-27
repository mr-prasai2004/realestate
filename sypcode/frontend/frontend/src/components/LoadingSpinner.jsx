import React from 'react';

const LoadingSpinner = ({ size = 'medium', color = 'primary', fullPage = false }) => {
  let sizeClass = 'h-8 w-8';
  let colorClass = 'border-primary-600';
  let containerClass = '';
  
  // Size variations
  if (size === 'small') {
    sizeClass = 'h-5 w-5';
  } else if (size === 'large') {
    sizeClass = 'h-12 w-12';
  }
  
  // Color variations
  if (color === 'white') {
    colorClass = 'border-white';
  } else if (color === 'secondary') {
    colorClass = 'border-secondary-600';
  }
  
  // Full page overlay
  if (fullPage) {
    containerClass = 'fixed inset-0 flex items-center justify-center bg-white bg-opacity-75 z-50';
  } else {
    containerClass = 'flex justify-center items-center';
  }
  
  return (
    <div className={containerClass}>
      <div className={`animate-spin rounded-full border-t-2 border-b-2 ${colorClass} ${sizeClass}`}></div>
    </div>
  );
};

export default LoadingSpinner;