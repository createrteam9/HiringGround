import React, { InputHTMLAttributes } from 'react';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  icon?: string;
  fullWidth?: boolean;
}

export const Input: React.FC<InputProps> = ({ 
  icon, 
  fullWidth = true, 
  className = '', 
  ...props 
}) => {
  return (
    <div className={`relative ${fullWidth ? 'w-full' : ''}`}>
      {icon && (
        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400">
          <span className="material-symbols-outlined text-base">{icon}</span>
        </div>
      )}
      <input 
        className={`bg-white border border-outline-variant focus:border-primary-light focus:ring-0 px-4 py-3.5 text-sm font-medium transition-all placeholder:text-slate-300 rounded-xl outline-none ${icon ? 'pl-11' : ''} ${fullWidth ? 'w-full' : ''} ${className}`}
        {...props}
      />
    </div>
  );
};
