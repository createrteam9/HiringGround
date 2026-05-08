import React, { HTMLAttributes } from 'react';

interface GlassCardProps extends HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

export const GlassCard: React.FC<GlassCardProps> = ({ children, className = '', ...props }) => {
  return (
    <div 
      className={`glass-card rounded-3xl p-6 border border-white/40 shadow-sm ${className}`}
      {...props}
    >
      {children}
    </div>
  );
};
