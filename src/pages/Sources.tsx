import { useState, useEffect } from 'react';
import { Database, Plus, Search, Filter, MoreVertical, HardDrive, FileText, Globe, X, RefreshCw, Edit2, Trash2 } from 'lucide-react';
import { sourcesData as initialSourcesData } from '../data/mockData';
import { StatusBadge } from '../components/StatusBadge';

const typeIcons: Record<string, React.ReactNode> = {
  document: <FileText className="size-5 text-blue-400" />,
  database: <HardDrive className="size-5 text-emerald-400" />,
  api: <Globe className="size-5 text-purple-400" />,
  communication: <Database className="size-5 text-amber-400" />
};

const sourceTypes = ['document', 'database', 'api', 'communication'];

export default function Sources() {
  const [sources, setSources] = useState(initialSourcesData);
  const [searchQuery, setSearchQuery] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [typeFilter, setTypeFilter] = useState<string | null>(null);
  
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

  useEffect(() => {
    const handleClickOutside = () => setActiveDropdown(null);
    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, []);
  
  const [showAddModal, setShowAddModal] = useState(false);
  const [newSourceName, setNewSourceName] = useState('');
  const [newSourceType, setNewSourceType] = useState('database');

  const handleAddSource = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newSourceName) return;
    
    const newSource = {
      id: `src_${Date.now()}`,
      name: newSourceName,
      type: newSourceType,
      status: 'syncing',
      record_count: 0,
      last_synced: 'Just now'
    };
    setSources([newSource, ...sources]);
    setShowAddModal(false);
    setNewSourceName('');
    setNewSourceType('database');
  };

  const handleRemoveSource = (id: string) => {
    setSources(sources.filter(s => s.id !== id));
    setActiveDropdown(null);
  };

  const handleSyncSource = (id: string) => {
    setSources(sources.map(s => 
      s.id === id ? { ...s, status: 'syncing' } : s
    ));
    setActiveDropdown(null);
    
    setTimeout(() => {
      setSources(current => current.map(s => 
        s.id === id ? { ...s, status: 'active', last_synced: 'Just now' } : s
      ));
    }, 2000);
  };

  const [editingSource, setEditingSource] = useState<{id: string, name: string, type: string} | null>(null);

  const handleEditSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingSource?.name) return;
    
    setSources(sources.map(s => 
      s.id === editingSource.id 
        ? { ...s, name: editingSource.name, type: editingSource.type } 
        : s
    ));
    setEditingSource(null);
  };

  const filteredSources = sources.filter(s => {
    const matchesSearch = s.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesType = typeFilter ? s.type === typeFilter : true;
    return matchesSearch && matchesType;
  });

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Knowledge Sources</h1>
          <p className="text-sm text-gray-400 mt-1">Manage connected datastores and document pipelines.</p>
        </div>
        <button 
          onClick={() => setShowAddModal(true)}
          className="flex items-center gap-2 bg-accent hover:bg-accent/90 text-primary-foreground px-4 py-2 rounded-lg font-medium transition-colors shadow-sm"
        >
          <Plus className="size-4" />
          Add Source
        </button>
      </div>

      <div className="flex flex-col gap-2 relative z-20">
        <div className="flex items-center gap-4 bg-card border border-border p-3 rounded-lg">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-gray-500" />
            <input 
              type="text" 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search sources..." 
              className="w-full bg-background border border-border rounded-md pl-9 pr-4 py-1.5 text-sm focus:outline-none focus:border-accent transition-colors"
            />
          </div>
          <div className="relative">
            <button 
              onClick={() => setShowFilters(!showFilters)}
              className={`flex items-center gap-2 px-3 py-1.5 border rounded-md text-sm transition-colors ${showFilters || typeFilter ? 'border-accent text-accent bg-accent/10' : 'border-border hover:bg-secondary/50'}`}
            >
              <Filter className="size-4" />
              Filter {typeFilter && '(1)'}
            </button>
            
            {showFilters && (
              <div className="absolute right-0 mt-2 w-48 bg-card border border-border rounded-xl shadow-xl overflow-hidden animate-in fade-in zoom-in-95 duration-200">
                <div className="p-2 border-b border-border/50">
                  <p className="text-[10px] font-bold tracking-wider text-gray-400 px-2 py-1 uppercase">Source Type</p>
                  <button 
                    onClick={() => { setTypeFilter(null); setShowFilters(false); }}
                    className={`w-full text-left px-2 py-1.5 text-sm rounded-md transition-colors ${typeFilter === null ? 'bg-accent/10 text-accent' : 'hover:bg-secondary/50 text-foreground'}`}
                  >
                    All Types
                  </button>
                  {sourceTypes.map(type => (
                    <button 
                      key={type}
                      onClick={() => { setTypeFilter(type); setShowFilters(false); }}
                      className={`w-full text-left px-2 py-1.5 text-sm rounded-md capitalize transition-colors ${typeFilter === type ? 'bg-accent/10 text-accent' : 'hover:bg-secondary/50 text-foreground'}`}
                    >
                      {type}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {filteredSources.length === 0 ? (
        <div className="text-center py-16 bg-card border border-border rounded-xl">
          <Database className="size-12 text-gray-500 mx-auto mb-4 opacity-20" />
          <h3 className="text-lg font-medium text-foreground">No sources found</h3>
          <p className="text-sm text-gray-400 mt-1">Try adjusting your search or filters.</p>
          {(searchQuery || typeFilter) && (
            <button 
              onClick={() => { setSearchQuery(''); setTypeFilter(null); }}
              className="mt-4 px-4 py-2 text-sm bg-secondary hover:bg-secondary/80 rounded-lg transition-colors"
            >
              Clear Filters
            </button>
          )}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredSources.map((source) => (
            <div key={source.id} className="bg-card border border-border rounded-xl p-5 hover:border-accent/50 transition-colors group cursor-pointer relative">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="bg-secondary p-2.5 rounded-lg border border-border">
                    {typeIcons[source.type] || <Database className="size-5 text-gray-400" />}
                  </div>
                  <div>
                    <h3 className="font-medium text-foreground line-clamp-1">{source.name}</h3>
                    <p className="text-xs text-gray-400 capitalize">{source.type}</p>
                  </div>
                </div>
                <div className="relative">
                  <button 
                    onClick={(e) => {
                      e.stopPropagation();
                      setActiveDropdown(activeDropdown === source.id ? null : source.id);
                    }}
                    className={`text-gray-500 hover:text-foreground transition-opacity p-1 hover:bg-secondary rounded ${activeDropdown === source.id ? 'opacity-100 bg-secondary' : 'opacity-0 group-hover:opacity-100'}`}
                  >
                    <MoreVertical className="size-4" />
                  </button>
                  {activeDropdown === source.id && (
                    <div 
                      className="absolute right-0 mt-2 w-40 bg-card border border-border rounded-xl shadow-xl overflow-hidden animate-in fade-in zoom-in-95 duration-200 z-50"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <div className="p-1">
                        <button 
                          onClick={() => handleSyncSource(source.id)}
                          className="w-full text-left px-3 py-2 text-sm rounded-md hover:bg-secondary/50 text-foreground flex items-center gap-2"
                        >
                          <RefreshCw className="size-3.5" />
                          Sync Now
                        </button>
                        <button 
                          onClick={() => {
                            setEditingSource({ id: source.id, name: source.name, type: source.type });
                            setActiveDropdown(null);
                          }}
                          className="w-full text-left px-3 py-2 text-sm rounded-md hover:bg-secondary/50 text-foreground flex items-center gap-2"
                        >
                          <Edit2 className="size-3.5" />
                          Edit Settings
                        </button>
                        <div className="h-px bg-border my-1" />
                        <button 
                          onClick={() => handleRemoveSource(source.id)}
                          className="w-full text-left px-3 py-2 text-sm rounded-md hover:bg-rose-500/10 text-rose-400 flex items-center gap-2"
                        >
                          <Trash2 className="size-3.5" />
                          Remove
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
              
              <div className="space-y-3 mt-6">
                <div className="flex justify-between items-center text-sm">
                  <span className="text-gray-400">Status</span>
                  <StatusBadge status={source.status as any} />
                </div>
                <div className="flex justify-between items-center text-sm">
                  <span className="text-gray-400">Records Indexed</span>
                  <span className="font-mono text-gray-300">{source.record_count.toLocaleString()}</span>
                </div>
                <div className="flex justify-between items-center text-sm">
                  <span className="text-gray-400">Last Synced</span>
                  <span className="text-gray-300">{source.last_synced}</span>
                </div>
              </div>

              {source.error_log && (
                <div className="mt-4 p-3 bg-rose-500/10 border border-rose-500/20 rounded-md">
                  <p className="text-xs text-rose-400 font-mono break-words">{source.error_log}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Add Source Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-card border border-border rounded-2xl shadow-2xl w-full max-w-md overflow-hidden animate-in fade-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between p-4 border-b border-border/50 bg-secondary/10">
              <h2 className="text-lg font-semibold text-foreground">Add Knowledge Source</h2>
              <button 
                onClick={() => setShowAddModal(false)}
                className="p-1 text-gray-400 hover:text-rose-400 hover:bg-rose-500/10 rounded-full transition-colors"
              >
                <X className="size-5" />
              </button>
            </div>
            <form onSubmit={handleAddSource} className="p-5 space-y-4">
              <div>
                <label className="block text-xs font-medium text-gray-400 mb-1.5">Source Name</label>
                <input 
                  type="text" 
                  value={newSourceName}
                  onChange={(e) => setNewSourceName(e.target.value)}
                  placeholder="e.g. Confluence Wiki, HR Database"
                  className="w-full bg-secondary/30 border border-border rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-accent transition-colors text-foreground"
                  required
                  autoFocus
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-400 mb-1.5">Source Type</label>
                <select 
                  value={newSourceType}
                  onChange={(e) => setNewSourceType(e.target.value)}
                  className="w-full bg-secondary/30 border border-border rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-accent capitalize transition-colors text-foreground"
                >
                  {sourceTypes.map(type => (
                    <option key={type} value={type}>{type}</option>
                  ))}
                </select>
              </div>
              <div className="pt-4 flex items-center justify-end gap-3 border-t border-border/50 mt-2">
                <button 
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 text-sm font-medium text-gray-400 hover:text-foreground hover:bg-secondary/50 rounded-lg transition-colors"
                >
                  Cancel
                </button>
                <button 
                  type="submit"
                  disabled={!newSourceName}
                  className="px-4 py-2 text-sm font-medium bg-accent hover:bg-accent/90 text-primary-foreground rounded-lg transition-colors shadow-sm disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                >
                  <Plus className="size-4" />
                  Connect Source
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
      {/* Edit Source Modal */}
      {editingSource && (
        <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-card border border-border rounded-2xl shadow-2xl w-full max-w-md overflow-hidden animate-in fade-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between p-4 border-b border-border/50 bg-secondary/10">
              <h2 className="text-lg font-semibold text-foreground">Edit Knowledge Source</h2>
              <button 
                onClick={() => setEditingSource(null)}
                className="p-1 text-gray-400 hover:text-rose-400 hover:bg-rose-500/10 rounded-full transition-colors"
              >
                <X className="size-5" />
              </button>
            </div>
            <form onSubmit={handleEditSubmit} className="p-5 space-y-4">
              <div>
                <label className="block text-xs font-medium text-gray-400 mb-1.5">Source Name</label>
                <input 
                  type="text" 
                  value={editingSource.name}
                  onChange={(e) => setEditingSource({...editingSource, name: e.target.value})}
                  placeholder="e.g. Confluence Wiki, HR Database"
                  className="w-full bg-secondary/30 border border-border rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-accent transition-colors text-foreground"
                  required
                  autoFocus
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-400 mb-1.5">Source Type</label>
                <select 
                  value={editingSource.type}
                  onChange={(e) => setEditingSource({...editingSource, type: e.target.value})}
                  className="w-full bg-secondary/30 border border-border rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-accent capitalize transition-colors text-foreground"
                >
                  {sourceTypes.map(type => (
                    <option key={type} value={type}>{type}</option>
                  ))}
                </select>
              </div>
              <div className="pt-4 flex items-center justify-end gap-3 border-t border-border/50 mt-2">
                <button 
                  type="button"
                  onClick={() => setEditingSource(null)}
                  className="px-4 py-2 text-sm font-medium text-gray-400 hover:text-foreground hover:bg-secondary/50 rounded-lg transition-colors"
                >
                  Cancel
                </button>
                <button 
                  type="submit"
                  disabled={!editingSource.name}
                  className="px-4 py-2 text-sm font-medium bg-accent hover:bg-accent/90 text-primary-foreground rounded-lg transition-colors shadow-sm disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                >
                  <Edit2 className="size-4" />
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
