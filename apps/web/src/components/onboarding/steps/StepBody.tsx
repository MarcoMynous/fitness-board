import React from 'react';
import { OnboardingState } from '../types';

interface StepBodyProps {
  state: OnboardingState;
  onChange: (fields: Partial<OnboardingState>) => void;
}

export const StepBody: React.FC<StepBodyProps> = ({ state, onChange }) => {
  return (
    <div className="w-full flex flex-col space-y-6">
      {/* Header */}
      <div className="space-y-1.5 text-left">
        <span className="text-[11px] font-bold tracking-widest uppercase text-[#9a4023] block">
          Step 02 / 05 — Body
        </span>
        <h2 className="font-serif text-[28px] sm:text-[32px] font-bold tracking-tight text-[#1d1b19] uppercase leading-tight">
          Let&apos;s set your starting point.
        </h2>
        <p className="text-[14px] sm:text-[15px] text-[#56423d] leading-relaxed">
          Simple baseline metrics so your progressive milestones calibrate correctly.
        </p>
      </div>

      <div className="space-y-4">
        {/* Current Weight Field */}
        <div className="bg-[#F2EDE4] p-5 sm:p-6 rounded-2xl shadow-xs space-y-2 border border-[#E4DDD3]/80">
          <div className="flex items-center justify-between">
            <label
              htmlFor="input-weight"
              className="text-[12px] font-bold text-[#1d1b19] uppercase tracking-wider"
            >
              Current Weight
            </label>
            <span className="text-[12px] text-[#786b66] font-medium">Required</span>
          </div>

          <div className="relative flex items-center">
            <input
              id="input-weight"
              type="number"
              step="0.5"
              value={state.weight}
              onChange={(e) => onChange({ weight: e.target.value })}
              className="w-full h-14 bg-white text-[#1d1b19] font-serif font-bold text-[20px] px-4 rounded-xl focus:outline-hidden focus:ring-2 focus:ring-[#9a4023] shadow-inner border border-[#E4DDD3]"
              placeholder="72"
            />
            <div className="absolute right-3 px-3 py-1.5 bg-[#ede7e3] rounded-lg text-[11px] font-bold text-[#56423d] tracking-wider uppercase">
              KG
            </div>
          </div>
          <p className="text-[12px] text-[#786b66]">
            Used to baseline workload volume and nourishment guidelines.
          </p>
        </div>

        {/* Height Field */}
        <div className="bg-[#F2EDE4] p-5 sm:p-6 rounded-2xl shadow-xs space-y-2 border border-[#E4DDD3]/80">
          <div className="flex items-center justify-between">
            <label
              htmlFor="input-height"
              className="text-[12px] font-bold text-[#1d1b19] uppercase tracking-wider"
            >
              Height
            </label>
            <span className="text-[12px] text-[#786b66] font-medium">Required</span>
          </div>

          <div className="relative flex items-center">
            <input
              id="input-height"
              type="number"
              value={state.height}
              onChange={(e) => onChange({ height: e.target.value })}
              className="w-full h-14 bg-white text-[#1d1b19] font-serif font-bold text-[20px] px-4 rounded-xl focus:outline-hidden focus:ring-2 focus:ring-[#9a4023] shadow-inner border border-[#E4DDD3]"
              placeholder="168"
            />
            <div className="absolute right-3 px-3 py-1.5 bg-[#ede7e3] rounded-lg text-[11px] font-bold text-[#56423d] tracking-wider uppercase">
              CM
            </div>
          </div>
          <p className="text-[12px] text-[#786b66]">
            Calibrates movement leverage and posture mechanics.
          </p>
        </div>

        {/* Waist Measurement Field (Optional) */}
        <div className="bg-[#F2EDE4] p-5 sm:p-6 rounded-2xl shadow-xs space-y-2 border border-[#E4DDD3]/80">
          <div className="flex items-center justify-between">
            <label
              htmlFor="input-waist"
              className="text-[12px] font-bold text-[#1d1b19] uppercase tracking-wider"
            >
              Waist Measurement
            </label>
            <span className="px-2.5 py-0.5 rounded-full bg-[#E3E9E4] text-[#4d6358] text-[10px] font-bold uppercase tracking-wider">
              Optional
            </span>
          </div>

          <div className="relative flex items-center">
            <input
              id="input-waist"
              type="number"
              value={state.waist}
              onChange={(e) => onChange({ waist: e.target.value })}
              className="w-full h-14 bg-white text-[#1d1b19] font-serif font-bold text-[20px] px-4 rounded-xl focus:outline-hidden focus:ring-2 focus:ring-[#9a4023] shadow-inner border border-[#E4DDD3]"
              placeholder="E.g. 74"
            />
            <div className="absolute right-3 px-3 py-1.5 bg-[#ede7e3] rounded-lg text-[11px] font-bold text-[#56423d] tracking-wider uppercase">
              CM
            </div>
          </div>
          <p className="text-[12px] text-[#786b66]">
            Helpful for tracking inch loss independently from scale weight.
          </p>
        </div>
      </div>
    </div>
  );
};
