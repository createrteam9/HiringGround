'use client';
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Container from '@/app/components/layout/Container';
import Card from '@/app/components/ui/Card';
import Badge from '@/app/components/ui/Badge';
import Button from '@/app/components/ui/Button';
import Avatar from '@/app/components/ui/Avatar';
import { useAuth } from '@/contexts/AuthContext';
import { fetchApi } from '@/lib/api';

// ── Helpers ────────────────────────────────────────────
function formatTime(timeStr: string): string {
  if (!timeStr) return '';
  const parts = timeStr.split(':');
  const h = parseInt(parts[0]);
  const m = parts[1];
  const period = h >= 12 ? 'PM' : 'AM';
  const hour12 = h === 0 ? 12 : h > 12 ? h - 12 : h;
  return `${hour12}:${m} ${period}`;
}

function formatDate(dateStr: string): string {
  const date = new Date(dateStr + 'T00:00:00');
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const tomorrow = new Date(today);
  tomorrow.setDate(today.getDate() + 1);

  if (date.getTime() === today.getTime()) return 'Today';
  if (date.getTime() === tomorrow.getTime()) return 'Tomorrow';
  return date.toLocaleDateString('en-IN', { weekday: 'short', month: 'short', day: 'numeric' });
}

function getStatusStyle(status: string): { variant: string; label: string } {
  switch (status?.toUpperCase()) {
    case 'SCHEDULED': return { variant: 'primary', label: 'Scheduled' };
    case 'COMPLETED': return { variant: 'success', label: 'Completed' };
    case 'CANCELLED': return { variant: 'error', label: 'Cancelled' };
    default: return { variant: 'secondary', label: status || 'Unknown' };
  }
}

// ── Types ───────────────────────────────────────────────
interface MentorSession {
  bookingId: number;
  status: string;
  interviewDate: string;
  slotDate: string;
  slotTime: string;
  duration: number;
  price: number | null;
  isPaid: boolean;
  rating: number | null;
  review: string | null;
  candidateId: number;
}

interface CandidateSession {
  bookingId: number;
  status: string;
  interviewDate: string;
  slotDate: string;
  slotTime: string;
  duration: number;
  price: number | null;
  isPaid: boolean;
  rating: number | null;
  review: string | null;
  mentor: {
    profileId: number;
    firstName: string;
    lastName: string;
    currentPosition: string | null;
    currentCompany: string | null;
    profileImgUrl: string | null;
  };
}

// ── Mentor Sessions View ───────────────────────────────
function MentorSessionsView({ token }: { token: string }) {
  const [sessions, setSessions] = useState<MentorSession[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [updatingId, setUpdatingId] = useState<number | null>(null);

  useEffect(() => {
    fetchApi<MentorSession[]>('/mentor/slots/sessions', { token })
      .then(setSessions)
      .catch(console.error)
      .finally(() => setIsLoading(false));
  }, [token]);

  const handleUpdateStatus = async (bookingId: number, status: string) => {
    setUpdatingId(bookingId);
    try {
      await fetchApi(`/mentor/slots/sessions/${bookingId}/status?status=${status}`, {
        token,
        method: 'PATCH',
      });
      setSessions(prev => prev.map(s => s.bookingId === bookingId ? { ...s, status } : s));
    } catch (e: any) {
      alert('Failed to update status: ' + e.message);
    } finally {
      setUpdatingId(null);
    }
  };

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center py-24">
        <div className="w-10 h-10 border-2 border-primary border-t-transparent rounded-full animate-spin mb-4" />
        <p className="text-on-surface-variant">Loading sessions...</p>
      </div>
    );
  }

  if (sessions.length === 0) {
    return (
      <div className="text-center py-20">
        <span className="material-symbols-outlined text-6xl text-on-surface-variant/20 mb-4 block">event_busy</span>
        <h2 className="text-xl font-bold text-on-surface mb-2">No Sessions Yet</h2>
        <p className="text-on-surface-variant max-w-sm mx-auto">
          When candidates book your slots, they&apos;ll appear here. Make sure you have available slots posted.
        </p>
        <Link href="/dashboard/availability">
          <Button variant="primary" className="mt-6">Manage Availability</Button>
        </Link>
      </div>
    );
  }

  const upcoming = sessions.filter(s => s.status === 'SCHEDULED');
  const past = sessions.filter(s => s.status !== 'SCHEDULED');

  return (
    <div className="space-y-10">
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {[
          { label: 'Total Sessions', value: sessions.length, icon: 'video_call', color: 'text-primary' },
          { label: 'Upcoming', value: upcoming.length, icon: 'event_upcoming', color: 'text-blue-500' },
          { label: 'Completed', value: sessions.filter(s => s.status === 'COMPLETED').length, icon: 'check_circle', color: 'text-green-500' },
          { label: 'Avg Rating', value: sessions.some(s => s.rating) ? (sessions.filter(s => s.rating).reduce((acc, s) => acc + (s.rating || 0), 0) / sessions.filter(s => s.rating).length).toFixed(1) + '★' : '—', icon: 'star', color: 'text-amber-500' },
        ].map(stat => (
          <Card key={stat.label} variant="elevated" className="text-center">
            <span className={`material-symbols-outlined text-2xl ${stat.color} mb-2 block`}>{stat.icon}</span>
            <p className="text-2xl font-headline font-bold text-on-surface">{stat.value}</p>
            <p className="text-xs text-on-surface-variant mt-0.5">{stat.label}</p>
          </Card>
        ))}
      </div>

      {upcoming.length > 0 && (
        <div>
          <h2 className="text-lg font-headline font-bold text-on-surface mb-4 flex items-center gap-2">
            <span className="material-symbols-outlined text-primary">event_upcoming</span>
            Upcoming Sessions
          </h2>
          <div className="space-y-3">
            {upcoming.map(session => {
              const { label } = getStatusStyle(session.status);
              return (
                <Card key={session.bookingId} variant="elevated" className="flex flex-col sm:flex-row sm:items-center gap-4">
                  <div className="flex items-center gap-4 flex-1">
                    <div className="w-12 h-12 rounded-xl bg-primary/10 flex flex-col items-center justify-center text-primary shrink-0">
                      <span className="text-xs font-bold uppercase">{new Date(session.slotDate + 'T00:00:00').toLocaleDateString('en-IN', { month: 'short' })}</span>
                      <span className="text-lg font-headline font-bold leading-none">{new Date(session.slotDate + 'T00:00:00').getDate()}</span>
                    </div>
                    <div>
                      <p className="font-bold text-on-surface">{formatDate(session.slotDate)}</p>
                      <p className="text-sm text-on-surface-variant flex items-center gap-2 mt-0.5">
                        <span className="material-symbols-outlined text-sm">schedule</span>
                        {formatTime(session.slotTime.substring(0, 5))} · {session.duration} min
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 flex-wrap">
                    <div className="flex gap-2 mr-2">
                      <Button 
                        variant="primary" 
                        size="sm" 
                        onClick={() => handleUpdateStatus(session.bookingId, 'COMPLETED')}
                        disabled={updatingId === session.bookingId}
                      >Done</Button>
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        className="!text-red-500 hover:!bg-red-50"
                        onClick={() => handleUpdateStatus(session.bookingId, 'CANCELLED')}
                        disabled={updatingId === session.bookingId}
                      >Cancel</Button>
                    </div>
                    <span className="text-xs text-on-surface-variant bg-surface-container px-3 py-1 rounded-full">
                      Candidate #{session.candidateId}
                    </span>
                    {session.price && session.price > 0 ? (
                      <span className="text-sm font-bold text-primary">₹{session.price}</span>
                    ) : (
                      <span className="text-sm font-medium text-green-600">Free</span>
                    )}
                    <Badge variant="primary">{label}</Badge>
                  </div>
                </Card>
              );
            })}
          </div>
        </div>
      )}

      {past.length > 0 && (
        <div>
          <h2 className="text-lg font-headline font-bold text-on-surface mb-4 flex items-center gap-2">
            <span className="material-symbols-outlined text-on-surface-variant">history</span>
            Past Sessions
          </h2>
          <div className="space-y-3">
            {past.map(session => {
              const { label, variant } = getStatusStyle(session.status);
              return (
                <Card key={session.bookingId} variant="section" className="flex flex-col sm:flex-row sm:items-center gap-4">
                  <div className="flex items-center gap-4 flex-1">
                    <div className="w-12 h-12 rounded-xl bg-surface-container-high flex flex-col items-center justify-center text-on-surface-variant shrink-0">
                      <span className="text-xs font-bold uppercase">{new Date(session.slotDate + 'T00:00:00').toLocaleDateString('en-IN', { month: 'short' })}</span>
                      <span className="text-lg font-headline font-bold leading-none">{new Date(session.slotDate + 'T00:00:00').getDate()}</span>
                    </div>
                    <div>
                      <p className="font-bold text-on-surface">{formatDate(session.slotDate)}</p>
                      <p className="text-sm text-on-surface-variant flex items-center gap-2 mt-0.5">
                        <span className="material-symbols-outlined text-sm">schedule</span>
                        {formatTime(session.slotTime.substring(0, 5))} · {session.duration} min
                      </p>
                      {session.review && (
                        <p className="text-xs text-on-surface-variant italic mt-1 line-clamp-1">&ldquo;{session.review}&rdquo;</p>
                      )}
                    </div>
                  </div>
                  <div className="flex items-center gap-3 flex-wrap">
                    {session.rating && (
                      <span className="text-sm font-bold text-amber-500 flex items-center gap-1">
                        <span className="material-symbols-outlined text-base">star</span>
                        {session.rating}
                      </span>
                    )}
                    <Badge variant={variant as any}>{label}</Badge>
                  </div>
                </Card>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}

// ── Star Rating ────────────────────────────────────────
function StarRating({ value, onChange }: { value: number; onChange: (v: number) => void }) {
  const [hovered, setHovered] = useState(0);
  return (
    <div className="flex gap-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          key={star}
          type="button"
          onClick={() => onChange(star)}
          onMouseEnter={() => setHovered(star)}
          onMouseLeave={() => setHovered(0)}
          className="cursor-pointer transition-transform hover:scale-110"
        >
          <span
            className={`material-symbols-outlined text-3xl transition-colors ${
              star <= (hovered || value) ? 'text-amber-400' : 'text-on-surface-variant/20'
            }`}
            style={{ fontVariationSettings: star <= (hovered || value) ? "'FILL' 1" : "'FILL' 0" }}
          >
            star
          </span>
        </button>
      ))}
    </div>
  );
}

// ── Review Modal ───────────────────────────────────────
function ReviewModal({
  session, token, onClose, onSuccess,
}: {
  session: CandidateSession;
  token: string;
  onClose: () => void;
  onSuccess: (bookingId: number, rating: number, review: string) => void;
}) {
  const [rating, setRating] = useState(0);
  const [review, setReview] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async () => {
    if (!rating) { setError('Please select a rating.'); return; }
    setIsSubmitting(true);
    try {
      await fetchApi(`/candidate/sessions/${session.bookingId}/review`, {
        token,
        data: { rating, review },
      });
      onSuccess(session.bookingId, rating, review);
      onClose();
    } catch (e: any) {
      setError(e.message || 'Failed to submit review.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose} />
      <div className="relative bg-surface-container-lowest rounded-2xl shadow-2xl max-w-md w-full p-8">
        <button onClick={onClose} className="absolute top-4 right-4 p-1 rounded-lg hover:bg-surface-container text-on-surface-variant">
          <span className="material-symbols-outlined">close</span>
        </button>
        <div className="text-center mb-6">
          <span className="material-symbols-outlined text-4xl text-primary mb-2 block">rate_review</span>
          <h3 className="text-xl font-headline font-bold text-on-surface">Rate Your Session</h3>
          <p className="text-sm text-on-surface-variant mt-1">
            with {session.mentor.firstName} {session.mentor.lastName}
          </p>
        </div>
        <div className="mb-6 text-center">
          <StarRating value={rating} onChange={setRating} />
          {rating > 0 && (
            <p className="text-xs text-on-surface-variant mt-2">
              {['', 'Poor', 'Fair', 'Good', 'Great', 'Excellent!'][rating]}
            </p>
          )}
        </div>
        <textarea
          value={review}
          onChange={(e) => setReview(e.target.value)}
          placeholder="Share your experience (optional)..."
          maxLength={1000}
          rows={3}
          className="w-full bg-surface-container-high rounded-xl px-4 py-3 text-sm text-on-surface placeholder:text-on-surface-variant/50 outline-none focus:ring-2 focus:ring-primary/30 resize-none mb-2"
        />
        <p className="text-xs text-on-surface-variant/50 text-right mb-4">{review.length}/1000</p>
        {error && <p className="text-sm text-red-500 mb-4">{error}</p>}
        <div className="flex gap-3">
          <Button variant="secondary" className="flex-1" onClick={onClose}>Cancel</Button>
          <Button variant="primary" className="flex-1" onClick={handleSubmit} disabled={isSubmitting} loading={isSubmitting}>
            {isSubmitting ? 'Submitting...' : 'Submit Review'}
          </Button>
        </div>
      </div>
    </div>
  );
}

// ── Candidate Sessions View ─────────────────────────────
function CandidateSessionsView({ token }: { token: string }) {
  const [sessions, setSessions] = useState<CandidateSession[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [reviewTarget, setReviewTarget] = useState<CandidateSession | null>(null);
  const [payingId, setPayingId] = useState<number | null>(null);

  useEffect(() => {
    fetchApi<CandidateSession[]>('/candidate/sessions', { token })
      .then(setSessions)
      .catch(console.error)
      .finally(() => setIsLoading(false));
  }, [token]);

  const handleReviewSuccess = (bookingId: number, rating: number, review: string) => {
    setSessions(prev => prev.map(s => s.bookingId === bookingId ? { ...s, rating, review } : s));
  };

  const handlePayNow = async (session: CandidateSession) => {
    setPayingId(session.bookingId);
    try {
      const order = await fetchApi<{
        orderId: string; amount: number; currency: string; keyId: string; bookingId: number;
      }>('/payment/create-order', { token, data: { bookingId: session.bookingId } });

      if (!(window as any).Razorpay) {
        await new Promise<void>((resolve, reject) => {
          const s = document.createElement('script');
          s.src = 'https://checkout.razorpay.com/v1/checkout.js';
          s.onload = () => resolve();
          s.onerror = () => reject(new Error('Failed to load Razorpay SDK'));
          document.body.appendChild(s);
        });
      }

      const rzp = new (window as any).Razorpay({
        key: order.keyId,
        amount: order.amount,
        currency: order.currency,
        order_id: order.orderId,
        name: 'HiringGround',
        description: `Mock Interview with ${session.mentor.firstName} ${session.mentor.lastName}`,
        handler: async (response: any) => {
          try {
            await fetchApi('/payment/verify', {
              token,
              data: {
                razorpayOrderId: response.razorpay_order_id,
                razorpayPaymentId: response.razorpay_payment_id,
                razorpaySignature: response.razorpay_signature,
              },
            });
            setSessions(prev => prev.map(s => s.bookingId === session.bookingId ? { ...s, isPaid: true } : s));
          } catch (e: any) {
            alert('Payment verification failed: ' + e.message);
          }
        },
        theme: { color: '#1a73e8' },
      });
      rzp.open();
    } catch (e: any) {
      alert('Payment error: ' + e.message);
    } finally {
      setPayingId(null);
    }
  };

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center py-24">
        <div className="w-10 h-10 border-2 border-primary border-t-transparent rounded-full animate-spin mb-4" />
        <p className="text-on-surface-variant">Loading sessions...</p>
      </div>
    );
  }

  if (sessions.length === 0) {
    return (
      <div className="text-center py-20">
        <span className="material-symbols-outlined text-6xl text-on-surface-variant/20 mb-4 block">event_note</span>
        <h2 className="text-xl font-bold text-on-surface mb-2">No Sessions Yet</h2>
        <p className="text-on-surface-variant max-w-sm mx-auto">
          You haven&apos;t booked any sessions. Browse our mentor network to schedule your first mock interview!
        </p>
        <Link href="/mentors">
          <Button variant="primary" className="mt-6">Browse Mentors</Button>
        </Link>
      </div>
    );
  }

  const upcoming = sessions.filter(s => s.status === 'SCHEDULED');
  const past = sessions.filter(s => s.status !== 'SCHEDULED');

  return (
    <div className="space-y-10">
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
        {[
          { label: 'Total Bookings', value: sessions.length, icon: 'calendar_month', color: 'text-primary' },
          { label: 'Upcoming', value: upcoming.length, icon: 'event_upcoming', color: 'text-blue-500' },
          { label: 'Completed', value: sessions.filter(s => s.status === 'COMPLETED').length, icon: 'check_circle', color: 'text-green-500' },
        ].map(stat => (
          <Card key={stat.label} variant="elevated" className="text-center">
            <span className={`material-symbols-outlined text-2xl ${stat.color} mb-2 block`}>{stat.icon}</span>
            <p className="text-2xl font-headline font-bold text-on-surface">{stat.value}</p>
            <p className="text-xs text-on-surface-variant mt-0.5">{stat.label}</p>
          </Card>
        ))}
      </div>

      {upcoming.length > 0 && (
        <div>
          <h2 className="text-lg font-headline font-bold text-on-surface mb-4 flex items-center gap-2">
            <span className="material-symbols-outlined text-primary">event_upcoming</span>
            Upcoming Sessions
          </h2>
          <div className="space-y-3">
            {upcoming.map(session => (
              <Card key={session.bookingId} variant="elevated" className="flex flex-col sm:flex-row sm:items-center gap-5">
                <div className="w-14 h-14 rounded-2xl bg-primary/10 flex flex-col items-center justify-center text-primary shrink-0">
                  <span className="text-xs font-bold uppercase">{new Date(session.slotDate + 'T00:00:00').toLocaleDateString('en-IN', { month: 'short' })}</span>
                  <span className="text-xl font-headline font-bold leading-none">{new Date(session.slotDate + 'T00:00:00').getDate()}</span>
                </div>
                <div className="flex items-center gap-3 flex-1 min-w-0">
                  <Avatar src={session.mentor.profileImgUrl || undefined} alt={`${session.mentor.firstName} ${session.mentor.lastName}`} size="md" fallback={`${session.mentor.firstName.charAt(0)}${session.mentor.lastName.charAt(0)}`} />
                  <div className="min-w-0">
                    <p className="font-bold text-on-surface truncate">{session.mentor.firstName} {session.mentor.lastName}</p>
                    {session.mentor.currentPosition && <p className="text-xs text-on-surface-variant truncate">{session.mentor.currentPosition}{session.mentor.currentCompany ? ` @ ${session.mentor.currentCompany}` : ''}</p>}
                    <p className="text-sm text-on-surface-variant flex items-center gap-1.5 mt-0.5"><span className="material-symbols-outlined text-sm">schedule</span>{formatTime(session.slotTime.substring(0, 5))} · {session.duration} min</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 flex-wrap">
                  {session.price && session.price > 0 ? (
                    session.isPaid
                      ? <span className="text-xs font-bold text-green-600 flex items-center gap-1"><span className="material-symbols-outlined text-sm">check_circle</span> Paid</span>
                      : <button onClick={() => handlePayNow(session)} disabled={payingId === session.bookingId} className="text-xs font-bold px-3 py-1.5 rounded-full bg-primary text-white hover:bg-primary/90 disabled:opacity-50 flex items-center gap-1 transition-colors">
                          <span className="material-symbols-outlined text-sm">payments</span>
                          {payingId === session.bookingId ? 'Loading...' : `Pay ₹${session.price}`}
                        </button>
                  ) : <span className="text-sm font-medium text-green-600">Free</span>}
                  <Badge variant="primary">Scheduled</Badge>
                  <Link href={`/mentors/${session.mentor.profileId}`}><Button variant="ghost" size="sm">View Mentor</Button></Link>
                </div>
              </Card>
            ))}
          </div>
        </div>
      )}

      {past.length > 0 && (
        <div>
          <h2 className="text-lg font-headline font-bold text-on-surface mb-4 flex items-center gap-2">
            <span className="material-symbols-outlined text-on-surface-variant">history</span>
            Past Sessions
          </h2>
          <div className="space-y-3">
            {past.map(session => {
              const { label, variant } = getStatusStyle(session.status);
              return (
                <Card key={session.bookingId} variant="section" className="flex flex-col sm:flex-row sm:items-center gap-5">
                  <div className="w-14 h-14 rounded-2xl bg-surface-container-high flex flex-col items-center justify-center text-on-surface-variant shrink-0">
                    <span className="text-xs font-bold uppercase">{new Date(session.slotDate + 'T00:00:00').toLocaleDateString('en-IN', { month: 'short' })}</span>
                    <span className="text-xl font-headline font-bold leading-none">{new Date(session.slotDate + 'T00:00:00').getDate()}</span>
                  </div>
                  <div className="flex items-center gap-3 flex-1 min-w-0">
                    <Avatar src={session.mentor.profileImgUrl || undefined} alt={`${session.mentor.firstName} ${session.mentor.lastName}`} size="md" fallback={`${session.mentor.firstName.charAt(0)}${session.mentor.lastName.charAt(0)}`} />
                    <div className="min-w-0">
                      <p className="font-bold text-on-surface truncate">{session.mentor.firstName} {session.mentor.lastName}</p>
                      <p className="text-sm text-on-surface-variant flex items-center gap-1.5 mt-0.5"><span className="material-symbols-outlined text-sm">schedule</span>{formatTime(session.slotTime.substring(0, 5))} · {session.duration} min</p>
                      {session.review && <p className="text-xs text-on-surface-variant italic mt-1 line-clamp-1">&ldquo;{session.review}&rdquo;</p>}
                    </div>
                  </div>
                  <div className="flex items-center gap-3 flex-wrap">
                    {session.rating
                      ? <span className="text-sm font-bold text-amber-500 flex items-center gap-1"><span className="material-symbols-outlined text-base">star</span>{session.rating}</span>
                      : session.status === 'COMPLETED'
                        ? <button onClick={() => setReviewTarget(session)} className="text-xs font-bold px-3 py-1.5 rounded-full border border-amber-400 text-amber-600 hover:bg-amber-50 flex items-center gap-1 transition-colors"><span className="material-symbols-outlined text-sm">rate_review</span>Rate Session</button>
                        : null}
                    <Badge variant={variant as any}>{label}</Badge>
                  </div>
                </Card>
              );
            })}
          </div>
        </div>
      )}

      {reviewTarget && (
        <ReviewModal session={reviewTarget} token={token} onClose={() => setReviewTarget(null)} onSuccess={handleReviewSuccess} />
      )}
    </div>
  );
}

// ── Main Page ───────────────────────────────────────────
export default function SessionsPage() {
  const { token, user } = useAuth();
  const isMentor = user?.roles?.includes('ROLE_MENTOR');

  return (
    <div className="bg-surface py-10 px-6 min-h-[calc(100vh-64px)]">
      <Container>
        <div className="mb-10">
          <h1 className="text-3xl font-headline font-bold text-on-surface mb-2">
            {isMentor ? 'My Sessions' : 'My Bookings'}
          </h1>
          <p className="text-base text-on-surface-variant">
            {isMentor
              ? 'View all candidates who have booked sessions with you.'
              : 'Track your upcoming and completed mock interview sessions.'}
          </p>
        </div>

        {token ? (
          isMentor
            ? <MentorSessionsView token={token} />
            : <CandidateSessionsView token={token} />
        ) : (
          <div className="text-center py-20">
            <span className="material-symbols-outlined text-6xl text-on-surface-variant/20 mb-4 block">lock</span>
            <p className="text-on-surface-variant">Please log in to view your sessions.</p>
          </div>
        )}
      </Container>
    </div>
  );
}
