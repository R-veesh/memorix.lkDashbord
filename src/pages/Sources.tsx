import { Database, Plus, Search, Filter, MoreVertical, HardDrive, FileText, Globe } from 'lucide-react';
import { sourcesData } from '../data/mockData';
import { StatusBadge } from '../components/StatusBadge';

const typeIcons: Record<string, React.ReactNode> = {
  document: <FileText className="size-5 text-blue-400" />,
  database: <HardDrive className="size-5 text-emerald-400" />,
  api: <Globe className="size-5 text-purple-400" />,
  communication: <Database className="size-5 text-amber-400" />
};

export default function Sources() {
  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Knowledge Sources</h1>
          <p className="text-sm text-gray-400 mt-1">Manage connected datastores and document pipelines.</p>
        </div>
        <button className="flex items-center gap-2 bg-accent hover:bg-accent/90 text-primary-foreground px-4 py-2 rounded-lg font-medium transition-colors">
          <Plus className="size-4" />
          Add Source
        </button>
      </div>

      <div className="flex items-center gap-4 bg-card border border-border p-3 rounded-lg">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-gray-500" />
          <input 
            type="text" 
            placeholder="Search sources..." 
            className="w-full bg-background border border-border rounded-md pl-9 pr-4 py-1.5 text-sm focus:outline-none focus:border-accent"
          />
        </div>
        <button className="flex items-center gap-2 px-3 py-1.5 border border-border rounded-md text-sm hover:bg-secondary/50">
          <Filter className="size-4" />
          Filter
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {sourcesData.map((source) => (
          <div key={source.id} className="bg-card border border-border rounded-xl p-5 hover:border-accent/50 transition-colors group cursor-pointer">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="bg-secondary p-2.5 rounded-lg border border-border">
                  {typeIcons[source.type] || <Database className="size-5 text-gray-400" />}
                </div>
                <div>
                  <h3 className="font-medium text-foreground">{source.name}</h3>
                  <p className="text-xs text-gray-400 capitalize">{source.type}</p>
                </div>
              </div>
              <button className="text-gray-500 hover:text-foreground opacity-0 group-hover:opacity-100 transition-opacity">
                <MoreVertical className="size-4" />
              </button>
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
    </div>
  );
}
