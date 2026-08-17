export default function Settings() {
  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <div>
           <h1 className="text-2xl font-display font-medium">Settings</h1>
           <p className="text-sm text-gray-400 mt-1">Manage platform configuration and API keys.</p>
        </div>
      </div>

      <div className="panel-glass rounded-2xl p-6">
         <h2 className="text-lg font-medium mb-4">API Access</h2>
         <div className="space-y-4">
            <div>
               <label className="block text-xs text-gray-400 mb-1">Organization ID</label>
               <input type="text" readOnly value="org_memorix_982f3a" className="w-full bg-secondary/50 border border-border rounded-lg px-3 py-2 text-sm font-mono text-gray-300 outline-none" />
            </div>
            <div>
               <label className="block text-xs text-gray-400 mb-1">Production API Key</label>
               <div className="flex gap-2">
                  <input type="password" readOnly value="sk_live_1234567890abcdef" className="flex-1 bg-secondary/50 border border-border rounded-lg px-3 py-2 text-sm font-mono text-gray-300 outline-none" />
                  <button className="bg-secondary border border-border px-4 py-2 rounded-lg text-sm hover:bg-secondary/80">Reveal</button>
               </div>
            </div>
         </div>
      </div>

      <div className="panel-glass rounded-2xl p-6">
         <h2 className="text-lg font-medium mb-4">Retrieval Configuration</h2>
         <div className="space-y-4">
             <div className="flex items-center justify-between pb-4 border-b border-border">
                <div>
                   <p className="text-sm font-medium">Strict Context Bounding</p>
                   <p className="text-xs text-gray-400 mt-1">Only return exact matches without semantic expansion.</p>
                </div>
                <div className="w-10 h-5 bg-secondary rounded-full border border-border relative cursor-pointer">
                   <div className="w-3 h-3 bg-gray-400 rounded-full absolute top-1 left-1"></div>
                </div>
             </div>
             <div className="flex items-center justify-between pt-2">
                <div>
                   <p className="text-sm font-medium">Agent Memory Persistence</p>
                   <p className="text-xs text-gray-400 mt-1">Retain conversation context across sessions.</p>
                </div>
                <div className="w-10 h-5 bg-accent/20 rounded-full border border-accent relative cursor-pointer">
                   <div className="w-3 h-3 bg-accent rounded-full absolute top-1 right-1 shadow-[0_0_5px_var(--glow)]"></div>
                </div>
             </div>
         </div>
      </div>
    </div>
  );
}
