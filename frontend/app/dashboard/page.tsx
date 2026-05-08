import React from 'react';
import Container from '@/app/components/layout/Container';
import SessionCard from '@/app/components/dashboard/SessionCard';
import RecommendationCard from '@/app/components/dashboard/RecommendationCard';
import Card from '@/app/components/ui/Card';
import Button from '@/app/components/ui/Button';
import Badge from '@/app/components/ui/Badge';

export default function DashboardPage() {
  return (
    <div className="min-h-[calc(100vh-64px)] bg-surface py-12 px-6">
      <Container>
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-display-md font-bold text-on-surface mb-2">
            Welcome back, Alex
          </h1>
          <p className="text-body-lg text-on-surface-variant">
            You're on track for your next interview. Keep practicing!
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
          <Card variant="elevated">
            <div>
              <p className="text-label-sm text-on-surface-variant uppercase tracking-wide mb-2">
                Overall Score
              </p>
              <p className="text-5xl font-headline font-bold text-primary mb-2">
                782
              </p>
              <p className="text-label-sm text-green-600">↑ 12 pts this month</p>
            </div>
          </Card>

          <Card variant="elevated">
            <div>
              <p className="text-label-sm text-on-surface-variant uppercase tracking-wide mb-2">
                Mock Sessions
              </p>
              <p className="text-5xl font-headline font-bold text-on-surface mb-2">
                24
              </p>
              <p className="text-label-sm text-on-surface-variant">Avg. 82% score</p>
            </div>
          </Card>

          <Card variant="elevated">
            <div>
              <p className="text-label-sm text-on-surface-variant uppercase tracking-wide mb-2">
                Practice Hours
              </p>
              <p className="text-5xl font-headline font-bold text-on-surface mb-2">
                48h
              </p>
              <p className="text-label-sm text-on-surface-variant">This quarter</p>
            </div>
          </Card>

          <Card variant="elevated">
            <div>
              <p className="text-label-sm text-on-surface-variant uppercase tracking-wide mb-2">
                Focus Areas
              </p>
              <p className="text-5xl font-headline font-bold text-on-surface mb-2">
                5
              </p>
              <p className="text-label-sm text-on-surface-variant">In progress</p>
            </div>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Upcoming Sessions */}
            <div>
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-headline-lg font-bold text-on-surface">
                  Upcoming Sessions
                </h2>
                <Button variant="ghost" size="sm">
                  View All →
                </Button>
              </div>

              <div className="space-y-4">
                <SessionCard
                  mentorName="Sarah Chen"
                  date="Tomorrow"
                  time="2:00 PM"
                  status="upcoming"
                />
                <SessionCard
                  mentorName="Marcus Thorne"
                  date="Friday, May 10"
                  time="4:30 PM"
                  status="upcoming"
                />
              </div>
            </div>

            {/* Recent Sessions */}
            <div>
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-headline-lg font-bold text-on-surface">
                  Recent Sessions
                </h2>
                <Button variant="ghost" size="sm">
                  View History →
                </Button>
              </div>

              <div className="space-y-4">
                <SessionCard
                  mentorName="Elena Rodriguez"
                  date="May 2"
                  time="3:00 PM"
                  status="completed"
                  score={88}
                />
                <SessionCard
                  mentorName="John Park"
                  date="April 28"
                  time="1:00 PM"
                  status="completed"
                  score={82}
                />
                <SessionCard
                  mentorName="Priya Sharma"
                  date="April 24"
                  time="5:00 PM"
                  status="completed"
                  score={85}
                />
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-8">
            {/* AI Recommendations */}
            <div>
              <h2 className="text-headline-md font-bold text-on-surface mb-6">
                AI Recommendations
              </h2>

              <div className="space-y-4">
                <RecommendationCard
                  title="System Design Gaps"
                  description="Your last 3 sessions show weakness in distributed system design. Focus on CAP theorem."
                  category="technical"
                  actionText="Practice Now"
                />

                <RecommendationCard
                  title="Communication Pace"
                  description="Slow down when explaining complex concepts. Mentors noted rushing through details."
                  category="communication"
                  actionText="View Feedback"
                />

                <RecommendationCard
                  title="Behavioral Clarity"
                  description="Strengthen STAR method responses. Practice structured answers to behavioral questions."
                  category="behavioral"
                  actionText="Learn STAR"
                />
              </div>
            </div>

            {/* Latest Feedback */}
            <Card variant="elevated">
              <h3 className="text-headline-sm font-bold text-on-surface mb-4">
                Latest Feedback
              </h3>

              <div className="space-y-4">
                <div>
                  <Badge variant="success" className="mb-3">
                    Strengths
                  </Badge>
                  <ul className="text-label-sm text-on-surface-variant space-y-2">
                    <li>• Clear problem-solving approach</li>
                    <li>• Good follow-up questions</li>
                  </ul>
                </div>

                <div>
                  <Badge variant="warning" className="mb-3">
                    Areas to Improve
                  </Badge>
                  <ul className="text-label-sm text-on-surface-variant space-y-2">
                    <li>• Time management (9/10 complexity)</li>
                    <li>• Trade-offs explanation</li>
                  </ul>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </Container>
    </div>
  );
}
