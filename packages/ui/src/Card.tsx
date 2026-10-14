import React from 'react';
import { cn } from './utils';

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'elevated' | 'bordered';
}

export const Card: React.FC<CardProps> = ({
  className,
  variant = 'default',
  children,
  ...props
}) => {
  const variants = {
    default: 'bg-white border border-[#E7E2DA] shadow-[0_2px_8px_rgba(28,25,23,0.04)]',
    elevated: 'bg-white border border-[#E7E2DA] shadow-[0_8px_24px_rgba(28,25,23,0.08)]',
    bordered: 'bg-[#FAF8F5] border border-[#E7E2DA]'
  };

  return (
    <div
      className={cn('rounded-xl p-5 md:p-6 transition-all duration-200', variants[variant], className)}
      {...props}
    >
      {children}
    </div>
  );
};
