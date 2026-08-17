import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from 'recharts';
import { accuracyChartData } from '../data/mockData';
import { Target, Zap, ShieldAlert, BarChart2 } from 'lucide-react';
import { StatCard } from '../components/StatCard';

export default function Retrieval() {
  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Retrieval Operations</h1>
          <p className="text-sm text-gray-400 mt-1">Monitor search relevance, context quality, and latency.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard title="Overall Accuracy" value="95.2%" delta={1.2} deltaType="increase" icon={<Target className="size-4" />} />
        <StatCard title="p95 Latency" value="85ms" delta={5} deltaType="decrease" icon={<Zap className="size-4" />} />
        <StatCard title="Low Confidence Queries" value="142" delta={12} deltaType="increase" icon={<ShieldAlert className="size-4 text-amber-400" />} />
        <StatCard title="Context Utilization" value="78%" delta={4} deltaType="increase" icon={<BarChart2 className="size-4" />} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Accuracy Chart */}
        <div className="bg-card border border-border rounded-xl p-5 shadow-sm">
          <div className="mb-6">
            <h3 className="font-semibold">Retrieval Accuracy (24h)</h3>
            <p className="text-sm text-gray-400">Percentage of highly relevant context returned</p>
          </div>
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={accuracyChartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorAccuracy" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#3B82F6" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
                <XAxis dataKey="time" stroke="#6B7280" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis stroke="#6B7280" fontSize={12} tickLine={false} axisLine={false} domain={['dataMin - 2', 'dataMax + 2']} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#111827', borderColor: 'rgba(255,255,255,0.1)', borderRadius: '8px' }}
                  itemStyle={{ color: '#F8FAFC' }}
                />
                <Area type="monotone" dataKey="accuracy" stroke="#3B82F6" strokeWidth={2} fillOpacity={1} fill="url(#colorAccuracy)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Latency Chart */}
        <div className="bg-card border border-border rounded-xl p-5 shadow-sm">
          <div className="mb-6">
            <h3 className="font-semibold">Search Latency (24h)</h3>
            <p className="text-sm text-gray-400">Average response time in milliseconds</p>
          </div>
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={accuracyChartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
                <XAxis dataKey="time" stroke="#6B7280" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis stroke="#6B7280" fontSize={12} tickLine={false} axisLine={false} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#111827', borderColor: 'rgba(255,255,255,0.1)', borderRadius: '8px' }}
                  itemStyle={{ color: '#F8FAFC' }}
                />
                <Line type="monotone" dataKey="latency" stroke="#10B981" strokeWidth={2} dot={{ r: 4, fill: '#10B981', strokeWidth: 0 }} activeDot={{ r: 6 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
}
