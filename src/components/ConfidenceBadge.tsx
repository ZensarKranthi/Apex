import React from 'react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface ConfidenceBadgeProps {
  score: number;
  className?: string;
}

export const ConfidenceBadge = ({ score, className }: ConfidenceBadgeProps) => {
  const getStatus = () => {
    if (score >= 85) return { color: 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20', label: 'High' };
    if (score >= 65) return { color: 'bg-amber-500/10 text-amber-500 border-amber-500/20', label: 'Medium' };
    return { color: 'bg-rose-500/10 text-rose-500 border-rose-500/20', label: 'Low' };
  };

  const status = getStatus();

  return (
    <div className={cn(
      "px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider border flex items-center gap-1.5",
      status.color,
      className
    )}>
      <div className={cn("w-1.5 h-1.5 rounded-full", status.color.split(' ')[1].replace('text-', 'bg-'))} />
      {status.label} ({score}%)
    </div>
  );
};
