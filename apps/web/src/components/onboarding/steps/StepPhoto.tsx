import React, { useRef } from 'react';
import { Camera, Lock, X } from 'lucide-react';
import { OnboardingState } from '../types';

interface StepPhotoProps {
  state: OnboardingState;
  onChange: (fields: Partial<OnboardingState>) => void;
  onSkip: () => void;
}

export const StepPhoto: React.FC<StepPhotoProps> = ({ state, onChange, onSkip }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const previewUrl = URL.createObjectURL(file);
      onChange({ photoUploaded: true, photoUrl: previewUrl });
    }
  };

  const handleSimulate = () => {
    onChange({
      photoUploaded: true,
      photoUrl: '/images/coach-tolu-editorial.jpg',
    });
  };

  const handleRemove = (e: React.MouseEvent) => {
    e.stopPropagation();
    onChange({ photoUploaded: false, photoUrl: null });
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className="w-full flex flex-col space-y-6">
      {/* Header */}
      <div className="space-y-1.5 text-left">
        <span className="text-[11px] font-bold tracking-widest uppercase text-[#9a4023] block">
          Step 05 / 05 — Progress
        </span>
        <h2 className="font-serif text-[28px] sm:text-[32px] font-bold tracking-tight text-[#1d1b19] uppercase leading-tight">
          Start with a photo?
        </h2>
        <p className="text-[14px] sm:text-[15px] text-[#56423d] leading-relaxed">
          Add a starting progress photo so you can look back at how far your posture and strength have shifted.
        </p>
      </div>

      {/* Hidden Native File Input */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        className="hidden"
      />

      {/* Upload Dropzone */}
      <div
        onClick={() => {
          if (!state.photoUploaded) {
            handleSimulate();
          }
        }}
        className="bg-[#F2EDE4] p-8 sm:p-10 rounded-2xl shadow-xs flex flex-col items-center justify-center text-center border-2 border-dashed border-[#dcc1b9]/80 hover:border-[#9a4023] transition-colors cursor-pointer group relative overflow-hidden"
      >
        {!state.photoUploaded ? (
          <div className="flex flex-col items-center space-y-3 py-4">
            <div className="w-16 h-16 rounded-full bg-white flex items-center justify-center text-[#9a4023] group-hover:scale-105 transition-transform shadow-xs">
              <Camera className="w-8 h-8" />
            </div>

            <div className="space-y-1">
              <p className="font-serif text-[17px] font-bold text-[#1d1b19] uppercase">
                + Add Starting Photo
              </p>
              <p className="text-[13px] text-[#786b66] max-w-sm">
                Tap to snap a photo or select from camera roll (front or side view)
              </p>
            </div>

            <span className="px-3 py-1 rounded-md bg-white text-[#56423d] text-[11px] font-bold uppercase tracking-wider border border-[#E4DDD3]">
              JPEG or PNG • Max 15MB
            </span>
          </div>
        ) : (
          <div className="flex flex-col items-center w-full">
            <div className="relative w-44 h-56 rounded-xl overflow-hidden shadow-md ring-2 ring-[#4d6358]/40">
              <img
                alt="Starting photo"
                className="w-full h-full object-cover"
                src={state.photoUrl || '/images/coach-tolu-editorial.jpg'}
              />
              <button
                type="button"
                onClick={handleRemove}
                className="absolute top-2 right-2 p-1 rounded-full bg-[#1C1A18]/70 text-white cursor-pointer hover:bg-[#1C1A18] transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
              <div className="absolute bottom-0 inset-x-0 bg-[#4d6358]/95 text-white py-1 text-center text-[11px] font-bold uppercase tracking-wider">
                Photo Verified
              </div>
            </div>

            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                fileInputRef.current?.click();
              }}
              className="mt-4 text-[#9a4023] text-[13px] font-bold hover:underline cursor-pointer"
            >
              Replace with another photo
            </button>
          </div>
        )}
      </div>

      {/* Privacy Guarantee Card */}
      <div className="p-4 sm:p-5 bg-[#EAE3D6] rounded-2xl flex items-start gap-4 shadow-xs border border-[#E4DDD3]/80">
        <Lock className="w-5 h-5 text-[#4d6358] shrink-0 mt-0.5" />
        <div className="text-left space-y-1">
          <p className="text-[13px] font-bold text-[#1d1b19]">
            Strict 100% Private Encryption
          </p>
          <p className="text-[12px] text-[#56423d] leading-relaxed">
            Your progress photos are strictly private and only visible to you in your secure member portal. They are never shared publicly.
          </p>
        </div>
      </div>

      {/* Action Helper: Skip Link */}
      <div className="pt-2 text-center">
        <button
          type="button"
          onClick={onSkip}
          className="text-[#786b66] hover:text-[#1d1b19] text-[12px] font-bold tracking-widest uppercase transition-colors cursor-pointer"
        >
          Skip for now &amp; complete profile
        </button>
      </div>
    </div>
  );
};
