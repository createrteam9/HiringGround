import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost' | 'icon';
  size?: 'sm' | 'md' | 'lg';
  loading?: boolean;
  children: React.ReactNode;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({
    variant = 'primary',
    size = 'md',
    loading = false,
    disabled = false,
    children,
    className = '',
    ...props
  }, ref) => {
    const baseStyles = 'font-headline font-bold rounded-full transition-smooth focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary disabled:opacity-50 disabled:cursor-not-allowed';

    const variantStyles = {
      primary: 'gradient-button shadow-lg hover:opacity-90 active:scale-[0.98]',
      secondary: 'bg-surface-container-lowest border border-outline-variant/20 text-on-surface hover:bg-surface-container-low',
      ghost: 'bg-transparent text-primary hover:bg-primary/5 border border-transparent',
      icon: 'bg-transparent text-on-surface hover:bg-surface-container-low p-2 rounded-full',
    };

    const sizeStyles = {
      sm: 'px-4 py-2 text-label-md',
      md: 'px-6 py-2.5 text-body-md',
      lg: 'px-8 py-4 text-body-lg',
    };

    return (
      <button
        ref={ref}
        disabled={loading || disabled}
        className={`${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${className}`}
        {...props}
      >
        {loading ? (
          <span className="flex items-center gap-2">
            <span className="inline-block w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
            {children}
          </span>
        ) : (
          children
        )}
      </button>
    );
  }
);

Button.displayName = 'Button';

export default Button;
