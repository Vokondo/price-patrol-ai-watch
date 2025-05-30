
import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

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
    <div className="h-[200px]">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
          <XAxis 
            dataKey="date" 
            className="text-xs"
            tickFormatter={(value) => new Date(value).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
          />
          <YAxis className="text-xs" />
          <Tooltip 
            labelFormatter={(value) => new Date(value).toLocaleDateString()}
            formatter={(value) => [value, 'Violations']}
          />
          <Line 
            type="monotone" 
            dataKey="violations" 
            stroke="hsl(var(--primary))" 
            strokeWidth={2}
            dot={{ fill: 'hsl(var(--primary))' }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
