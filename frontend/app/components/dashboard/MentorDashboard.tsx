'use client';
import React from 'react';
import Container from '@/app/components/layout/Container';
import Card from '@/app/components/ui/Card';
import Button from '@/app/components/ui/Button';
import { useAuth } from '@/contexts/AuthContext';

export default function MentorDashboard() {
  const { user } = useAuth();
  const userName = user?.email?.split('@')[0] || 'Mentor';

  return (
    <div className="bg-surface py-12 px-6">
      <Container>
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-display-md font-bold text-on-surface mb-2">
            Welcome back, {userName}
          </h1>
          <p className="text-body-lg text-on-surface-variant">
            Here's an overview of your upcoming mentorship sessions.
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <Card variant="elevated">
            <div>
              <p className="text-label-sm text-on-surface-variant uppercase tracking-wide mb-2">
                Pending Requests
              </p>
              <p className="text-5xl font-headline font-bold text-primary mb-2">
                3
              </p>
              <p className="text-label-sm text-green-600">Action required</p>
            </div>
          </Card>

          <Card variant="elevated">
            <div>
              <p className="text-label-sm text-on-surface-variant uppercase tracking-wide mb-2">
                Upcoming Sessions
              </p>
              <p className="text-5xl font-headline font-bold text-on-surface mb-2">
                5
              </p>
              <p className="text-label-sm text-on-surface-variant">This week</p>
            </div>
          </Card>

          <Card variant="elevated">
            <div>
              <p className="text-label-sm text-on-surface-variant uppercase tracking-wide mb-2">
                Total Earnings
              </p>
              <p className="text-5xl font-headline font-bold text-on-surface mb-2">
                ₹12,400
              </p>
              <p className="text-label-sm text-green-600">This month</p>
            </div>
          </Card>
        </div>

        {/* Main Content */}
        <div className="space-y-8">
          <div>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-headline-lg font-bold text-on-surface">
                Pending Booking Requests
              </h2>
            </div>
            
            <Card variant="outline" className="p-6">
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="font-bold text-lg">John Doe (Candidate)</h3>
                  <p className="text-sm text-gray-600">Requested: Technical Interview (System Design)</p>
                  <p className="text-sm text-gray-600">Proposed Time: Tomorrow, 10:00 AM</p>
                </div>
                <div className="flex gap-3">
                  <Button variant="secondary" size="sm">Decline</Button>
                  <Button variant="primary" size="sm">Accept</Button>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </Container>
    </div>
  );
}
