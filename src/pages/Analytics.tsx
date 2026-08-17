export default function Analytics() {
  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <div>
           <h1 className="text-2xl font-display font-medium">Retrieval Analytics</h1>
           <p className="text-sm text-gray-400 mt-1">Detailed performance and usage metrics.</p>
        </div>
      </div>
      
      <div className="panel-glass p-12 rounded-2xl flex flex-col items-center justify-center text-center">
         <div className="w-16 h-16 rounded-full bg-secondary border border-border flex items-center justify-center mb-4">
            <svg className="w-8 h-8 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" /></svg>
         </div>
         <h2 className="text-lg font-medium mb-2">Advanced Analytics</h2>
         <p className="text-sm text-gray-400 max-w-md">
            Full analytics suite including query clustering, semantic similarity heatmaps, and source relevance scoring is available in the Professional plan.
         </p>
      </div>
    </div>
  );
}
