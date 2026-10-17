'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  ArrowLeft,
  ArrowRight,
  TrendingDown,
  Lock,
  Camera,
  CheckCircle2,
  Lightbulb,
  TrendingUp,
  Edit3,
  Calendar,
  Sparkles,
  ChevronRight,
  Clock,
  History,
  FileCheck2,
  User,
  ChevronDown,
} from 'lucide-react';

interface CheckInRecord {
  id: string;
  weekNumber: number;
  date: string;
  weightKg: number;
  weightDelta: string;
  waistCm: number;
  waistDelta: string;
  sentiment: string;
  sentimentEmoji: string;
  notes?: string;
  photoUrl?: string;
  coachReview?: {
    reviewedAt: string;
    coachName: string;
    feedback: string;
  } | null;
}

const INITIAL_PAST_RECORDS: CheckInRecord[] = [
  {
    id: 'checkin-w2',
    weekNumber: 2,
    date: 'Oct 10, 2026',
    weightKg: 75.4,
    weightDelta: '↓ 1.2 kg',
    waistCm: 82.5,
    waistDelta: '↓ 1.5 cm',
    sentiment: 'Relentless & Strong',
    sentimentEmoji: '⚡',
    notes: 'Energy was peak after Wednesday. Sleeping 7.5 hours on average.',
    coachReview: {
      reviewedAt: 'Oct 10, 2026 • 19:40 WAT',
      coachName: 'Coach Tolu Adebayo',
      feedback:
        'Your compound lifts in Week 2 were remarkably grounded. Remember: fluid fluctuations are standard. Trust your steady nourishment and keep honoring the recovery blocks.',
    },
  },
  {
    id: 'checkin-w1',
    weekNumber: 1,
    date: 'Oct 3, 2026',
    weightKg: 76.6,
    weightDelta: '↓ 1.4 kg',
    waistCm: 84.0,
    waistDelta: '↓ 2.0 cm',
    sentiment: 'Consistent',
    sentimentEmoji: '🌿',
    notes: 'Substituted plantain for sweet potatoes on Thursday. Soreness was manageable.',
    coachReview: {
      reviewedAt: 'Oct 3, 2026 • 21:15 WAT',
      coachName: 'Coach Tolu Adebayo',
      feedback:
        'Incredible discipline setting up your nutrition base. You are creating neuromuscular pathways that will pay dividends in Phase 2.',
    },
  },
  {
    id: 'checkin-w0',
    weekNumber: 0,
    date: 'Sep 26, 2026',
    weightKg: 78.0,
    weightDelta: 'Baseline',
    waistCm: 86.0,
    waistDelta: 'Baseline',
    sentiment: 'Committed to Transformation',
    sentimentEmoji: '✨',
    notes: 'Program kick-off and initial measurements taken.',
    coachReview: {
      reviewedAt: 'Sep 26, 2026 • 10:00 WAT',
      coachName: 'Coach Tolu Adebayo',
      feedback:
        'Welcome to the sanctuary! Your foundation is strong. Let momentum guide you.',
    },
  },
  {
    id: 'checkin-w-base',
    weekNumber: -1,
    date: 'Sep 19, 2026',
    weightKg: 78.8,
    weightDelta: 'Intake Assessment',
    waistCm: 87.5,
    waistDelta: 'Intake',
    sentiment: 'Ready for Reset',
    sentimentEmoji: '🎯',
    notes: 'Completed initial metabolic profiling, movement screening, and baseline photo intake.',
    coachReview: {
      reviewedAt: 'Sep 19, 2026 • 15:30 WAT',
      coachName: 'Coach Tolu Adebayo',
      feedback:
        'Your initial movement screening showed strong hip mobility. We kick off Phase 1 next Saturday. Focus on steady hydration and sleep.',
    },
  },
];

export default function ProgressPage() {
  const [userName, setUserName] = useState<string>('Member');
  const [unit, setUnit] = useState<'KG' | 'LBS'>('KG');
  const [weight, setWeight] = useState<string>('74.6');
  const [waist, setWaist] = useState<string>('82.0');
  const [selectedSentiment, setSelectedSentiment] = useState<{
    text: string;
    emoji: string;
  }>({ text: 'Consistent', emoji: '🌿' });
  const [reflectionNotes, setReflectionNotes] = useState<string>('');
  const [isSaved, setIsSaved] = useState<boolean>(false);
  const [selectedPhotoName, setSelectedPhotoName] = useState<string | null>(null);

  // Historical Records & Pagination
  const [pastRecords, setPastRecords] = useState<CheckInRecord[]>(INITIAL_PAST_RECORDS);
  const [visibleCount, setVisibleCount] = useState<number>(3);
  const [selectedPastRecord, setSelectedPastRecord] = useState<CheckInRecord | null>(null);

  // Fetch logged in user
  useEffect(() => {
    fetch('/api/auth/me')
      .then((res) => res.json())
      .then((data) => {
        if (data.authenticated && data.user) {
          const name =
            data.user.profile?.displayName ||
            data.user.profile?.fullName?.split(' ')[0] ||
            data.user.email?.split('@')[0] ||
            'Member';
          setUserName(name);
        }
      })
      .catch((err) => console.error('Error fetching user for progress:', err));
  }, []);

  const handleSaveCheckIn = () => {
    const weightNum = parseFloat(weight) || 74.6;
    const waistNum = parseFloat(waist) || 82.0;

    const newRecord: CheckInRecord = {
      id: `checkin-w3-${Date.now()}`,
      weekNumber: 3,
      date: 'Today • Oct 17, 2026',
      weightKg: weightNum,
      weightDelta: '↓ 0.8 kg',
      waistCm: waistNum,
      waistDelta: '↓ 0.5 cm',
      sentiment: selectedSentiment.text,
      sentimentEmoji: selectedSentiment.emoji,
      notes: reflectionNotes || 'Nutrition and lifts maintained on schedule.',
      coachReview: null, // Pending Coach review
    };

    setPastRecords((prev) => {
      const filtered = prev.filter((r) => r.weekNumber !== 3);
      const updated = [newRecord, ...filtered];
      return updated.sort((a, b) => b.weekNumber - a.weekNumber);
    });
    setVisibleCount(3);
    setIsSaved(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleEditEntry = () => {
    setIsSaved(false);
  };

  const displayWeight = (kgVal: number) => {
    if (unit === 'LBS') {
      return (kgVal * 2.20462).toFixed(1);
    }
    return kgVal.toFixed(1);
  };

  // Sorted and paginated past records (Latest always on top)
  const sortedRecords = [...pastRecords].sort((a, b) => b.weekNumber - a.weekNumber);
  const visibleRecords = sortedRecords.slice(0, visibleCount);
  const hasMoreRecords = visibleCount < sortedRecords.length;
  const remainingCount = sortedRecords.length - visibleCount;

  return (
    <div className="flex flex-col w-full max-w-6xl mx-auto pb-16 space-y-12">
      {/* ========================================================
          1. TOP ACTION / CONTEXT HEADER
         ======================================================== */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-2 border-b border-[#E4DDD3]/70">
        <div className="space-y-1.5">
          <Link
            href="/home"
            className="inline-flex items-center gap-1.5 text-[#9a4023] hover:text-[#A84C2F] transition-colors font-bold text-[12px] tracking-wide uppercase w-fit"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Return to Sanctuary Home</span>
          </Link>

          <div className="flex items-center gap-2 pt-1">
            <span className="px-2.5 py-0.5 rounded-full bg-[#cde5d7] text-[#0a1f17] font-bold text-[10px] tracking-widest uppercase">
              Pillar Cycle
            </span>
            <span className="text-[#786b66] font-bold text-[10px] tracking-wider uppercase">
              Lagos Studio Sync
            </span>
          </div>

          <h1 className="font-serif text-[32px] sm:text-[42px] font-bold text-[#1d1b19] tracking-tight leading-none uppercase pt-1">
            WEEKLY CHECK-IN
          </h1>

          <p className="text-[14px] text-[#56423d] font-normal">
            Week 3 of 8 <span className="mx-1.5 opacity-40">•</span> Let&apos;s record this week&apos;s progress with honesty and grace.
          </p>
        </div>

        {/* Quick Summary Status Pill */}
        <div className="flex items-center gap-3 p-2 pl-3 bg-[#F2EDE4] rounded-full border border-[#E4DDD3] shadow-2xs self-start md:self-auto">
          <div className="flex -space-x-2 overflow-hidden">
            <div className="w-8 h-8 rounded-full bg-[#9a4023] text-white flex items-center justify-center font-bold text-[12px] ring-2 ring-[#FAF7F2]">
              {userName.charAt(0)}
            </div>
            <div className="w-8 h-8 rounded-full bg-[#4d6358] text-white flex items-center justify-center font-bold text-[11px] ring-2 ring-[#FAF7F2]">
              T
            </div>
          </div>
          <div className="flex flex-col pr-3">
            <span className="text-[10px] font-bold uppercase tracking-wider text-[#1d1b19]">
              Coach Tolu Assigned
            </span>
            <span className="text-[11px] text-[#786b66] font-medium">
              Reviewed within 12 hours
            </span>
          </div>
        </div>
      </div>

      {/* ========================================================
          2. MAIN DYNAMIC CONTENT: FORM VS SAVED STATE
         ======================================================== */}
      {!isSaved ? (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* ========================================================
              LEFT COLUMN: 4-SECTION PRIMARY LOGGING FORM (7 cols)
             ======================================================== */}
          <div className="lg:col-span-7 space-y-6">
            {/* Section 1: Weight Metrics */}
            <div className="bg-[#F2EDE4] p-6 sm:p-7 rounded-3xl border border-[#E4DDD3] shadow-xs space-y-4 relative overflow-hidden">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <span className="w-7 h-7 rounded-full bg-[#9a4023]/10 text-[#9a4023] flex items-center justify-center font-bold text-[11px]">
                    01
                  </span>
                  <span className="font-bold text-[11px] uppercase tracking-wider text-[#1d1b19]">
                    Current Scale Weight
                  </span>
                </div>

                {/* Unit Switcher */}
                <div className="flex items-center bg-[#EAE3D6] rounded-full p-0.5 text-[#1d1b19]">
                  <button
                    type="button"
                    onClick={() => setUnit('KG')}
                    className={`px-3 py-1 rounded-full font-bold text-[11px] transition-all ${
                      unit === 'KG'
                        ? 'bg-[#FAF7F2] text-[#1d1b19] shadow-2xs'
                        : 'text-[#786b66] hover:text-[#1d1b19]'
                    }`}
                  >
                    KG
                  </button>
                  <button
                    type="button"
                    onClick={() => setUnit('LBS')}
                    className={`px-3 py-1 rounded-full font-bold text-[11px] transition-all ${
                      unit === 'LBS'
                        ? 'bg-[#FAF7F2] text-[#1d1b19] shadow-2xs'
                        : 'text-[#786b66] hover:text-[#1d1b19]'
                    }`}
                  >
                    LBS
                  </button>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row sm:items-baseline gap-4 pt-1">
                <div className="relative inline-flex items-baseline">
                  <input
                    type="number"
                    step="0.1"
                    value={weight}
                    onChange={(e) => setWeight(e.target.value)}
                    className="font-serif text-[48px] sm:text-[56px] font-bold text-[#1d1b19] bg-transparent focus:outline-hidden w-44 tracking-tight leading-none"
                  />
                  <span className="font-serif text-[20px] font-bold text-[#786b66] ml-2">
                    {unit.toLowerCase()}
                  </span>
                </div>

                <div className="flex items-center gap-1.5 bg-[#E3E9E4] px-3.5 py-1.5 rounded-full w-fit">
                  <TrendingDown className="w-4 h-4 text-[#4d6358]" />
                  <span className="font-bold text-[12px] text-[#4d6358]">
                    Last week: 75.4 kg (↓ 0.8 kg)
                  </span>
                </div>
              </div>

              <p className="text-[12px] text-[#786b66] leading-relaxed">
                Recommended: Weigh first thing in the morning after hydrating with warm water and lemon.
              </p>
            </div>

            {/* Section 2: Waist Measurement */}
            <div className="bg-[#F2EDE4] p-6 sm:p-7 rounded-3xl border border-[#E4DDD3] shadow-xs space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <span className="w-7 h-7 rounded-full bg-[#9a4023]/10 text-[#9a4023] flex items-center justify-center font-bold text-[11px]">
                    02
                  </span>
                  <span className="font-bold text-[11px] uppercase tracking-wider text-[#1d1b19]">
                    Waistline Dimension
                  </span>
                </div>
                <span className="px-2.5 py-0.5 rounded bg-[#EAE3D6] text-[#786b66] font-bold text-[10px] uppercase tracking-wider">
                  Optional
                </span>
              </div>

              <div className="flex flex-col sm:flex-row sm:items-baseline gap-4">
                <div className="relative inline-flex items-baseline">
                  <input
                    type="number"
                    step="0.5"
                    value={waist}
                    onChange={(e) => setWaist(e.target.value)}
                    className="font-serif text-[38px] sm:text-[44px] font-bold text-[#1d1b19] bg-transparent focus:outline-hidden w-36 tracking-tight leading-none"
                  />
                  <span className="font-serif text-[18px] font-bold text-[#786b66] ml-2">
                    cm
                  </span>
                </div>
                <span className="text-[12px] text-[#786b66] leading-relaxed">
                  Measured along narrowest midpoint (approx. 2cm above navel).
                </span>
              </div>
            </div>

            {/* Section 3: Progress Photo */}
            <div className="bg-[#F2EDE4] p-6 sm:p-7 rounded-3xl border border-[#E4DDD3] shadow-xs space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <span className="w-7 h-7 rounded-full bg-[#9a4023]/10 text-[#9a4023] flex items-center justify-center font-bold text-[11px]">
                    03
                  </span>
                  <span className="font-bold text-[11px] uppercase tracking-wider text-[#1d1b19]">
                    Weekly Visual Reference
                  </span>
                </div>
                <div className="flex items-center gap-1.5 text-[#786b66] font-bold text-[10px] tracking-wider uppercase">
                  <Lock className="w-3.5 h-3.5 text-[#4d6358]" />
                  <span>Private to you &amp; Coach Tolu</span>
                </div>
              </div>

              {/* Drag and Drop Canvas Area */}
              <label className="relative group cursor-pointer bg-[#FAF7F2] hover:bg-[#F2EDE4] transition-all rounded-2xl p-6 sm:p-8 flex flex-col items-center justify-center text-center gap-3 border border-dashed border-[#d2c8b8] overflow-hidden block">
                <div className="w-12 h-12 rounded-full bg-[#EAE3D6] flex items-center justify-center text-[#9a4023] group-hover:scale-105 transition-transform">
                  <Camera className="w-6 h-6" />
                </div>
                <div>
                  <p className="font-serif text-[16px] font-bold text-[#1d1b19]">
                    {selectedPhotoName ? `Selected: ${selectedPhotoName}` : '+ Drag or tap to upload this week’s progress photo'}
                  </p>
                  <p className="text-[12px] text-[#786b66] mt-0.5">
                    JPEG, HEIC or PNG • Natural light preferred
                  </p>
                </div>

                <div className="flex items-center gap-2 px-3 py-1 bg-[#EAE3D6]/70 rounded-full mt-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#4d6358]" />
                  <span className="font-bold text-[10px] tracking-wider uppercase text-[#1d1b19]">
                    End-to-End Encrypted Member Vault
                  </span>
                </div>

                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => {
                    if (e.target.files?.[0]) {
                      setSelectedPhotoName(e.target.files[0].name);
                    }
                  }}
                  className="hidden"
                />
              </label>
            </div>

            {/* Section 4: Coach Reflection */}
            <div className="bg-[#F2EDE4] p-6 sm:p-7 rounded-3xl border border-[#E4DDD3] shadow-xs space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <span className="w-7 h-7 rounded-full bg-[#9a4023]/10 text-[#9a4023] flex items-center justify-center font-bold text-[11px]">
                    04
                  </span>
                  <span className="font-bold text-[11px] uppercase tracking-wider text-[#1d1b19]">
                    Coach Reflection
                  </span>
                </div>
                <span className="font-bold text-[10px] tracking-wider uppercase text-[#786b66]">
                  Weekly Pulse
                </span>
              </div>

              <label className="font-serif text-[17px] font-bold text-[#1d1b19] block">
                How did your energy and nutrition feel this week?
              </label>

              {/* Selectable Sentiment Chips */}
              <div className="flex flex-wrap gap-2.5">
                {[
                  { text: 'Relentless & Strong', emoji: '⚡' },
                  { text: 'Consistent', emoji: '🌿' },
                  { text: 'Challenging but showing up', emoji: '🌊' },
                ].map((item) => {
                  const isSelected = selectedSentiment.text === item.text;
                  return (
                    <button
                      key={item.text}
                      type="button"
                      onClick={() => setSelectedSentiment(item)}
                      className={`px-4 py-2 rounded-full font-bold text-[12px] transition-all flex items-center gap-1.5 cursor-pointer ${
                        isSelected
                          ? 'bg-[#9a4023] text-white shadow-xs'
                          : 'bg-[#EAE3D6] text-[#1d1b19] hover:bg-[#cde5d7]'
                      }`}
                    >
                      <span>{item.emoji}</span>
                      <span>{item.text}</span>
                    </button>
                  );
                })}
              </div>

              {/* Free text note */}
              <div className="pt-2">
                <textarea
                  value={reflectionNotes}
                  onChange={(e) => setReflectionNotes(e.target.value)}
                  placeholder="Optional notes for Coach Tolu (e.g. sleep duration, hunger levels around evening workouts, cycle timing)..."
                  rows={3}
                  className="w-full bg-[#FAF7F2] p-4 rounded-2xl text-[#1d1b19] text-[13px] placeholder:text-[#8c8270] border border-[#E4DDD3] focus:outline-hidden focus:ring-2 focus:ring-[#9a4023] resize-none leading-relaxed"
                />
              </div>
            </div>

            {/* Primary Submit CTA Button */}
            <div className="pt-2 space-y-2">
              <button
                type="button"
                onClick={handleSaveCheckIn}
                className="w-full h-14 bg-[#9a4023] hover:bg-[#A84C2F] active:scale-[0.99] text-white font-bold text-[13px] tracking-wider uppercase rounded-2xl shadow-sm transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Save Check-In</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <div className="flex items-center justify-center gap-1.5 text-[#786b66] font-bold text-[10px] tracking-wider uppercase pt-1">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#4d6358]" />
                <span>Autosaved draft • Timestamp logged for West Africa Time (WAT)</span>
              </div>
            </div>
          </div>

          {/* ========================================================
              RIGHT COLUMN: COACH SPOTLIGHT, ROADMAP & INSPIRATION (5 cols)
             ======================================================== */}
          <div className="lg:col-span-5 space-y-6">
            {/* Coach Spotlight Card */}
            <div className="bg-[#F2EDE4] p-6 sm:p-7 rounded-3xl border border-[#E4DDD3] shadow-xs space-y-4">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-full overflow-hidden shrink-0 bg-[#1C1A18] ring-2 ring-[#9a4023]/40 shadow-sm">
                  <img
                    alt="Coach Tolu Adebayo"
                    className="w-full h-full object-cover object-top"
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuDAidh8fUUaDD3FFYzA_OwSAZWJ3GI4xK2DU5aL6Q4uS_AJfWrQkQyM-B17oQZXpH6HV-gtfi4zzLI7Z1xnEMie7shEmRX3lW9kM08EuBLEK8gkmMyhB_X0FE2t6JmRqvm2P0JbJ13IV9prJwzTbWU189M-QWfSm6k9BiDWo94FHfPyfHkmlnqJ-Nk4qyqcWexjcSGgn1d1sU92fVRmuTDLLTgrcpbi1ZfpVRYhztpuYXSMBCfJm9LBjg"
                  />
                </div>
                <div className="flex flex-col">
                  <h3 className="font-serif text-[18px] font-bold text-[#1d1b19] leading-tight">
                    Coach Tolu Adebayo
                  </h3>
                  <span className="text-[12px] text-[#786b66]">
                    Kinfolk Head of Transformation
                  </span>
                  <span className="text-[11px] font-bold text-[#9a4023] mt-1 italic">
                    &ldquo;Consistency beats intensity every season.&rdquo;
                  </span>
                </div>
              </div>

              <div className="bg-[#FAF7F2] p-4 rounded-2xl border border-[#E4DDD3] space-y-1.5">
                <div className="flex items-center gap-1.5 text-[#4d6358] font-bold text-[11px] uppercase tracking-wider">
                  <Lightbulb className="w-3.5 h-3.5" />
                  <span>Weekly Guidance Note</span>
                </div>
                <p className="text-[12px] text-[#56423d] leading-relaxed italic font-serif">
                  &ldquo;{userName}, your compound lifts in Week 2 were remarkably grounded. Remember: fluid fluctuations are standard. Trust your steady nourishment and keep honoring the recovery blocks.&rdquo;
                </p>
              </div>
            </div>

            {/* 8-Week Micro Roadmap */}
            <div className="bg-[#F2EDE4] p-6 sm:p-7 rounded-3xl border border-[#E4DDD3] shadow-xs space-y-3">
              <div className="flex items-center justify-between">
                <span className="font-bold text-[10px] uppercase tracking-widest text-[#1d1b19]">
                  8-Week Transformation Track
                </span>
                <span className="font-bold text-[11px] text-[#9a4023]">
                  37.5% Complete
                </span>
              </div>

              {/* Progress 8-slot bar */}
              <div className="grid grid-cols-8 gap-1.5 py-1">
                <div className="h-2 rounded-full bg-[#4d6358]" title="Week 1 Complete" />
                <div className="h-2 rounded-full bg-[#4d6358]" title="Week 2 Complete" />
                <div className="h-2 rounded-full bg-[#9a4023] animate-pulse" title="Week 3 Current" />
                <div className="h-2 rounded-full bg-[#d8cfbf]" title="Week 4" />
                <div className="h-2 rounded-full bg-[#d8cfbf]" title="Week 5" />
                <div className="h-2 rounded-full bg-[#d8cfbf]" title="Week 6" />
                <div className="h-2 rounded-full bg-[#d8cfbf]" title="Week 7" />
                <div className="h-2 rounded-full bg-[#d8cfbf]" title="Week 8" />
              </div>

              <div className="flex justify-between text-[#786b66] text-[10px] font-bold uppercase tracking-wider pt-1">
                <span>Foundational Core</span>
                <span>Metabolic Shift</span>
                <span>Peak Vitality</span>
              </div>
            </div>

            {/* Editorial Studio Portrait Inspiration Block */}
            <div className="relative overflow-hidden rounded-3xl h-80 shadow-md group bg-[#1C1A18]">
              <img
                alt="Kinfolk Ethos Studio"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 filter brightness-95"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuBcJtoyXzRqalz1b_M6yrUD5gql1C6jo4rSkhmk3GPndqXrP4kJaWtWvyT8eZncPhXxTaff0ArZd1XZD5ksFeo9Aja0xI07zVboT4MNEnNdwomIbh8h_UGR4hYAckZi5Te2_4QiNIP3VAsb2zNSPzBnXNa--TGRVtqog0ZJiyCv_t7u3yG2p4S5tDQ85zniQWVgdWfzKbzxkuLtREQWjnoZBvMS3xl55HeWoHT2m3tAZB-8jfLN7VV2Cw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#1C1A18]/90 via-[#1C1A18]/25 to-transparent flex flex-col justify-end p-6">
                <span className="font-bold text-[10px] tracking-widest uppercase text-[#ffdbd0] mb-1">
                  Kinfolk Ethos
                </span>
                <p className="font-serif text-[22px] font-bold text-white italic leading-snug">
                  &ldquo;Honoring the vessel that carries your ambition.&rdquo;
                </p>
              </div>
            </div>
          </div>
        </div>
      ) : (
        /* ========================================================
            SAVED STATE VIEW (Shown after user clicks Save Check-In)
           ======================================================== */
        <div className="max-w-2xl mx-auto w-full text-center py-8 space-y-6 animate-in fade-in zoom-in-95 duration-300">
          <div className="w-20 h-20 rounded-full bg-[#cde5d7] text-[#0a1f17] flex items-center justify-center mx-auto shadow-xs">
            <CheckCircle2 className="w-10 h-10 text-[#4d6358]" />
          </div>

          <div className="space-y-2">
            <span className="px-3 py-1 rounded-full bg-[#E3E9E4] text-[#4d6358] font-bold text-[10px] tracking-widest uppercase">
              CHECK-IN SAVED ✓
            </span>
            <h2 className="font-serif text-[32px] sm:text-[38px] font-bold text-[#1d1b19] tracking-tight">
              Another week in the books, {userName}.
            </h2>
            <p className="text-[14px] text-[#56423d] max-w-lg mx-auto leading-relaxed">
              Coach Tolu has received your weekly recap. Your measurements, energy cadence, and logged numbers are safely stored in your transformation diary.
            </p>
          </div>

          {/* Recapped Summary Pill Container */}
          <div className="w-full bg-[#F2EDE4] p-6 rounded-3xl border border-[#E4DDD3] shadow-xs grid grid-cols-3 gap-4 text-center">
            <div className="flex flex-col">
              <span className="text-[10px] font-bold tracking-wider uppercase text-[#786b66]">
                Logged Weight
              </span>
              <span className="font-serif text-[22px] font-bold text-[#1d1b19] mt-1">
                {weight} {unit.toLowerCase()}
              </span>
              <span className="text-[11px] font-bold text-[#4d6358]">↓ 0.8 kg delta</span>
            </div>

            <div className="flex flex-col border-x border-[#E4DDD3]">
              <span className="text-[10px] font-bold tracking-wider uppercase text-[#786b66]">
                Waist
              </span>
              <span className="font-serif text-[22px] font-bold text-[#1d1b19] mt-1">
                {waist} cm
              </span>
              <span className="text-[11px] text-[#786b66]">Stable</span>
            </div>

            <div className="flex flex-col">
              <span className="text-[10px] font-bold tracking-wider uppercase text-[#786b66]">
                Energy State
              </span>
              <span className="font-serif text-[20px] font-bold text-[#9a4023] mt-1">
                {selectedSentiment.text}
              </span>
              <span className="text-[11px] text-[#4d6358] font-bold">Phase 1 on track</span>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 justify-center pt-2">
            <button
              type="button"
              onClick={() => {
                const el = document.getElementById('past-records-section');
                el?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="h-12 px-8 bg-[#9a4023] hover:bg-[#A84C2F] text-white font-bold text-[12px] tracking-wider uppercase rounded-xl shadow-xs transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>View Past Records Below</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              type="button"
              onClick={handleEditEntry}
              className="h-12 px-6 bg-[#EAE3D6] hover:bg-[#ded4c3] text-[#1d1b19] font-bold text-[12px] rounded-xl transition-colors flex items-center justify-center gap-2 cursor-pointer"
            >
              <Edit3 className="w-4 h-4" />
              <span>Edit This Entry</span>
            </button>
          </div>
        </div>
      )}

      {/* ========================================================
          3. USER REQUESTED SECTION:
             PAST RECORDS & TRANSFORMATION DIARY PLACEHOLDER
         ======================================================== */}
      <section
        id="past-records-section"
        className="pt-8 border-t border-[#E4DDD3]/80 space-y-6"
      >
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3">
          <div>
            <div className="flex items-center gap-1.5 text-[#9a4023] font-bold text-[10px] tracking-widest uppercase">
              <History className="w-3.5 h-3.5" />
              <span>Transformation Archive</span>
            </div>
            <h2 className="font-serif text-[26px] sm:text-[32px] font-bold text-[#1d1b19] tracking-tight leading-tight mt-1">
              Past Check-In Records
            </h2>
            <p className="text-[13px] text-[#56423d]">
              Review your historical scale entries, waist measurements, and personal notes from Coach Tolu.
            </p>
          </div>

          <div className="flex items-center gap-2 self-start sm:self-auto">
            <span className="px-3 py-1 rounded-full bg-[#F2EDE4] border border-[#E4DDD3] text-[#1d1b19] text-[11px] font-bold">
              {pastRecords.length} Logged Entries
            </span>
          </div>
        </div>

        {/* History Cards List */}
        <div className="space-y-4">
          {visibleRecords.map((record) => (
            <article
              key={record.id}
              onClick={() => setSelectedPastRecord(record)}
              className="group bg-[#F2EDE4] hover:bg-[#ede5d8] p-5 sm:p-6 rounded-3xl border border-[#E4DDD3] shadow-2xs hover:shadow-xs transition-all cursor-pointer space-y-4"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-[#E4DDD3]/70">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-2xl bg-[#9a4023]/10 text-[#9a4023] font-serif font-bold text-[13px] flex items-center justify-center shrink-0">
                    {record.weekNumber > 0
                      ? `W${record.weekNumber}`
                      : record.weekNumber === 0
                        ? 'W0'
                        : 'BASE'}
                  </div>
                  <div>
                    <h3 className="font-serif text-[18px] font-bold text-[#1d1b19] leading-tight">
                      {record.weekNumber > 0
                        ? `Week ${record.weekNumber} Check-In`
                        : record.weekNumber === 0
                          ? 'Week 0 Baseline Entry'
                          : 'Intake Screening & Baseline'}
                    </h3>
                    <div className="flex items-center gap-2 text-[11px] text-[#786b66] mt-0.5">
                      <Calendar className="w-3 h-3" />
                      <span>{record.date}</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  {record.coachReview ? (
                    <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-[#cde5d7] text-[#0a1f17] text-[10px] font-bold tracking-wider uppercase">
                      <CheckCircle2 className="w-3 h-3 text-[#4d6358]" />
                      <span>Coach Tolu Reviewed</span>
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-[#ffdbd0] text-[#9a4023] text-[10px] font-bold tracking-wider uppercase">
                      <Clock className="w-3 h-3" />
                      <span>Under Coach Review</span>
                    </span>
                  )}

                  <span className="text-[#9a4023] group-hover:translate-x-1 transition-transform p-1">
                    <ChevronRight className="w-4 h-4" />
                  </span>
                </div>
              </div>

              {/* Metrics Pill Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center">
                <div className="bg-[#FAF7F2] p-3 rounded-2xl border border-[#E4DDD3]">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#786b66] block">
                    Weight
                  </span>
                  <span className="font-serif text-[17px] font-bold text-[#1d1b19] mt-0.5 block">
                    {displayWeight(record.weightKg)} {unit.toLowerCase()}
                  </span>
                  <span className="text-[10px] font-bold text-[#4d6358]">
                    {record.weightDelta}
                  </span>
                </div>

                <div className="bg-[#FAF7F2] p-3 rounded-2xl border border-[#E4DDD3]">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#786b66] block">
                    Waist
                  </span>
                  <span className="font-serif text-[17px] font-bold text-[#1d1b19] mt-0.5 block">
                    {record.waistCm} cm
                  </span>
                  <span className="text-[10px] font-bold text-[#786b66]">
                    {record.waistDelta}
                  </span>
                </div>

                <div className="bg-[#FAF7F2] p-3 rounded-2xl border border-[#E4DDD3]">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#786b66] block">
                    Energy Pulse
                  </span>
                  <span className="font-serif text-[15px] font-bold text-[#9a4023] mt-0.5 block truncate">
                    {record.sentimentEmoji} {record.sentiment}
                  </span>
                  <span className="text-[10px] text-[#786b66]">Logged</span>
                </div>

                <div className="bg-[#FAF7F2] p-3 rounded-2xl border border-[#E4DDD3] flex flex-col justify-center">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#786b66] block">
                    Photos
                  </span>
                  <span className="text-[12px] font-bold text-[#1d1b19] mt-0.5 flex items-center justify-center gap-1">
                    <Lock className="w-3 h-3 text-[#4d6358]" />
                    <span>Vault Stored</span>
                  </span>
                </div>
              </div>

              {/* Coach Feedback Snippet */}
              {record.coachReview && (
                <div className="p-3.5 rounded-2xl bg-[#FAF7F2] border border-[#E4DDD3] space-y-1">
                  <div className="flex items-center justify-between text-[10px] font-bold uppercase tracking-wider text-[#9a4023]">
                    <span className="flex items-center gap-1">
                      <Sparkles className="w-3 h-3" />
                      <span>{record.coachReview.coachName}</span>
                    </span>
                    <span className="text-[#786b66]">{record.coachReview.reviewedAt}</span>
                  </div>
                  <p className="text-[12px] text-[#56423d] leading-relaxed italic font-serif">
                    &ldquo;{record.coachReview.feedback}&rdquo;
                  </p>
                </div>
              )}
            </article>
          ))}
        </div>

        {/* Load More Button & Archive Summary */}
        {hasMoreRecords ? (
          <div className="flex flex-col items-center justify-center pt-2">
            <button
              type="button"
              onClick={() => setVisibleCount((prev) => prev + 3)}
              className="group px-7 py-3 rounded-2xl bg-[#F2EDE4] hover:bg-[#EAE3D6] border border-[#E4DDD3] text-[#1d1b19] font-bold text-[12px] tracking-wider uppercase transition-all shadow-2xs hover:shadow-xs flex items-center gap-2 cursor-pointer"
            >
              <ChevronDown className="w-4 h-4 text-[#9a4023] group-hover:translate-y-0.5 transition-transform" />
              <span>
                Load More Records ({remainingCount} Older {remainingCount === 1 ? 'Entry' : 'Entries'})
              </span>
            </button>
            <p className="text-[11px] text-[#786b66] mt-2">
              Showing {visibleRecords.length} of {sortedRecords.length} check-in entries
            </p>
          </div>
        ) : (
          sortedRecords.length > 3 && (
            <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-3 text-center sm:text-left text-[11px] text-[#786b66] border-t border-[#E4DDD3]/50">
              <span className="flex items-center gap-1.5 justify-center sm:justify-start">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#4d6358]" />
                <span>All {sortedRecords.length} historical check-in records loaded</span>
              </span>
              <button
                type="button"
                onClick={() => {
                  setVisibleCount(3);
                  const el = document.getElementById('past-records-section');
                  el?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="text-[#9a4023] hover:text-[#A84C2F] font-bold underline transition-colors cursor-pointer"
              >
                Show Latest 3 Only
              </button>
            </div>
          )
        )}
      </section>

      {/* ========================================================
          4. MODAL DRAWER FOR DETAILED PAST RECORD VIEW
         ======================================================== */}
      {selectedPastRecord && (
        <div
          className="fixed inset-0 z-50 bg-[#1C1A18]/60 backdrop-blur-xs flex items-center justify-center p-4 sm:p-6"
          onClick={() => setSelectedPastRecord(null)}
        >
          <div
            className="bg-[#FAF7F2] rounded-3xl max-w-lg w-full max-h-[85vh] overflow-y-auto p-6 sm:p-7 space-y-6 shadow-2xl border border-[#E4DDD3]"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between border-b border-[#E4DDD3] pb-3">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-widest text-[#9a4023]">
                  Historical Entry
                </span>
                <h3 className="font-serif text-[22px] font-bold text-[#1d1b19] leading-tight">
                  Week {selectedPastRecord.weekNumber} Recap
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setSelectedPastRecord(null)}
                className="text-[#786b66] hover:text-[#1d1b19] text-xl font-bold p-1"
              >
                ✕
              </button>
            </div>

            <div className="grid grid-cols-2 gap-3 text-center">
              <div className="bg-[#F2EDE4] p-3 rounded-2xl border border-[#E4DDD3]">
                <span className="text-[10px] font-bold uppercase text-[#786b66] block">Scale Weight</span>
                <span className="font-serif text-[20px] font-bold text-[#1d1b19]">
                  {displayWeight(selectedPastRecord.weightKg)} {unit.toLowerCase()}
                </span>
              </div>
              <div className="bg-[#F2EDE4] p-3 rounded-2xl border border-[#E4DDD3]">
                <span className="text-[10px] font-bold uppercase text-[#786b66] block">Waist Dimension</span>
                <span className="font-serif text-[20px] font-bold text-[#1d1b19]">
                  {selectedPastRecord.waistCm} cm
                </span>
              </div>
            </div>

            <div className="space-y-1.5">
              <span className="text-[11px] font-bold uppercase tracking-wider text-[#786b66]">
                Member Reflection
              </span>
              <p className="text-[13px] text-[#56423d] bg-[#F2EDE4] p-3.5 rounded-2xl border border-[#E4DDD3] leading-relaxed">
                {selectedPastRecord.notes || 'No extra notes provided.'}
              </p>
            </div>

            {selectedPastRecord.coachReview && (
              <div className="space-y-1.5">
                <span className="text-[11px] font-bold uppercase tracking-wider text-[#9a4023]">
                  Coach Tolu Review
                </span>
                <div className="p-3.5 rounded-2xl bg-[#E3E9E4]/60 border border-[#cde5d7] space-y-1">
                  <p className="text-[13px] text-[#0a1f17] italic font-serif leading-relaxed">
                    &ldquo;{selectedPastRecord.coachReview.feedback}&rdquo;
                  </p>
                  <span className="text-[10px] text-[#4d6358] font-bold block pt-1">
                    {selectedPastRecord.coachReview.reviewedAt}
                  </span>
                </div>
              </div>
            )}

            <button
              type="button"
              onClick={() => setSelectedPastRecord(null)}
              className="w-full h-11 bg-[#1C1A18] hover:bg-black text-[#FAF7F2] font-bold text-[12px] uppercase rounded-xl transition-colors cursor-pointer"
            >
              Close Record
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
