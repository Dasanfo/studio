'use client';
import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import type { PerClassMetric } from '@/lib/types';

type PerClassChartProps = {
  data: PerClassMetric[];
};

export function PerClassChart({ data }: PerClassChartProps) {
  return (
    <div className="h-[400px] w-full">
      <ResponsiveContainer>
        <BarChart data={data} layout="vertical" margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
          <XAxis type="number" domain={[0, 1]} stroke="hsl(var(--muted-foreground))" />
          <YAxis type="category" dataKey="label" width={80} stroke="hsl(var(--muted-foreground))" />
          <Tooltip
            cursor={{ fill: 'hsl(var(--muted))' }}
            contentStyle={{
              backgroundColor: 'hsl(var(--background))',
              borderColor: 'hsl(var(--border))',
              borderRadius: 'var(--radius)',
            }}
          />
          <Bar dataKey="f1" name="F1-Score" fill="hsl(var(--primary))" radius={[0, 4, 4, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
