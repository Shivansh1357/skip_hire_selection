import React from 'react';

// Array of steps in the process
const steps = [
  { id: 'postcode', label: 'Postcode', icon: '📍', active: true, completed: true },
  { id: 'waste-type', label: 'Waste Type', icon: '🗑️', active: true, completed: true },
  { id: 'select-skip', label: 'Select Skip', icon: '📦', active: true, completed: false },
  { id: 'permit-check', label: 'Permit Check', icon: '🔒', active: false, completed: false },
  { id: 'choose-date', label: 'Choose Date', icon: '📅', active: false, completed: false },
  { id: 'payment', label: 'Payment', icon: '💳', active: false, completed: false },
];

const ProgressBar = () => {
  return (
    <div className="w-full max-w-5xl mx-auto mb-6 md:mb-10 px-2">
      <div className="flex justify-between items-center">
        {steps.map((step, index) => (
          <React.Fragment key={step.id}>
            <div className="flex flex-col items-center">
              <div 
                className={`flex items-center justify-center w-8 h-8 md:w-10 md:h-10 rounded-full mb-1 md:mb-2 
                  ${step.active ? 'bg-blue-600 text-white' : 'bg-gray-700 text-gray-400'}`}
              >
                {step.icon}
              </div>
              <span 
                className={`text-xs md:text-sm whitespace-nowrap hidden sm:inline-block
                  ${step.active ? 'text-white font-medium' : 'text-gray-500'}`}
              >
                {step.label}
              </span>
            </div>
            
            {index < steps.length - 1 && (
              <div 
                className={`h-[2px] flex-1 mx-1 md:mx-2 
                  ${index < 2 ? 'bg-blue-600' : 'bg-gray-700'}`}
              ></div>
            )}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

export default ProgressBar; 