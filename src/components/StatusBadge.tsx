import { CheckCircle2, AlertTriangle, AlertCircle, RefreshCw, Activity } from 'lucide-react';

interface StatusBadgeProps {
  status: 'healthy' | 'degraded' | 'error' | 'live' | 'syncing' | 'active' | 'idle' | 'processing' | 'success';
}

export function StatusBadge({ status }: StatusBadgeProps) {
  switch (status) {
    case 'healthy':
    case 'live':
    case 'success':
    case 'active':
      return (
        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
          <CheckCircle2 className="size-3.5" />
          {status.charAt(0).toUpperCase() + status.slice(1)}
        </span>
      );
    case 'degraded':
    case 'idle':
      return (
        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-amber-500/10 text-amber-400 border border-amber-500/20">
          <AlertTriangle className="size-3.5" />
          {status.charAt(0).toUpperCase() + status.slice(1)}
        </span>
      );
    case 'error':
      return (
        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-rose-500/10 text-rose-400 border border-rose-500/20">
          <AlertCircle className="size-3.5" />
          {status.charAt(0).toUpperCase() + status.slice(1)}
        </span>
      );
    case 'syncing':
    case 'processing':
      return (
        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-blue-500/10 text-blue-400 border border-blue-500/20">
          <RefreshCw className="size-3.5 animate-spin" />
          {status.charAt(0).toUpperCase() + status.slice(1)}
        </span>
      );
    default:
      return (
        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-gray-500/10 text-gray-400 border border-gray-500/20">
          <Activity className="size-3.5" />
          {status}
        </span>
      );
  }
}
