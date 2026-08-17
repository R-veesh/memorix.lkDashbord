import { Key, Users, Shield, Box, Save } from 'lucide-react';

export default function Settings() {
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
          <button className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium bg-accent/10 text-accent border border-accent/10">
            <Key className="size-4" /> API Keys
          </button>
          <button className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-gray-400 hover:text-foreground hover:bg-secondary/50 transition-colors">
            <Users className="size-4" /> Team Access
          </button>
          <button className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-gray-400 hover:text-foreground hover:bg-secondary/50 transition-colors">
            <Shield className="size-4" /> Security
          </button>
          <button className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-gray-400 hover:text-foreground hover:bg-secondary/50 transition-colors">
            <Box className="size-4" /> Integrations
          </button>
        </div>

        {/* Settings Content (Right side) */}
        <div className="md:col-span-3 space-y-6">
          <div className="bg-card border border-border rounded-xl p-6 shadow-sm">
            <h2 className="text-lg font-semibold mb-4 border-b border-border pb-2">Active API Keys</h2>
            <div className="space-y-4">
              <div className="bg-secondary/30 rounded-lg p-4 border border-border/50 flex items-center justify-between">
                <div>
                  <p className="font-medium text-sm">Production Primary</p>
                  <p className="text-xs text-gray-400 font-mono mt-1">sk-prod-8f92********************</p>
                </div>
                <div className="flex items-center gap-4 text-xs">
                  <span className="text-gray-400">Created: 2 months ago</span>
                  <button className="text-rose-400 hover:text-rose-300">Revoke</button>
                </div>
              </div>
              <div className="bg-secondary/30 rounded-lg p-4 border border-border/50 flex items-center justify-between">
                <div>
                  <p className="font-medium text-sm">Development / Staging</p>
                  <p className="text-xs text-gray-400 font-mono mt-1">sk-dev-4a21********************</p>
                </div>
                <div className="flex items-center gap-4 text-xs">
                  <span className="text-gray-400">Created: 10 days ago</span>
                  <button className="text-rose-400 hover:text-rose-300">Revoke</button>
                </div>
              </div>
            </div>
            <div className="mt-4 pt-4 border-t border-border">
              <button className="bg-secondary hover:bg-secondary/80 text-foreground px-4 py-2 rounded-lg text-sm font-medium transition-colors">
                Generate New Key
              </button>
            </div>
          </div>
          
          <div className="bg-card border border-border rounded-xl p-6 shadow-sm">
            <h2 className="text-lg font-semibold mb-4 border-b border-border pb-2">Data Retention Policy</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-1">Index Retention Period</label>
                <select className="w-full bg-secondary/50 border border-border rounded-md px-3 py-2 text-sm focus:outline-none focus:border-accent">
                  <option>30 Days</option>
                  <option>90 Days</option>
                  <option>1 Year</option>
                  <option>Indefinite</option>
                </select>
                <p className="text-xs text-gray-500 mt-1">How long to keep indexed vectors before purging.</p>
              </div>
            </div>
            <div className="mt-6 flex justify-end">
              <button className="flex items-center gap-2 bg-accent hover:bg-accent/90 text-primary-foreground px-4 py-2 rounded-lg text-sm font-medium transition-colors">
                <Save className="size-4" />
                Save Changes
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
