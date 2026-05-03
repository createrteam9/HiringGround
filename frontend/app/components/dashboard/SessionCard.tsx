import React from 'react';
import Card from '@/app/components/ui/Card';
import Badge from '@/app/components/ui/Badge';

interface SessionCardProps {
  mentorName: string;
  date: string;
  time: string;
  status: 'upcoming' | 'completed' | 'cancelled';
  score?: number;
}

const SessionCard: React.FC<SessionCardProps> = ({
  mentorName,
  date,
  time,
  status,
  score,
}) => {
  const statusColors = {
    upcoming: { bg: 'bg-blue-100', text: 'text-blue-800', badge: 'primary' as const },
    completed: { bg: 'bg-green-100', text: 'text-green-800', badge: 'success' as const },
    cancelled: { bg: 'bg-red-100', text: 'text-red-800', badge: 'error' as const },
  };

  const colors = statusColors[status];

  return (
    <Card variant="elevated" className="border-l-4 border-primary hover:shadow-md transition-shadow">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="text-headline-sm font-bold text-on-surface">
            {mentorName}
          </h3>
          <p className="text-label-md text-on-surface-variant">
            {date} at {time}
          </p>
        </div>
        <Badge variant={colors.badge}>
          {status.charAt(0).toUpperCase() + status.slice(1)}
        </Badge>
      </div>

      {score && status === 'completed' && (
        <div className="mt-4 pt-4 border-t border-outline-variant/15">
          <p className="text-label-sm text-on-surface-variant mb-2">Performance Score</p>
          <div className="flex items-center gap-2">
            <div className="flex-1 h-2 bg-surface-container-high rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-primary to-primary-container"
                style={{ width: `${score}%` }}
              />
            </div>
            <span className="text-body-md font-bold text-primary">{score}%</span>
          </div>
        </div>
      )}
    </Card>
  );
};

export default SessionCard;
