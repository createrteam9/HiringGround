'use client';
import React, { useState, useEffect, useMemo } from 'react';
import Container from '@/app/components/layout/Container';
import Card from '@/app/components/ui/Card';
import Button from '@/app/components/ui/Button';
import Badge from '@/app/components/ui/Badge';
import { useAuth } from '@/contexts/AuthContext';
import { fetchApi } from '@/lib/api';

// ── Helpers ──────────────────────────────────────────
function getNext3Days(): Date[] {
  const days: Date[] = [];
  const now = new Date();
  for (let i = 0; i < 3; i++) {
    const d = new Date(now);
    d.setDate(now.getDate() + i);
    days.push(d);
  }
  return days;
}

function formatDateLabel(date: Date): string {
  const today = new Date();
  const tomorrow = new Date(today);
  tomorrow.setDate(today.getDate() + 1);

  if (date.toDateString() === today.toDateString()) return 'Today';
  if (date.toDateString() === tomorrow.toDateString()) return 'Tomorrow';
  return date.toLocaleDateString('en-IN', { weekday: 'short', month: 'short', day: 'numeric' });
}

function toISODate(date: Date): string {
  return date.toISOString().split('T')[0];
}

function generateTimeOptions(): string[] {
  const times: string[] = [];
  for (let h = 0; h < 24; h++) {
    for (let m = 0; m < 60; m += 30) {
      times.push(`${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}`);
    }
  }
  return times;
}

function formatTimeDisplay(time: string): string {
  const [h, m] = time.split(':').map(Number);
  const period = h >= 12 ? 'PM' : 'AM';
  const hour12 = h === 0 ? 12 : h > 12 ? h - 12 : h;
  return `${hour12}:${m.toString().padStart(2, '0')} ${period}`;
}

interface SlotData {
  id: number;
  date: string;
  startTime: string;
  timeInterval: number;
  price: number | null;
  isBooked: boolean;
}

// ── Duration Options ─────────────────────────────────
const DURATION_PRESETS = [
  { label: '20 min', value: 20 },
  { label: '45 min', value: 45 },
  { label: '60 min', value: 60 },
  { label: 'Custom', value: -1 },
];

export default function AvailabilityPage() {
  const { token } = useAuth();
  const timeOptions = useMemo(() => generateTimeOptions(), []);
  const next3Days = useMemo(() => getNext3Days(), []);

  // ── Form State ───────────────────────────────────────
  const [selectedDates, setSelectedDates] = useState<string[]>([]);
  const [startTime, setStartTime] = useState('09:00');
  const [endTime, setEndTime] = useState('17:00');
  const [selectedDuration, setSelectedDuration] = useState(45);
  const [customDuration, setCustomDuration] = useState('');
  const [isCustom, setIsCustom] = useState(false);
  const [price, setPrice] = useState('');
  const [isCreating, setIsCreating] = useState(false);
  const [statusMessage, setStatusMessage] = useState({ text: '', type: '' });

  // ── Existing Slots ──────────────────────────────────
  const [existingSlots, setExistingSlots] = useState<SlotData[]>([]);
  const [isLoadingSlots, setIsLoadingSlots] = useState(true);

  useEffect(() => {
    if (token) loadMySlots();
  }, [token]);

  const loadMySlots = async () => {
    setIsLoadingSlots(true);
    try {
      const data = await fetchApi<SlotData[]>('/mentor/slots', { token: token! });
      setExistingSlots(data);
    } catch (err) {
      console.error('Failed to load slots', err);
    } finally {
      setIsLoadingSlots(false);
    }
  };

  // ── Computed: Preview Slots ─────────────────────────
  const effectiveDuration = isCustom ? parseInt(customDuration) || 0 : selectedDuration;

  const previewSlots = useMemo(() => {
    if (selectedDates.length === 0 || effectiveDuration <= 0) return [];
    const slots: { date: string; time: string }[] = [];

    for (const date of selectedDates) {
      const [sh, sm] = startTime.split(':').map(Number);
      const [eh, em] = endTime.split(':').map(Number);
      let currentMinutes = sh * 60 + sm;
      const endMinutes = eh * 60 + em;

      while (currentMinutes + effectiveDuration <= endMinutes) {
        const h = Math.floor(currentMinutes / 60);
        const m = currentMinutes % 60;
        slots.push({
          date,
          time: `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}`,
        });
        currentMinutes += effectiveDuration;
      }
    }
    return slots;
  }, [selectedDates, startTime, endTime, effectiveDuration]);

  // ── Handlers ────────────────────────────────────────
  const toggleDate = (isoDate: string) => {
    setSelectedDates((prev) =>
      prev.includes(isoDate) ? prev.filter((d) => d !== isoDate) : [...prev, isoDate]
    );
  };

  const handleDurationSelect = (value: number) => {
    if (value === -1) {
      setIsCustom(true);
      setSelectedDuration(0);
    } else {
      setIsCustom(false);
      setSelectedDuration(value);
      setCustomDuration('');
    }
  };

  const handleCreateSlots = async () => {
    if (selectedDates.length === 0) {
      setStatusMessage({ text: 'Please select at least one date.', type: 'error' });
      return;
    }
    if (effectiveDuration <= 0) {
      setStatusMessage({ text: 'Please select a valid duration.', type: 'error' });
      return;
    }
    if (previewSlots.length === 0) {
      setStatusMessage({ text: 'No slots can be generated with the selected time range and duration.', type: 'error' });
      return;
    }

    setIsCreating(true);
    setStatusMessage({ text: '', type: '' });

    try {
      const payload = {
        dates: selectedDates,
        startTime: startTime + ':00',
        endTime: endTime + ':00',
        durationMinutes: effectiveDuration,
        price: price ? parseFloat(price) : null,
      };

      const response = await fetchApi<{ message: string }>('/mentor/slots', {
        token: token!,
        data: payload,
      });

      setStatusMessage({ text: response.message, type: 'success' });
      setSelectedDates([]);
      loadMySlots();
    } catch (err: any) {
      setStatusMessage({ text: err.message || 'Failed to create slots.', type: 'error' });
    } finally {
      setIsCreating(false);
    }
  };

  const handleDeleteSlot = async (slotId: number) => {
    try {
      await fetchApi(`/mentor/slots/${slotId}`, {
        method: 'DELETE',
        token: token!,
      });
      setExistingSlots((prev) => prev.filter((s) => s.id !== slotId));
    } catch (err: any) {
      alert(err.message || 'Failed to delete slot.');
    }
  };

  // ── Group existing slots by date ────────────────────
  const slotsByDate = useMemo(() => {
    const grouped: Record<string, SlotData[]> = {};
    for (const slot of existingSlots) {
      const key = slot.date;
      if (!grouped[key]) grouped[key] = [];
      grouped[key].push(slot);
    }
    return grouped;
  }, [existingSlots]);

  return (
    <div className="bg-surface py-10 px-6 min-h-[calc(100vh-64px)]">
      <Container>
        {/* Page Header */}
        <div className="mb-10">
          <h1 className="text-3xl font-headline font-bold text-on-surface mb-2">
            Manage Availability
          </h1>
          <p className="text-base text-on-surface-variant">
            Create time slots for candidates to book mock interviews with you.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
          {/* ── Left: Slot Creator ─────────────── */}
          <div className="lg:col-span-3 space-y-6">
            {/* Step 1: Select Dates */}
            <Card variant="elevated">
              <div className="mb-1 flex items-center gap-2">
                <span className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-primary text-white text-xs font-bold">1</span>
                <h2 className="text-lg font-headline font-bold text-on-surface">Select Dates</h2>
              </div>
              <p className="text-sm text-on-surface-variant mb-5 ml-9">
                Choose up to 3 days (today + next 2 days)
              </p>
              <div className="flex gap-3 ml-9">
                {next3Days.map((date) => {
                  const iso = toISODate(date);
                  const isSelected = selectedDates.includes(iso);
                  return (
                    <button
                      key={iso}
                      onClick={() => toggleDate(iso)}
                      className={`
                        flex flex-col items-center px-5 py-3 rounded-xl border-2 transition-all duration-200 cursor-pointer
                        ${isSelected
                          ? 'border-primary bg-primary/10 shadow-md scale-[1.03]'
                          : 'border-outline-variant/30 bg-surface-container-lowest hover:border-primary/40 hover:shadow-sm'
                        }
                      `}
                    >
                      <span className={`text-xs font-bold uppercase tracking-wider ${isSelected ? 'text-primary' : 'text-on-surface-variant'}`}>
                        {date.toLocaleDateString('en-IN', { weekday: 'short' })}
                      </span>
                      <span className={`text-2xl font-headline font-bold ${isSelected ? 'text-primary' : 'text-on-surface'}`}>
                        {date.getDate()}
                      </span>
                      <span className={`text-[10px] uppercase tracking-wide ${isSelected ? 'text-primary' : 'text-on-surface-variant'}`}>
                        {formatDateLabel(date)}
                      </span>
                    </button>
                  );
                })}
              </div>
            </Card>

            {/* Step 2: Time Range */}
            <Card variant="elevated">
              <div className="mb-1 flex items-center gap-2">
                <span className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-primary text-white text-xs font-bold">2</span>
                <h2 className="text-lg font-headline font-bold text-on-surface">Set Time Range</h2>
              </div>
              <p className="text-sm text-on-surface-variant mb-5 ml-9">
                Define the window during which you're available
              </p>
              <div className="flex items-center gap-4 ml-9">
                <div className="flex-1">
                  <label className="block text-xs font-medium text-on-surface-variant mb-1.5 uppercase tracking-wider">
                    From
                  </label>
                  <select
                    value={startTime}
                    onChange={(e) => setStartTime(e.target.value)}
                    className="w-full bg-surface-container-highest text-on-surface border-0 rounded-lg px-3 py-2.5 text-sm focus:ring-2 focus:ring-primary outline-none"
                  >
                    {timeOptions.map((t) => (
                      <option key={`start-${t}`} value={t}>{formatTimeDisplay(t)}</option>
                    ))}
                  </select>
                </div>
                <div className="flex items-end pb-2">
                  <span className="material-symbols-outlined text-on-surface-variant">arrow_forward</span>
                </div>
                <div className="flex-1">
                  <label className="block text-xs font-medium text-on-surface-variant mb-1.5 uppercase tracking-wider">
                    To
                  </label>
                  <select
                    value={endTime}
                    onChange={(e) => setEndTime(e.target.value)}
                    className="w-full bg-surface-container-highest text-on-surface border-0 rounded-lg px-3 py-2.5 text-sm focus:ring-2 focus:ring-primary outline-none"
                  >
                    {timeOptions.map((t) => (
                      <option key={`end-${t}`} value={t}>{formatTimeDisplay(t)}</option>
                    ))}
                  </select>
                </div>
              </div>
            </Card>

            {/* Step 3: Duration */}
            <Card variant="elevated">
              <div className="mb-1 flex items-center gap-2">
                <span className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-primary text-white text-xs font-bold">3</span>
                <h2 className="text-lg font-headline font-bold text-on-surface">Session Duration</h2>
              </div>
              <p className="text-sm text-on-surface-variant mb-5 ml-9">
                How long is each interview session?
              </p>
              <div className="flex flex-wrap gap-3 ml-9">
                {DURATION_PRESETS.map((opt) => {
                  const isActive = opt.value === -1 ? isCustom : !isCustom && selectedDuration === opt.value;
                  return (
                    <button
                      key={opt.value}
                      onClick={() => handleDurationSelect(opt.value)}
                      className={`
                        px-5 py-2.5 rounded-full text-sm font-bold transition-all duration-200 cursor-pointer
                        ${isActive
                          ? 'bg-primary text-white shadow-md'
                          : 'bg-surface-container-highest text-on-surface hover:bg-surface-container-high'
                        }
                      `}
                    >
                      {opt.label}
                    </button>
                  );
                })}
              </div>
              {isCustom && (
                <div className="mt-4 ml-9 flex items-center gap-3">
                  <input
                    type="number"
                    value={customDuration}
                    onChange={(e) => setCustomDuration(e.target.value)}
                    placeholder="e.g., 35"
                    min="10"
                    max="180"
                    className="w-28 bg-surface-container-highest text-on-surface border-0 rounded-lg px-3 py-2.5 text-sm focus:ring-2 focus:ring-primary outline-none"
                  />
                  <span className="text-sm text-on-surface-variant">minutes</span>
                </div>
              )}
            </Card>

            {/* Step 4: Price (Optional) */}
            <Card variant="elevated">
              <div className="mb-1 flex items-center gap-2">
                <span className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-primary text-white text-xs font-bold">4</span>
                <h2 className="text-lg font-headline font-bold text-on-surface">Session Price</h2>
                <span className="text-xs bg-surface-container-high text-on-surface-variant px-2 py-0.5 rounded-full">Optional</span>
              </div>
              <p className="text-sm text-on-surface-variant mb-5 ml-9">
                Set a price per session. Leave empty for free sessions.
              </p>
              <div className="flex items-center gap-2 ml-9">
                <span className="text-lg font-bold text-on-surface-variant">₹</span>
                <input
                  type="number"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  placeholder="0.00"
                  min="0"
                  step="50"
                  className="w-40 bg-surface-container-highest text-on-surface border-0 rounded-lg px-3 py-2.5 text-sm focus:ring-2 focus:ring-primary outline-none"
                />
              </div>
            </Card>

            {/* Preview + Create */}
            {previewSlots.length > 0 && (
              <Card variant="elevated" className="border-2 border-primary/20">
                <div className="mb-4 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-primary">preview</span>
                    <h2 className="text-lg font-headline font-bold text-on-surface">
                      Preview ({previewSlots.length} slots)
                    </h2>
                  </div>
                  <Badge variant="primary">{effectiveDuration} min each</Badge>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2 mb-6">
                  {previewSlots.map((slot, i) => (
                    <div
                      key={i}
                      className="flex items-center gap-2 px-3 py-2 rounded-lg bg-primary/5 border border-primary/15"
                    >
                      <span className="material-symbols-outlined text-primary text-base">schedule</span>
                      <div>
                        <p className="text-xs text-on-surface-variant">
                          {new Date(slot.date).toLocaleDateString('en-IN', { month: 'short', day: 'numeric' })}
                        </p>
                        <p className="text-sm font-bold text-on-surface">
                          {formatTimeDisplay(slot.time)}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                {statusMessage.text && (
                  <div className={`mb-4 px-4 py-3 rounded-lg text-sm font-medium ${statusMessage.type === 'error' ? 'bg-red-50 text-red-700' : 'bg-green-50 text-green-700'}`}>
                    {statusMessage.text}
                  </div>
                )}

                <Button
                  variant="primary"
                  size="lg"
                  onClick={handleCreateSlots}
                  disabled={isCreating}
                  loading={isCreating}
                  className="w-full"
                >
                  {isCreating ? 'Creating Slots...' : `Create ${previewSlots.length} Slots`}
                </Button>
              </Card>
            )}
          </div>

          {/* ── Right: Existing Slots ──────────── */}
          <div className="lg:col-span-2">
            <Card variant="elevated">
              <div className="flex items-center gap-2 mb-6">
                <span className="material-symbols-outlined text-primary">calendar_month</span>
                <h2 className="text-lg font-headline font-bold text-on-surface">Your Upcoming Slots</h2>
              </div>

              {isLoadingSlots ? (
                <div className="py-12 text-center">
                  <div className="inline-block w-6 h-6 border-2 border-primary border-t-transparent rounded-full animate-spin mb-3" />
                  <p className="text-sm text-on-surface-variant">Loading slots...</p>
                </div>
              ) : Object.keys(slotsByDate).length === 0 ? (
                <div className="py-12 text-center">
                  <span className="material-symbols-outlined text-4xl text-on-surface-variant/30 mb-3 block">event_busy</span>
                  <p className="text-sm text-on-surface-variant">No slots created yet.</p>
                  <p className="text-xs text-on-surface-variant mt-1">Use the form on the left to create your first slot!</p>
                </div>
              ) : (
                <div className="space-y-6">
                  {Object.entries(slotsByDate)
                    .sort(([a], [b]) => a.localeCompare(b))
                    .map(([date, slots]) => (
                      <div key={date}>
                        <div className="flex items-center gap-2 mb-3">
                          <div className="w-2 h-2 rounded-full bg-primary" />
                          <h3 className="text-sm font-bold text-on-surface uppercase tracking-wider">
                            {new Date(date + 'T00:00:00').toLocaleDateString('en-IN', {
                              weekday: 'long',
                              month: 'short',
                              day: 'numeric',
                            })}
                          </h3>
                        </div>
                        <div className="space-y-2 ml-4">
                          {slots.map((slot) => (
                            <div
                              key={slot.id}
                              className={`
                                flex items-center justify-between px-4 py-3 rounded-lg transition-all
                                ${slot.isBooked
                                  ? 'bg-green-50 border border-green-200'
                                  : 'bg-surface-container-lowest border border-outline-variant/15 hover:shadow-sm'
                                }
                              `}
                            >
                              <div className="flex items-center gap-3">
                                <span className={`material-symbols-outlined text-base ${slot.isBooked ? 'text-green-600' : 'text-primary'}`}>
                                  {slot.isBooked ? 'check_circle' : 'schedule'}
                                </span>
                                <div>
                                  <p className="text-sm font-bold text-on-surface">
                                    {formatTimeDisplay(slot.startTime.substring(0, 5))}
                                  </p>
                                  <p className="text-xs text-on-surface-variant">
                                    {slot.timeInterval} min
                                    {slot.price ? ` · ₹${slot.price}` : ' · Free'}
                                  </p>
                                </div>
                              </div>
                              <div className="flex items-center gap-2">
                                {slot.isBooked ? (
                                  <Badge variant="success">Booked</Badge>
                                ) : (
                                  <button
                                    onClick={() => handleDeleteSlot(slot.id)}
                                    className="p-1.5 rounded-lg hover:bg-red-50 text-on-surface-variant hover:text-red-500 transition-colors cursor-pointer"
                                    title="Delete slot"
                                  >
                                    <span className="material-symbols-outlined text-base">delete</span>
                                  </button>
                                )}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                </div>
              )}
            </Card>
          </div>
        </div>
      </Container>
    </div>
  );
}
