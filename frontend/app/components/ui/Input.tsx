import React from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  hint?: string;
  icon?: React.ReactNode;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({
    label,
    error,
    hint,
    icon,
    className = '',
    ...props
  }, ref) => {
    return (
      <div className="w-full">
        {label && (
          <label className="block text-label-md font-headline font-bold text-on-surface mb-2">
            {label}
          </label>
        )}
        <div className="relative">
          {icon && (
            <div className="absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant">
              {icon}
            </div>
          )}
          <input
            ref={ref}
            className={`
              w-full px-4 py-3 ${icon ? 'pl-10' : ''} rounded-sm
              bg-surface-container-highest text-on-surface
              border-b-2 border-transparent
              placeholder:text-on-surface-variant
              input-focus
              transition-colors
              ${error ? 'border-b-error' : 'border-b-surface-container-highest hover:border-b-outline-variant focus:border-b-primary'}
              ${className}
            `}
            {...props}
          />
        </div>
        {error && (
          <p className="text-label-sm text-error mt-1">{error}</p>
        )}
        {hint && !error && (
          <p className="text-label-sm text-on-surface-variant mt-1">{hint}</p>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';

export default Input;
