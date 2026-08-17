import React from 'react';
import { Workflow, ArrowRight } from 'lucide-react';
import { pipelineStages } from '../data/mockData';
import { StatusBadge } from '../components/StatusBadge';

export default function Pipeline() {
  return (
    <div className="space-y-6 animate-in fade-in duration-500 h-full flex flex-col">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Memory Pipeline</h1>
          <p className="text-sm text-gray-400 mt-1">Live visualization of the ingestion and retrieval flow.</p>
        </div>
      </div>

      <div className="flex-1 bg-card border border-border rounded-xl p-8 shadow-sm flex flex-col relative overflow-hidden">
        {/* Animated flow background */}
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-accent/30 via-background to-background pointer-events-none"></div>
        
        <div className="flex-1 flex items-center justify-between relative z-10 overflow-x-auto pb-8">
          {pipelineStages.map((stage, index) => (
            <React.Fragment key={stage.stage}>
              {/* Stage Node */}
              <div className="flex flex-col items-center flex-shrink-0 w-48 group">
                <div className="w-16 h-16 rounded-2xl bg-secondary border-2 border-accent/30 flex items-center justify-center mb-4 relative group-hover:border-accent transition-colors shadow-[0_0_15px_rgba(59,130,246,0.1)] group-hover:shadow-[0_0_20px_rgba(59,130,246,0.3)]">
                  <Workflow className="size-6 text-accent" />
                  
                  {/* Live Pulse Indicator */}
                  {stage.status === 'active' && (
                    <div className="absolute -top-1 -right-1 w-3 h-3 bg-emerald-400 rounded-full border-2 border-secondary animate-pulse"></div>
                  )}
                </div>
                
                <h3 className="font-semibold text-center mb-2">{stage.stage}</h3>
                
                <div className="w-full space-y-2 bg-background/50 border border-border/50 rounded-lg p-3 text-xs">
                  <div className="flex justify-between">
                    <span className="text-gray-400">Throughput:</span>
                    <span className="font-mono text-emerald-400">{stage.throughput}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Latency:</span>
                    <span className="font-mono">{stage.avgTime}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Queue:</span>
                    <span className={`font-mono ${stage.queueDepth > 100 ? 'text-amber-400' : 'text-gray-300'}`}>
                      {stage.queueDepth}
                    </span>
                  </div>
                </div>
              </div>

              {/* Connector */}
              {index < pipelineStages.length - 1 && (
                <div className="flex-1 min-w-[60px] max-w-[100px] flex items-center justify-center relative px-2">
                  <div className="w-full h-0.5 bg-border relative">
                    <div className="absolute top-0 left-0 h-full bg-accent animate-[pulse_2s_ease-in-out_infinite] w-full origin-left"></div>
                  </div>
                  <ArrowRight className="absolute text-accent size-4" />
                </div>
              )}
            </React.Fragment>
          ))}
        </div>
        
        {/* Pipeline Stats Footer */}
        <div className="mt-8 pt-6 border-t border-border grid grid-cols-1 md:grid-cols-4 gap-6 relative z-10">
           <div>
             <h4 className="text-sm text-gray-400 mb-1">Global Throughput</h4>
             <p className="text-2xl font-bold tracking-tight">1.2k <span className="text-sm font-normal text-gray-500">ops/sec</span></p>
           </div>
           <div>
             <h4 className="text-sm text-gray-400 mb-1">Total Errors (24h)</h4>
             <p className="text-2xl font-bold tracking-tight text-emerald-400">0.02%</p>
           </div>
           <div>
             <h4 className="text-sm text-gray-400 mb-1">Avg End-to-End Latency</h4>
             <p className="text-2xl font-bold tracking-tight">1.4s</p>
           </div>
           <div>
             <h4 className="text-sm text-gray-400 mb-1">System Health</h4>
             <StatusBadge status="healthy" />
           </div>
        </div>
      </div>
    </div>
  );
}
