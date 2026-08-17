import { TrendingUp, TrendingDown } from 'lucide-react';

interface StatCardProps {
  title: string;
  value: string | number;
  delta?: number; // percentage change
  deltaType?: 'increase' | 'decrease' | 'neutral';
  icon?: React.ReactNode;
}

export function StatCard({ title, value, delta, deltaType, icon }: StatCardProps) {
  const isPositive = deltaType === 'increase' || (delta !== undefined && delta > 0);
  const isNegative = deltaType === 'decrease' || (delta !== undefined && delta < 0);
  
  return (
    <div className="bg-card border border-border rounded-xl p-5 shadow-sm">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-medium text-gray-400">{title}</h3>
        {icon && <div className="text-accent/80">{icon}</div>}
      </div>
      
      <div className="flex items-end justify-between">
        <div className="text-3xl font-bold tracking-tight">{value}</div>
        
        {delta !== undefined && (
          <div className={`flex items-center text-xs font-medium px-2 py-1 rounded-md ${
            isPositive ? 'text-emerald-400 bg-emerald-400/10' : 
            isNegative ? 'text-rose-400 bg-rose-400/10' : 
            'text-gray-400 bg-gray-400/10'
          }`}>
            {isPositive ? <TrendingUp className="size-3 mr-1" /> : 
             isNegative ? <TrendingDown className="size-3 mr-1" /> : null}
            {Math.abs(delta)}%
          </div>
        )}
      </div>
    </div>
  );
}
