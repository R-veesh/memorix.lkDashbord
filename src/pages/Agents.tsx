import { Cpu, Zap, History, Settings2 } from "lucide-react";

const agents = [
  { name: "Customer Support Copilot", desc: "Assists support team with finding relevant documentation and past resolutions.", status: "Active", calls: 4520, memory: "1.2GB" },
  { name: "Sales Intelligence Agent", desc: "Analyzes CRM data and internal playbooks to prepare sales briefs.", status: "Active", calls: 1240, memory: "840MB" },
  { name: "Codebase Guru", desc: "Helps engineering team navigate internal repositories and PR history.", status: "Active", calls: 3890, memory: "2.4GB" },
  { name: "HR Policy Assistant", desc: "Answers employee questions regarding benefits and internal policies.", status: "Idle", calls: 156, memory: "120MB" },
];

export default function Agents() {
  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <div>
           <h1 className="text-2xl font-display font-medium">AI Agents</h1>
           <p className="text-sm text-gray-400 mt-1">Manage AI agents connected to enterprise memory.</p>
        </div>
        <button className="bg-secondary border border-border px-4 py-2 rounded-lg text-sm font-medium hover:bg-secondary/80 transition-colors">
           Connect Agent
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
         {agents.map((agent, i) => (
            <div key={i} className="panel-glass p-6 rounded-2xl flex flex-col relative overflow-hidden group hover:border-accent/30 transition-colors">
               <div className="absolute top-0 right-0 p-16 bg-accent/5 blur-[40px] rounded-full pointer-events-none group-hover:bg-accent/10 transition-colors" />
               <div className="flex items-start justify-between relative z-10">
                  <div className="flex items-center gap-3">
                     <div className="w-10 h-10 rounded-xl bg-secondary border border-border flex items-center justify-center">
                        <Cpu className="size-5 text-accent" />
                     </div>
                     <div>
                        <h3 className="font-medium">{agent.name}</h3>
                        <span className="flex items-center gap-1 text-[10px] uppercase tracking-wider text-green-400 mt-0.5">
                           <div className="w-1.5 h-1.5 rounded-full bg-green-500"></div> {agent.status}
                        </span>
                     </div>
                  </div>
                  <button className="text-gray-400 hover:text-foreground">
                     <Settings2 className="size-4" />
                  </button>
               </div>
               
               <p className="mt-4 text-sm text-gray-400 leading-relaxed flex-1 relative z-10">
                  {agent.desc}
               </p>

               <div className="mt-6 pt-4 border-t border-border flex items-center justify-between relative z-10">
                  <div className="flex gap-4">
                     <div>
                        <p className="text-[10px] text-gray-500 uppercase">Retrieval Calls</p>
                        <p className="text-sm font-mono mt-0.5 flex items-center gap-1">
                           <Zap className="size-3 text-gray-400" /> {agent.calls.toLocaleString()}
                        </p>
                     </div>
                     <div>
                        <p className="text-[10px] text-gray-500 uppercase">Context Memory</p>
                        <p className="text-sm font-mono mt-0.5 flex items-center gap-1">
                           <History className="size-3 text-gray-400" /> {agent.memory}
                        </p>
                     </div>
                  </div>
               </div>
            </div>
         ))}
      </div>
    </div>
  );
}
