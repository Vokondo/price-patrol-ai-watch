
import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { format, subDays, startOfDay } from 'date-fns';

export function ViolationChart() {
  const { data: chartData, isLoading } = useQuery({
    queryKey: ['violation-chart'],
    queryFn: async () => {
      // Get violations from the last 7 days
      const sevenDaysAgo = startOfDay(subDays(new Date(), 7));
      
      const { data, error } = await supabase
        .from('violations')
        .select('detected_at')
        .gte('detected_at', sevenDaysAgo.toISOString())
        .order('detected_at');

      if (error) throw error;

      // Group violations by date
      const violationsByDate: { [key: string]: number } = {};
      
      // Initialize all dates with 0
      for (let i = 6; i >= 0; i--) {
        const date = format(subDays(new Date(), i), 'yyyy-MM-dd');
        violationsByDate[date] = 0;
      }

      // Count violations for each date
      data?.forEach((violation) => {
        const date = format(new Date(violation.detected_at), 'yyyy-MM-dd');
        if (violationsByDate[date] !== undefined) {
          violationsByDate[date]++;
        }
      });

      // Convert to chart format
      return Object.entries(violationsByDate).map(([date, violations]) => ({
        date,
        violations,
      }));
    },
  });

  if (isLoading) {
    return (
      <div className="h-[200px] flex items-center justify-center">
        <p className="text-muted-foreground">Loading chart data...</p>
      </div>
    );
  }

  return (
    <div className="h-[200px]">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={chartData || []}>
          <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
          <XAxis 
            dataKey="date" 
            className="text-xs"
            tickFormatter={(value) => format(new Date(value), 'MMM dd')}
          />
          <YAxis className="text-xs" />
          <Tooltip 
            labelFormatter={(value) => format(new Date(value), 'MMM dd, yyyy')}
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
