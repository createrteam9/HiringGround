import React from 'react';
import Card from '@/app/components/ui/Card';
import Avatar from '@/app/components/ui/Avatar';

interface TestimonialCardProps {
  quote: string;
  author: string;
  title: string;
  image?: string;
  rating?: number;
}

const TestimonialCard: React.FC<TestimonialCardProps> = ({
  quote,
  author,
  title,
  image,
  rating = 5,
}) => {
  return (
    <Card variant="elevated">
      {rating && (
        <div className="flex gap-1 mb-6 text-primary">
          {Array.from({ length: rating }).map((_, i) => (
            <svg
              key={i}
              className="w-5 h-5 fill-current"
              viewBox="0 0 24 24"
            >
              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
            </svg>
          ))}
        </div>
      )}

      <p className="text-body-md italic text-on-surface-variant mb-8 leading-relaxed">
        "{quote}"
      </p>

      <div className="flex items-center gap-4 pt-4 border-t border-outline-variant/15">
        <Avatar src={image} alt={author} size="md" fallback={author[0]} />
        <div>
          <p className="font-headline font-bold text-on-surface">
            {author}
          </p>
          <p className="text-label-md text-on-surface-variant uppercase tracking-tight">
            {title}
          </p>
        </div>
      </div>
    </Card>
  );
};

export default TestimonialCard;
