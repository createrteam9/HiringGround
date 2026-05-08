import React from 'react';
import Card from '@/app/components/ui/Card';

interface FeatureCardProps {
  icon?: React.ReactNode;
  title: string;
  description: string;
  linkText?: string;
  colSpan?: 'full' | 'half' | 'third';
  backgroundColor?: string;
}

const colSpanClasses = {
  full: 'md:col-span-2',
  half: 'md:col-span-1',
  third: 'md:col-span-1',
};

const FeatureCard: React.FC<FeatureCardProps> = ({
  icon,
  title,
  description,
  linkText,
  colSpan = 'half',
  backgroundColor,
}) => {
  return (
    <Card
      variant="elevated"
      className={`flex flex-col justify-between ${colSpanClasses[colSpan]} ${backgroundColor || ''}`}
    >
      {icon && <div className="text-5xl mb-6 text-primary">{icon}</div>}
      <div>
        <h3 className="text-headline-md font-bold text-on-surface mb-4">
          {title}
        </h3>
        <p className="text-body-md text-on-surface-variant leading-relaxed">
          {description}
        </p>
      </div>
      {linkText && (
        <div className="mt-8 flex items-center gap-2 group cursor-pointer">
          <span className="text-body-md font-headline font-bold text-primary group-hover:underline">
            {linkText}
          </span>
          <svg className="w-5 h-5 text-primary group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
          </svg>
        </div>
      )}
    </Card>
  );
};

export default FeatureCard;
