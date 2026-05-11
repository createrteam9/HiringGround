'use client';
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import Container from '@/app/components/layout/Container';
import Card from '@/app/components/ui/Card';
import Button from '@/app/components/ui/Button';
import Avatar from '@/app/components/ui/Avatar';
import { useAuth } from '@/contexts/AuthContext';
import { fetchApi } from '@/lib/api';

// ── Helpers ────────────────────────────────────────────
function formatTime(t: string): string {
  const [h, m] = t.split(':').map(Number);
  const p = h >= 12 ? 'PM' : 'AM';
  const h12 = h === 0 ? 12 : h > 12 ? h - 12 : h;
  return `${h12}:${m.toString().padStart(2, '0')} ${p}`;
}

function formatDateShort(d: string): string {
  const date = new Date(d + 'T00:00:00');
  const today = new Date(); today.setHours(0, 0, 0, 0);
  const tom = new Date(today); tom.setDate(today.getDate() + 1);
  if (date.getTime() === today.getTime()) return 'Today';
  if (date.getTime() === tom.getTime()) return 'Tomorrow';
  return date.toLocaleDateString('en-IN', { weekday: 'short', month: 'short', day: 'numeric' });
}

// ── Types ───────────────────────────────────────────────
interface DashStats {
  role: 'CANDIDATE';
  profile?: {
    firstName: string;
    lastName: string;
    profileImgUrl: string | null;
    currentPosition: string | null;
    currentCompany: string | null;
  };
  totalBookings: number;
  upcomingSessions: number;
  completedSessions: number;
  nextSession?: {
    slotDate: string;
    slotTime: string;
    duration: number;
    mentorFirstName: string;
    mentorLastName: string;
    mentorProfileId: number;
  };
  recentSessions: {
    bookingId: number;
    status: string;
    slotDate: string;
    slotTime: string;
    duration: number;
    price: number | null;
    rating: number | null;
    mentor: {
      profileId: number;
      firstName: string;
      lastName: string;
      currentPosition: string | null;
      currentCompany: string | null;
      profileImgUrl: string | null;
    };
  }[];
}

const STATUS_PILL: Record<string, string> = {
  SCHEDULED: 'bg-blue-100 text-blue-700',
  COMPLETED: 'bg-green-100 text-green-700',
  CANCELLED: 'bg-red-100 text-red-700',
};

export default function CandidateDashboard() {
  const { user, token } = useAuth();
  const [stats, setStats] = useState<DashStats | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const emailName = user?.email?.split('@')[0] || 'Candidate';

  useEffect(() => {
    if (!token) return;
    fetchApi<DashStats>('/dashboard/stats', { token })
      .then(setStats)
      .catch(console.error)
      .finally(() => setIsLoading(false));
  }, [token]);

  const firstName = stats?.profile?.firstName || emailName;
  const lastName = stats?.profile?.lastName || '';
  const initials = `${firstName.charAt(0)}${lastName.charAt(0)}`.toUpperCase();

  if (isLoading) {
    return (
      <div className="min-h-[calc(100vh-64px)] flex items-center justify-center bg-surface">
        <div className="text-center">
          <div className="w-10 h-10 border-2 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-on-surface-variant">Loading your dashboard...</p>
        </div>
      </div>
    );
  }

  const statCards = [
    {
      label: 'Total Bookings',
      value: stats?.totalBookings ?? 0,
      sub: 'All time',
      icon: 'calendar_month',
      color: 'text-primary',
      bg: 'bg-primary/8',
      href: '/dashboard/sessions',
    },
    {
      label: 'Upcoming',
      value: stats?.upcomingSessions ?? 0,
      sub: 'Scheduled',
      icon: 'event_upcoming',
      color: 'text-blue-600',
      bg: 'bg-blue-50',
      href: '/dashboard/sessions',
    },
    {
      label: 'Completed',
      value: stats?.completedSessions ?? 0,
      sub: 'Sessions done',
      icon: 'check_circle',
      color: 'text-green-600',
      bg: 'bg-green-50',
      href: '/dashboard/sessions',
    },
    {
      label: 'Explore',
      value: '→',
      sub: 'Find Mentors',
      icon: 'group',
      color: 'text-violet-600',
      bg: 'bg-violet-50',
      href: '/mentors',
    },
  ];

  const isNewUser = !stats?.totalBookings;

  return (
    <div className="bg-surface min-h-[calc(100vh-64px)] py-10 px-6">
      <Container>

        {/* ── Hero Header ─────────────────────────── */}
        <div className="relative rounded-2xl overflow-hidden mb-10 bg-gradient-to-br from-[#0A2156] via-[#0d3080] to-[#1a4fa0] p-8 text-white shadow-xl">
          <div className="absolute -top-10 -right-10 w-48 h-48 rounded-full bg-white/5 pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-56 h-56 rounded-full bg-white/5 -translate-x-1/3 translate-y-1/2 pointer-events-none" />

          <div className="relative flex flex-col sm:flex-row items-start sm:items-center gap-6">
            {/* Avatar */}
            <div className="shrink-0">
              <Avatar
                src={stats?.profile?.profileImgUrl || undefined}
                alt={firstName}
                size="xl"
                fallback={initials}
              />
            </div>

            {/* Greeting */}
            <div className="flex-1">
              <p className="text-white/70 text-sm font-medium uppercase tracking-widest mb-1">
                Candidate Dashboard
              </p>
              <h1 className="text-3xl font-headline font-bold text-white mb-1">
                {isNewUser ? `Let's get started, ${firstName}!` : `Welcome back, ${firstName}!`}
              </h1>
              <p className="text-white/70 text-sm">
                {isNewUser
                  ? 'Book your first mock interview to kickstart your preparation.'
                  : stats?.upcomingSessions
                    ? `You have ${stats.upcomingSessions} upcoming session${stats.upcomingSessions > 1 ? 's' : ''}. Keep the momentum going!`
                    : 'No upcoming sessions. Book a mentor to continue your prep!'}
              </p>
            </div>

            {/* Quick Actions */}
            <div className="flex flex-col gap-3 shrink-0">
              <Link href="/mentors">
                <Button
                  variant="secondary"
                  size="sm"
                  className="w-full !bg-white/15 !text-white !border-white/20 hover:!bg-white/25"
                >
                  <span className="material-symbols-outlined text-base mr-1">search</span>
                  Find Mentors
                </Button>
              </Link>
              <Link href="/dashboard/sessions">
                <Button
                  variant="secondary"
                  size="sm"
                  className="w-full !bg-white/15 !text-white !border-white/20 hover:!bg-white/25"
                >
                  <span className="material-symbols-outlined text-base mr-1">calendar_today</span>
                  My Sessions
                </Button>
              </Link>
            </div>
          </div>
        </div>

        {/* ── Next Session Banner ──────────────────── */}
        {stats?.nextSession && (
          <div className="mb-8 rounded-2xl border-2 border-blue-200 bg-blue-50 p-5 flex flex-col sm:flex-row items-start sm:items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-blue-100 flex flex-col items-center justify-center text-blue-700 shrink-0">
              <span className="text-xs font-bold uppercase">
                {new Date(stats.nextSession.slotDate + 'T00:00:00').toLocaleDateString('en-IN', { month: 'short' })}
              </span>
              <span className="text-lg font-headline font-bold leading-none">
                {new Date(stats.nextSession.slotDate + 'T00:00:00').getDate()}
              </span>
            </div>
            <div className="flex-1">
              <p className="text-xs font-bold uppercase tracking-wider text-blue-600 mb-0.5">
                Next Session
              </p>
              <p className="text-base font-bold text-on-surface">
                {formatDateShort(stats.nextSession.slotDate)} at{' '}
                {formatTime(stats.nextSession.slotTime.substring(0, 5))}
              </p>
              <p className="text-sm text-on-surface-variant">
                with <span className="font-semibold text-on-surface">
                  {stats.nextSession.mentorFirstName} {stats.nextSession.mentorLastName}
                </span>{' '}· {stats.nextSession.duration} min
              </p>
            </div>
            <Link href={`/mentors/${stats.nextSession.mentorProfileId}`}>
              <Button variant="primary" size="sm">View Mentor</Button>
            </Link>
          </div>
        )}

        {/* ── Stat Cards ───────────────────────────── */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
          {statCards.map((card) => (
            <Link key={card.label} href={card.href} className="group">
              <Card
                variant="elevated"
                className="h-full transition-all duration-200 group-hover:shadow-md group-hover:-translate-y-0.5"
              >
                <div className={`w-10 h-10 rounded-xl ${card.bg} flex items-center justify-center mb-4`}>
                  <span className={`material-symbols-outlined text-xl ${card.color}`}>
                    {card.icon}
                  </span>
                </div>
                <p className="text-3xl font-headline font-bold text-on-surface mb-1">
                  {card.value}
                </p>
                <p className="text-xs font-bold text-on-surface-variant uppercase tracking-wider">
                  {card.label}
                </p>
                <p className="text-xs text-on-surface-variant/70 mt-0.5">{card.sub}</p>
              </Card>
            </Link>
          ))}
        </div>

        {/* ── Main Grid ────────────────────────────── */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

          {/* ── Left: Recent Sessions ── */}
          <div className="lg:col-span-2">
            <div className="flex items-center justify-between mb-5">
              <h2 className="text-lg font-headline font-bold text-on-surface flex items-center gap-2">
                <span className="material-symbols-outlined text-primary text-xl">history</span>
                Recent Sessions
              </h2>
              <Link href="/dashboard/sessions">
                <Button variant="ghost" size="sm">View All →</Button>
              </Link>
            </div>

            {!stats?.recentSessions?.length ? (
              <Card variant="elevated" className="text-center py-14">
                <span className="material-symbols-outlined text-5xl text-on-surface-variant/20 mb-3 block">
                  event_note
                </span>
                <p className="text-on-surface font-bold mb-1">No sessions yet</p>
                <p className="text-on-surface-variant text-sm mb-4">
                  Book a mock interview with a mentor to get started.
                </p>
                <Link href="/mentors">
                  <Button variant="primary" size="sm">Browse Mentors</Button>
                </Link>
              </Card>
            ) : (
              <div className="space-y-3">
                {stats.recentSessions.map((s) => {
                  const mentorInitials = `${s.mentor.firstName.charAt(0)}${s.mentor.lastName.charAt(0)}`;
                  return (
                    <Card key={s.bookingId} variant="elevated" className="flex items-center gap-4">
                      {/* Date block */}
                      <div className="w-12 h-12 rounded-xl bg-surface-container-high flex flex-col items-center justify-center text-on-surface-variant shrink-0">
                        <span className="text-[10px] font-bold uppercase">
                          {new Date(s.slotDate + 'T00:00:00').toLocaleDateString('en-IN', { month: 'short' })}
                        </span>
                        <span className="text-lg font-headline font-bold leading-none">
                          {new Date(s.slotDate + 'T00:00:00').getDate()}
                        </span>
                      </div>

                      {/* Mentor info */}
                      <div className="flex items-center gap-3 flex-1 min-w-0">
                        <Avatar
                          src={s.mentor.profileImgUrl || undefined}
                          alt={`${s.mentor.firstName} ${s.mentor.lastName}`}
                          size="sm"
                          fallback={mentorInitials}
                        />
                        <div className="min-w-0">
                          <p className="font-bold text-on-surface text-sm truncate">
                            {s.mentor.firstName} {s.mentor.lastName}
                          </p>
                          <p className="text-xs text-on-surface-variant truncate">
                            {formatTime(s.slotTime.substring(0, 5))} · {s.duration} min
                            {s.mentor.currentCompany ? ` · ${s.mentor.currentCompany}` : ''}
                          </p>
                        </div>
                      </div>

                      {/* Status + rating */}
                      <div className="flex items-center gap-2 shrink-0 flex-wrap justify-end">
                        {s.rating && (
                          <span className="text-xs font-bold text-amber-500 flex items-center gap-0.5">
                            <span className="material-symbols-outlined text-xs">star</span>
                            {s.rating}
                          </span>
                        )}
                        <span className={`text-xs font-bold px-2.5 py-1 rounded-full ${STATUS_PILL[s.status] || 'bg-surface-container text-on-surface-variant'}`}>
                          {s.status.charAt(0) + s.status.slice(1).toLowerCase()}
                        </span>
                      </div>
                    </Card>
                  );
                })}
              </div>
            )}
          </div>

          {/* ── Right: Action Panels ── */}
          <div className="space-y-6">

            {/* Find Mentors CTA */}
            <Card variant="elevated" className="bg-gradient-to-br from-primary/5 to-[#0A2156]/5 border border-primary/15">
              <div className="text-center">
                <span className="material-symbols-outlined text-4xl text-primary mb-2 block">group</span>
                <p className="text-base font-headline font-bold text-on-surface mb-1">Find Your Mentor</p>
                <p className="text-xs text-on-surface-variant mb-4 leading-relaxed">
                  Browse industry experts from top tech companies and book a mock interview today.
                </p>
                <Link href="/mentors">
                  <Button variant="primary" size="sm" className="w-full">Browse Mentors</Button>
                </Link>
              </div>
            </Card>

            {/* Progress Tracker */}
            <Card variant="elevated">
              <h3 className="text-sm font-bold uppercase tracking-wider text-on-surface-variant mb-4 flex items-center gap-2">
                <span className="material-symbols-outlined text-base text-primary">insights</span>
                Your Progress
              </h3>
              <div className="space-y-4">
                {[
                  {
                    label: 'Sessions Completed',
                    value: stats?.completedSessions ?? 0,
                    goal: 10,
                    color: 'bg-green-500',
                  },
                  {
                    label: 'Total Bookings',
                    value: stats?.totalBookings ?? 0,
                    goal: 10,
                    color: 'bg-primary',
                  },
                ].map((item) => {
                  const pct = Math.min(100, Math.round((item.value / item.goal) * 100));
                  return (
                    <div key={item.label}>
                      <div className="flex items-center justify-between text-xs mb-1.5">
                        <span className="text-on-surface-variant">{item.label}</span>
                        <span className="font-bold text-on-surface">
                          {item.value} / {item.goal}
                        </span>
                      </div>
                      <div className="h-2 bg-surface-container-high rounded-full overflow-hidden">
                        <div
                          className={`h-full rounded-full ${item.color} transition-all duration-700`}
                          style={{ width: `${pct}%` }}
                        />
                      </div>
                    </div>
                  );
                })}
                {(stats?.completedSessions ?? 0) === 0 && (
                  <p className="text-xs text-on-surface-variant italic mt-2">
                    Complete your first session to start tracking!
                  </p>
                )}
              </div>
            </Card>

            {/* Tips */}
            <Card variant="elevated">
              <h3 className="text-sm font-bold uppercase tracking-wider text-on-surface-variant mb-4 flex items-center gap-2">
                <span className="material-symbols-outlined text-base text-primary">tips_and_updates</span>
                Interview Tips
              </h3>
              <div className="space-y-3">
                {[
                  { icon: 'record_voice_over', tip: 'Narrate your thought process clearly during system design rounds.' },
                  { icon: 'psychology', tip: 'Practice STAR method for behavioural questions before each session.' },
                  { icon: 'review', tip: 'Always ask your mentor for feedback at the end of each session.' },
                ].map((t, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <div className="w-7 h-7 rounded-lg bg-primary/8 flex items-center justify-center shrink-0 mt-0.5">
                      <span className="material-symbols-outlined text-sm text-primary">{t.icon}</span>
                    </div>
                    <p className="text-xs text-on-surface-variant leading-relaxed">{t.tip}</p>
                  </div>
                ))}
              </div>
            </Card>

          </div>
        </div>
      </Container>
    </div>
  );
}
