'use client';
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import Container from '@/app/components/layout/Container';
import Card from '@/app/components/ui/Card';
import Button from '@/app/components/ui/Button';
import Badge from '@/app/components/ui/Badge';
import Avatar from '@/app/components/ui/Avatar';
import { useAuth } from '@/contexts/AuthContext';
import { fetchApi } from '@/lib/api';
import ResourceModal from './ResourceModal';

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
  role: 'MENTOR';
  profile?: {
    firstName: string;
    lastName: string;
    profileImgUrl: string | null;
    currentPosition: string | null;
    currentCompany: string | null;
  };
  totalSlots: number;
  availableSlots: number;
  bookedSlots: number;
  totalSessions: number;
  upcomingSessions: number;
  completedSessions: number;
  avgRating: number | null;
  nextSession?: {
    slotDate: string;
    slotTime: string;
    duration: number;
    candidateId: number;
  };
  recentSessions: {
    bookingId: number;
    status: string;
    slotDate: string;
    slotTime: string;
    duration: number;
    price: number | null;
    candidateId: number;
    rating: number | null;
  }[];
}

const STATUS_COLORS: Record<string, string> = {
  SCHEDULED: 'bg-blue-100 text-blue-700',
  COMPLETED: 'bg-green-100 text-green-700',
  CANCELLED: 'bg-red-100 text-red-700',
};

export default function MentorDashboard() {
  const { user, token } = useAuth();
  const [stats, setStats] = useState<DashStats | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [showResourceModal, setShowResourceModal] = useState(false);
  const [myResources, setMyResources] = useState<any[]>([]);
  const emailName = user?.email?.split('@')[0] || 'Mentor';

  useEffect(() => {
    if (!token) return;
    loadDashboard();
  }, [token]);

  const loadDashboard = async () => {
    try {
      const [s, r] = await Promise.all([
        fetchApi<DashStats>('/dashboard/stats', { token }),
        fetchApi<any[]>('/resources/my', { token })
      ]);
      setStats(s);
      setMyResources(r);
    } catch (e) {
      console.error(e);
    } finally {
      setIsLoading(false);
    }
  };

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
      label: 'Available Slots',
      value: stats?.availableSlots ?? 0,
      sub: `${stats?.bookedSlots ?? 0} booked`,
      icon: 'calendar_month',
      color: 'text-primary',
      bg: 'bg-primary/8',
      href: '/dashboard/availability',
    },
    {
      label: 'Upcoming Sessions',
      value: stats?.upcomingSessions ?? 0,
      sub: 'Scheduled',
      icon: 'event_upcoming',
      color: 'text-blue-600',
      bg: 'bg-blue-50',
      href: '/dashboard/sessions',
    },
    {
      label: 'Completed Sessions',
      value: stats?.completedSessions ?? 0,
      sub: `${stats?.totalSessions ?? 0} total`,
      icon: 'check_circle',
      color: 'text-green-600',
      bg: 'bg-green-50',
      href: '/dashboard/sessions',
    },
    {
      label: 'Avg Rating',
      value: stats?.avgRating != null ? `${stats.avgRating}★` : '—',
      sub: 'From candidates',
      icon: 'star',
      color: 'text-amber-500',
      bg: 'bg-amber-50',
      href: '/dashboard/sessions',
    },
  ];

  return (
    <div className="bg-surface min-h-[calc(100vh-64px)] py-10 px-6">
      <Container>

        {/* ── Hero Header ─────────────────────────── */}
        <div className="relative rounded-2xl overflow-hidden mb-10 bg-gradient-to-br from-primary/90 via-primary to-primary/70 p-8 text-white shadow-xl">
          {/* Decorative blobs */}
          <div className="absolute -top-12 -right-12 w-48 h-48 rounded-full bg-white/5 pointer-events-none" />
          <div className="absolute bottom-0 left-1/2 w-72 h-72 rounded-full bg-white/5 -translate-x-1/2 translate-y-1/3 pointer-events-none" />

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
                Mentor Dashboard
              </p>
              <h1 className="text-3xl font-headline font-bold text-white mb-1">
                Welcome back, {firstName}!
              </h1>
              {stats?.profile?.currentPosition && (
                <p className="text-white/70 text-sm">
                  {stats.profile.currentPosition}
                  {stats.profile.currentCompany ? ` · ${stats.profile.currentCompany}` : ''}
                </p>
              )}
            </div>

            {/* Quick actions */}
            <div className="flex flex-col gap-3 shrink-0">
              <Link href="/dashboard/availability">
                <Button
                  variant="secondary"
                  size="sm"
                  className="w-full !bg-white/15 !text-white !border-white/20 hover:!bg-white/25"
                >
                  <span className="material-symbols-outlined text-base mr-1">add_circle</span>
                  Add Slots
                </Button>
              </Link>
              <Link href="/dashboard/sessions">
                <Button
                  variant="secondary"
                  size="sm"
                  className="w-full !bg-white/15 !text-white !border-white/20 hover:!bg-white/25"
                >
                  <span className="material-symbols-outlined text-base mr-1">video_call</span>
                  View Sessions
                </Button>
              </Link>
            </div>
          </div>
        </div>

        {/* ── Next Session Banner ──────────────────── */}
        {stats?.nextSession && (
          <div className="mb-8 rounded-2xl border-2 border-primary/20 bg-primary/5 p-5 flex flex-col sm:flex-row items-start sm:items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-primary/15 flex flex-col items-center justify-center text-primary shrink-0">
              <span className="text-xs font-bold uppercase">
                {new Date(stats.nextSession.slotDate + 'T00:00:00').toLocaleDateString('en-IN', { month: 'short' })}
              </span>
              <span className="text-lg font-headline font-bold leading-none">
                {new Date(stats.nextSession.slotDate + 'T00:00:00').getDate()}
              </span>
            </div>
            <div className="flex-1">
              <p className="text-xs font-bold uppercase tracking-wider text-primary mb-0.5">
                Next Session
              </p>
              <p className="text-base font-bold text-on-surface">
                {formatDateShort(stats.nextSession.slotDate)} at{' '}
                {formatTime(stats.nextSession.slotTime.substring(0, 5))}
              </p>
              <p className="text-sm text-on-surface-variant">
                {stats.nextSession.duration} min · Candidate #{stats.nextSession.candidateId}
              </p>
            </div>
            <Link href="/dashboard/sessions">
              <Button variant="primary" size="sm">View Details</Button>
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

          {/* ── Left: Recent Sessions & Resources ── */}
          <div className="lg:col-span-2 space-y-10">
            
            {/* Recent Sessions */}
            <div>
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
                    event_busy
                  </span>
                  <p className="text-on-surface-variant text-sm">No sessions yet.</p>
                  <Link href="/dashboard/availability">
                    <Button variant="primary" size="sm" className="mt-4">Create Availability</Button>
                  </Link>
                </Card>
              ) : (
                <div className="space-y-3">
                  {stats.recentSessions.map((s) => (
                    <Card key={s.bookingId} variant="elevated" className="flex items-center gap-4 transition-all hover:border-primary/30">
                      {/* Date block */}
                      <div className="w-12 h-12 rounded-xl bg-surface-container-high flex flex-col items-center justify-center text-on-surface-variant shrink-0">
                        <span className="text-[10px] font-bold uppercase">
                          {new Date(s.slotDate + 'T00:00:00').toLocaleDateString('en-IN', { month: 'short' })}
                        </span>
                        <span className="text-lg font-headline font-bold leading-none">
                          {new Date(s.slotDate + 'T00:00:00').getDate()}
                        </span>
                      </div>

                      <div className="flex-1 min-w-0">
                        <p className="font-bold text-on-surface text-sm">
                          {formatDateShort(s.slotDate)}
                        </p>
                        <p className="text-xs text-on-surface-variant flex items-center gap-1.5 mt-0.5">
                          <span className="material-symbols-outlined text-xs">schedule</span>
                          {formatTime(s.slotTime.substring(0, 5))} · {s.duration} min
                        </p>
                      </div>

                      <div className="flex items-center gap-2 shrink-0 flex-wrap justify-end">
                        {s.rating && (
                          <span className="text-xs font-bold text-amber-500 flex items-center gap-0.5">
                            <span className="material-symbols-outlined text-xs">star</span>
                            {s.rating}
                          </span>
                        )}
                        {s.price && s.price > 0 ? (
                          <span className="text-xs font-bold text-primary">₹{s.price}</span>
                        ) : (
                          <span className="text-xs text-green-600 font-medium">Free</span>
                        )}
                        <span className={`text-xs font-bold px-2.5 py-1 rounded-full ${STATUS_COLORS[s.status] || 'bg-surface-container text-on-surface-variant'}`}>
                          {s.status.charAt(0) + s.status.slice(1).toLowerCase()}
                        </span>
                      </div>
                    </Card>
                  ))}
                </div>
              )}
            </div>

            {/* My Shared Resources */}
            <div>
              <div className="flex items-center justify-between mb-5">
                <h2 className="text-lg font-headline font-bold text-on-surface flex items-center gap-2">
                  <span className="material-symbols-outlined text-primary text-xl">folder_shared</span>
                  My Resources
                </h2>
                <Button 
                  variant="primary" 
                  size="sm" 
                  className="rounded-full shadow-lg"
                  onClick={() => setShowResourceModal(true)}
                >
                  <span className="material-symbols-outlined text-base mr-1">add</span>
                  Create New
                </Button>
              </div>
              
              {myResources.length === 0 ? (
                <Card variant="elevated" className="bg-slate-50/50 border-dashed border-2 border-slate-200">
                  <div className="text-center py-10">
                    <span className="material-symbols-outlined text-4xl text-slate-300 mb-3 block">auto_stories</span>
                    <p className="text-sm text-slate-500 font-medium max-w-xs mx-auto">
                      Share workshops, masterclasses, and recordings with the community to build your mentor brand.
                    </p>
                    <Link href="/resources">
                      <Button variant="ghost" size="sm" className="mt-4 font-bold">Browse Public Resources</Button>
                    </Link>
                  </div>
                </Card>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {myResources.map(res => (
                    <Card key={res.id} variant="elevated" className="p-4 flex flex-col h-full border-l-4 border-l-primary">
                      <div className="flex justify-between items-start mb-3">
                        <span className="px-2 py-0.5 bg-primary/10 text-primary rounded text-[9px] font-bold uppercase tracking-wider">
                          {res.type}
                        </span>
                        <div className="flex items-center gap-2 text-slate-400">
                          <span className="flex items-center gap-1 text-[10px] font-bold">
                            <span className="material-symbols-outlined text-xs">thumb_up</span> {res.likes}
                          </span>
                        </div>
                      </div>
                      <h4 className="font-bold text-slate-900 text-sm mb-2 line-clamp-1">{res.title}</h4>
                      <p className="text-xs text-slate-500 mb-4 line-clamp-2 flex-grow">{res.description}</p>
                      <div className="flex justify-between items-center mt-auto">
                        <span className="text-[10px] text-slate-400">{new Date(res.createdAt).toLocaleDateString()}</span>
                        <Link href={res.contentUrl || '#'} target="_blank">
                          <span className="material-symbols-outlined text-slate-400 hover:text-primary cursor-pointer text-base">open_in_new</span>
                        </Link>
                      </div>
                    </Card>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* ── Right: Quick Actions + Tips ── */}
          <div className="space-y-6">
            {/* Slot Overview */}
            <Card variant="elevated">
              <h3 className="text-sm font-bold uppercase tracking-wider text-on-surface-variant mb-4 flex items-center gap-2">
                <span className="material-symbols-outlined text-base text-primary">donut_small</span>
                Slot Overview
              </h3>
              <div className="space-y-3">
                {[
                  { label: 'Total Slots', value: stats?.totalSlots ?? 0, color: 'bg-primary' },
                  { label: 'Available', value: stats?.availableSlots ?? 0, color: 'bg-green-500' },
                  { label: 'Booked', value: stats?.bookedSlots ?? 0, color: 'bg-blue-500' },
                ].map((item) => {
                  const pct = stats?.totalSlots ? Math.round((item.value / stats.totalSlots) * 100) : 0;
                  return (
                    <div key={item.label}>
                      <div className="flex items-center justify-between text-xs mb-1">
                        <span className="text-on-surface-variant">{item.label}</span>
                        <span className="font-bold text-on-surface">{item.value}</span>
                      </div>
                      <div className="h-1.5 bg-surface-container-high rounded-full overflow-hidden">
                        <div
                          className={`h-full rounded-full ${item.color} transition-all duration-500`}
                          style={{ width: `${pct}%` }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            </Card>

            {/* Tips for Mentors */}
            <Card variant="elevated">
              <h3 className="text-sm font-bold uppercase tracking-wider text-on-surface-variant mb-4 flex items-center gap-2">
                <span className="material-symbols-outlined text-base text-primary">tips_and_updates</span>
                Quick Tips
              </h3>
              <div className="space-y-3">
                {[
                  { icon: 'calendar_add_on', tip: 'Keep slots posted for the next 3 days for best visibility.' },
                  { icon: 'attach_money', tip: 'Add a price to monetize your expertise, or offer free sessions to build reviews.' },
                  { icon: 'star', tip: 'Complete sessions get candidate ratings — they boost your profile.' },
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

            {/* CTA: View Profile */}
            <Card variant="elevated" className="bg-gradient-to-br from-primary/5 to-primary/10 border border-primary/15">
              <div className="text-center">
                <span className="material-symbols-outlined text-3xl text-primary mb-2 block">account_circle</span>
                <p className="text-sm font-bold text-on-surface mb-1">Your Public Profile</p>
                <p className="text-xs text-on-surface-variant mb-4">
                  Candidates discover you through your profile. Keep it updated.
                </p>
                <Link href="/dashboard/settings">
                  <Button variant="primary" size="sm" className="w-full">Edit Profile</Button>
                </Link>
              </div>
            </Card>
          </div>
        </div>
      </Container>
      {showResourceModal && (
        <ResourceModal 
          token={token!} 
          onClose={() => setShowResourceModal(false)} 
          onSuccess={() => {
            // Potentially refresh resources list if we had one here
          }}
        />
      )}
    </div>
  );
}
