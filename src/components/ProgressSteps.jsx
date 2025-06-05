import React, { useState } from 'react';

const ProgressSteps = ({ currentStep }) => {
  const [activeStep, setActiveStep] = useState(currentStep);
  
  const handleStepClick = (stepId) => {
    // Only allow clicking on completed steps
    if (stepId < currentStep) {
      setActiveStep(stepId);
      // Here you could add navigation logic if needed
      console.log(`Navigated to step ${stepId}`);
    }
  };
  const steps = [
    { id: 1, name: 'Postcode', icon: 'location-marker', completed: currentStep >= 1 },
    { id: 2, name: 'Waste Type', icon: 'trash', completed: currentStep >= 2 },
    { id: 3, name: 'Select Skip', icon: 'truck', completed: currentStep >= 3, active: currentStep === 3 },
    { id: 4, name: 'Permit Check', icon: 'clipboard-check', completed: currentStep >= 4 },
    { id: 5, name: 'Choose Date', icon: 'calendar', completed: currentStep >= 5 },
    { id: 6, name: 'Payment', icon: 'credit-card', completed: currentStep >= 6 }
  ];

  const getIcon = (iconName) => {
    switch (iconName) {
      case 'location-marker':
        return (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
          </svg>
        );
      case 'trash':
        return (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
          </svg>
        );
      case 'truck':
        return (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path d="M8 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM15 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z" />
            <path d="M3 4a1 1 0 00-1 1v10a1 1 0 001 1h1.05a2.5 2.5 0 014.9 0H10a1 1 0 001-1v-5h2a1 1 0 00.9-.5l3-5A1 1 0 0016 3H4a1 1 0 00-1 1z" />
          </svg>
        );
      case 'clipboard-check':
        return (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z" />
            <path fillRule="evenodd" d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm9.707 5.707a1 1 0 00-1.414-1.414L9 12.586l-1.293-1.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
          </svg>
        );
      case 'calendar':
        return (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
          </svg>
        );
      case 'credit-card':
        return (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path d="M4 4a2 2 0 00-2 2v1h16V6a2 2 0 00-2-2H4z" />
            <path fillRule="evenodd" d="M18 9H2v5a2 2 0 002 2h12a2 2 0 002-2V9zM4 13a1 1 0 011-1h1a1 1 0 110 2H5a1 1 0 01-1-1zm5-1a1 1 0 100 2h1a1 1 0 100-2H9z" clipRule="evenodd" />
          </svg>
        );
      default:
        return null;
    }
  };

  return (
    <div className="bg-transparent py-3 w-full max-w-4xl mx-auto">
      <div className="relative w-full">
        {/* Base connector line (gray) */}
        <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-gray-700 -translate-y-1/2 z-0" aria-hidden="true"></div>
        
        {/* Green connector lines for completed steps */}
        <div className="absolute top-1/2 left-0 h-0.5 bg-emerald-600 -translate-y-1/2 z-0" 
             style={{ width: `${((Math.min(currentStep, 3) - 1) / (steps.length - 1)) * 100}%` }} 
             aria-hidden="true"></div>
        
        {/* Steps container with absolute positioning for first and last items */}
        <div className="flex justify-between relative">
          {steps.map((step, index) => {
            // Colors to match the site theme with green for completed steps
            const isActive = step.id === activeStep; // Currently active step
            const isCompleted = step.id < currentStep; // Previous steps are completed
            const isClickable = isCompleted; // Only completed steps are clickable
            const isFirst = index === 0;
            const isLast = index === steps.length - 1;
            
            const bgColor = isCompleted ? 'bg-emerald-600' : (isActive ? 'bg-emerald-600' : 'bg-gray-700');
            const iconColor = 'text-white';
            const textColor = isCompleted || isActive ? 'text-green-600' : 'text-gray-300';
            
            // Special positioning classes for first and last items
            let positionClass = "";
            if (isFirst) {
              positionClass = "ml-0";
            } else if (isLast) {
              positionClass = "mr-0";
            }
            
            return (
              <div key={step.id} className={`flex flex-col items-center z-10 ${positionClass}`}>
                {isClickable ? (
                  <button 
                    onClick={() => handleStepClick(step.id)}
                    className={`flex items-center justify-center w-8 h-8 rounded-full ${bgColor} mb-1 cursor-pointer hover:brightness-110 transition-all focus:ring-2 focus:ring-offset-2 focus:ring-emerald-400 focus:outline-none`}
                    aria-current={isActive ? "step" : undefined}
                    aria-label={`Go to ${step.name} step`}
                  >
                    <span className={iconColor}>
                      {getIcon(step.icon)}
                    </span>
                  </button>
                ) : (
                  <div 
                    className={`flex items-center justify-center w-8 h-8 rounded-full ${bgColor} mb-1`}
                    aria-current={isActive ? "step" : undefined}
                  >
                    <span className={iconColor}>
                      {getIcon(step.icon)}
                    </span>
                  </div>
                )}
                <span className={`text-sm font-semibold ${textColor} whitespace-nowrap`}>
                  {step.name}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default ProgressSteps;
