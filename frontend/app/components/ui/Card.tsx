import React from 'react';

interface CardProps {
  children: React.ReactNode;
  variant?: 'elevated' | 'section' | 'outlined';
  className?: string;
}

const Card: React.FC<CardProps> = ({
  children,
  variant = 'elevated',
  className = '',
}) => {
  const variantStyles = {
    elevated: 'bg-surface-container-lowest ghost-border',
    section: 'bg-surface-container-low',
    outlined: 'bg-surface ghost-border',
  };

  return (
    <div
      className={`
        rounded-md p-6
        ${variantStyles[variant]}
        ${className}
      `}
    >
      {children}
    </div>
  );
};

export default Card;
