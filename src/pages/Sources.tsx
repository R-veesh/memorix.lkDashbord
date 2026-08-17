import { Database, Plus, RefreshCw, MoreHorizontal, Filter } from "lucide-react";

const sources = [
  { id: "SRC-01", name: "Confluence Engineering", type: "Wiki", docs: 12450, status: "Active", lastSync: "5m ago" },
  { id: "SRC-02", name: "Customer Support Zendesk", type: "Tickets", docs: 45200, status: "Active", lastSync: "12m ago" },
  { id: "SRC-03", name: "Product Specs Drive", type: "Drive", docs: 850, status: "Active", lastSync: "1h ago" },
  { id: "SRC-04", name: "API Documentation", type: "GitHub", docs: 320, status: "Indexing", lastSync: "In progress" },
  { id: "SRC-05", name: "HR Policies", type: "SharePoint", docs: 145, status: "Active", lastSync: "2h ago" },
  { id: "SRC-06", name: "Sales Playbooks", type: "Notion", docs: 89, status: "Failed", lastSync: "Yesterday" },
];

export default function Sources() {
  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <div>
           <h1 className="text-2xl font-display font-medium">Knowledge Sources</h1>
           <p className="text-sm text-gray-400 mt-1">Manage connected enterprise data repositories.</p>
        </div>
        <button className="flex items-center gap-2 bg-primary text-primary-foreground px-4 py-2 rounded-lg text-sm font-medium hover:opacity-90 transition-opacity">
           <Plus className="size-4" />
           Add Source
        </button>
      </div>

      <div className="panel-glass rounded-2xl overflow-hidden">
        <div className="p-4 border-b border-border flex items-center justify-between bg-secondary/20">
           <div className="flex gap-2">
              <button className="flex items-center gap-2 px-3 py-1.5 bg-secondary border border-border rounded-md text-xs hover:bg-secondary/80">
                 <Filter className="size-3" /> Filter
              </button>
           </div>
           <p className="text-xs text-gray-400">Showing {sources.length} sources</p>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="text-xs text-gray-400 bg-secondary/10 border-b border-border uppercase">
              <tr>
                <th className="px-6 py-4 font-medium">Source Name</th>
                <th className="px-6 py-4 font-medium">Type</th>
                <th className="px-6 py-4 font-medium">Indexed Docs</th>
                <th className="px-6 py-4 font-medium">Status</th>
                <th className="px-6 py-4 font-medium">Last Sync</th>
                <th className="px-6 py-4 text-right font-medium">Actions</th>
              </tr>
            </thead>
            <tbody>
              {sources.map((s) => (
                <tr key={s.id} className="border-b border-border/50 hover:bg-secondary/30 transition-colors last:border-0">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                       <Database className="size-4 text-gray-500" />
                       <span className="font-medium">{s.name}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-gray-400">{s.type}</td>
                  <td className="px-6 py-4 font-mono text-gray-300">{s.docs.toLocaleString()}</td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-1 rounded-full text-[10px] font-medium border ${
                       s.status === 'Active' ? 'bg-green-500/10 text-green-500 border-green-500/20' : 
                       s.status === 'Indexing' ? 'bg-blue-500/10 text-blue-400 border-blue-500/20 animate-pulse' : 
                       'bg-red-500/10 text-red-400 border-red-500/20'
                    }`}>
                      {s.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-gray-400 text-xs">{s.lastSync}</td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                       <button className="p-1.5 text-gray-400 hover:text-foreground rounded-md hover:bg-secondary transition-colors" title="Sync Now">
                         <RefreshCw className="size-4" />
                       </button>
                       <button className="p-1.5 text-gray-400 hover:text-foreground rounded-md hover:bg-secondary transition-colors">
                         <MoreHorizontal className="size-4" />
                       </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
