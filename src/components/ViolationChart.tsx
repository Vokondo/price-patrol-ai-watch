
import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Area, AreaChart } from 'recharts';

const data = [
  { date: '2024-01-01', violations: 5 },
  { date: '2024-01-02', violations: 8 },
  { date: '2024-01-03', violations: 12 },
  { date: '2024-01-04', violations: 7 },
  { date: '2024-01-05', violations: 15 },
  { date: '2024-01-06', violations: 23 },
  { date: '2024-01-07', violations: 18 },
];

export function ViolationChart() {
  return (
    <div className="h-[300px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
          <defs>
            <linearGradient id="violationGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#6366f1" stopOpacity={0.8}/>
              <stop offset="95%" stopColor="#6366f1" stopOpacity={0.1}/>
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" className="stroke-slate-200 dark:stroke-slate-700" opacity={0.5} />
          <XAxis 
            dataKey="date" 
            className="text-xs text-slate-600 dark:text-slate-400"
            tickFormatter={(value) => new Date(value).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
            tick={{ fontSize: 12 }}
          />
          <YAxis 
            className="text-xs text-slate-600 dark:text-slate-400" 
            tick={{ fontSize: 12 }}
          />
          <Tooltip 
            labelFormatter={(value) => new Date(value).toLocaleDateString()}
            formatter={(value: any) => [value, 'Violations']}
            contentStyle={{
              backgroundColor: 'rgba(255, 255, 255, 0.95)',
              border: 'none',
              borderRadius: '12px',
              boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
              backdropFilter: 'blur(10px)'
            }}
          />
          <Area
            type="monotone"
            dataKey="violations"
            stroke="#6366f1"
            strokeWidth={3}
            fill="url(#violationGradient)"
            dot={{ fill: '#6366f1', strokeWidth: 2, r: 6 }}
            activeDot={{ r: 8, stroke: '#6366f1', strokeWidth: 2, fill: '#ffffff' }}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
