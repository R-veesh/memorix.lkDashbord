import { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { usageTrendsData } from '../data/mockData';
import { Download, CreditCard, HardDrive, Zap, Check, Loader2 } from 'lucide-react';
import { StatCard } from '../components/StatCard';

export default function Analytics() {
  const [isExporting, setIsExporting] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const handleExport = () => {
    setIsExporting(true);
    // Simulate API call/generation time
    setTimeout(() => {
      setIsExporting(false);
      setToastMessage('Report exported successfully to CSV.');
      setTimeout(() => setToastMessage(null), 3000);
    }, 1500);
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-500 relative">
      
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
          <h1 className="text-2xl font-bold tracking-tight">Analytics & Usage</h1>
          <p className="text-sm text-gray-400 mt-1">Track API consumption, storage growth, and billing metrics.</p>
        </div>
        <button 
          onClick={handleExport}
          disabled={isExporting}
          className="flex items-center gap-2 bg-secondary hover:bg-secondary/80 text-foreground px-4 py-2 rounded-lg font-medium transition-colors border border-border disabled:opacity-50 disabled:cursor-not-allowed w-40 justify-center"
        >
          {isExporting ? (
            <Loader2 className="size-4 animate-spin" />
          ) : (
            <Download className="size-4" />
          )}
          {isExporting ? 'Exporting...' : 'Export Report'}
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <StatCard title="Total API Queries (7d)" value="89.2k" delta={14} deltaType="increase" icon={<Zap className="size-4" />} />
        <StatCard title="Total Storage Used" value="485 GB" delta={5} deltaType="increase" icon={<HardDrive className="size-4" />} />
        <StatCard title="Est. Cost (MTD)" value="$425.50" icon={<CreditCard className="size-4" />} />
      </div>

      <div className="bg-card border border-border rounded-xl p-5 shadow-sm">
        <div className="mb-6">
          <h3 className="font-semibold">API Consumption vs Storage Growth (7d)</h3>
        </div>
        <div className="h-80 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={usageTrendsData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
              <XAxis dataKey="day" stroke="#6B7280" fontSize={12} tickLine={false} axisLine={false} />
              <YAxis yAxisId="left" orientation="left" stroke="#6B7280" fontSize={12} tickLine={false} axisLine={false} />
              <YAxis yAxisId="right" orientation="right" stroke="#6B7280" fontSize={12} tickLine={false} axisLine={false} />
              <Tooltip 
                contentStyle={{ backgroundColor: '#111827', borderColor: 'rgba(255,255,255,0.1)', borderRadius: '8px' }}
                itemStyle={{ color: '#F8FAFC' }}
                cursor={{ fill: 'rgba(255,255,255,0.05)' }}
              />
              <Legend wrapperStyle={{ paddingTop: '20px' }} />
              <Bar yAxisId="left" dataKey="queries" name="Queries" fill="#3B82F6" radius={[4, 4, 0, 0]} barSize={30} />
              <Bar yAxisId="right" dataKey="storageGB" name="Storage (GB)" fill="#8B5CF6" radius={[4, 4, 0, 0]} barSize={30} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
