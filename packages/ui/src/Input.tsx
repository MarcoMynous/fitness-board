import React, { forwardRef, useId } from 'react';
import { cn } from './utils';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, label, error, helperText, id: customId, ...props }, ref) => {
    const generatedId = useId();
    const id = customId || generatedId;

    return (
      <div className="w-full space-y-1.5">
        {label && (
          <label
            htmlFor={id}
            className="block text-xs font-semibold uppercase tracking-wider text-[#78716C]"
          >
            {label}
            {props.required && <span className="text-[#991B1B] ml-1">*</span>}
          </label>
        )}
        <input
          ref={ref}
          id={id}
          className={cn(
            'flex w-full rounded-lg border border-[#E7E2DA] bg-white px-3.5 py-2.5 text-sm text-[#1C1917] placeholder:text-[#A8A29E]',
            'transition-colors duration-150',
            'focus:outline-none focus:border-[#6B1728] focus:ring-1 focus:ring-[#6B1728]',
            'disabled:cursor-not-allowed disabled:bg-[#FAF8F5] disabled:text-[#A8A29E]',
            error && 'border-[#991B1B] focus:border-[#991B1B] focus:ring-[#991B1B]',
            className
          )}
          {...props}
        />
        {error ? (
          <p className="text-xs font-medium text-[#991B1B]">{error}</p>
        ) : helperText ? (
          <p className="text-xs text-[#78716C]">{helperText}</p>
        ) : null}
      </div>
    );
  }
);

Input.displayName = 'Input';
