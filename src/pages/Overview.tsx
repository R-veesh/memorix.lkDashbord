import { StatCard } from '../components/StatCard';
import { StatusBadge } from '../components/StatusBadge';
import { Database, Search, Cpu, Activity, Clock, Network } from 'lucide-react';
import { recentActivity, systemHealth } from '../data/mockData';
import { ParticleSphere } from '../components/ParticleSphere';

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
          
          <div className="flex-1 flex items-center justify-center relative z-10 pointer-events-none">
            {/* The canvas takes care of the visual now */}
          </div>
          
          {/* 3D Particle Sphere Visualization */}
          <ParticleSphere />
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
