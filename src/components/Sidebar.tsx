import { Link, useLocation } from 'react-router-dom';
import { Brain, Database, LayoutDashboard, Search, Settings, Cpu, Activity, Workflow } from 'lucide-react';

export function Sidebar() {
  const location = useLocation();
  const navItems = [
    { path: "/", label: "Overview", icon: LayoutDashboard },
    { path: "/sources", label: "Sources", icon: Database },
    { path: "/pipeline", label: "Pipeline", icon: Workflow },
    { path: "/retrieval", label: "Retrieval Ops", icon: Search },
    { path: "/agents", label: "AI Agents", icon: Cpu },
    { path: "/analytics", label: "Analytics", icon: Activity },
    { path: "/settings", label: "Settings", icon: Settings },
  ];

  return (
    <aside className="w-64 border-r border-border bg-background h-screen sticky top-0 hidden md:flex flex-col z-20">
      <div className="p-6 flex items-center gap-3">
        <div className="bg-accent/10 p-2 rounded-lg border border-accent/20">
          <Brain className="text-accent size-6" />
        </div>
        <span className="font-bold tracking-widest text-lg text-foreground">MEMORIX</span>
      </div>
      
      <div className="px-6 mb-4 mt-2 text-[10px] font-semibold text-gray-500 uppercase tracking-wider">
        Knowledge Ops Center
      </div>

      <nav className="flex-1 px-3 space-y-1">
        {navItems.map((item) => {
          const active = location.pathname === item.path;
          return (
            <Link
              key={item.path}
              to={item.path}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all ${
                active 
                  ? "bg-accent/10 text-accent border border-accent/10" 
                  : "text-gray-400 hover:text-foreground hover:bg-secondary/50 border border-transparent"
              }`}
            >
              <item.icon className={`size-4 ${active ? 'text-accent' : 'text-gray-500'}`} />
              {item.label}
            </Link>
          );
        })}
      </nav>
      
      <div className="p-4 m-4 rounded-xl bg-secondary/30 border border-border/50 backdrop-blur-md">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-accent/20 border border-accent/30 flex items-center justify-center text-accent font-bold text-xs">
            A
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-foreground truncate">Admin User</p>
            <p className="text-[10px] text-gray-400 truncate">Enterprise Security</p>
          </div>
        </div>
      </div>
    </aside>
  );
}
