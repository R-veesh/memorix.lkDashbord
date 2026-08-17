import { Cpu, Terminal, Network, Clock } from 'lucide-react';
import { agentsData } from '../data/mockData';
import { StatusBadge } from '../components/StatusBadge';

export default function Agents() {
  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Active AI Agents</h1>
          <p className="text-sm text-gray-400 mt-1">Monitor agent memory usage and context windows.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {agentsData.map((agent) => (
          <div key={agent.id} className="bg-card border border-border rounded-xl p-5 hover:border-accent/50 transition-colors">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="bg-accent/10 p-2.5 rounded-lg border border-accent/20">
                  <Cpu className="size-5 text-accent" />
                </div>
                <div>
                  <h3 className="font-medium text-foreground truncate max-w-[150px]" title={agent.name}>{agent.name}</h3>
                  <StatusBadge status={agent.status as any} />
                </div>
              </div>
            </div>
            
            <div className="space-y-3 mt-6 bg-background/50 rounded-lg p-3 border border-border/50">
              <div className="flex justify-between items-center text-xs">
                <span className="text-gray-400 flex items-center gap-1.5"><Network className="size-3"/> Context Size</span>
                <span className="font-mono text-accent font-medium">{agent.active_context_size}</span>
              </div>
              <div className="flex justify-between items-center text-xs">
                <span className="text-gray-400 flex items-center gap-1.5"><Terminal className="size-3"/> Total Sessions</span>
                <span className="font-mono text-gray-300">{agent.session_count.toLocaleString()}</span>
              </div>
              <div className="flex justify-between items-center text-xs">
                <span className="text-gray-400 flex items-center gap-1.5"><Clock className="size-3"/> Last Active</span>
                <span className="text-gray-300">{agent.last_active}</span>
              </div>
            </div>
            
            <div className="mt-4 pt-4 border-t border-border flex justify-between items-center">
              <span className="text-xs text-gray-500">{agent.integration_type}</span>
              <button className="text-xs text-accent hover:text-accent/80 font-medium">View Logs</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
