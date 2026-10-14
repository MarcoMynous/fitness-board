import React from 'react';
import { cn } from './utils';

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: 'burgundy' | 'terracotta' | 'success' | 'warning' | 'neutral';
}

export const Badge: React.FC<BadgeProps> = ({
  className,
  variant = 'neutral',
  children,
  ...props
}) => {
  const variants = {
    burgundy: 'bg-[#6B1728]/10 text-[#6B1728] border-[#6B1728]/20',
    terracotta: 'bg-[#C85A32]/10 text-[#C85A32] border-[#C85A32]/20',
    success: 'bg-[#2E6B4F]/10 text-[#2E6B4F] border-[#2E6B4F]/20',
    warning: 'bg-[#B45309]/10 text-[#B45309] border-[#B45309]/20',
    neutral: 'bg-[#F2EDE4] text-[#78716C] border-[#E7E2DA]'
  };

  return (
    <span
      className={cn(
        'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border tracking-wide uppercase',
        variants[variant],
        className
      )}
      {...props}
    >
      {children}
    </span>
  );
};
