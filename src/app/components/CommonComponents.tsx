import React from 'react';
import { LucideIcon } from 'lucide-react';
import { Button } from '@/app/components/ui/button';

interface EmptyStateProps {
  icon: LucideIcon;
  title: string;
  description: string;
  actionLabel?: string;
  onAction?: () => void;
}

export const EmptyState = ({ icon: Icon, title, description, actionLabel, onAction }: EmptyStateProps) => (
  <div className="flex flex-col items-center justify-center p-12 text-center bg-white rounded-3xl border border-dashed border-slate-200 animate-in fade-in zoom-in duration-300">
    <div className="p-4 bg-slate-50 rounded-full mb-4">
      <Icon className="w-10 h-10 text-slate-400" />
    </div>
    <h3 className="text-xl font-bold text-slate-900">{title}</h3>
    <p className="text-slate-500 max-w-[280px] mt-2 mb-6 leading-relaxed">{description}</p>
    {actionLabel && onAction && (
      <Button onClick={onAction} className="rounded-xl px-8 py-6 font-bold">
        {actionLabel}
      </Button>
    )}
  </div>
);

export const Skeleton = ({ className }: { className?: string }) => (
  <div className={`bg-slate-200 animate-pulse rounded-xl ${className}`} />
);

export const BikeCardSkeleton = () => (
  <div className="bg-white rounded-2xl overflow-hidden border border-slate-100 p-0 shadow-sm">
    <Skeleton className="aspect-[4/3] rounded-none" />
    <div className="p-4 space-y-3">
      <div className="flex justify-between">
        <Skeleton className="h-6 w-1/2" />
        <Skeleton className="h-6 w-1/4" />
      </div>
      <Skeleton className="h-4 w-3/4" />
      <Skeleton className="h-10 w-full rounded-xl" />
    </div>
  </div>
);

export const StatCardSkeleton = () => (
  <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm space-y-4">
    <div className="flex justify-between items-start">
      <Skeleton className="w-12 h-12 rounded-2xl" />
      <Skeleton className="w-12 h-6" />
    </div>
    <div className="space-y-2">
      <Skeleton className="h-4 w-1/2" />
      <Skeleton className="h-8 w-3/4" />
    </div>
  </div>
);
