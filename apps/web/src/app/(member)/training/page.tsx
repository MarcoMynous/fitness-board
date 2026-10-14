'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Button, Card, Badge } from '@repo/ui';
import { Dumbbell, Calendar, CheckCircle2, Lock, Clock, ChevronDown, ChevronUp, Sparkles } from 'lucide-react';

export default function TrainingPage() {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<{
    hasAccess: boolean;
    program?: any;
    workouts?: any[];
    completions?: string[];
  }>({ hasAccess: false });
  const [selectedWeek, setSelectedWeek] = useState(1);
  const [expandedWorkoutId, setExpandedWorkoutId] = useState<string | null>(null);
  const [completingId, setCompletingId] = useState<string | null>(null);

  useEffect(() => {
    fetch('/api/training')
      .then((res) => res.json())
      .then((json) => {
        setData(json);
        if (json.workouts && json.workouts.length > 0) {
          setExpandedWorkoutId(json.workouts[0].id);
        }
      })
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, []);

  const handleMarkComplete = async (workoutId: string) => {
    try {
      setCompletingId(workoutId);
      const res = await fetch('/api/workouts/complete', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ workoutId }),
      });
      if (res.ok) {
        setData((prev) => ({
          ...prev,
          completions: [...(prev.completions || []), workoutId],
        }));
      }
    } catch (err) {
      console.error(err);
    } finally {
      setCompletingId(null);
    }
  };

  if (loading) {
    return <div className="py-20 text-center text-stone-secondary text-sm">Loading training protocol...</div>;
  }

  if (!data.hasAccess) {
    return (
      <div className="max-w-xl mx-auto py-16 text-center space-y-6">
        <div className="w-16 h-16 rounded-full bg-brand-burgundy/10 text-brand-burgundy flex items-center justify-center mx-auto">
          <Lock className="w-8 h-8" />
        </div>
        <div className="space-y-2">
          <Badge variant="burgundy">Entitlement Required</Badge>
          <h1 className="font-serif text-3xl text-stone-primary">Training Protocol is Locked</h1>
          <p className="text-sm text-stone-secondary leading-relaxed">
            Your current account does not hold an active Training entitlement. Upgrade to unlock the full 12-week progressive strength protocol.
          </p>
        </div>
        <Link href="/#pricing">
          <Button variant="primary" size="lg">
            Unlock Training Protocol ($49)
          </Button>
        </Link>
      </div>
    );
  }

  const currentWorkouts = (data.workouts || []).filter((w) => w.weekNumber === selectedWeek);

  return (
    <div className="space-y-8">
      {/* Page Title */}
      <div className="border-b border-stone-border pb-6 space-y-2">
        <div className="flex items-center gap-2">
          <Badge variant="burgundy">12-Week Protocol</Badge>
          <span className="text-xs text-stone-secondary font-medium">Phased Overload</span>
        </div>
        <h1 className="font-serif text-3xl sm:text-4xl text-stone-primary">
          {data.program?.title || 'Foundations of Strength & Power'}
        </h1>
        <p className="text-sm text-stone-secondary max-w-2xl">
          {data.program?.description}
        </p>
      </div>

      {/* Week Selector Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((wk) => (
          <button
            key={wk}
            onClick={() => setSelectedWeek(wk)}
            className={`px-4 py-2 rounded-lg text-xs font-semibold whitespace-nowrap transition-all ${
              selectedWeek === wk
                ? 'bg-brand-burgundy text-white shadow-sm'
                : 'bg-white border border-stone-border text-stone-secondary hover:text-stone-primary hover:bg-surface-base'
            }`}
          >
            Week {wk}
          </button>
        ))}
      </div>

      {/* Workouts for the Selected Week */}
      <div className="space-y-6">
        {currentWorkouts.length === 0 ? (
          <Card className="text-center py-12 text-stone-secondary text-sm">
            Sessions for Week {selectedWeek} will unlock as you progress.
          </Card>
        ) : (
          currentWorkouts.map((workout) => {
            const isCompleted = (data.completions || []).includes(workout.id);
            const isExpanded = expandedWorkoutId === workout.id;

            return (
              <Card
                key={workout.id}
                className="bg-white border-stone-border shadow-tactile-lg transition-all"
              >
                <div
                  className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 cursor-pointer"
                  onClick={() => setExpandedWorkoutId(isExpanded ? null : workout.id)}
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <Badge variant="neutral">Day {workout.dayNumber}</Badge>
                      <span className="text-xs text-stone-secondary flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5" /> {workout.durationMinutes} mins
                      </span>
                      {isCompleted && (
                        <Badge variant="success" className="flex items-center gap-1">
                          <CheckCircle2 className="w-3 h-3" /> Completed
                        </Badge>
                      )}
                    </div>
                    <h3 className="font-serif text-xl text-stone-primary">{workout.title}</h3>
                    <p className="text-xs text-stone-secondary">{workout.focus}</p>
                  </div>

                  <div className="flex items-center gap-3">
                    <button
                      type="button"
                      className="p-1 text-stone-secondary hover:text-stone-primary"
                    >
                      {isExpanded ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                    </button>
                  </div>
                </div>

                {/* Expanded Exercise Breakdown */}
                {isExpanded && (
                  <div className="mt-6 pt-6 border-t border-stone-border space-y-6">
                    <div className="p-3.5 rounded-lg bg-surface-base border border-stone-border text-xs text-stone-secondary">
                      <strong className="text-stone-primary block mb-1">Session Instructions:</strong>
                      {workout.instructions}
                    </div>

                    <div className="space-y-3">
                      <span className="text-xs font-semibold uppercase tracking-wider text-stone-secondary block">
                        Prescribed Movements & Cadence:
                      </span>
                      <div className="divide-y divide-stone-border border border-stone-border rounded-lg overflow-hidden bg-white">
                        {(workout.exercises || []).map((ex: any, idx: number) => (
                          <div key={idx} className="p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-2 hover:bg-surface-base/50 transition-colors">
                            <div>
                              <span className="text-sm font-semibold text-stone-primary">{ex.name}</span>
                              {ex.notes && (
                                <p className="text-xs text-stone-secondary mt-0.5">{ex.notes}</p>
                              )}
                            </div>
                            <div className="flex items-center gap-4 text-xs font-medium text-stone-primary">
                              <span className="bg-stone-sunken px-2.5 py-1 rounded">
                                {ex.sets} sets × {ex.reps}
                              </span>
                              <span className="text-stone-secondary">
                                {ex.restSeconds}s rest
                              </span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="flex justify-end pt-2">
                      <Button
                        variant={isCompleted ? 'outline' : 'primary'}
                        size="md"
                        isLoading={completingId === workout.id}
                        onClick={() => handleMarkComplete(workout.id)}
                      >
                        <CheckCircle2 className="w-4 h-4 mr-2 text-current" />
                        {isCompleted ? 'Completed (Log Again)' : 'Mark Session as Complete'}
                      </Button>
                    </div>
                  </div>
                )}
              </Card>
            );
          })
        )}
      </div>
    </div>
  );
}
