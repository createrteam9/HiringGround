import React from 'react';

interface ProgressIndicatorProps {
  currentStep: number;
  totalSteps: number;
  steps: string[];
}

const ProgressIndicator: React.FC<ProgressIndicatorProps> = ({
  currentStep,
  totalSteps,
  steps,
}) => {
  return (
    <div className="fixed left-0 top-16 h-[calc(100vh-64px)] w-64 bg-slate-900 text-white p-8 hidden lg:flex flex-col">
      <h2 className="text-headline-md font-bold mb-12">Join HiringGround</h2>

      <div className="space-y-8">
        {steps.map((step, index) => {
          const stepNumber = index + 1;
          const isActive = stepNumber === currentStep;
          const isCompleted = stepNumber < currentStep;

          return (
            <div key={stepNumber} className="flex items-start gap-4">
              <div
                className={`
                  w-10 h-10 rounded-full flex items-center justify-center font-headline font-bold text-label-md
                  transition-all
                  ${isActive ? 'bg-primary text-white scale-110' : ''}
                  ${isCompleted ? 'bg-green-500 text-white' : ''}
                  ${!isActive && !isCompleted ? 'bg-slate-700 text-slate-300' : ''}
                `}
              >
                {isCompleted ? '✓' : stepNumber}
              </div>
              <div>
                <p className={`font-headline text-label-md transition-colors ${isActive ? 'text-white font-bold' : isCompleted ? 'text-green-300' : 'text-slate-400'}`}>
                  Step {stepNumber}
                </p>
                <p className={`text-label-sm ${isActive ? 'text-primary' : 'text-slate-500'}`}>
                  {step}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ProgressIndicator;
