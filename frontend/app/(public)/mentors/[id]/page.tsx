'use client';
import React, { useState, useEffect, useMemo } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Container from '@/app/components/layout/Container';
import Card from '@/app/components/ui/Card';
import Button from '@/app/components/ui/Button';
import Badge from '@/app/components/ui/Badge';
import Avatar from '@/app/components/ui/Avatar';
import { useAuth } from '@/contexts/AuthContext';
import { fetchApi } from '@/lib/api';

// ── Helpers ──────────────────────────────────────────
function formatTimeDisplay(timeStr: string): string {
  const parts = timeStr.split(':');
  const h = parseInt(parts[0]);
  const m = parts[1];
  const period = h >= 12 ? 'PM' : 'AM';
  const hour12 = h === 0 ? 12 : h > 12 ? h - 12 : h;
  return `${hour12}:${m} ${period}`;
}

function getDateLabel(dateStr: string): string {
  const date = new Date(dateStr + 'T00:00:00');
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const tomorrow = new Date(today);
  tomorrow.setDate(today.getDate() + 1);

  if (date.getTime() === today.getTime()) return 'Today';
  if (date.getTime() === tomorrow.getTime()) return 'Tomorrow';
  return date.toLocaleDateString('en-IN', { weekday: 'long', month: 'short', day: 'numeric' });
}

interface MentorInfo {
  profileId: number;
  firstName: string;
  lastName: string;
  profileImgUrl: string | null;
  bio: string | null;
  currentCompany: string | null;
  currentPosition: string | null;
  yearsOfExperience: number | null;
  interestsTags: string | null;
  linkedinUrl: string | null;
  githubUrl: string | null;
}

interface SlotInfo {
  id: number;
  date: string;
  startTime: string;
  timeInterval: number;
  price: number | null;
  isBooked: boolean;
}

export default function MentorProfilePage() {
  const params = useParams();
  const router = useRouter();
  const profileId = params.id as string;
  const { token, isAuthenticated, user } = useAuth();

  const [mentor, setMentor] = useState<MentorInfo | null>(null);
  const [slots, setSlots] = useState<SlotInfo[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [selectedSlot, setSelectedSlot] = useState<SlotInfo | null>(null);
  const [isBooking, setIsBooking] = useState(false);
  const [bookingResult, setBookingResult] = useState<{ success: boolean; message: string } | null>(null);
  const [showLoginPrompt, setShowLoginPrompt] = useState(false);

  useEffect(() => {
    loadMentorData();
  }, [profileId]);

  const loadMentorData = async () => {
    setIsLoading(true);
    try {
      const data = await fetchApi<{ mentor: MentorInfo; slots: SlotInfo[] }>(
        `/candidate/mentors/${profileId}/slots`
      );
      setMentor(data.mentor);
      setSlots(data.slots);

      // Auto-select the first available date
      if (data.slots.length > 0) {
        setSelectedDate(data.slots[0].date);
      }
    } catch (err) {
      console.error('Failed to load mentor data', err);
    } finally {
      setIsLoading(false);
    }
  };

  // ── Group slots by date ─────────────────────────────
  const slotsByDate = useMemo(() => {
    const grouped: Record<string, SlotInfo[]> = {};
    for (const slot of slots) {
      const key = slot.date;
      if (!grouped[key]) grouped[key] = [];
      grouped[key].push(slot);
    }
    return grouped;
  }, [slots]);

  const availableDates = useMemo(() => Object.keys(slotsByDate).sort(), [slotsByDate]);
  const slotsForSelectedDate = selectedDate ? (slotsByDate[selectedDate] || []) : [];

  // ── Booking Handler ────────────────────────────────
  const handleBookSlot = async (slot: SlotInfo) => {
    if (!isAuthenticated) {
      setShowLoginPrompt(true);
      return;
    }

    setSelectedSlot(slot);
  };

  const confirmBooking = async () => {
    if (!selectedSlot || !token) return;

    setIsBooking(true);
    setBookingResult(null);

    try {
      const response = await fetchApi<{
        message: string;
        bookingId: number;
        slotDate: string;
        slotTime: string;
        duration: number;
      }>('/candidate/book', {
        token,
        data: { slotId: selectedSlot.id },
      });

      setBookingResult({ success: true, message: response.message });

      // Remove the booked slot from the list
      setSlots((prev) =>
        prev.map((s) => (s.id === selectedSlot.id ? { ...s, isBooked: true } : s))
      );

      // Clear selection after short delay
      setTimeout(() => {
        setSelectedSlot(null);
        setBookingResult(null);
      }, 3000);
    } catch (err: any) {
      setBookingResult({ success: false, message: err.message || 'Booking failed.' });
    } finally {
      setIsBooking(false);
    }
  };

  const tags = mentor?.interestsTags?.split(',').map((t) => t.trim()).filter(Boolean) || [];
  const initials = `${mentor?.firstName?.charAt(0) || ''}${mentor?.lastName?.charAt(0) || ''}`;

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="w-10 h-10 border-3 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-on-surface-variant">Loading mentor profile...</p>
        </div>
      </div>
    );
  }

  if (!mentor) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <span className="material-symbols-outlined text-6xl text-on-surface-variant/20 mb-4 block">error</span>
          <h2 className="text-xl font-bold text-on-surface mb-2">Mentor Not Found</h2>
          <p className="text-on-surface-variant mb-6">This mentor profile doesn&apos;t exist or has been removed.</p>
          <Button variant="primary" onClick={() => router.push('/mentors')}>
            Browse Mentors
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-background min-h-screen">
      {/* Top gradient */}
      <div className="h-48 bg-gradient-to-br from-primary/10 via-primary-container/15 to-transparent" />

      <div className="-mt-24 pb-16 px-6">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* ── Left: Mentor Profile ──────── */}
            <div className="lg:col-span-1">
              <Card variant="elevated" className="sticky top-24">
                {/* Profile Header */}
                <div className="text-center mb-6">
                  <div className="inline-block mb-4">
                    <Avatar
                      src={mentor.profileImgUrl || undefined}
                      alt={`${mentor.firstName} ${mentor.lastName}`}
                      size="xl"
                      fallback={initials}
                    />
                  </div>
                  <h1 className="text-2xl font-headline font-bold text-on-surface">
                    {mentor.firstName} {mentor.lastName}
                  </h1>
                  {mentor.currentPosition && (
                    <p className="text-sm text-on-surface-variant mt-1">
                      {mentor.currentPosition}
                    </p>
                  )}
                  {mentor.currentCompany && (
                    <p className="text-sm font-medium text-primary mt-0.5">
                      {mentor.currentCompany}
                    </p>
                  )}
                </div>

                {/* Bio */}
                {mentor.bio && (
                  <div className="mb-6">
                    <h3 className="text-xs font-bold uppercase tracking-wider text-on-surface-variant mb-2">About</h3>
                    <p className="text-sm text-on-surface leading-relaxed">
                      {mentor.bio}
                    </p>
                  </div>
                )}

                {/* Experience */}
                {mentor.yearsOfExperience && (
                  <div className="flex items-center gap-2 mb-6 text-sm text-on-surface-variant">
                    <span className="material-symbols-outlined text-base text-primary">work</span>
                    <span>{mentor.yearsOfExperience}+ years of experience</span>
                  </div>
                )}

                {/* Expertise Tags */}
                {tags.length > 0 && (
                  <div className="mb-6">
                    <h3 className="text-xs font-bold uppercase tracking-wider text-on-surface-variant mb-3">Expertise</h3>
                    <div className="flex flex-wrap gap-2">
                      {tags.map((tag, i) => (
                        <span
                          key={i}
                          className="inline-block px-3 py-1.5 rounded-full bg-primary/8 text-primary text-xs font-medium"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Social Links */}
                <div className="flex items-center gap-3 pt-5 border-t border-outline-variant/15">
                  {mentor.linkedinUrl && (
                    <a
                      href={mentor.linkedinUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-surface-container-high text-on-surface-variant hover:text-primary transition-colors text-sm"
                    >
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                      </svg>
                      LinkedIn
                    </a>
                  )}
                  {mentor.githubUrl && (
                    <a
                      href={mentor.githubUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-surface-container-high text-on-surface-variant hover:text-on-surface transition-colors text-sm"
                    >
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                      </svg>
                      GitHub
                    </a>
                  )}
                </div>
              </Card>
            </div>

            {/* ── Right: Booking Calendar ──────── */}
            <div className="lg:col-span-2 space-y-6">
              <Card variant="elevated">
                <div className="flex items-center gap-3 mb-6">
                  <span className="material-symbols-outlined text-primary text-2xl">calendar_month</span>
                  <div>
                    <h2 className="text-xl font-headline font-bold text-on-surface">
                      Book a Session
                    </h2>
                    <p className="text-sm text-on-surface-variant">
                      Select a date and time for your mock interview
                    </p>
                  </div>
                </div>

                {availableDates.length === 0 ? (
                  <div className="text-center py-16">
                    <span className="material-symbols-outlined text-5xl text-on-surface-variant/20 mb-4 block">
                      event_busy
                    </span>
                    <h3 className="text-lg font-bold text-on-surface mb-2">No Available Slots</h3>
                    <p className="text-sm text-on-surface-variant max-w-sm mx-auto">
                      This mentor hasn&apos;t posted any availability yet. Check back later or browse other mentors.
                    </p>
                    <Button
                      variant="secondary"
                      size="sm"
                      onClick={() => router.push('/mentors')}
                      className="mt-6"
                    >
                      Browse Other Mentors
                    </Button>
                  </div>
                ) : (
                  <>
                    {/* Date Strip */}
                    <div className="flex gap-3 mb-8 pb-6 border-b border-outline-variant/15">
                      {availableDates.map((dateStr) => {
                        const date = new Date(dateStr + 'T00:00:00');
                        const isSelected = selectedDate === dateStr;
                        const slotCount = slotsByDate[dateStr]?.filter((s) => !s.isBooked).length || 0;

                        return (
                          <button
                            key={dateStr}
                            onClick={() => setSelectedDate(dateStr)}
                            className={`
                              flex flex-col items-center px-6 py-4 rounded-2xl border-2 transition-all duration-200 min-w-[100px] cursor-pointer
                              ${isSelected
                                ? 'border-primary bg-primary/10 shadow-md'
                                : 'border-outline-variant/20 bg-surface-container-lowest hover:border-primary/30 hover:shadow-sm'
                              }
                            `}
                          >
                            <span className={`text-xs font-bold uppercase tracking-wider mb-1 ${isSelected ? 'text-primary' : 'text-on-surface-variant'}`}>
                              {date.toLocaleDateString('en-IN', { weekday: 'short' })}
                            </span>
                            <span className={`text-3xl font-headline font-bold ${isSelected ? 'text-primary' : 'text-on-surface'}`}>
                              {date.getDate()}
                            </span>
                            <span className={`text-[10px] uppercase tracking-wide mb-2 ${isSelected ? 'text-primary' : 'text-on-surface-variant'}`}>
                              {getDateLabel(dateStr)}
                            </span>
                            <span className={`text-[10px] px-2 py-0.5 rounded-full ${isSelected ? 'bg-primary/20 text-primary' : 'bg-surface-container-high text-on-surface-variant'}`}>
                              {slotCount} slot{slotCount !== 1 ? 's' : ''}
                            </span>
                          </button>
                        );
                      })}
                    </div>

                    {/* Time Slots Grid */}
                    <div>
                      <h3 className="text-sm font-bold uppercase tracking-wider text-on-surface-variant mb-4">
                        Available Times — {selectedDate && getDateLabel(selectedDate)}
                      </h3>

                      {slotsForSelectedDate.filter((s) => !s.isBooked).length === 0 ? (
                        <div className="text-center py-8">
                          <p className="text-sm text-on-surface-variant">All slots for this day are booked.</p>
                        </div>
                      ) : (
                        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                          {slotsForSelectedDate
                            .filter((s) => !s.isBooked)
                            .map((slot) => (
                              <button
                                key={slot.id}
                                onClick={() => handleBookSlot(slot)}
                                className={`
                                  group flex flex-col items-center px-4 py-4 rounded-xl border-2 transition-all duration-200 cursor-pointer
                                  ${selectedSlot?.id === slot.id
                                    ? 'border-primary bg-primary/10 shadow-md ring-2 ring-primary/20'
                                    : 'border-outline-variant/15 bg-surface-container-lowest hover:border-primary/40 hover:shadow-sm hover:-translate-y-0.5'
                                  }
                                `}
                              >
                                <span className={`material-symbols-outlined text-lg mb-1 ${selectedSlot?.id === slot.id ? 'text-primary' : 'text-on-surface-variant group-hover:text-primary'} transition-colors`}>
                                  schedule
                                </span>
                                <span className="text-base font-bold text-on-surface">
                                  {formatTimeDisplay(slot.startTime.substring(0, 5))}
                                </span>
                                <span className="text-xs text-on-surface-variant mt-0.5">
                                  {slot.timeInterval} min
                                </span>
                                {slot.price && slot.price > 0 ? (
                                  <span className="text-xs font-medium text-primary mt-1">
                                    ₹{slot.price}
                                  </span>
                                ) : (
                                  <span className="text-xs font-medium text-green-600 mt-1">
                                    Free
                                  </span>
                                )}
                              </button>
                            ))}
                        </div>
                      )}
                    </div>
                  </>
                )}
              </Card>
            </div>
          </div>
        </Container>
      </div>

      {/* ── Booking Confirmation Modal ──────── */}
      {selectedSlot && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={() => { setSelectedSlot(null); setBookingResult(null); }} />
          <div className="relative bg-surface-container-lowest rounded-2xl shadow-2xl max-w-md w-full p-8">
            {bookingResult?.success ? (
              /* Success State */
              <div className="text-center">
                <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-4">
                  <span className="material-symbols-outlined text-3xl text-green-600">check_circle</span>
                </div>
                <h3 className="text-xl font-headline font-bold text-on-surface mb-2">
                  Session Booked!
                </h3>
                <p className="text-sm text-on-surface-variant mb-6">
                  {bookingResult.message}
                </p>
                <div className="bg-surface-container-low rounded-xl p-4 mb-6">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-on-surface-variant">Date</span>
                    <span className="font-bold text-on-surface">{getDateLabel(selectedSlot.date)}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm mt-2">
                    <span className="text-on-surface-variant">Time</span>
                    <span className="font-bold text-on-surface">{formatTimeDisplay(selectedSlot.startTime.substring(0, 5))}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm mt-2">
                    <span className="text-on-surface-variant">Duration</span>
                    <span className="font-bold text-on-surface">{selectedSlot.timeInterval} minutes</span>
                  </div>
                </div>
                <Button variant="primary" onClick={() => { setSelectedSlot(null); setBookingResult(null); }}>
                  Done
                </Button>
              </div>
            ) : (
              /* Confirmation State */
              <>
                <div className="text-center mb-6">
                  <span className="material-symbols-outlined text-4xl text-primary mb-2 block">event_available</span>
                  <h3 className="text-xl font-headline font-bold text-on-surface">
                    Confirm Booking
                  </h3>
                  <p className="text-sm text-on-surface-variant mt-1">
                    Book a session with {mentor?.firstName} {mentor?.lastName}
                  </p>
                </div>

                <div className="bg-surface-container-low rounded-xl p-5 mb-6 space-y-3">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-on-surface-variant flex items-center gap-2">
                      <span className="material-symbols-outlined text-base">calendar_today</span>
                      Date
                    </span>
                    <span className="font-bold text-on-surface">{getDateLabel(selectedSlot.date)}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-on-surface-variant flex items-center gap-2">
                      <span className="material-symbols-outlined text-base">schedule</span>
                      Time
                    </span>
                    <span className="font-bold text-on-surface">{formatTimeDisplay(selectedSlot.startTime.substring(0, 5))}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-on-surface-variant flex items-center gap-2">
                      <span className="material-symbols-outlined text-base">timer</span>
                      Duration
                    </span>
                    <span className="font-bold text-on-surface">{selectedSlot.timeInterval} minutes</span>
                  </div>
                  {selectedSlot.price && selectedSlot.price > 0 && (
                    <div className="flex items-center justify-between text-sm pt-2 border-t border-outline-variant/15">
                      <span className="text-on-surface-variant flex items-center gap-2">
                        <span className="material-symbols-outlined text-base">payments</span>
                        Price
                      </span>
                      <span className="font-bold text-primary text-lg">₹{selectedSlot.price}</span>
                    </div>
                  )}
                </div>

                {bookingResult && !bookingResult.success && (
                  <div className="mb-4 px-4 py-3 rounded-lg bg-red-50 text-sm text-red-700">
                    {bookingResult.message}
                  </div>
                )}

                <div className="flex gap-3">
                  <Button
                    variant="secondary"
                    className="flex-1"
                    onClick={() => { setSelectedSlot(null); setBookingResult(null); }}
                  >
                    Cancel
                  </Button>
                  <Button
                    variant="primary"
                    className="flex-1"
                    onClick={confirmBooking}
                    disabled={isBooking}
                    loading={isBooking}
                  >
                    {isBooking ? 'Booking...' : 'Confirm Booking'}
                  </Button>
                </div>
              </>
            )}
          </div>
        </div>
      )}

      {/* ── Login Prompt Modal ──────── */}
      {showLoginPrompt && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={() => setShowLoginPrompt(false)} />
          <div className="relative bg-surface-container-lowest rounded-2xl shadow-2xl max-w-sm w-full p-8 text-center">
            <span className="material-symbols-outlined text-5xl text-primary mb-4 block">lock</span>
            <h3 className="text-xl font-headline font-bold text-on-surface mb-2">
              Sign In Required
            </h3>
            <p className="text-sm text-on-surface-variant mb-6">
              Please log in or create an account to book a session with this mentor.
            </p>
            <div className="flex gap-3">
              <Button variant="secondary" className="flex-1" onClick={() => setShowLoginPrompt(false)}>
                Cancel
              </Button>
              <Button variant="primary" className="flex-1" onClick={() => router.push('/login')}>
                Sign In
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
