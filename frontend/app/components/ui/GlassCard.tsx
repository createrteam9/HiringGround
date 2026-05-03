import React from 'react';

interface GlassCardProps {
  children: React.ReactNode;
  className?: string;
}

const GlassCard: React.FC<GlassCardProps> = ({ children, className = '' }) => {
  return (
    <div className={`glass-card p-6 rounded-md ${className}`}>
      {children}
    </div>
  );
};

export default GlassCard;
