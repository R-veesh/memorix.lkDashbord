import { BrowserRouter, Routes, Route, Link, useLocation } from "react-router-dom";
import { Brain, Database, LayoutDashboard, Search, Settings, Cpu, Menu } from "lucide-react";
import DashboardHome from "./pages/DashboardHome";
import Sources from "./pages/Sources";
import Agents from "./pages/Agents";
import Analytics from "./pages/Analytics";
import AppSettings from "./pages/Settings";

function Sidebar() {
  const location = useLocation();
  const navItems = [
    { path: "/", label: "Operations", icon: LayoutDashboard },
    { path: "/sources", label: "Knowledge Sources", icon: Database },
    { path: "/agents", label: "AI Agents", icon: Cpu },
    { path: "/analytics", label: "Retrieval Analytics", icon: Search },
    { path: "/settings", label: "Settings", icon: Settings },
  ];

  return (
    <aside className="w-64 border-r border-border bg-background h-screen sticky top-0 hidden md:flex flex-col">
      <div className="p-6 flex items-center gap-2">
        <Brain className="text-accent size-6" />
        <span className="font-bold tracking-widest text-lg">MEMORIX</span>
      </div>
      <nav className="flex-1 px-4 space-y-2 mt-4">
        {navItems.map((item) => {
          const active = location.pathname === item.path;
          return (
            <Link
              key={item.path}
              to={item.path}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-colors ${
                active ? "bg-accent/10 text-accent font-medium" : "text-gray-400 hover:text-foreground hover:bg-secondary/50"
              }`}
            >
              <item.icon className="size-4" />
              {item.label}
            </Link>
          );
        })}
      </nav>
      <div className="p-4 m-4 rounded-xl bg-secondary/50 border border-border">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-accent/20 flex items-center justify-center text-accent font-bold text-xs">
            JD
          </div>
          <div>
            <p className="text-xs font-medium">Jane Doe</p>
            <p className="text-[10px] text-gray-400">Admin</p>
          </div>
        </div>
      </div>
    </aside>
  );
}

function Topbar() {
  return (
    <header className="h-16 border-b border-border bg-background/80 backdrop-blur-md sticky top-0 z-10 flex items-center justify-between px-6">
       <div className="flex items-center gap-4">
         <button className="md:hidden text-gray-400">
           <Menu className="size-5" />
         </button>
         <h1 className="text-sm font-medium">Knowledge Operations Center</h1>
       </div>
       <div className="flex items-center gap-4">
          <div className="relative hidden sm:block">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-gray-500" />
            <input 
              type="text" 
              placeholder="Search knowledge..." 
              className="bg-secondary/50 border border-border rounded-full pl-9 pr-4 py-1.5 text-xs focus:outline-none focus:border-accent w-64"
            />
          </div>
          <div className="w-2 h-2 rounded-full bg-green-500"></div>
          <span className="text-xs text-gray-400">System Healthy</span>
       </div>
    </header>
  );
}

function App() {
  return (
    <BrowserRouter>
      <div className="flex min-h-screen bg-background text-foreground font-sans">
        <Sidebar />
        <div className="flex-1 flex flex-col min-w-0">
          <Topbar />
          <main className="flex-1 p-6 overflow-auto">
            <Routes>
              <Route path="/" element={<DashboardHome />} />
              <Route path="/sources" element={<Sources />} />
              <Route path="/agents" element={<Agents />} />
              <Route path="/analytics" element={<Analytics />} />
              <Route path="/settings" element={<AppSettings />} />
            </Routes>
          </main>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
