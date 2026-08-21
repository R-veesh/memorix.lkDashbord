import { useState } from 'react';
import { Key, Users, Shield, Box, Save, Plus, Mail } from 'lucide-react';

export default function Settings() {
  const [activeTab, setActiveTab] = useState('api_keys');

  const tabs = [
    { id: 'api_keys', label: 'API Keys', icon: Key },
    { id: 'team_access', label: 'Team Access', icon: Users },
    { id: 'security', label: 'Security', icon: Shield },
    { id: 'integrations', label: 'Integrations', icon: Box },
  ];

  return (
    <div className="max-w-4xl space-y-6 animate-in fade-in duration-500">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Settings</h1>
          <p className="text-sm text-gray-400 mt-1">Manage API keys, team access, and enterprise integrations.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {/* Settings Navigation (Left side) */}
        <div className="md:col-span-1 space-y-1">
          {tabs.map(tab => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                  isActive 
                    ? 'bg-accent/10 text-accent border border-accent/10' 
                    : 'text-gray-400 hover:text-foreground hover:bg-secondary/50 border border-transparent'
                }`}
              >
                <Icon className="size-4" /> {tab.label}
              </button>
            );
          })}
        </div>

        {/* Settings Content (Right side) */}
        <div className="md:col-span-3 space-y-6">
          
          {/* API Keys Tab */}
          {activeTab === 'api_keys' && (
            <div className="bg-card border border-border rounded-xl p-6 shadow-sm animate-in fade-in slide-in-from-right-4 duration-300">
              <h2 className="text-lg font-semibold mb-4 border-b border-border pb-2">Active API Keys</h2>
              <div className="space-y-4">
                <div className="bg-secondary/30 rounded-lg p-4 border border-border/50 flex items-center justify-between">
                  <div>
                    <p className="font-medium text-sm">Production Primary</p>
                    <p className="text-xs text-gray-400 font-mono mt-1">sk-prod-8f92********************</p>
                  </div>
                  <div className="flex items-center gap-4 text-xs">
                    <span className="text-gray-400">Created: 2 months ago</span>
                    <button className="text-rose-400 hover:text-rose-300 transition-colors font-medium">Revoke</button>
                  </div>
                </div>
                <div className="bg-secondary/30 rounded-lg p-4 border border-border/50 flex items-center justify-between">
                  <div>
                    <p className="font-medium text-sm">Development / Staging</p>
                    <p className="text-xs text-gray-400 font-mono mt-1">sk-dev-4a21********************</p>
                  </div>
                  <div className="flex items-center gap-4 text-xs">
                    <span className="text-gray-400">Created: 10 days ago</span>
                    <button className="text-rose-400 hover:text-rose-300 transition-colors font-medium">Revoke</button>
                  </div>
                </div>
              </div>
              <div className="mt-6 pt-4 border-t border-border">
                <button className="flex items-center gap-2 bg-secondary hover:bg-secondary/80 text-foreground px-4 py-2 rounded-lg text-sm font-medium transition-colors">
                  <Plus className="size-4" />
                  Generate New Key
                </button>
              </div>
            </div>
          )}

          {/* Team Access Tab */}
          {activeTab === 'team_access' && (
            <div className="bg-card border border-border rounded-xl p-6 shadow-sm animate-in fade-in slide-in-from-right-4 duration-300">
              <div className="flex items-center justify-between mb-4 border-b border-border pb-2">
                <h2 className="text-lg font-semibold">Team Members</h2>
                <button className="flex items-center gap-2 bg-accent hover:bg-accent/90 text-primary-foreground px-3 py-1.5 rounded-md text-sm font-medium transition-colors shadow-sm">
                  <Mail className="size-3.5" />
                  Invite Member
                </button>
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between p-3 bg-secondary/20 hover:bg-secondary/40 rounded-lg transition-colors border border-transparent hover:border-border/50">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-accent/20 text-accent flex items-center justify-center font-bold text-xs border border-accent/30">
                      A
                    </div>
                    <div>
                      <p className="font-medium text-sm text-foreground">Admin User</p>
                      <p className="text-xs text-gray-400">admin@memorix.com</p>
                    </div>
                  </div>
                  <span className="px-2.5 py-1 rounded bg-secondary text-xs text-gray-300 border border-border/50">Owner</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-secondary/20 hover:bg-secondary/40 rounded-lg transition-colors border border-transparent hover:border-border/50">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold text-xs border border-emerald-500/30">
                      S
                    </div>
                    <div>
                      <p className="font-medium text-sm text-foreground">Sarah Developer</p>
                      <p className="text-xs text-gray-400">sarah@memorix.com</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="px-2.5 py-1 rounded bg-secondary text-xs text-gray-300 border border-border/50">Editor</span>
                    <button className="text-rose-400 hover:text-rose-300 text-xs font-medium">Remove</button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Security Tab */}
          {activeTab === 'security' && (
            <div className="bg-card border border-border rounded-xl p-6 shadow-sm animate-in fade-in slide-in-from-right-4 duration-300">
              <h2 className="text-lg font-semibold mb-4 border-b border-border pb-2">Security & Data Policy</h2>
              
              <div className="space-y-6">
                <div>
                  <h3 className="text-sm font-medium text-foreground mb-2">Two-Factor Authentication (2FA)</h3>
                  <div className="flex items-center justify-between bg-secondary/30 p-4 rounded-lg border border-border/50">
                    <div>
                      <p className="text-sm text-gray-300">Protect your account with an extra layer of security.</p>
                      <p className="text-xs text-gray-500 mt-1">Status: <span className="text-rose-400 font-medium">Disabled</span></p>
                    </div>
                    <button className="bg-secondary hover:bg-secondary/80 px-4 py-2 rounded-lg text-sm font-medium transition-colors">
                      Enable 2FA
                    </button>
                  </div>
                </div>

                <div className="pt-2">
                  <label className="block text-sm font-medium text-foreground mb-1">Index Retention Period</label>
                  <p className="text-xs text-gray-500 mb-3">How long to keep indexed vectors before purging.</p>
                  <select className="w-full bg-secondary/50 border border-border rounded-md px-3 py-2 text-sm focus:outline-none focus:border-accent text-foreground">
                    <option>30 Days</option>
                    <option>90 Days</option>
                    <option>1 Year</option>
                    <option>Indefinite</option>
                  </select>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-border flex justify-end">
                <button className="flex items-center gap-2 bg-accent hover:bg-accent/90 text-primary-foreground px-4 py-2 rounded-lg text-sm font-medium transition-colors shadow-sm">
                  <Save className="size-4" />
                  Save Changes
                </button>
              </div>
            </div>
          )}

          {/* Integrations Tab */}
          {activeTab === 'integrations' && (
            <div className="bg-card border border-border rounded-xl p-6 shadow-sm animate-in fade-in slide-in-from-right-4 duration-300">
              <h2 className="text-lg font-semibold mb-4 border-b border-border pb-2 flex items-center gap-2">
                <Box className="size-5 text-accent" />
                Model Context Protocol (MCP) Integrations
              </h2>
              <div className="space-y-4">
                <div className="bg-secondary/30 rounded-lg p-4 border border-border/50 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div>
                    <div className="flex items-center gap-2">
                      <p className="font-medium text-sm text-foreground">Filesystem & Git Context Provider</p>
                      <span className="px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-[10px] font-medium uppercase tracking-wider">
                        Connected
                      </span>
                    </div>
                    <p className="text-xs text-gray-400 mt-1">Provides access to local filesystem and git context for the AI agent.</p>
                    <p className="text-xs text-gray-500 font-mono mt-2 bg-background/50 inline-block px-2 py-1 rounded border border-border/30">npx -y @modelcontextprotocol/server-filesystem /path/to/repo</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <button className="text-xs font-medium text-gray-300 hover:text-foreground bg-secondary hover:bg-secondary/80 px-3 py-1.5 rounded-lg transition-colors">Configure</button>
                    <button className="text-xs font-medium text-rose-400 hover:text-rose-300 bg-rose-500/10 hover:bg-rose-500/20 px-3 py-1.5 rounded-lg transition-colors">Disconnect</button>
                  </div>
                </div>
              </div>
              <div className="mt-6 pt-4 border-t border-border">
                <button className="flex items-center gap-2 bg-secondary hover:bg-secondary/80 text-foreground px-4 py-2 rounded-lg text-sm font-medium transition-colors">
                  <Plus className="size-4" />
                  Add MCP Server
                </button>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
