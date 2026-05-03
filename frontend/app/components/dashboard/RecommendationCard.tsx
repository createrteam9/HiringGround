import React from 'react';
import Card from '@/app/components/ui/Card';
import Button from '@/app/components/ui/Button';

interface RecommendationCardProps {
  title: string;
  description: string;
  category: 'technical' | 'communication' | 'behavioral';
  actionText?: string;
}

const categoryColors = {
  technical: 'from-blue-500 to-blue-600',
  communication: 'from-purple-500 to-purple-600',
  behavioral: 'from-amber-500 to-amber-600',
};

const RecommendationCard: React.FC<RecommendationCardProps> = ({
  title,
  description,
  category,
  actionText = 'Learn More',
}) => {
  return (
    <Card variant="elevated" className="bg-gradient-to-br from-surface-container-lowest to-surface-container-low">
      <div className={`w-10 h-10 rounded-md bg-gradient-to-br ${categoryColors[category]} mb-4`} />
      <h3 className="text-title-lg font-bold text-on-surface mb-2">
        {title}
      </h3>
      <p className="text-body-sm text-on-surface-variant mb-4 leading-relaxed">
        {description}
      </p>
      <Button variant="ghost" size="sm" className="text-primary">
        {actionText} →
      </Button>
    </Card>
  );
};

export default RecommendationCard;
