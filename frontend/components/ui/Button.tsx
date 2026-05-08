import React, { ButtonHTMLAttributes } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  fullWidth?: boolean;
}

export const Button: React.FC<ButtonProps> = ({ 
  children, 
  variant = 'primary', 
  size = 'md', 
  fullWidth = false,
  className = '',
  ...props 
}) => {
  const baseStyles = "inline-flex items-center justify-center font-headline font-bold rounded-full transition-all active:scale-[0.98]";
  
  const variants = {
    primary: "bg-gradient-to-br from-primary to-primary-container text-white shadow-md hover:opacity-90",
    secondary: "bg-surface-container-lowest border border-outline-variant/20 text-[#0A2156] hover:bg-surface-container-low",
    outline: "bg-transparent border border-outline-variant text-on-surface-variant hover:border-primary hover:text-primary",
    ghost: "bg-transparent text-slate-500 hover:text-[#0A2156]"
  };

  const sizes = {
    sm: "px-4 py-2 text-sm",
    md: "px-6 py-2.5 text-sm",
    lg: "px-8 py-4 text-lg"
  };

  const widthClass = fullWidth ? 'w-full' : '';

  return (
    <button 
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${widthClass} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};
