'use client';

import React from 'react';
import { 
  BarChart3, 
  FolderKanban, 
  FileText, 
  Users, 
  TrendingUp, 
  Eye,
  ArrowUpRight,
  ArrowDownRight
} from 'lucide-react';
import { useColorMode } from '../context/ThemeContext';

const stats = [
  { 
    label: 'Total Views', 
    value: '24,532', 
    change: '+12.5%', 
    trend: 'up', 
    icon: Eye, 
    color: 'blue' 
  },
  { 
    label: 'Total Projects', 
    value: '18', 
    change: '+2', 
    trend: 'up', 
    icon: FolderKanban, 
    color: 'purple' 
  },
  { 
    label: 'Total Posts', 
    value: '142', 
    change: '+5', 
    trend: 'up', 
    icon: FileText, 
    color: 'orange' 
  },
  { 
    label: 'Active Users', 
    value: '1,204', 
    change: '-3.2%', 
    trend: 'down', 
    icon: Users, 
    color: 'emerald' 
  },
];

export default function DashboardOverview() {
  const { mode } = useColorMode();

  return (
    <div className="space-y-8 animate-in fade-in duration-700">
      <div className="flex flex-col gap-1">
        <h1 className={`text-3xl font-bold transition-colors duration-300 ${mode === 'dark' ? 'text-white' : 'text-black'}`}>
          Dashboard Overview
        </h1>
        <p className="text-gray-500">Welcome back, here's what's happening with your blog today.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <div key={stat.label} className={`border p-6 rounded-3xl transition-all duration-300 group hover:scale-[1.02] ${
            mode === 'dark' ? 'bg-white/5 border-white/10 hover:bg-white/10' : 'bg-white border-black/5 shadow-sm hover:shadow-md'
          }`}>
            <div className="flex items-center justify-between mb-4">
              <div className={`p-3 rounded-2xl transition-transform group-hover:scale-110 ${
                mode === 'dark' ? `bg-${stat.color}-600/20 text-${stat.color}-400` : `bg-${stat.color}-100 text-${stat.color}-600`
              }`}>
                <stat.icon size={24} />
              </div>
              <div className={`flex items-center gap-1 text-sm font-bold ${stat.trend === 'up' ? 'text-emerald-500' : 'text-rose-500'}`}>
                {stat.change}
                {stat.trend === 'up' ? <ArrowUpRight size={14} /> : <ArrowDownRight size={14} />}
              </div>
            </div>
            <div>
              <p className="text-gray-500 text-sm font-medium mb-1">{stat.label}</p>
              <h3 className={`text-2xl font-bold transition-colors duration-300 ${mode === 'dark' ? 'text-white' : 'text-black'}`}>
                {stat.value}
              </h3>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className={`lg:col-span-2 border rounded-3xl p-6 transition-all duration-300 ${
          mode === 'dark' ? 'bg-white/5 border-white/10' : 'bg-white border-black/5 shadow-sm'
        }`}>
          <div className="flex items-center justify-between mb-6">
            <h3 className={`text-xl font-bold transition-colors duration-300 ${mode === 'dark' ? 'text-white' : 'text-black'}`}>
              Analytics Overview
            </h3>
            <select className={`border rounded-xl px-3 py-1.5 text-sm outline-none focus:border-blue-600/50 transition-all ${
              mode === 'dark' ? 'bg-white/5 border-white/10 text-gray-300' : 'bg-gray-50 border-black/10 text-gray-700'
            }`}>
              <option>Last 7 days</option>
              <option>Last 30 days</option>
              <option>Last year</option>
            </select>
          </div>
          <div className={`h-[300px] flex items-center justify-center border border-dashed rounded-2xl transition-all ${
            mode === 'dark' ? 'border-white/10 bg-white/2' : 'border-black/10 bg-gray-50/50'
          }`}>
            <div className="text-center">
              <BarChart3 className="mx-auto text-gray-400 mb-2 opacity-50" size={48} />
              <p className="text-gray-500 italic">Analytics chart placeholder</p>
            </div>
          </div>
        </div>

        <div className={`border rounded-3xl p-6 transition-all duration-300 ${
          mode === 'dark' ? 'bg-white/5 border-white/10' : 'bg-white border-black/5 shadow-sm'
        }`}>
          <h3 className={`text-xl font-bold mb-6 transition-colors duration-300 ${mode === 'dark' ? 'text-white' : 'text-black'}`}>
            Recent Projects
          </h3>
          <div className="space-y-4">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className={`flex items-center gap-4 p-3 rounded-2xl transition-colors cursor-pointer group ${
                mode === 'dark' ? 'hover:bg-white/5' : 'hover:bg-black/5'
              }`}>
                <div className="w-12 h-12 rounded-xl bg-blue-600/20 flex items-center justify-center text-blue-500">
                  <FolderKanban size={20} />
                </div>
                <div className="flex-1">
                  <p className={`text-sm font-semibold group-hover:text-blue-500 transition-colors ${mode === 'dark' ? 'text-white' : 'text-black'}`}>
                    Project Alpha-{i}
                  </p>
                  <p className="text-xs text-gray-500">Updated 2h ago</p>
                </div>
              </div>
            ))}
          </div>
          <button className={`w-full mt-6 py-3 rounded-2xl text-sm font-bold transition-all border ${
            mode === 'dark' ? 'bg-white/5 text-white border-white/5 hover:bg-white/10' : 'bg-black/5 text-black border-black/5 hover:bg-black/10'
          }`}>
            View All Projects
          </button>
        </div>
      </div>
    </div>
  );
}
