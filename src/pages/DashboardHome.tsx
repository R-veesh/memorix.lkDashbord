import { Database, Search, Cpu, Clock, FileText, Brain } from "lucide-react";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

const performanceData = [
  { time: "00:00", ms: 45 },
  { time: "04:00", ms: 42 },
  { time: "08:00", ms: 55 },
  { time: "12:00", ms: 48 },
  { time: "16:00", ms: 60 },
  { time: "20:00", ms: 45 },
  { time: "24:00", ms: 41 },
];

const sources = [
  { name: "Confluence Workspace", type: "Wiki", status: "Synced", time: "5m ago" },
  { name: "Customer Support Jira", type: "Tickets", status: "Synced", time: "12m ago" },
  { name: "Internal Engineering Docs", type: "GitHub", status: "Indexing", time: "In progress" },
  { name: "Product Specifications", type: "Drive", status: "Synced", time: "1h ago" },
];

export default function DashboardHome() {
  return (
    <div className="space-y-6">
      {/* Metrics Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="panel-glass p-5 rounded-2xl">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-sm font-medium text-gray-400">Knowledge Sources</h3>
            <Database className="size-4 text-accent" />
          </div>
          <p className="text-3xl font-display font-semibold">847</p>
          <p className="text-xs text-green-400 mt-2 flex items-center gap-1">
            <span className="text-green-500">↑ 12</span> since last week
          </p>
        </div>
        
        <div className="panel-glass p-5 rounded-2xl">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-sm font-medium text-gray-400">Retrievals Today</h3>
            <Search className="size-4 text-accent" />
          </div>
          <p className="text-3xl font-display font-semibold">12,439</p>
          <p className="text-xs text-green-400 mt-2 flex items-center gap-1">
            <span className="text-green-500">↑ 14%</span> vs yesterday
          </p>
        </div>

        <div className="panel-glass p-5 rounded-2xl">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-sm font-medium text-gray-400">Active AI Agents</h3>
            <Cpu className="size-4 text-accent" />
          </div>
          <p className="text-3xl font-display font-semibold">23</p>
          <p className="text-xs text-gray-400 mt-2 flex items-center gap-1">
             Across 5 workflows
          </p>
        </div>

        <div className="panel-glass p-5 rounded-2xl">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-sm font-medium text-gray-400">Avg Latency</h3>
            <Clock className="size-4 text-accent" />
          </div>
          <p className="text-3xl font-display font-semibold">42ms</p>
          <p className="text-xs text-green-400 mt-2 flex items-center gap-1">
            <span className="text-green-500">↓ 3ms</span> optimization active
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Process Pipeline */}
        <div className="panel-glass p-6 rounded-2xl lg:col-span-2">
          <div className="flex items-center justify-between mb-6">
             <h2 className="text-lg font-medium">Memory & Retrieval Pipeline</h2>
             <span className="text-xs bg-accent/20 text-accent px-2 py-1 rounded-full border border-accent/30">System Nominal</span>
          </div>
          
          <div className="flex items-center justify-between pt-8 pb-4 relative px-4">
            <div className="absolute top-1/2 left-8 right-8 h-0.5 bg-border -translate-y-1/2 z-0"></div>
            
            <div className="relative z-10 flex flex-col items-center gap-2">
               <div className="w-12 h-12 rounded-full bg-secondary border border-border flex items-center justify-center">
                  <Database className="size-5 text-gray-400" />
               </div>
               <span className="text-xs font-medium">Ingestion</span>
               <span className="text-[10px] text-gray-500">24/sec</span>
            </div>

            <div className="relative z-10 flex flex-col items-center gap-2">
               <div className="w-12 h-12 rounded-full bg-secondary border border-border flex items-center justify-center">
                  <FileText className="size-5 text-gray-400" />
               </div>
               <span className="text-xs font-medium">Indexing</span>
               <span className="text-[10px] text-gray-500">Vectorizing</span>
            </div>

            <div className="relative z-10 flex flex-col items-center gap-2">
               <div className="w-12 h-12 rounded-full bg-accent/20 border border-accent flex items-center justify-center shadow-[0_0_10px_var(--glow)] animate-pulse">
                  <Search className="size-5 text-accent" />
               </div>
               <span className="text-xs font-medium text-accent">Retrieval</span>
               <span className="text-[10px] text-accent/70">Processing</span>
            </div>

            <div className="relative z-10 flex flex-col items-center gap-2">
               <div className="w-12 h-12 rounded-full bg-secondary border border-border flex items-center justify-center">
                  <Brain className="size-5 text-gray-400" />
               </div>
               <span className="text-xs font-medium">Context</span>
               <span className="text-[10px] text-gray-500">Ranking</span>
            </div>

            <div className="relative z-10 flex flex-col items-center gap-2">
               <div className="w-12 h-12 rounded-full bg-secondary border border-border flex items-center justify-center">
                  <Cpu className="size-5 text-gray-400" />
               </div>
               <span className="text-xs font-medium">Agent</span>
               <span className="text-[10px] text-gray-500">Delivery</span>
            </div>
          </div>
        </div>

        {/* Recent Sources */}
        <div className="panel-glass p-6 rounded-2xl flex flex-col">
          <div className="flex items-center justify-between mb-6">
             <h2 className="text-lg font-medium">Knowledge Sync</h2>
             <button className="text-xs text-accent hover:underline">View all</button>
          </div>
          <div className="space-y-4 flex-1">
             {sources.map((s, i) => (
                <div key={i} className="flex items-center justify-between pb-3 border-b border-border last:border-0 last:pb-0">
                   <div className="flex items-center gap-3">
                      <div className={`w-2 h-2 rounded-full ${s.status === 'Synced' ? 'bg-green-500' : 'bg-yellow-500 animate-pulse'}`}></div>
                      <div>
                         <p className="text-sm font-medium">{s.name}</p>
                         <p className="text-xs text-gray-500">{s.type}</p>
                      </div>
                   </div>
                   <span className="text-xs text-gray-400">{s.time}</span>
                </div>
             ))}
          </div>
        </div>
      </div>

      {/* Chart Row */}
      <div className="panel-glass p-6 rounded-2xl">
         <div className="flex items-center justify-between mb-6">
             <h2 className="text-lg font-medium">Retrieval Latency (ms)</h2>
             <div className="flex items-center gap-2">
                 <span className="w-2 h-2 rounded-full bg-accent"></span>
                 <span className="text-xs text-gray-400">p95 Latency</span>
             </div>
          </div>
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={performanceData}>
                <defs>
                  <linearGradient id="colorMs" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="var(--glow)" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="var(--glow)" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" vertical={false} />
                <XAxis dataKey="time" stroke="#6b7280" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis stroke="#6b7280" fontSize={12} tickLine={false} axisLine={false} />
                <Tooltip 
                  contentStyle={{ backgroundColor: 'var(--panel)', borderColor: 'var(--border)', borderRadius: '8px' }}
                  itemStyle={{ color: 'var(--accent)' }}
                />
                <Area type="monotone" dataKey="ms" stroke="var(--accent)" strokeWidth={2} fillOpacity={1} fill="url(#colorMs)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
      </div>
    </div>
  );
}
