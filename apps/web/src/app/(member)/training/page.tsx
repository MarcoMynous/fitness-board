'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  Check,
  CheckCircle2,
  Play,
  Clock,
  Dumbbell,
  Activity,
  Eye,
  Lock,
  Calendar,
  History,
  Download,
  Lightbulb,
  MessageCircle,
  ArrowRight,
  Sparkles,
  X,
  Sliders,
  ChevronRight,
  Layers,
} from 'lucide-react';

interface ExerciseItem {
  name: string;
  sets: string;
  reps: string;
  notes: string;
}

export default function TrainingPage() {
  const [offlineSync, setOfflineSync] = useState(true);
  const [selectedWeek, setSelectedWeek] = useState(3);
  const [workoutModalOpen, setWorkoutModalOpen] = useState(false);
  const [reviewLogOpen, setReviewLogOpen] = useState(false);
  const [fridayRoutineOpen, setFridayRoutineOpen] = useState(false);
  const [todayCompleted, setTodayCompleted] = useState(false);
  const [offlineToast, setOfflineToast] = useState(false);

  // Exercises for Today's Workout
  const exercises: ExerciseItem[] = [
    {
      name: 'Neutral Grip Dumbbell Overhead Press',
      sets: '3 Sets',
      reps: '10–12 Reps',
      notes: '6–8 kg. Keep ribs tucked down and glutes engaged to prevent lumbar hyperextension.',
    },
    {
      name: 'Single-Arm Supported Row',
      sets: '3 Sets',
      reps: '10 Reps / side',
      notes: '8–10 kg. 2-second pause at peak scapular contraction before controlled descent.',
    },
    {
      name: 'Resistance Band Face Pull & External Rotation',
      sets: '3 Sets',
      reps: '15 Reps',
      notes: 'Drive elbows back high; squeeze posterior deltoids and hold tension.',
    },
    {
      name: 'Half-Kneeling Rotational Woodchopper',
      sets: '3 Sets',
      reps: '12 Reps / side',
      notes: 'Initiate 360° diaphragmatic exhale as you rotate across the torso.',
    },
    {
      name: 'Deadbug with Core Bracing & Arm Reaches',
      sets: '3 Sets',
      reps: '45 Seconds',
      notes: 'Keep lower back completely flush against the mat without letting pelvis tilt.',
    },
  ];

  const handleToggleOffline = () => {
    setOfflineSync((prev) => {
      const next = !prev;
      if (next) {
        setOfflineToast(true);
        setTimeout(() => setOfflineToast(false), 2500);
      }
      return next;
    });
  };

  const handleCompleteWorkout = () => {
    setTodayCompleted(true);
    setWorkoutModalOpen(false);
  };

  return (
    <div className="flex flex-col w-full max-w-6xl mx-auto pb-16 space-y-8">
      {/* ========================================================
          1. HEADER & PHASE PROGRESSION CAPSULE
         ======================================================== */}
      <header className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-4 border-b border-[#E4DDD3]/80">
        <div className="space-y-1.5">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#E3E9E4] text-[#4d6358] font-bold text-[10px] tracking-widest uppercase">
            <span className="w-1.5 h-1.5 rounded-full bg-[#4d6358]" />
            <span>PHASE 1</span>
            <span className="opacity-40">•</span>
            <span>STRUCTURAL ADAPTATION</span>
          </div>

          <h1 className="font-serif text-[36px] sm:text-[44px] font-bold text-[#1d1b19] tracking-tight leading-none">
            Training
          </h1>
          <p className="text-[13px] sm:text-[14px] text-[#56423d] leading-relaxed">
            Your 8 Week Program • Lean Functional Strength &amp; Core
          </p>
        </div>

        {/* Top Right Progress Summary Capsule */}
        <div className="flex items-center gap-4 px-5 py-3 bg-[#F2EDE4] rounded-2xl border border-[#E4DDD3] shadow-2xs self-start md:self-auto">
          <div className="flex flex-col text-left">
            <div className="flex items-baseline justify-between gap-3">
              <span className="font-serif text-[14px] font-bold text-[#1d1b19]">
                Week 3 of 8
              </span>
              <span className="text-[12px] font-bold text-[#9a4023]">35% Completed</span>
            </div>
            <div className="flex items-center gap-2 mt-1 text-[11px] text-[#56423d]">
              <span>{todayCompleted ? '8 of 24 Sessions Logged' : '7 of 24 Sessions Logged'}</span>
              <span>•</span>
              <span className="inline-flex items-center gap-1 font-bold text-[#4d6358]">
                <Check className="w-3 h-3 stroke-[3]" />
                <span>On Schedule</span>
              </span>
            </div>
          </div>
        </div>
      </header>

      {/* ========================================================
          2. TWO-COLUMN LAYOUT (WORKOUTS / ROADMAP)
         ======================================================== */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* ----------------------------------------------------
            LEFT COLUMN (Current Cycle, Session Cards, Coach Notes)
           ---------------------------------------------------- */}
        <div className="lg:col-span-8 flex flex-col gap-6">
          {/* Current Cycle Dark Banner */}
          <div className="bg-[#1C1A18] text-[#FAF7F2] p-6 rounded-3xl shadow-md space-y-2 relative overflow-hidden">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div className="space-y-0.5">
                <span className="text-[10px] font-bold tracking-widest uppercase text-[#ffdbd0] block">
                  CURRENT CYCLE
                </span>
                <h2 className="font-serif text-[22px] sm:text-[24px] font-bold text-white tracking-tight">
                  Week 3 — Strength &amp; Shape
                </h2>
              </div>

              <div className="flex items-center gap-2 self-start sm:self-auto">
                <span className="px-3 py-1 rounded-full bg-white/10 text-white font-bold text-[11px]">
                  3 Sessions
                </span>
                <span className="px-3 py-1 rounded-full bg-[#cde5d7] text-[#0a1f17] font-bold text-[11px]">
                  {todayCompleted ? '3 Completed' : '2 Completed'}
                </span>
              </div>
            </div>

            <p className="text-[13px] text-white/80 leading-relaxed max-w-2xl pt-1">
              Shifting focus to progressive resistance, posterior chain recruitment, and deep core bracing through controlled tempo.
            </p>
          </div>

          {/* Session 1: Monday • Completed */}
          <div className="bg-[#FAF7F2] p-5 sm:p-6 rounded-3xl border border-[#E4DDD3] shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4 transition-all hover:bg-[#F2EDE4]/70">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-2xl bg-[#cde5d7] text-[#0a1f17] flex items-center justify-center shrink-0">
                <Check className="w-5 h-5 stroke-[2.5]" />
              </div>

              <div className="space-y-1">
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#786b66] block">
                  MONDAY • Completed
                </span>
                <h3 className="font-serif text-[18px] font-bold text-[#786b66] line-through leading-tight">
                  Lower Body Sculpt
                </h3>
                <div className="flex items-center gap-3 text-[11px] text-[#786b66] pt-0.5">
                  <span className="flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    <span>38 min</span>
                  </span>
                  <span>•</span>
                  <span className="flex items-center gap-1">
                    <Dumbbell className="w-3 h-3" />
                    <span>6 exercises</span>
                  </span>
                  <span>•</span>
                  <span>~240 kcal</span>
                </div>
              </div>
            </div>

            <button
              type="button"
              onClick={() => setReviewLogOpen(true)}
              className="h-10 px-4 bg-[#F2EDE4] hover:bg-[#EAE3D6] text-[#1d1b19] border border-[#E4DDD3] font-bold text-[11px] tracking-wider uppercase rounded-xl transition-colors flex items-center justify-center gap-1.5 shadow-2xs self-start sm:self-center cursor-pointer"
            >
              <History className="w-3.5 h-3.5 text-[#786b66]" />
              <span>Review Log</span>
            </button>
          </div>

          {/* Session 2: TODAY'S SESSION • Wednesday (Featured Hero Card) */}
          <div className="bg-[#FAF7F2] rounded-3xl border border-[#E4DDD3] border-l-4 border-l-[#9a4023] shadow-md p-6 sm:p-7 space-y-5 transition-all">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[#E4DDD3]/70 pb-3">
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-0.5 rounded-full bg-[#9a4023] text-white font-bold text-[10px] tracking-wider uppercase">
                  TODAY&apos;S SESSION
                </span>
                <span className="font-bold text-[11px] uppercase tracking-wider text-[#786b66]">
                  WEDNESDAY
                </span>
              </div>

              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#9a4023] animate-ping" />
                <span className="text-[11px] font-bold text-[#9a4023]">
                  {todayCompleted ? 'Completed Today ✓' : 'Ready to begin'}
                </span>
              </div>
            </div>

            {/* Split Content: Details & Workout Video Frame */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
              {/* Left Details */}
              <div className="md:col-span-7 space-y-4">
                <div>
                  <h3 className="font-serif text-[24px] sm:text-[28px] font-bold text-[#1d1b19] leading-tight">
                    Upper Body &amp; Posture Definition
                  </h3>
                  <p className="text-[13px] text-[#56423d] leading-relaxed mt-1">
                    Focused deltoid isolation, scapular stabilization, and rotational ribcage mechanics to lengthen posture.
                  </p>
                </div>

                {/* Metric Badges */}
                <div className="flex flex-wrap items-center gap-2">
                  <span className="inline-flex items-center gap-1 px-3 py-1 rounded-xl bg-[#F2EDE4] text-[#1d1b19] text-[11px] font-bold border border-[#E4DDD3]">
                    <Clock className="w-3.5 h-3.5 text-[#9a4023]" />
                    <span>35 min duration</span>
                  </span>
                  <span className="inline-flex items-center gap-1 px-3 py-1 rounded-xl bg-[#F2EDE4] text-[#1d1b19] text-[11px] font-bold border border-[#E4DDD3]">
                    <Dumbbell className="w-3.5 h-3.5 text-[#786b66]" />
                    <span>5 targeted exercises</span>
                  </span>
                  <span className="inline-flex items-center gap-1 px-3 py-1 rounded-xl bg-[#F2EDE4] text-[#1d1b19] text-[11px] font-bold border border-[#E4DDD3]">
                    <Activity className="w-3.5 h-3.5 text-[#4d6358]" />
                    <span>Moderate intensity</span>
                  </span>
                </div>

                {/* Coach Tolu Says Micro Card */}
                <div className="p-3.5 rounded-2xl bg-[#E7EFE9] border border-[#d2e0d5] flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full overflow-hidden shrink-0 bg-[#4d6358] border border-[#d2e0d5]">
                    <img
                      alt="Coach Tolu"
                      src="https://lh3.googleusercontent.com/aida-public/AB6AXuDAidh8fUUaDD3FFYzA_OwSAZWJ3GI4xK2DU5aL6Q4uS_AJfWrQkQyM-B17oQZXpH6HV-gtfi4zzLI7Z1xnEMie7shEmRX3lW9kM08EuBLEK8gkmMyhB_X0FE2t6JmRqvm2P0JbJ13IV9prJwzTbWU189M-QWfSm6k9BiDWo94FHfPyfHkmlnqJ-Nk4qyqcWexjcSGgn1d1sU92fVRmuTDLLTgrcpbi1ZfpVRYhztpuYXSMBCfJm9LBjg"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="text-[11px] text-[#2c3d33] leading-snug">
                    <span className="font-bold text-[#1d1b19] block">Coach Tolu says:</span>
                    <span className="italic">
                      &ldquo;Keep ribs tucked and chin neutral on the overhead lockout.&rdquo;
                    </span>
                  </div>
                </div>

                {/* Required Equipment Indicator */}
                <div className="flex items-center gap-2 text-[11px] text-[#786b66]">
                  <Layers className="w-3.5 h-3.5 text-[#9a4023]" />
                  <span>Required: Dumbbells (6–8kg), Resistance Band</span>
                </div>
              </div>

              {/* Right Preview Card & Start Workout CTA */}
              <div className="md:col-span-5 flex flex-col gap-3">
                <div
                  onClick={() => setWorkoutModalOpen(true)}
                  className="relative rounded-2xl overflow-hidden h-48 sm:h-52 w-full bg-[#1C1A18] shadow-sm group cursor-pointer"
                >
                  <img
                    alt="Upper Body & Posture Workout"
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuBcJtoyXzRqalz1b_M6yrUD5gql1C6jo4rSkhmk3GPndqXrP4kJaWtWvyT8eZncPhXxTaff0ArZd1XZD5ksFeo9Aja0xI07zVboT4MNEnNdwomIbh8h_UGR4hYAckZi5Te2_4QiNIP3VAsb2zNSPzBnXNa--TGRVtqog0ZJiyCv_t7u3yG2p4S5tDQ85zniQWVgdWfzKbzxkuLtREQWjnoZBvMS3xl55HeWoHT2m3tAZB-8jfLN7VV2Cw"
                    className="w-full h-full object-cover filter brightness-95 group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex items-center justify-center">
                    <div className="w-12 h-12 rounded-full bg-white/90 text-[#9a4023] flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                      <Play className="w-5 h-5 fill-[#9a4023] ml-0.5" />
                    </div>
                  </div>
                  <span className="absolute bottom-3 left-3 text-[10px] font-bold text-white uppercase tracking-wider backdrop-blur-xs bg-black/40 px-2 py-0.5 rounded-md flex items-center gap-1">
                    <Play className="w-2.5 h-2.5 fill-white" />
                    <span>Preview Movements</span>
                  </span>
                </div>

                <button
                  type="button"
                  onClick={() => setWorkoutModalOpen(true)}
                  className="w-full h-12 bg-[#9a4023] hover:bg-[#A84C2F] text-white font-bold text-[12px] tracking-wider uppercase rounded-xl transition-all shadow-md hover:shadow-lg flex items-center justify-center gap-2 cursor-pointer active:scale-98"
                >
                  <span>{todayCompleted ? 'Review / Repeat Workout' : 'START WORKOUT'}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          {/* Session 3: Friday • Scheduled */}
          <div className="bg-[#FAF7F2] p-5 sm:p-6 rounded-3xl border border-[#E4DDD3] shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4 transition-all hover:bg-[#F2EDE4]/70">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-2xl bg-[#F2EDE4] text-[#1d1b19] flex items-center justify-center shrink-0 border border-[#E4DDD3]">
                <Calendar className="w-5 h-5 text-[#786b66]" />
              </div>

              <div className="space-y-1">
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#786b66] block">
                  FRIDAY • Scheduled (In 2 Days)
                </span>
                <h3 className="font-serif text-[18px] font-bold text-[#1d1b19] leading-tight">
                  Full Body Burn &amp; Conditioning
                </h3>
                <div className="flex items-center gap-3 text-[11px] text-[#786b66] pt-0.5">
                  <span className="flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    <span>40 min</span>
                  </span>
                  <span>•</span>
                  <span className="flex items-center gap-1">
                    <Dumbbell className="w-3 h-3" />
                    <span>7 exercises</span>
                  </span>
                  <span>•</span>
                  <span>High Energy</span>
                </div>
              </div>
            </div>

            <button
              type="button"
              onClick={() => setFridayRoutineOpen(true)}
              className="h-10 px-4 bg-[#F2EDE4] hover:bg-[#EAE3D6] text-[#1d1b19] border border-[#E4DDD3] font-bold text-[11px] tracking-wider uppercase rounded-xl transition-colors flex items-center justify-center gap-1.5 shadow-2xs self-start sm:self-center cursor-pointer"
            >
              <Eye className="w-3.5 h-3.5 text-[#786b66]" />
              <span>View Routine</span>
            </button>
          </div>

          {/* Coach Form Notes Callout */}
          <div className="bg-[#FAF7F2] p-6 rounded-3xl border border-[#E4DDD3] shadow-xs flex items-start gap-4">
            <div className="w-10 h-10 rounded-2xl bg-[#ffdbd0] text-[#9a4023] flex items-center justify-center shrink-0 shadow-2xs">
              <Lightbulb className="w-5 h-5" />
            </div>

            <div className="space-y-1.5">
              <span className="text-[10px] font-bold uppercase tracking-widest text-[#9a4023] block">
                COACH FORM NOTES • Breath &amp; Core Mechanics
              </span>
              <p className="text-[13px] text-[#56423d] leading-relaxed italic">
                &ldquo;This week we increase rotational tension. Before beginning each compound lift, initiate an active 360° diaphragmatic exhale to seal your pelvic floor. If you feel lower back fatigue, drop weight by 2kg and slow the tempo to a strict 3-second descent.&rdquo;
              </p>
            </div>
          </div>
        </div>

        {/* ----------------------------------------------------
            RIGHT COLUMN (Offline Sync, 8-Week Roadmap, Gear, Circle)
           ---------------------------------------------------- */}
        <div className="lg:col-span-4 flex flex-col gap-6">
          {/* Offline Sync Card */}
          <div className="bg-[#FAF7F2] p-4 rounded-3xl border border-[#E4DDD3] shadow-xs flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-[#F2EDE4] text-[#1d1b19] flex items-center justify-center shrink-0 border border-[#E4DDD3]">
                <Download className="w-4 h-4 text-[#9a4023]" />
              </div>
              <div>
                <h4 className="text-[13px] font-bold text-[#1d1b19] leading-snug">
                  Offline Sync
                </h4>
                <p className="text-[11px] text-[#786b66]">
                  Save Week 3 for gym floor
                </p>
              </div>
            </div>

            {/* Toggle */}
            <button
              type="button"
              onClick={handleToggleOffline}
              className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                offlineSync ? 'bg-[#4d6358]' : 'bg-[#EAE3D6]'
              }`}
              role="switch"
              aria-checked={offlineSync}
            >
              <span
                className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                  offlineSync ? 'translate-x-5' : 'translate-x-0'
                }`}
              />
            </button>
          </div>

          {offlineToast && (
            <div className="p-3 bg-[#cde5d7] text-[#0a1f17] text-[11px] font-bold rounded-2xl border border-[#cde5d7] text-center animate-in fade-in">
              ✓ Week 3 protocol cached for offline floor access
            </div>
          )}

          {/* 8-Week Roadmap (Pacing & Progression Tracker) */}
          <div className="bg-[#FAF7F2] p-6 rounded-3xl border border-[#E4DDD3] shadow-xs space-y-4">
            <div className="flex items-center justify-between pb-1 border-b border-[#E4DDD3]/70">
              <div>
                <h3 className="font-serif text-[18px] font-bold text-[#1d1b19] leading-tight">
                  8-Week Roadmap
                </h3>
                <span className="text-[10px] text-[#786b66]">
                  Pacing &amp; Progression Tracker
                </span>
              </div>
              <span className="px-2.5 py-0.5 rounded-full bg-[#E3E9E4] text-[#4d6358] font-bold text-[10px] tracking-wider uppercase">
                WEEKS 1–8
              </span>
            </div>

            {/* Roadmap Timeline List */}
            <div className="space-y-2 pt-1 text-[12px]">
              {/* Week 1: Complete */}
              <div className="flex items-center justify-between p-2.5 rounded-2xl hover:bg-[#F2EDE4] transition-colors">
                <div className="flex items-center gap-2.5">
                  <span className="w-5 h-5 rounded-full bg-[#cde5d7] text-[#0a1f17] flex items-center justify-center shrink-0">
                    <Check className="w-3 h-3 stroke-[3]" />
                  </span>
                  <div>
                    <span className="font-bold text-[#1d1b19] block">
                      Week 1 • Foundation
                    </span>
                    <span className="text-[10px] text-[#786b66]">
                      Full Mobility &amp; Movement Prep
                    </span>
                  </div>
                </div>
                <span className="text-[10px] font-bold tracking-wider uppercase text-[#4d6358]">
                  COMPLETE
                </span>
              </div>

              {/* Week 2: Complete */}
              <div className="flex items-center justify-between p-2.5 rounded-2xl hover:bg-[#F2EDE4] transition-colors">
                <div className="flex items-center gap-2.5">
                  <span className="w-5 h-5 rounded-full bg-[#cde5d7] text-[#0a1f17] flex items-center justify-center shrink-0">
                    <Check className="w-3 h-3 stroke-[3]" />
                  </span>
                  <div>
                    <span className="font-bold text-[#1d1b19] block">
                      Week 2 • Build the Base
                    </span>
                    <span className="text-[10px] text-[#786b66]">
                      Eccentric Control &amp; Stance
                    </span>
                  </div>
                </div>
                <span className="text-[10px] font-bold tracking-wider uppercase text-[#4d6358]">
                  COMPLETE
                </span>
              </div>

              {/* Week 3: Current (Highlighted) */}
              <div className="flex items-center justify-between p-3 rounded-2xl bg-[#F2EDE4] border border-[#E4DDD3] shadow-2xs">
                <div className="flex items-center gap-2.5">
                  <span className="w-5 h-5 rounded-full bg-[#9a4023] text-white flex items-center justify-center font-bold text-[10px] shrink-0">
                    3
                  </span>
                  <div>
                    <span className="font-bold text-[#1d1b19] block">
                      Week 3 • Strength &amp; Shape
                    </span>
                    <span className="text-[10px] text-[#9a4023] font-semibold">
                      Resistance &amp; Posture (Active)
                    </span>
                  </div>
                </div>
                <span className="px-2 py-0.5 rounded-md bg-[#ffdbd0] text-[#9a4023] font-bold text-[9px] tracking-wider uppercase">
                  CURRENT
                </span>
              </div>

              {/* Week 4: Upcoming */}
              <div className="flex items-center justify-between p-2.5 rounded-2xl hover:bg-[#F2EDE4] transition-colors">
                <div className="flex items-center gap-2.5">
                  <span className="w-5 h-5 rounded-full bg-[#EAE3D6] text-[#786b66] flex items-center justify-center font-bold text-[10px] shrink-0">
                    4
                  </span>
                  <div>
                    <span className="font-bold text-[#1d1b19] block">
                      Week 4 • Build &amp; Burn
                    </span>
                    <span className="text-[10px] text-[#786b66]">
                      Super-sets &amp; Core Density
                    </span>
                  </div>
                </div>
                <span className="text-[10px] font-bold tracking-wider uppercase text-[#786b66]">
                  UPCOMING
                </span>
              </div>

              {/* Weeks 5 - 8: Locked */}
              <div className="flex items-center justify-between p-2.5 text-[#786b66]/70">
                <span>Week 5 • Sculpt &amp; Alignment</span>
                <Lock className="w-3.5 h-3.5" />
              </div>
              <div className="flex items-center justify-between p-2.5 text-[#786b66]/70">
                <span>Week 6 • Metabolic Push</span>
                <Lock className="w-3.5 h-3.5" />
              </div>
              <div className="flex items-center justify-between p-2.5 text-[#786b66]/70">
                <span>Week 7 • Core Refinement</span>
                <Lock className="w-3.5 h-3.5" />
              </div>
              <div className="flex items-center justify-between p-2.5 text-[#786b66]/70">
                <span>Week 8 • Peak Transformation</span>
                <Lock className="w-3.5 h-3.5" />
              </div>
            </div>
          </div>

          {/* Required Gear (3 ITEMS) */}
          <div className="bg-[#FAF7F2] p-6 rounded-3xl border border-[#E4DDD3] shadow-xs space-y-3.5">
            <div className="flex items-center justify-between pb-1 border-b border-[#E4DDD3]/70">
              <h3 className="font-serif text-[18px] font-bold text-[#1d1b19] leading-tight">
                Required Gear
              </h3>
              <span className="text-[10px] font-bold tracking-widest uppercase text-[#786b66]">
                3 ITEMS
              </span>
            </div>

            <div className="space-y-2.5">
              {/* Gear 1 */}
              <div className="p-3 bg-[#F2EDE4]/70 rounded-2xl border border-[#E4DDD3] flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-xl bg-white text-[#9a4023] flex items-center justify-center shrink-0 border border-[#E4DDD3]">
                    <Dumbbell className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-[12px] font-bold text-[#1d1b19]">
                      Dumbbells (5–10 kg)
                    </h4>
                    <p className="text-[10px] text-[#786b66]">
                      For upper body rows and overhead presses
                    </p>
                  </div>
                </div>
                <Check className="w-4 h-4 text-[#4d6358] shrink-0" />
              </div>

              {/* Gear 2 */}
              <div className="p-3 bg-[#F2EDE4]/70 rounded-2xl border border-[#E4DDD3] flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-xl bg-white text-[#9a4023] flex items-center justify-center shrink-0 border border-[#E4DDD3]">
                    <Activity className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-[12px] font-bold text-[#1d1b19]">
                      Glute Loop Bands
                    </h4>
                    <p className="text-[10px] text-[#786b66]">
                      Medium to heavy fabric resistance
                    </p>
                  </div>
                </div>
                <Check className="w-4 h-4 text-[#4d6358] shrink-0" />
              </div>

              {/* Gear 3 */}
              <div className="p-3 bg-[#F2EDE4]/70 rounded-2xl border border-[#E4DDD3] flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-xl bg-white text-[#9a4023] flex items-center justify-center shrink-0 border border-[#E4DDD3]">
                    <Layers className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-[12px] font-bold text-[#1d1b19]">
                      Cushioned Yoga Mat
                    </h4>
                    <p className="text-[10px] text-[#786b66]">
                      Floor core activation &amp; joint support
                    </p>
                  </div>
                </div>
                <Check className="w-4 h-4 text-[#4d6358] shrink-0" />
              </div>
            </div>
          </div>

          {/* Kinfolk Circle Card */}
          <div className="bg-[#FAF7F2] p-5 rounded-3xl border border-[#E4DDD3] shadow-xs flex items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-[#E3E9E4] text-[#4d6358] flex items-center justify-center shrink-0">
                <MessageCircle className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-[13px] font-bold text-[#1d1b19]">Kinfolk Circle</h4>
                <p className="text-[11px] text-[#786b66]">
                  34 members active today in Week 3 chat
                </p>
              </div>
            </div>

            <a
              href="https://chat.whatsapp.com"
              target="_blank"
              rel="noreferrer"
              className="text-[#9a4023] hover:text-[#A84C2F] font-bold text-[12px] flex items-center gap-1 transition-colors"
            >
              <span>Join</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>
      </div>

      {/* ========================================================
          3. WORKOUT PLAYER / PREVIEW MODAL DRAWER
         ======================================================== */}
      {workoutModalOpen && (
        <div
          className="fixed inset-0 z-50 bg-[#1C1A18]/70 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6 overflow-y-auto animate-in fade-in duration-200"
          onClick={() => setWorkoutModalOpen(false)}
        >
          <div
            className="bg-[#FAF7F2] rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6 sm:p-8 space-y-6 shadow-2xl border border-[#E4DDD3] my-auto relative animate-in zoom-in-95 duration-200"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-start justify-between border-b border-[#E4DDD3] pb-4">
              <div>
                <div className="flex items-center gap-2">
                  <span className="px-2.5 py-0.5 rounded-full bg-[#9a4023] text-white font-bold text-[9px] tracking-wider uppercase">
                    WEDNESDAY PROTOCOL
                  </span>
                  <span className="text-[11px] text-[#786b66]">Week 3 • 35 Min</span>
                </div>
                <h3 className="font-serif text-[24px] sm:text-[28px] font-bold text-[#1d1b19] leading-tight mt-1">
                  Upper Body &amp; Posture Definition
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setWorkoutModalOpen(false)}
                className="w-9 h-9 rounded-full hover:bg-[#EAE3D6] text-[#786b66] hover:text-[#1d1b19] flex items-center justify-center transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Coach Form Reminder */}
            <div className="p-4 bg-[#E7EFE9] rounded-2xl border border-[#d2e0d5] space-y-1">
              <span className="text-[10px] font-bold uppercase tracking-widest text-[#4d6358] block">
                COACH TOLU NOTE
              </span>
              <p className="text-[12px] text-[#2c3d33] leading-relaxed italic">
                &ldquo;Focus on the eccentric 3-second descent. We are creating neuromuscular pathways that will lengthen thoracic posture.&rdquo;
              </p>
            </div>

            {/* Exercise List */}
            <div className="space-y-3">
              <h4 className="font-serif text-[17px] font-bold text-[#1d1b19]">
                Exercise Movements ({exercises.length} Total)
              </h4>

              <div className="space-y-2.5">
                {exercises.map((ex, idx) => (
                  <div
                    key={idx}
                    className="p-4 rounded-2xl bg-[#F2EDE4]/70 border border-[#E4DDD3] flex items-start gap-3.5"
                  >
                    <span className="w-6 h-6 rounded-full bg-[#9a4023]/10 text-[#9a4023] font-bold text-[11px] flex items-center justify-center shrink-0 mt-0.5">
                      {idx + 1}
                    </span>
                    <div className="space-y-1 flex-1">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                        <h5 className="text-[14px] font-bold text-[#1d1b19]">{ex.name}</h5>
                        <span className="text-[11px] font-bold text-[#9a4023] bg-white px-2 py-0.5 rounded-md border border-[#E4DDD3] self-start sm:self-auto">
                          {ex.sets} • {ex.reps}
                        </span>
                      </div>
                      <p className="text-[12px] text-[#56423d] leading-relaxed">{ex.notes}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Complete Workout Actions */}
            <div className="pt-2 border-t border-[#E4DDD3] flex flex-col sm:flex-row items-center gap-3">
              <button
                type="button"
                onClick={handleCompleteWorkout}
                className="w-full sm:flex-1 h-12 bg-[#9a4023] hover:bg-[#A84C2F] text-white font-bold text-[12px] tracking-wider uppercase rounded-xl transition-all shadow-xs flex items-center justify-center gap-2 cursor-pointer"
              >
                <CheckCircle2 className="w-4 h-4" />
                <span>Mark Session Complete &amp; Log</span>
              </button>

              <button
                type="button"
                onClick={() => setWorkoutModalOpen(false)}
                className="w-full sm:w-auto h-12 px-6 bg-[#F2EDE4] hover:bg-[#EAE3D6] text-[#1d1b19] border border-[#E4DDD3] font-bold text-[12px] rounded-xl transition-colors cursor-pointer"
              >
                Close Preview
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================
          4. REVIEW LOG MODAL (Monday Session)
         ======================================================== */}
      {reviewLogOpen && (
        <div
          className="fixed inset-0 z-50 bg-[#1C1A18]/60 backdrop-blur-xs flex items-center justify-center p-4 sm:p-6"
          onClick={() => setReviewLogOpen(false)}
        >
          <div
            className="bg-[#FAF7F2] rounded-3xl max-w-md w-full p-6 sm:p-7 space-y-5 shadow-2xl border border-[#E4DDD3] animate-in zoom-in-95 duration-200"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between border-b border-[#E4DDD3] pb-3">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-widest text-[#4d6358]">
                  COMPLETED WORKOUT LOG
                </span>
                <h3 className="font-serif text-[20px] font-bold text-[#1d1b19] leading-tight">
                  Lower Body Sculpt
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setReviewLogOpen(false)}
                className="w-8 h-8 rounded-full hover:bg-[#EAE3D6] text-[#786b66] hover:text-[#1d1b19] flex items-center justify-center"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="grid grid-cols-3 gap-2 bg-[#F2EDE4] p-3 rounded-2xl border border-[#E4DDD3] text-center">
              <div>
                <span className="text-[9px] font-bold uppercase tracking-wider text-[#786b66] block">
                  DURATION
                </span>
                <strong className="font-serif text-[15px] text-[#1d1b19]">38 min</strong>
              </div>
              <div>
                <span className="text-[9px] font-bold uppercase tracking-wider text-[#786b66] block">
                  ENERGY
                </span>
                <strong className="font-serif text-[15px] text-[#9a4023]">240 kcal</strong>
              </div>
              <div>
                <span className="text-[9px] font-bold uppercase tracking-wider text-[#786b66] block">
                  CADENCE
                </span>
                <strong className="font-serif text-[15px] text-[#4d6358]">Solid</strong>
              </div>
            </div>

            <p className="text-[12px] text-[#56423d] leading-relaxed">
              Log verified on Monday at 07:15 WAT. Goblet squats reached 14 kg for 4 sets. Hamstrings felt engaged without knee discomfort.
            </p>

            <button
              type="button"
              onClick={() => setReviewLogOpen(false)}
              className="w-full h-11 bg-[#1C1A18] text-white font-bold text-[12px] tracking-wider uppercase rounded-xl hover:bg-black transition-colors"
            >
              Done Reviewing
            </button>
          </div>
        </div>
      )}

      {/* ========================================================
          5. FRIDAY ROUTINE PREVIEW MODAL
         ======================================================== */}
      {fridayRoutineOpen && (
        <div
          className="fixed inset-0 z-50 bg-[#1C1A18]/60 backdrop-blur-xs flex items-center justify-center p-4 sm:p-6"
          onClick={() => setFridayRoutineOpen(false)}
        >
          <div
            className="bg-[#FAF7F2] rounded-3xl max-w-md w-full p-6 sm:p-7 space-y-5 shadow-2xl border border-[#E4DDD3] animate-in zoom-in-95 duration-200"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between border-b border-[#E4DDD3] pb-3">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-widest text-[#9a4023]">
                  UPCOMING SESSION PREVIEW
                </span>
                <h3 className="font-serif text-[20px] font-bold text-[#1d1b19] leading-tight">
                  Full Body Burn &amp; Conditioning
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setFridayRoutineOpen(false)}
                className="w-8 h-8 rounded-full hover:bg-[#EAE3D6] text-[#786b66] hover:text-[#1d1b19] flex items-center justify-center"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-3 text-[13px] text-[#56423d] leading-relaxed">
              <p>
                Friday features metabolic compound circuits to flush cortisol and ignite post-session EPOC expenditure:
              </p>
              <ul className="space-y-2 text-[12px]">
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#9a4023]" />
                  <span>Dumbbell Thrusters (4 sets of 12)</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#9a4023]" />
                  <span>Renegade Rows to Plank Hold (4 sets of 10)</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#9a4023]" />
                  <span>Lateral Banded Skater Jumps (3 sets of 45s)</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#9a4023]" />
                  <span>Hollow Body Rockers (3 sets of 30s)</span>
                </li>
              </ul>
            </div>

            <button
              type="button"
              onClick={() => setFridayRoutineOpen(false)}
              className="w-full h-11 bg-[#F2EDE4] hover:bg-[#EAE3D6] text-[#1d1b19] border border-[#E4DDD3] font-bold text-[12px] tracking-wider uppercase rounded-xl transition-colors"
            >
              Close Routine
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
