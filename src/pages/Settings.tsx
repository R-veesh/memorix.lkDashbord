import { useState } from 'react';
import { Key, Users, Shield, Box, Save, Plus, Mail, Check } from 'lucide-react';

export default function Settings() {
  const [activeTab, setActiveTab] = useState('api_keys');
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // API Keys State
  const [apiKeys, setApiKeys] = useState([
    { id: 1, name: 'Production Primary', key: 'sk-prod-8f92********************', created: '2 months ago' },
    { id: 2, name: 'Development / Staging', key: 'sk-dev-4a21********************', created: '10 days ago' },
  ]);

  // Team Members State
  const [teamMembers, setTeamMembers] = useState([
    { id: 1, initial: 'A', name: 'Admin User', email: 'admin@memorix.com', role: 'Owner', color: 'bg-accent/20 text-accent border-accent/30' },
    { id: 2, initial: 'S', name: 'Sarah Developer', email: 'sarah@memorix.com', role: 'Editor', color: 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30' },
  ]);

  // Integrations State
  const [integrations, setIntegrations] = useState([
    { id: 1, name: 'Filesystem & Git Context Provider', desc: 'Provides access to local filesystem and git context for the AI agent.', command: 'npx -y @modelcontextprotocol/server-filesystem /path/to/repo' },
  ]);

  // Security State
  const [retention, setRetention] = useState('90 Days');
  const [twoFactor, setTwoFactor] = useState(false);

  const showToast = (message: string) => {
    setToastMessage(message);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const generateApiKey = () => {
    const newKey = {
      id: Date.now(),
      name: `New Key ${apiKeys.length + 1}`,
      key: `sk-${Math.random().toString(36).substring(2, 8)}********************`,
      created: 'Just now'
    };
    setApiKeys([...apiKeys, newKey]);
    showToast('New API Key generated successfully.');
  };

  const revokeApiKey = (id: number) => {
    setApiKeys(apiKeys.filter(k => k.id !== id));
    showToast('API Key revoked.');
  };

  const inviteMember = () => {
    const newMember = {
      id: Date.now(),
      initial: 'N',
      name: 'New User',
      email: 'newuser@memorix.com',
      role: 'Viewer',
      color: 'bg-purple-500/20 text-purple-400 border-purple-500/30'
    };
    setTeamMembers([...teamMembers, newMember]);
    showToast('Invitation sent to newuser@memorix.com.');
  };

  const removeMember = (id: number) => {
    setTeamMembers(teamMembers.filter(m => m.id !== id));
    showToast('Team member removed.');
  };

  const updateMemberRole = (id: number, newRole: string) => {
    setTeamMembers(teamMembers.map(m => m.id === id ? { ...m, role: newRole } : m));
    showToast(`Role updated to ${newRole}.`);
  };

  const addIntegration = () => {
    const newIntegration = {
      id: Date.now(),
      name: 'Slack Integration',
      desc: 'Connect Memorix to your Slack workspace for real-time alerts.',
      command: 'npx -y @modelcontextprotocol/server-slack'
    };
    setIntegrations([...integrations, newIntegration]);
    showToast('MCP Server added.');
  };

  const removeIntegration = (id: number) => {
    setIntegrations(integrations.filter(i => i.id !== id));
    showToast('Integration disconnected.');
  };

  const saveSecurity = () => {
    showToast('Security settings saved successfully.');
  };

  const tabs = [
    { id: 'api_keys', label: 'API Keys', icon: Key },
    { id: 'team_access', label: 'Team Access', icon: Users },
    { id: 'security', label: 'Security', icon: Shield },
    { id: 'integrations', label: 'Integrations', icon: Box },
  ];

  return (
    <div className="max-w-4xl space-y-6 animate-in fade-in duration-500 relative">
      
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 animate-in slide-in-from-bottom-5 fade-in duration-300">
          <div className="bg-accent text-primary-foreground px-4 py-3 rounded-lg shadow-xl flex items-center gap-3 text-sm font-medium">
            <Check className="size-4" />
            {toastMessage}
          </div>
        </div>
      )}

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
                {apiKeys.length === 0 ? (
                  <p className="text-sm text-gray-400 text-center py-4">No active API keys found.</p>
                ) : (
                  apiKeys.map(key => (
                    <div key={key.id} className="bg-secondary/30 rounded-lg p-4 border border-border/50 flex items-center justify-between">
                      <div>
                        <p className="font-medium text-sm">{key.name}</p>
                        <p className="text-xs text-gray-400 font-mono mt-1">{key.key}</p>
                      </div>
                      <div className="flex items-center gap-4 text-xs">
                        <span className="text-gray-400">Created: {key.created}</span>
                        <button onClick={() => revokeApiKey(key.id)} className="text-rose-400 hover:text-rose-300 transition-colors font-medium">Revoke</button>
                      </div>
                    </div>
                  ))
                )}
              </div>
              <div className="mt-6 pt-4 border-t border-border">
                <button onClick={generateApiKey} className="flex items-center gap-2 bg-secondary hover:bg-secondary/80 text-foreground px-4 py-2 rounded-lg text-sm font-medium transition-colors">
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
                <button onClick={inviteMember} className="flex items-center gap-2 bg-accent hover:bg-accent/90 text-primary-foreground px-3 py-1.5 rounded-md text-sm font-medium transition-colors shadow-sm">
                  <Mail className="size-3.5" />
                  Invite Member
                </button>
              </div>
              <div className="space-y-2">
                {teamMembers.length === 0 ? (
                   <p className="text-sm text-gray-400 text-center py-4">No team members.</p>
                ) : (
                  teamMembers.map(member => (
                    <div key={member.id} className="flex items-center justify-between p-3 bg-secondary/20 hover:bg-secondary/40 rounded-lg transition-colors border border-transparent hover:border-border/50">
                      <div className="flex items-center gap-3">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs border ${member.color}`}>
                          {member.initial}
                        </div>
                        <div>
                          <p className="font-medium text-sm text-foreground">{member.name}</p>
                          <p className="text-xs text-gray-400">{member.email}</p>
                        </div>
                      </div>
                      
                      {member.role === 'Owner' ? (
                        <span className="px-2.5 py-1 rounded bg-secondary text-xs text-gray-300 border border-border/50">Owner</span>
                      ) : (
                        <div className="flex items-center gap-3">
                          <select 
                            value={member.role}
                            onChange={(e) => updateMemberRole(member.id, e.target.value)}
                            className="bg-secondary border border-border/50 rounded text-xs text-gray-300 px-2 py-1 focus:outline-none focus:border-accent"
                          >
                            <option value="Editor">Editor</option>
                            <option value="Viewer">Viewer</option>
                          </select>
                          <button onClick={() => removeMember(member.id)} className="text-rose-400 hover:text-rose-300 text-xs font-medium">Remove</button>
                        </div>
                      )}
                    </div>
                  ))
                )}
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
                      <p className="text-xs mt-1">Status: <span className={`font-medium ${twoFactor ? 'text-emerald-400' : 'text-rose-400'}`}>{twoFactor ? 'Enabled' : 'Disabled'}</span></p>
                    </div>
                    <button 
                      onClick={() => { setTwoFactor(!twoFactor); showToast(twoFactor ? '2FA Disabled.' : '2FA Enabled.'); }}
                      className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${twoFactor ? 'bg-rose-500/10 text-rose-400 hover:bg-rose-500/20' : 'bg-secondary hover:bg-secondary/80 text-foreground'}`}
                    >
                      {twoFactor ? 'Disable 2FA' : 'Enable 2FA'}
                    </button>
                  </div>
                </div>

                <div className="pt-2">
                  <label className="block text-sm font-medium text-foreground mb-1">Index Retention Period</label>
                  <p className="text-xs text-gray-500 mb-3">How long to keep indexed vectors before purging.</p>
                  <select 
                    value={retention}
                    onChange={(e) => setRetention(e.target.value)}
                    className="w-full bg-secondary/50 border border-border rounded-md px-3 py-2 text-sm focus:outline-none focus:border-accent text-foreground"
                  >
                    <option>30 Days</option>
                    <option>90 Days</option>
                    <option>1 Year</option>
                    <option>Indefinite</option>
                  </select>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-border flex justify-end">
                <button onClick={saveSecurity} className="flex items-center gap-2 bg-accent hover:bg-accent/90 text-primary-foreground px-4 py-2 rounded-lg text-sm font-medium transition-colors shadow-sm">
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
                {integrations.length === 0 ? (
                  <p className="text-sm text-gray-400 text-center py-4">No MCP Integrations added.</p>
                ) : (
                  integrations.map(integration => (
                    <div key={integration.id} className="bg-secondary/30 rounded-lg p-4 border border-border/50 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                      <div>
                        <div className="flex items-center gap-2">
                          <p className="font-medium text-sm text-foreground">{integration.name}</p>
                          <span className="px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-[10px] font-medium uppercase tracking-wider">
                            Connected
                          </span>
                        </div>
                        <p className="text-xs text-gray-400 mt-1">{integration.desc}</p>
                        <p className="text-xs text-gray-500 font-mono mt-2 bg-background/50 inline-block px-2 py-1 rounded border border-border/30">{integration.command}</p>
                      </div>
                      <div className="flex items-center gap-3">
                        <button onClick={() => showToast(`Configuring ${integration.name}...`)} className="text-xs font-medium text-gray-300 hover:text-foreground bg-secondary hover:bg-secondary/80 px-3 py-1.5 rounded-lg transition-colors">Configure</button>
                        <button onClick={() => removeIntegration(integration.id)} className="text-xs font-medium text-rose-400 hover:text-rose-300 bg-rose-500/10 hover:bg-rose-500/20 px-3 py-1.5 rounded-lg transition-colors">Disconnect</button>
                      </div>
                    </div>
                  ))
                )}
              </div>
              <div className="mt-6 pt-4 border-t border-border">
                <button onClick={addIntegration} className="flex items-center gap-2 bg-secondary hover:bg-secondary/80 text-foreground px-4 py-2 rounded-lg text-sm font-medium transition-colors">
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
