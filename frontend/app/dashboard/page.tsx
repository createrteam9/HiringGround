'use client';
import React from 'react';
import CandidateDashboard from '@/app/components/dashboard/CandidateDashboard';
import MentorDashboard from '@/app/components/dashboard/MentorDashboard';
import { useAuth } from '@/contexts/AuthContext';

export default function DashboardPage() {
  const { user, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="min-h-[calc(100vh-64px)] flex items-center justify-center bg-surface">
        <p className="text-on-surface-variant">Loading dashboard...</p>
      </div>
    );
  }

  // Determine dashboard based on role
  const isMentor = user?.roles?.includes('ROLE_MENTOR');

  return isMentor ? <MentorDashboard /> : <CandidateDashboard />;
}
