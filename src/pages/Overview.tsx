import { StatCard } from '../components/StatCard';
import { StatusBadge } from '../components/StatusBadge';
import { Database, Search, Cpu, Activity, Clock, Network } from 'lucide-react';
import { recentActivity, systemHealth } from '../data/mockData';

export default function Overview() {
  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Overview</h1>
          <p className="text-sm text-gray-400 mt-1">Live mission control for enterprise memory.</p>
        </div>
      </div>

      {/* KPI Strip */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard 
          title="Indexed Sources" 
          value="142" 
          delta={12} 
          deltaType="increase" 
          icon={<Database className="size-4" />} 
        />
        <StatCard 
          title="Retrieval Requests (24h)" 
          value="84.2k" 
          delta={5.4} 
          deltaType="increase" 
          icon={<Search className="size-4" />} 
        />
        <StatCard 
          title="Avg Retrieval Latency" 
          value={`${systemHealth.latency_ms}ms`} 
          delta={2.1} 
          deltaType="decrease" 
          icon={<Clock className="size-4" />} 
        />
        <StatCard 
          title="Active AI Agents" 
          value="24" 
          delta={0} 
          deltaType="neutral" 
          icon={<Cpu className="size-4" />} 
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Knowledge Graph Mini-visual */}
        <div className="lg:col-span-2 bg-card border border-border rounded-xl p-5 shadow-sm min-h-[400px] flex flex-col relative overflow-hidden group">
          <div className="flex items-center justify-between mb-4 relative z-10">
            <h3 className="font-semibold flex items-center gap-2">
              <Network className="size-4 text-accent" />
              Live Knowledge Graph
            </h3>
            <span className="text-xs bg-secondary px-2 py-1 rounded text-gray-400">Force-Directed Preview</span>
          </div>
          
          <div className="flex-1 flex items-center justify-center relative z-10">
            <div className="text-center">
              <div className="w-16 h-16 rounded-full border border-accent/30 flex items-center justify-center mx-auto mb-3 animate-pulse bg-accent/5">
                <Network className="size-6 text-accent/50" />
              </div>
              <p className="text-sm text-gray-400 max-w-xs">Connecting 3.6M nodes across 142 knowledge sources...</p>
            </div>
          </div>
          
          {/* Aesthetic background particles for "graph" feel */}
          <div className="absolute inset-0 opacity-20 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-accent/20 via-background to-background pointer-events-none transition-opacity duration-1000 group-hover:opacity-40"></div>
          <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-accent rounded-full shadow-[0_0_10px_rgba(59,130,246,0.8)]"></div>
          <div className="absolute top-3/4 left-1/2 w-1.5 h-1.5 bg-purple-500 rounded-full shadow-[0_0_10px_rgba(168,85,247,0.8)]"></div>
          <div className="absolute top-1/2 right-1/4 w-2 h-2 bg-emerald-500 rounded-full shadow-[0_0_10px_rgba(16,185,129,0.8)]"></div>
          
          {/* SVG Connecting lines (fake graph) */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-20">
            <line x1="25%" y1="25%" x2="50%" y2="75%" stroke="var(--accent)" strokeWidth="1" strokeDasharray="4 4" />
            <line x1="50%" y1="75%" x2="75%" y2="50%" stroke="#a855f7" strokeWidth="1" strokeDasharray="4 4" />
            <line x1="25%" y1="25%" x2="75%" y2="50%" stroke="#10b981" strokeWidth="1" strokeDasharray="4 4" />
          </svg>
        </div>

        {/* Activity Feed */}
        <div className="bg-card border border-border rounded-xl p-5 shadow-sm flex flex-col">
          <div className="flex items-center justify-between mb-6">
            <h3 className="font-semibold flex items-center gap-2">
              <Activity className="size-4 text-accent" />
              Recent Activity
            </h3>
          </div>
          
          <div className="flex-1 space-y-4">
            {recentActivity.map((activity) => (
              <div key={activity.id} className="relative pl-6 pb-4 last:pb-0">
                <div className="absolute left-0 top-1.5 w-2 h-2 rounded-full bg-accent ring-4 ring-background z-10"></div>
                <div className="absolute left-1 top-3 bottom-0 w-px bg-border -z-0 last:hidden"></div>
                
                <div className="bg-secondary/30 rounded-lg p-3 border border-border/50 text-sm">
                  <p className="text-foreground">{activity.message}</p>
                  <div className="flex items-center justify-between mt-2">
                    <span className="text-[10px] text-gray-500">{activity.time}</span>
                    <StatusBadge status={activity.status as any} />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
