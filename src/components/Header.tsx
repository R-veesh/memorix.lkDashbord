import { Menu, Search, Bell, LogOut } from 'lucide-react';
import { systemHealth } from '../data/mockData';
import { auth } from '../lib/firebase';

export function Header() {
  return (
    <header className="h-16 border-b border-border bg-background/80 backdrop-blur-md sticky top-0 z-10 flex items-center justify-between px-6">
       <div className="flex items-center gap-4">
         <button className="md:hidden text-gray-400 hover:text-foreground transition-colors">
           <Menu className="size-5" />
         </button>
         <div className="hidden sm:flex items-center gap-2">
            <div className={`w-2 h-2 rounded-full ${systemHealth.status === 'healthy' ? 'bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.8)]' : 'bg-rose-500'}`}></div>
            <span className="text-xs font-medium text-gray-400">
              System {systemHealth.status.charAt(0).toUpperCase() + systemHealth.status.slice(1)} 
              <span className="mx-2">•</span> 
              Latency: <span className="text-emerald-400">{systemHealth.latency_ms}ms</span>
            </span>
         </div>
       </div>
       
       <div className="flex items-center gap-4">
          <div className="relative hidden md:block group">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-gray-500 group-focus-within:text-accent transition-colors" />
            <input 
              type="text" 
              placeholder="Search knowledge graph..." 
              className="bg-secondary/30 border border-border rounded-full pl-9 pr-4 py-1.5 text-sm focus:outline-none focus:border-accent/50 focus:bg-secondary/50 w-64 transition-all"
            />
          </div>
          
          <button className="relative p-2 text-gray-400 hover:text-foreground transition-colors rounded-full hover:bg-secondary/50">
            <Bell className="size-4" />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-rose-500 border border-background"></span>
          </button>
          <button 
            onClick={() => auth.signOut()}
            className="flex items-center gap-2 text-sm font-medium text-gray-400 hover:text-rose-400 transition-colors bg-secondary/30 px-3 py-1.5 rounded-full border border-transparent hover:border-rose-500/30"
          >
            <LogOut className="size-4" />
            <span className="hidden sm:inline">Logout</span>
          </button>
       </div>
    </header>
  );
}
