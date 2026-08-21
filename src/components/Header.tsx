import { useState, useRef, useEffect } from 'react';
import { Menu, Search, Bell, LogOut, Check, X, BellOff } from 'lucide-react';
import { systemHealth } from '../data/mockData';
import { auth } from '../lib/firebase';

export function Header() {
  const [showNotifications, setShowNotifications] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);
  
  const [notifications, setNotifications] = useState([
    { id: 1, title: 'New Knowledge Source', message: 'SharePoint integration completed.', time: '2m ago', unread: true },
    { id: 2, title: 'Agent Alert', message: 'Retrieval agent experienced high latency.', time: '1h ago', unread: true },
    { id: 3, title: 'System Update', message: 'Memorix Core v2.4 deployed.', time: '3h ago', unread: false },
  ]);
  
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setShowNotifications(false);
      }
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setIsSearchFocused(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const unreadCount = notifications.filter(n => n.unread).length;

  const markAllAsRead = () => {
    setNotifications(notifications.map(n => ({ ...n, unread: false })));
  };

  const clearNotifications = () => {
    setNotifications([]);
  };

  return (
    <header className="h-16 border-b border-border bg-background/80 backdrop-blur-md sticky top-0 z-50 flex items-center justify-between px-6">
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
          <div className="relative hidden md:block group" ref={searchRef}>
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-gray-500 group-focus-within:text-accent transition-colors z-10" />
            <input 
              type="text" 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onFocus={() => setIsSearchFocused(true)}
              placeholder="Search knowledge graph..." 
              className="bg-secondary/30 border border-border rounded-full pl-9 pr-4 py-1.5 text-sm focus:outline-none focus:border-accent/50 focus:bg-secondary/50 w-64 transition-all relative z-10"
            />
            
            {isSearchFocused && searchQuery.length > 0 && (
              <div className="absolute top-full left-0 mt-2 w-80 bg-card border border-border rounded-xl shadow-xl overflow-hidden animate-in fade-in zoom-in-95 duration-200 z-50">
                <div className="p-2">
                  <p className="text-xs font-semibold text-gray-400 px-2 py-1 uppercase tracking-wider">Results for "{searchQuery}"</p>
                  
                  <div className="mt-1">
                    <button className="w-full text-left px-3 py-2 text-sm hover:bg-secondary/50 rounded-lg transition-colors flex items-center gap-3">
                      <div className="p-1.5 bg-accent/10 text-accent rounded-md">
                        <Search className="size-3" />
                      </div>
                      <div>
                        <p className="font-medium text-foreground">Entity: {searchQuery}</p>
                        <p className="text-xs text-gray-400">Found in Knowledge Graph</p>
                      </div>
                    </button>
                    
                    <button className="w-full text-left px-3 py-2 text-sm hover:bg-secondary/50 rounded-lg transition-colors flex items-center gap-3">
                      <div className="p-1.5 bg-emerald-500/10 text-emerald-400 rounded-md">
                        <Search className="size-3" />
                      </div>
                      <div>
                        <p className="font-medium text-foreground">Document: {searchQuery} Guide</p>
                        <p className="text-xs text-gray-400">Source: Internal Wiki</p>
                      </div>
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
          
          <div className="relative" ref={dropdownRef}>
            <button 
              onClick={() => setShowNotifications(!showNotifications)}
              className="relative p-2 text-gray-400 hover:text-foreground transition-colors rounded-full hover:bg-secondary/50 focus:outline-none"
            >
              <Bell className="size-4" />
              {unreadCount > 0 && (
                <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-rose-500 border border-background"></span>
              )}
            </button>
            
            {showNotifications && (
              <div className="absolute right-0 mt-2 w-80 bg-card border border-border rounded-xl shadow-xl overflow-hidden animate-in fade-in zoom-in-95 duration-200">
                <div className="flex items-center justify-between p-4 border-b border-border/50 bg-secondary/20">
                  <h3 className="font-semibold text-sm">Notifications</h3>
                  <div className="flex gap-2">
                    {unreadCount > 0 && (
                      <button onClick={markAllAsRead} className="text-xs text-accent hover:text-accent/80 transition-colors flex items-center gap-1" title="Mark all as read">
                        <Check className="size-3" />
                      </button>
                    )}
                    {notifications.length > 0 && (
                      <button onClick={clearNotifications} className="text-xs text-gray-400 hover:text-rose-400 transition-colors flex items-center gap-1" title="Clear all">
                        <X className="size-3" />
                      </button>
                    )}
                  </div>
                </div>
                
                <div className="max-h-[300px] overflow-y-auto">
                  {notifications.length === 0 ? (
                    <div className="p-8 text-center flex flex-col items-center justify-center text-gray-500">
                      <BellOff className="size-8 mb-2 opacity-20" />
                      <p className="text-sm">No new notifications</p>
                    </div>
                  ) : (
                    <div className="flex flex-col">
                      {notifications.map((notif) => (
                        <div 
                          key={notif.id} 
                          className={`p-4 border-b border-border/50 last:border-0 hover:bg-secondary/30 transition-colors cursor-pointer ${notif.unread ? 'bg-accent/5' : ''}`}
                        >
                          <div className="flex items-start justify-between gap-2">
                            <h4 className={`text-sm font-medium ${notif.unread ? 'text-foreground' : 'text-gray-300'}`}>
                              {notif.title}
                            </h4>
                            <span className="text-[10px] text-gray-500 whitespace-nowrap">{notif.time}</span>
                          </div>
                          <p className="text-xs text-gray-400 mt-1">{notif.message}</p>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
          
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
