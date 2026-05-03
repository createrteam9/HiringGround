import React from 'react';
import Input from '@/app/components/ui/Input';

interface FormFieldProps {
  label: string;
  name: string;
  type?: 'text' | 'email' | 'password' | 'textarea';
  placeholder?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  error?: string;
  hint?: string;
  required?: boolean;
}

const FormField: React.FC<FormFieldProps> = ({
  label,
  name,
  type = 'text',
  placeholder,
  value,
  onChange,
  error,
  hint,
  required,
}) => {
  if (type === 'textarea') {
    return (
      <div className="w-full">
        <label className="block text-label-md font-headline font-bold text-on-surface mb-2">
          {label}
          {required && <span className="text-error">*</span>}
        </label>
        <textarea
          name={name}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          className={`
            w-full px-4 py-3 rounded-sm
            bg-surface-container-highest text-on-surface
            border-b-2 border-transparent
            placeholder:text-on-surface-variant
            input-focus
            transition-colors
            ${error ? 'border-b-error' : 'border-b-surface-container-highest hover:border-b-outline-variant focus:border-b-primary'}
            resize-none
          `}
          rows={4}
        />
        {error && <p className="text-label-sm text-error mt-1">{error}</p>}
        {hint && !error && <p className="text-label-sm text-on-surface-variant mt-1">{hint}</p>}
      </div>
    );
  }

  return (
    <Input
      label={label}
      name={name}
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      error={error}
      hint={hint}
    />
  );
};

export default FormField;
