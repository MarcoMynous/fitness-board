'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  MapPin,
  Edit3,
  Maximize2,
  ExternalLink,
  Shield,
  Flame,
  BookOpen,
  MessageSquare,
  Bell,
  Laptop,
  Headphones,
  Lock,
  FileText,
  LogOut,
  ChevronRight,
  Check,
  CheckCircle2,
  ArrowRight,
  TrendingDown,
  X,
  Sparkles,
} from 'lucide-react';

export default function ProfilePage() {
  // User Profile State
  const [userProfile, setUserProfile] = useState({
    name: 'Member',
    email: '',
    location: 'Lagos, Nigeria • WAT',
    tier: 'Protocol Access Active',
    mainGoal: 'Lean Hypertrophy & Resiliency',
    startingWeight: '75.0 kg',
    currentWeight: '73.2 kg',
    weightDelta: '-1.8 kg',
    height: '172 cm',
    trainingLevel: 'Intermediate',
    sanctuary: 'Commercial Gym',
    coach: 'Coach Tolu Adebayo',
    coachRole: 'Active Mentor',
  });

  // Settings & Toggles
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [editProfileOpen, setEditProfileOpen] = useState(false);
  const [baselineModalOpen, setBaselineModalOpen] = useState(false);
  const [vipModalOpen, setVipModalOpen] = useState(false);
  const [conciergeModalOpen, setConciergeModalOpen] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  // Form states for Edit Profile Modal
  const [editName, setEditName] = useState('');
  const [editEmail, setEditEmail] = useState('');
  const [editLocation, setEditLocation] = useState('Lagos, Nigeria • WAT');

  // Form states for Baseline Modal
  const [editGoal, setEditGoal] = useState('Lean Hypertrophy & Resiliency');
  const [editWeight, setEditWeight] = useState('73.2');
  const [editSanctuary, setEditSanctuary] = useState('Commercial Gym');

  // Hydrate user from auth session & live database profile
  useEffect(() => {
    fetch('/api/auth/me')
      .then((res) => res.json())
      .then((data) => {
        if (data.authenticated && data.user) {
          const u = data.user;
          const fullName =
            u.profile?.fullName ||
            u.profile?.displayName ||
            u.email?.split('@')[0] ||
            'Member';
          const email = u.email || '';
          const rawGoal = u.profile?.fitnessGoal || 'strength_hypertrophy';
          const trainingActive = u.entitlements?.some(
            (e: any) => e.accessType === 'training' && e.status === 'active'
          );
          const cookbookActive = u.entitlements?.some(
            (e: any) => e.accessType === 'cookbook' && e.status === 'active'
          );
          const tier =
            trainingActive && cookbookActive
              ? 'Complete All-Access Active'
              : trainingActive
              ? 'Training Protocol Active'
              : cookbookActive
              ? 'Culinary Kitchen Active'
              : 'Member Access';

          const formattedGoal = rawGoal.replace(/_/g, ' ');
          const formattedEnv =
            u.profile?.trainingEnvironment?.replace(/_/g, ' ') || 'Commercial Gym';

          setUserProfile((prev) => ({
            ...prev,
            name: fullName,
            email: email,
            tier: tier,
            mainGoal: formattedGoal,
            trainingLevel: u.profile?.experienceLevel || prev.trainingLevel,
            sanctuary: formattedEnv,
          }));
          setEditName(fullName);
          setEditEmail(email);
          setEditGoal(formattedGoal);
          setEditSanctuary(formattedEnv);
        }
      })
      .catch((err) => console.error('Error hydrating profile:', err));
  }, []);

  const handleSaveProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    try {
      const res = await fetch('/api/profile', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ fullName: editName, displayName: editName }),
      });
      const data = await res.json();
      if (data.success && data.profile) {
        setUserProfile((prev) => ({
          ...prev,
          name: data.profile.fullName || editName,
          email: editEmail,
          location: editLocation,
        }));
      }
    } catch (err) {
      console.error('Error saving profile:', err);
    } finally {
      setIsSaving(false);
      setEditProfileOpen(false);
    }
  };

  const handleSaveBaseline = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    try {
      const res = await fetch('/api/profile', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          fitnessGoal: editGoal.toLowerCase().replace(/\s+/g, '_'),
          trainingEnvironment: editSanctuary.toLowerCase().replace(/\s+/g, '_'),
        }),
      });
      const data = await res.json();
      if (data.success) {
        setUserProfile((prev) => ({
          ...prev,
          mainGoal: editGoal,
          currentWeight: `${editWeight} kg`,
          sanctuary: editSanctuary,
        }));
      }
    } catch (err) {
      console.error('Error saving baseline:', err);
    } finally {
      setIsSaving(false);
      setBaselineModalOpen(false);
    }
  };

  return (
    <div className="flex flex-col w-full max-w-6xl mx-auto pb-16 space-y-10">
      {/* ========================================================
          1. HEADER WITH CONTEXT & MEMBERSHIP STATUS
         ======================================================== */}
      <header className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-4 border-b border-[#E4DDD3]/80">
        <div className="space-y-1.5">
          <div className="flex items-center gap-1.5 text-[#9a4023] font-bold text-[10px] tracking-widest uppercase">
            <span>MEMBER PROFILE</span>
            <span className="opacity-40">•</span>
            <span>LAGOS SANCTUARY</span>
          </div>
          <h1 className="font-serif text-[34px] sm:text-[42px] font-bold text-[#1d1b19] tracking-tight leading-none">
            Your Account &amp; Membership
          </h1>
          <p className="text-[13px] sm:text-[14px] text-[#56423d] leading-relaxed">
            Manage your personal credentials, training baselines, and program access.
          </p>
        </div>

        {/* Membership Tier Status Pill */}
        <div className="flex items-center gap-3 px-4 py-2 bg-[#F2EDE4] rounded-2xl border border-[#E4DDD3] shadow-2xs self-start md:self-auto">
          <div className="flex flex-col text-left">
            <span className="text-[9px] font-bold uppercase tracking-widest text-[#786b66]">
              MEMBERSHIP TIER
            </span>
            <div className="flex items-center gap-2 mt-0.5">
              <span className="font-serif text-[14px] font-bold text-[#1d1b19]">
                {userProfile.tier}
              </span>
              <span className="w-2.5 h-2.5 rounded-full bg-[#4d6358] animate-pulse" />
            </div>
          </div>
        </div>
      </header>

      {/* ========================================================
          2. TWO-COLUMN EDITORIAL DASHBOARD
         ======================================================== */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* ----------------------------------------------------
            LEFT COLUMN (Identity Card, Baseline Profile, Consistency)
           ---------------------------------------------------- */}
        <div className="lg:col-span-4 flex flex-col gap-6">
          {/* Card 1: Member Identity Card */}
          <div className="bg-[#FAF7F2] p-6 rounded-3xl border border-[#E4DDD3] shadow-xs space-y-5">
            <div className="flex items-start gap-4">
              {/* Avatar Frame with checkmark badge */}
              <div className="relative w-20 h-20 rounded-2xl overflow-hidden bg-[#1C1A18] shrink-0 border border-[#E4DDD3] shadow-xs">
                <img
                  alt={userProfile.name}
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuDAidh8fUUaDD3FFYzA_OwSAZWJ3GI4xK2DU5aL6Q4uS_AJfWrQkQyM-B17oQZXpH6HV-gtfi4zzLI7Z1xnEMie7shEmRX3lW9kM08EuBLEK8gkmMyhB_X0FE2t6JmRqvm2P0JbJ13IV9prJwzTbWU189M-QWfSm6k9BiDWo94FHfPyfHkmlnqJ-Nk4qyqcWexjcSGgn1d1sU92fVRmuTDLLTgrcpbi1ZfpVRYhztpuYXSMBCfJm9LBjg"
                  className="w-full h-full object-cover filter brightness-95"
                />
                <span className="absolute bottom-1 right-1 w-5 h-5 rounded-full bg-[#4d6358] text-white flex items-center justify-center shadow-xs">
                  <Check className="w-3 h-3 stroke-[3]" />
                </span>
              </div>

              <div className="space-y-1 min-w-0">
                <span className="inline-block px-2.5 py-0.5 rounded-full bg-[#EAE3D6] text-[#786b66] text-[9px] font-bold tracking-wider uppercase">
                  PRO ALL-ACCESS MEMBER
                </span>
                <h2 className="font-serif text-[20px] font-bold text-[#1d1b19] truncate leading-tight">
                  {userProfile.name}
                </h2>
                <p className="text-[12px] text-[#786b66] truncate">{userProfile.email}</p>
                <div className="flex items-center gap-1 text-[11px] text-[#56423d] pt-0.5">
                  <MapPin className="w-3 h-3 text-[#9a4023] shrink-0" />
                  <span className="truncate">{userProfile.location}</span>
                </div>
              </div>
            </div>

            {/* Edit Profile Action Button */}
            <button
              type="button"
              onClick={() => setEditProfileOpen(true)}
              className="w-full h-11 bg-[#F2EDE4] hover:bg-[#EAE3D6] text-[#1d1b19] border border-[#E4DDD3] font-bold text-[12px] tracking-wider uppercase rounded-xl transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-2xs"
            >
              <Edit3 className="w-3.5 h-3.5 text-[#9a4023]" />
              <span>Edit Profile Details</span>
            </button>
          </div>

          {/* Card 2: Onboarding Baseline / Fitness Profile */}
          <div className="bg-[#FAF7F2] p-6 rounded-3xl border border-[#E4DDD3] shadow-xs space-y-4">
            <div className="flex items-center justify-between pb-1">
              <div>
                <span className="text-[10px] font-bold tracking-widest uppercase text-[#9a4023] block">
                  ONBOARDING BASELINE
                </span>
                <h3 className="font-serif text-[20px] font-bold text-[#1d1b19] leading-tight">
                  Fitness Profile
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setBaselineModalOpen(true)}
                className="w-8 h-8 rounded-xl hover:bg-[#EAE3D6] text-[#786b66] hover:text-[#1d1b19] flex items-center justify-center transition-colors cursor-pointer"
                title="View Full Baseline"
              >
                <Maximize2 className="w-4 h-4" />
              </button>
            </div>

            {/* Inner Profile Specs Card */}
            <div className="bg-[#F2EDE4]/70 p-4 rounded-2xl border border-[#E4DDD3] space-y-3.5 text-left">
              <div>
                <span className="text-[9px] font-bold uppercase tracking-wider text-[#786b66] block">
                  MAIN GOAL
                </span>
                <span className="text-[13px] font-bold text-[#1d1b19] block mt-0.5">
                  {userProfile.mainGoal}
                </span>
              </div>

              <div className="grid grid-cols-2 gap-3 pt-1 border-t border-[#E4DDD3]/70">
                <div>
                  <span className="text-[9px] font-bold uppercase tracking-wider text-[#786b66] block">
                    STARTING WEIGHT
                  </span>
                  <span className="text-[13px] font-bold text-[#1d1b19] block mt-0.5">
                    {userProfile.startingWeight}
                  </span>
                </div>
                <div>
                  <span className="text-[9px] font-bold uppercase tracking-wider text-[#786b66] block">
                    CURRENT WEIGHT
                  </span>
                  <div className="flex items-center gap-1.5 mt-0.5">
                    <span className="text-[13px] font-bold text-[#1d1b19]">
                      {userProfile.currentWeight}
                    </span>
                    <span className="px-1.5 py-0.5 rounded bg-[#cde5d7] text-[#0a1f17] text-[10px] font-bold">
                      ({userProfile.weightDelta})
                    </span>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 pt-1 border-t border-[#E4DDD3]/70">
                <div>
                  <span className="text-[9px] font-bold uppercase tracking-wider text-[#786b66] block">
                    HEIGHT
                  </span>
                  <span className="text-[13px] font-bold text-[#1d1b19] block mt-0.5">
                    {userProfile.height}
                  </span>
                </div>
                <div>
                  <span className="text-[9px] font-bold uppercase tracking-wider text-[#786b66] block">
                    TRAINING LEVEL
                  </span>
                  <span className="text-[13px] font-bold text-[#1d1b19] block mt-0.5 truncate">
                    {userProfile.trainingLevel}
                  </span>
                </div>
              </div>

              <div className="pt-1 border-t border-[#E4DDD3]/70">
                <span className="text-[9px] font-bold uppercase tracking-wider text-[#786b66] block">
                  TRAINING SANCTUARY
                </span>
                <span className="text-[13px] font-bold text-[#1d1b19] block mt-0.5">
                  {userProfile.sanctuary}
                </span>
              </div>

              {/* Assigned Coach Pill */}
              <div className="p-3 bg-[#FAF7F2] rounded-xl border border-[#E4DDD3] flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Shield className="w-4 h-4 text-[#9a4023]" />
                  <div>
                    <span className="text-[8px] font-bold uppercase tracking-widest text-[#786b66] block">
                      ASSIGNED KINFOLK COACH
                    </span>
                    <span className="text-[12px] font-bold text-[#1d1b19]">
                      {userProfile.coach}
                    </span>
                  </div>
                </div>
                <span className="px-2 py-0.5 rounded bg-[#EAE3D6] text-[#786b66] text-[9px] font-bold uppercase">
                  {userProfile.coachRole}
                </span>
              </div>
            </div>

            <div className="flex items-center justify-between pt-1 text-[11px]">
              <button
                type="button"
                onClick={() => setBaselineModalOpen(true)}
                className="text-[#9a4023] hover:text-[#A84C2F] font-bold flex items-center gap-1 cursor-pointer transition-colors"
              >
                <span>Update Fitness Baseline</span>
                <ArrowRight className="w-3 h-3" />
              </button>
              <span className="text-[#786b66]">Last calibrated: 12 days ago</span>
            </div>
          </div>

          {/* Card 3: 8-Week Consistency Score */}
          <div className="bg-[#FAF7F2] p-6 rounded-3xl border border-[#E4DDD3] shadow-xs flex items-center justify-between">
            <div className="space-y-1">
              <span className="text-[9px] font-bold uppercase tracking-widest text-[#786b66] block">
                8-WEEK CONSISTENCY SCORE
              </span>
              <div className="font-serif text-[34px] font-bold text-[#1d1b19] leading-tight">
                94.2%
              </div>
              <p className="text-[11px] text-[#56423d]">23 of 24 planned sessions logged</p>
            </div>

            {/* Sparkline Visual */}
            <div className="flex items-center justify-center pl-2">
              <svg className="w-24 h-12 overflow-visible" viewBox="0 0 100 40">
                <defs>
                  <linearGradient id="consistencyGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#9a4023" stopOpacity="0.2" />
                    <stop offset="100%" stopColor="#9a4023" stopOpacity="0.0" />
                  </linearGradient>
                </defs>
                <path
                  d="M0,32 Q15,30 25,28 T50,22 T75,12 T100,6 L100,40 L0,40 Z"
                  fill="url(#consistencyGrad)"
                />
                <path
                  d="M0,32 Q15,30 25,28 T50,22 T75,12 T100,6"
                  fill="none"
                  stroke="#9a4023"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                />
              </svg>
            </div>
          </div>
        </div>

        {/* ----------------------------------------------------
            RIGHT COLUMN (My Access & Programs, Settings & Preferences)
           ---------------------------------------------------- */}
        <div className="lg:col-span-8 flex flex-col gap-8">
          {/* Section 1: Membership Entitlements (My Access & Programs) */}
          <section className="bg-[#FAF7F2] p-6 sm:p-7 rounded-3xl border border-[#E4DDD3] shadow-xs space-y-5">
            <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2 pb-1 border-b border-[#E4DDD3]/70">
              <div>
                <span className="text-[10px] font-bold tracking-widest uppercase text-[#9a4023] block">
                  MEMBERSHIP ENTITLEMENTS
                </span>
                <h3 className="font-serif text-[24px] font-bold text-[#1d1b19] leading-tight mt-0.5">
                  My Access &amp; Programs
                </h3>
              </div>
              <span className="text-[12px] text-[#786b66]">
                Digital library licenses &amp; archives
              </span>
            </div>

            {/* Program Item 1: 8-Week Detty December Transformation */}
            <div className="bg-[#F2EDE4]/80 p-5 rounded-2xl border border-[#E4DDD3] flex flex-col sm:flex-row sm:items-center justify-between gap-4 transition-all hover:bg-[#F2EDE4]">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-2xl bg-[#ffdbd0] text-[#9a4023] flex items-center justify-center shrink-0 shadow-2xs">
                  <Flame className="w-6 h-6" />
                </div>
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <h4 className="font-serif text-[17px] font-bold text-[#1d1b19] leading-snug">
                      8-Week Detty December Transformation
                    </h4>
                    <span className="px-2 py-0.5 rounded-full bg-[#cde5d7] text-[#0a1f17] text-[10px] font-bold uppercase tracking-wider flex items-center gap-1">
                      <Check className="w-2.5 h-2.5" />
                      <span>Active</span>
                    </span>
                  </div>
                  <p className="text-[12px] text-[#56423d]">
                    Training Program (Full 8 Weeks • Hypertrophy &amp; Conditioning)
                  </p>
                  <div className="flex items-center gap-3 text-[11px] text-[#786b66] pt-0.5">
                    <span>Purchased: Oct 1, 2024</span>
                    <span>•</span>
                    <span>Lifetime Archive Access</span>
                  </div>
                </div>
              </div>

              <Link
                href="/training"
                className="shrink-0 h-10 px-5 bg-[#FAF7F2] hover:bg-[#EAE3D6] text-[#1d1b19] border border-[#E4DDD3] font-bold text-[12px] tracking-wider uppercase rounded-xl transition-colors flex items-center justify-center gap-1.5 shadow-2xs self-start sm:self-center"
              >
                <span>Open Program</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            {/* Program Item 2: Kinfolk Kitchen Nourish Cookbook */}
            <div className="bg-[#F2EDE4]/80 p-5 rounded-2xl border border-[#E4DDD3] flex flex-col sm:flex-row sm:items-center justify-between gap-4 transition-all hover:bg-[#F2EDE4]">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-2xl bg-[#EAE3D6] text-[#786b66] flex items-center justify-center shrink-0 shadow-2xs">
                  <BookOpen className="w-6 h-6" />
                </div>
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <h4 className="font-serif text-[17px] font-bold text-[#1d1b19] leading-snug">
                      Kinfolk Kitchen Nourish Cookbook
                    </h4>
                    <span className="px-2 py-0.5 rounded-full bg-[#cde5d7] text-[#0a1f17] text-[10px] font-bold uppercase tracking-wider flex items-center gap-1">
                      <Check className="w-2.5 h-2.5" />
                      <span>Active</span>
                    </span>
                  </div>
                  <p className="text-[12px] text-[#56423d]">
                    Digital Recipe Vault (45+ High-Protein West African Adaptations)
                  </p>
                  <div className="flex items-center gap-3 text-[11px] text-[#786b66] pt-0.5">
                    <span>Included in All-Access Tier</span>
                    <span>•</span>
                    <span>Updated Bi-weekly</span>
                  </div>
                </div>
              </div>

              <Link
                href="/cookbook"
                className="shrink-0 h-10 px-5 bg-[#FAF7F2] hover:bg-[#EAE3D6] text-[#1d1b19] border border-[#E4DDD3] font-bold text-[12px] tracking-wider uppercase rounded-xl transition-colors flex items-center justify-center gap-1.5 shadow-2xs self-start sm:self-center"
              >
                <span>Browse Recipes</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            {/* Program Item 3: 1-on-1 WhatsApp VIP Accountability */}
            <div className="bg-[#F2EDE4]/80 p-5 rounded-2xl border border-[#E4DDD3] flex flex-col sm:flex-row sm:items-center justify-between gap-4 transition-all hover:bg-[#F2EDE4]">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-2xl bg-[#FAF7F2] text-[#786b66] flex items-center justify-center shrink-0 border border-[#E4DDD3] shadow-2xs">
                  <MessageSquare className="w-6 h-6" />
                </div>
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <h4 className="font-serif text-[17px] font-bold text-[#1d1b19] leading-snug">
                      1-on-1 WhatsApp VIP Accountability
                    </h4>
                    <span className="px-2 py-0.5 rounded-full bg-[#EAE3D6] text-[#786b66] text-[10px] font-bold uppercase tracking-wider">
                      Not Included
                    </span>
                  </div>
                  <p className="text-[12px] text-[#56423d]">
                    Personal voice note checks, weekly meal review, and real-time form corrections.
                  </p>
                  <p className="text-[11px] text-[#9a4023] font-bold pt-0.5">
                    Limited to 15 members monthly
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setVipModalOpen(true)}
                className="shrink-0 h-10 px-5 bg-[#9a4023] hover:bg-[#A84C2F] text-white font-bold text-[12px] tracking-wider uppercase rounded-xl transition-colors flex items-center justify-center gap-1.5 shadow-xs self-start sm:self-center cursor-pointer"
              >
                <span>Add to Membership</span>
                <span>+</span>
              </button>
            </div>
          </section>

          {/* Section 2: Member Controls (Settings & Preferences) */}
          <section className="bg-[#FAF7F2] p-6 sm:p-7 rounded-3xl border border-[#E4DDD3] shadow-xs space-y-5">
            <div className="pb-1 border-b border-[#E4DDD3]/70">
              <span className="text-[10px] font-bold tracking-widest uppercase text-[#9a4023] block">
                MEMBER CONTROLS
              </span>
              <h3 className="font-serif text-[24px] font-bold text-[#1d1b19] leading-tight mt-0.5">
                Settings &amp; Preferences
              </h3>
            </div>

            <div className="divide-y divide-[#E4DDD3]/70">
              {/* Row 1: Notifications & Schedule */}
              <div className="py-4 flex items-center justify-between gap-4">
                <div className="flex items-center gap-3.5">
                  <div className="w-10 h-10 rounded-xl bg-[#F2EDE4] text-[#1d1b19] flex items-center justify-center shrink-0 border border-[#E4DDD3]">
                    <Bell className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-[14px] font-bold text-[#1d1b19] leading-snug">
                      Notifications &amp; Schedule
                    </h4>
                    <p className="text-[12px] text-[#786b66]">
                      Email reminders &amp; morning workout alerts
                    </p>
                  </div>
                </div>

                {/* Animated Toggle Switch */}
                <button
                  type="button"
                  onClick={() => setNotificationsEnabled((prev) => !prev)}
                  className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                    notificationsEnabled ? 'bg-[#9a4023]' : 'bg-[#EAE3D6]'
                  }`}
                  role="switch"
                  aria-checked={notificationsEnabled}
                >
                  <span
                    className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                      notificationsEnabled ? 'translate-x-5' : 'translate-x-0'
                    }`}
                  />
                </button>
              </div>

              {/* Row 2: My Connected Devices */}
              <div
                onClick={() => setConciergeModalOpen(true)}
                className="py-4 flex items-center justify-between gap-4 cursor-pointer group"
              >
                <div className="flex items-center gap-3.5">
                  <div className="w-10 h-10 rounded-xl bg-[#F2EDE4] text-[#1d1b19] flex items-center justify-center shrink-0 border border-[#E4DDD3]">
                    <Laptop className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-[14px] font-bold text-[#1d1b19] group-hover:text-[#9a4023] transition-colors leading-snug">
                      My Connected Devices
                    </h4>
                    <p className="text-[12px] text-[#786b66]">
                      iPhone 15 Pro, MacBook Pro (2 active sessions)
                    </p>
                  </div>
                </div>
                <ChevronRight className="w-4 h-4 text-[#786b66] group-hover:translate-x-0.5 transition-transform" />
              </div>

              {/* Row 3: Lagos WhatsApp Concierge */}
              <div
                onClick={() => setConciergeModalOpen(true)}
                className="py-4 flex items-center justify-between gap-4 cursor-pointer group"
              >
                <div className="flex items-center gap-3.5">
                  <div className="w-10 h-10 rounded-xl bg-[#F2EDE4] text-[#1d1b19] flex items-center justify-center shrink-0 border border-[#E4DDD3]">
                    <Headphones className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-[14px] font-bold text-[#1d1b19] group-hover:text-[#9a4023] transition-colors leading-snug">
                      Lagos WhatsApp Concierge
                    </h4>
                    <p className="text-[12px] text-[#786b66]">
                      Direct support line with Coach Tolu&apos;s assistant team
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-[11px] font-bold text-[#4d6358] bg-[#cde5d7] px-2.5 py-0.5 rounded-full">
                    Available Now
                  </span>
                  <ChevronRight className="w-4 h-4 text-[#786b66] group-hover:translate-x-0.5 transition-transform" />
                </div>
              </div>

              {/* Row 4: Privacy & Transformation Photos */}
              <div
                onClick={() => setBaselineModalOpen(true)}
                className="py-4 flex items-center justify-between gap-4 cursor-pointer group"
              >
                <div className="flex items-center gap-3.5">
                  <div className="w-10 h-10 rounded-xl bg-[#F2EDE4] text-[#1d1b19] flex items-center justify-center shrink-0 border border-[#E4DDD3]">
                    <Lock className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-[14px] font-bold text-[#1d1b19] group-hover:text-[#9a4023] transition-colors leading-snug">
                      Privacy &amp; Transformation Photos
                    </h4>
                    <p className="text-[12px] text-[#786b66]">
                      End-to-end encrypted progress vault (Vault lock: ON)
                    </p>
                  </div>
                </div>
                <ChevronRight className="w-4 h-4 text-[#786b66] group-hover:translate-x-0.5 transition-transform" />
              </div>

              {/* Row 5: Terms of Sanctuary Membership */}
              <div
                onClick={() => setConciergeModalOpen(true)}
                className="py-4 flex items-center justify-between gap-4 cursor-pointer group"
              >
                <div className="flex items-center gap-3.5">
                  <div className="w-10 h-10 rounded-xl bg-[#F2EDE4] text-[#1d1b19] flex items-center justify-center shrink-0 border border-[#E4DDD3]">
                    <FileText className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-[14px] font-bold text-[#1d1b19] group-hover:text-[#9a4023] transition-colors leading-snug">
                      Terms of Sanctuary Membership
                    </h4>
                    <p className="text-[12px] text-[#786b66]">
                      Terms of service, recurring billing and refund guidelines
                    </p>
                  </div>
                </div>
                <ChevronRight className="w-4 h-4 text-[#786b66] group-hover:translate-x-0.5 transition-transform" />
              </div>
            </div>

            {/* Bottom Actions & App Build Status */}
            <div className="pt-4 border-t border-[#E4DDD3]/70 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-[12px]">
              <form action="/api/auth/sign-out" method="POST">
                <button
                  type="submit"
                  className="inline-flex items-center gap-2 text-[#9a4023] hover:text-[#A84C2F] font-bold transition-colors cursor-pointer"
                >
                  <LogOut className="w-4 h-4" />
                  <span>Log Out of All Devices</span>
                </button>
              </form>

              <span className="text-[#786b66] text-[11px]">
                Kinfolk App Build: v3.4.1 (Stable)
              </span>
            </div>
          </section>
        </div>
      </div>

      {/* ========================================================
          3. EDIT PROFILE MODAL DRAWER
         ======================================================== */}
      {editProfileOpen && (
        <div
          className="fixed inset-0 z-50 bg-[#1C1A18]/60 backdrop-blur-xs flex items-center justify-center p-4 sm:p-6"
          onClick={() => setEditProfileOpen(false)}
        >
          <div
            className="bg-[#FAF7F2] rounded-3xl max-w-md w-full p-6 sm:p-7 space-y-5 shadow-2xl border border-[#E4DDD3] animate-in zoom-in-95 duration-200"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between border-b border-[#E4DDD3] pb-3">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-widest text-[#9a4023]">
                  PROFILE SETTINGS
                </span>
                <h3 className="font-serif text-[20px] font-bold text-[#1d1b19] leading-tight">
                  Edit Personal Credentials
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setEditProfileOpen(false)}
                className="w-8 h-8 rounded-full hover:bg-[#EAE3D6] text-[#786b66] hover:text-[#1d1b19] flex items-center justify-center"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleSaveProfile} className="space-y-4">
              <div className="space-y-1">
                <label className="text-[11px] font-bold uppercase tracking-wider text-[#786b66] block">
                  Full Name
                </label>
                <input
                  type="text"
                  value={editName}
                  onChange={(e) => setEditName(e.target.value)}
                  className="w-full h-11 px-3.5 bg-white rounded-xl border border-[#E4DDD3] text-[14px] text-[#1d1b19] font-medium focus:outline-none focus:border-[#9a4023]"
                  required
                />
              </div>

              <div className="space-y-1">
                <label className="text-[11px] font-bold uppercase tracking-wider text-[#786b66] block">
                  Sign-in Email
                </label>
                <input
                  type="email"
                  value={editEmail}
                  onChange={(e) => setEditEmail(e.target.value)}
                  className="w-full h-11 px-3.5 bg-white rounded-xl border border-[#E4DDD3] text-[14px] text-[#1d1b19] font-medium focus:outline-none focus:border-[#9a4023]"
                  required
                />
              </div>

              <div className="space-y-1">
                <label className="text-[11px] font-bold uppercase tracking-wider text-[#786b66] block">
                  Location &amp; Timezone
                </label>
                <input
                  type="text"
                  value={editLocation}
                  onChange={(e) => setEditLocation(e.target.value)}
                  className="w-full h-11 px-3.5 bg-white rounded-xl border border-[#E4DDD3] text-[14px] text-[#1d1b19] font-medium focus:outline-none focus:border-[#9a4023]"
                  required
                />
              </div>

              <div className="pt-2 flex items-center gap-3">
                <button
                  type="submit"
                  disabled={isSaving}
                  className="flex-1 h-11 bg-[#9a4023] hover:bg-[#A84C2F] text-white font-bold text-[12px] tracking-wider uppercase rounded-xl transition-colors flex items-center justify-center gap-1.5 cursor-pointer shadow-xs"
                >
                  <span>{isSaving ? 'Saving Changes...' : 'Save Changes'}</span>
                </button>
                <button
                  type="button"
                  onClick={() => setEditProfileOpen(false)}
                  className="h-11 px-4 bg-[#F2EDE4] hover:bg-[#EAE3D6] text-[#1d1b19] border border-[#E4DDD3] font-bold text-[12px] rounded-xl transition-colors cursor-pointer"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ========================================================
          4. CALIBRATE FITNESS BASELINE MODAL
         ======================================================== */}
      {baselineModalOpen && (
        <div
          className="fixed inset-0 z-50 bg-[#1C1A18]/60 backdrop-blur-xs flex items-center justify-center p-4 sm:p-6"
          onClick={() => setBaselineModalOpen(false)}
        >
          <div
            className="bg-[#FAF7F2] rounded-3xl max-w-md w-full p-6 sm:p-7 space-y-5 shadow-2xl border border-[#E4DDD3] animate-in zoom-in-95 duration-200"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between border-b border-[#E4DDD3] pb-3">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-widest text-[#9a4023]">
                  METABOLIC BASELINE
                </span>
                <h3 className="font-serif text-[20px] font-bold text-[#1d1b19] leading-tight">
                  Update Fitness Calibration
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setBaselineModalOpen(false)}
                className="w-8 h-8 rounded-full hover:bg-[#EAE3D6] text-[#786b66] hover:text-[#1d1b19] flex items-center justify-center"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleSaveBaseline} className="space-y-4">
              <div className="space-y-1">
                <label className="text-[11px] font-bold uppercase tracking-wider text-[#786b66] block">
                  Primary Transformation Goal
                </label>
                <input
                  type="text"
                  value={editGoal}
                  onChange={(e) => setEditGoal(e.target.value)}
                  className="w-full h-11 px-3.5 bg-white rounded-xl border border-[#E4DDD3] text-[14px] text-[#1d1b19] font-medium focus:outline-none focus:border-[#9a4023]"
                  required
                />
              </div>

              <div className="space-y-1">
                <label className="text-[11px] font-bold uppercase tracking-wider text-[#786b66] block">
                  Current Scale Weight (kg)
                </label>
                <input
                  type="number"
                  step="0.1"
                  value={editWeight}
                  onChange={(e) => setEditWeight(e.target.value)}
                  className="w-full h-11 px-3.5 bg-white rounded-xl border border-[#E4DDD3] text-[14px] text-[#1d1b19] font-medium focus:outline-none focus:border-[#9a4023]"
                  required
                />
              </div>

              <div className="space-y-1">
                <label className="text-[11px] font-bold uppercase tracking-wider text-[#786b66] block">
                  Training Environment / Sanctuary
                </label>
                <input
                  type="text"
                  value={editSanctuary}
                  onChange={(e) => setEditSanctuary(e.target.value)}
                  className="w-full h-11 px-3.5 bg-white rounded-xl border border-[#E4DDD3] text-[14px] text-[#1d1b19] font-medium focus:outline-none focus:border-[#9a4023]"
                  required
                />
              </div>

              <div className="pt-2 flex items-center gap-3">
                <button
                  type="submit"
                  disabled={isSaving}
                  className="flex-1 h-11 bg-[#9a4023] hover:bg-[#A84C2F] text-white font-bold text-[12px] tracking-wider uppercase rounded-xl transition-colors flex items-center justify-center gap-1.5 cursor-pointer shadow-xs"
                >
                  <span>{isSaving ? 'Recalibrating...' : 'Update Baseline'}</span>
                </button>
                <button
                  type="button"
                  onClick={() => setBaselineModalOpen(false)}
                  className="h-11 px-4 bg-[#F2EDE4] hover:bg-[#EAE3D6] text-[#1d1b19] border border-[#E4DDD3] font-bold text-[12px] rounded-xl transition-colors cursor-pointer"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ========================================================
          5. 1-ON-1 WHATSAPP VIP ACCOUNTABILITY MODAL
         ======================================================== */}
      {vipModalOpen && (
        <div
          className="fixed inset-0 z-50 bg-[#1C1A18]/60 backdrop-blur-xs flex items-center justify-center p-4 sm:p-6"
          onClick={() => setVipModalOpen(false)}
        >
          <div
            className="bg-[#FAF7F2] rounded-3xl max-w-lg w-full p-6 sm:p-8 space-y-6 shadow-2xl border border-[#E4DDD3] animate-in zoom-in-95 duration-200"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between border-b border-[#E4DDD3] pb-3">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-widest text-[#9a4023]">
                  VIP ROSTER UPGRADE
                </span>
                <h3 className="font-serif text-[22px] font-bold text-[#1d1b19] leading-tight">
                  1-on-1 WhatsApp Accountability
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setVipModalOpen(false)}
                className="w-8 h-8 rounded-full hover:bg-[#EAE3D6] text-[#786b66] hover:text-[#1d1b19] flex items-center justify-center"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-3 text-[13px] text-[#56423d] leading-relaxed">
              <p>
                Get direct access to Coach Tolu Adebayo via a private, dedicated WhatsApp thread. Includes:
              </p>
              <ul className="space-y-2 pt-1">
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#9a4023] mt-2 shrink-0" />
                  <span>Personalized morning audio briefings and form check video reviews.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#9a4023] mt-2 shrink-0" />
                  <span>Real-time restaurant menu adjustments during social dinners in Lagos.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#9a4023] mt-2 shrink-0" />
                  <span>Bi-weekly biometric adjustments and cycle-adapted cardio pacing.</span>
                </li>
              </ul>
              <div className="p-3.5 bg-[#ffdbd0]/60 rounded-xl border border-[#ffdbd0] text-[#9a4023] font-bold text-[11px] mt-2">
                ⚠️ Only 2 slots remaining for this calendar cycle (capped at 15 members).
              </div>
            </div>

            <div className="pt-2 flex items-center gap-3">
              <Link
                href="/checkout/simulate?plan=vip"
                className="flex-1 h-11 bg-[#9a4023] hover:bg-[#A84C2F] text-white font-bold text-[12px] tracking-wider uppercase rounded-xl transition-colors flex items-center justify-center gap-1.5 shadow-xs"
              >
                <span>Reserve VIP Access</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
              <button
                type="button"
                onClick={() => setVipModalOpen(false)}
                className="h-11 px-4 bg-[#F2EDE4] hover:bg-[#EAE3D6] text-[#1d1b19] border border-[#E4DDD3] font-bold text-[12px] rounded-xl transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================
          6. LAGOS WHATSAPP CONCIERGE DRAWER
         ======================================================== */}
      {conciergeModalOpen && (
        <div
          className="fixed inset-0 z-50 bg-[#1C1A18]/60 backdrop-blur-xs flex items-center justify-center p-4 sm:p-6"
          onClick={() => setConciergeModalOpen(false)}
        >
          <div
            className="bg-[#FAF7F2] rounded-3xl max-w-md w-full p-6 sm:p-7 space-y-5 shadow-2xl border border-[#E4DDD3] animate-in zoom-in-95 duration-200"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between border-b border-[#E4DDD3] pb-3">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-widest text-[#4d6358]">
                  STUDIO SUPPORT
                </span>
                <h3 className="font-serif text-[20px] font-bold text-[#1d1b19] leading-tight">
                  Lagos Concierge Desk
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setConciergeModalOpen(false)}
                className="w-8 h-8 rounded-full hover:bg-[#EAE3D6] text-[#786b66] hover:text-[#1d1b19] flex items-center justify-center"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <p className="text-[13px] text-[#56423d] leading-relaxed">
              Our Lagos concierge team is live to assist you with session bookings, nutrition swaps, and member subscription questions.
            </p>

            <div className="p-4 bg-[#F2EDE4] rounded-2xl border border-[#E4DDD3] space-y-2 text-center">
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#786b66] block">
                DIRECT WHATSAPP DESK
              </span>
              <span className="font-serif text-[18px] font-bold text-[#1d1b19] block">
                +234 812 000 KINFOLK
              </span>
              <span className="text-[11px] text-[#4d6358] font-bold block">
                Average reply time: under 15 minutes (WAT)
              </span>
            </div>

            <div className="pt-2 flex items-center gap-3">
              <a
                href="https://wa.me/2348120000000"
                target="_blank"
                rel="noreferrer"
                className="flex-1 h-11 bg-[#4d6358] hover:bg-[#3d5046] text-white font-bold text-[12px] tracking-wider uppercase rounded-xl transition-colors flex items-center justify-center gap-1.5 shadow-xs"
              >
                <span>Launch WhatsApp Chat</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
              <button
                type="button"
                onClick={() => setConciergeModalOpen(false)}
                className="h-11 px-4 bg-[#F2EDE4] hover:bg-[#EAE3D6] text-[#1d1b19] border border-[#E4DDD3] font-bold text-[12px] rounded-xl transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
