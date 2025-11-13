'use client';

import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import type { AllGlobalMetrics } from '@/lib/types';

type ComparisonChartProps = {
  data: AllGlobalMetrics;
  metric: keyof AllGlobalMetrics['cnn'];
  metricLabel: string;
};

const formatters: Record<keyof AllGlobalMetrics['cnn'], (value: number) => string> = {
  accuracy: (value) => `${(value * 100).toFixed(1)}%`,
  f1_macro: (value) => value.toFixed(3),
  f1_micro: (value) => value.toFixed(3),
  avg_inference_time_ms: (value) => `${value.toFixed(1)} ms`,
  model_size_mb: (value) => `${value.toFixed(1)} MB`,
};

export function ComparisonChart({ data, metric, metricLabel }: ComparisonChartProps) {
  const chartData = Object.entries(data).map(([modelId, metrics]) => ({
    name: modelId.toUpperCase(),
    value: metrics[metric],
  }));

  const formatter = formatters[metric] || ((value: number) => value.toString());

  return (
    <Card>
      <CardHeader>
        <CardTitle className="font-headline text-xl">{metricLabel} Comparison</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[400px] w-full animate-fade-in">
          <ResponsiveContainer>
            <BarChart data={chartData} margin={{ top: 5, right: 20, left: 10, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis dataKey="name" stroke="hsl(var(--muted-foreground))" />
              <YAxis
                stroke="hsl(var(--muted-foreground))"
                tickFormatter={formatter}
                domain={['auto', 'auto']}
              />
              <Tooltip
                cursor={{ fill: 'hsl(var(--muted))' }}
                contentStyle={{
                  backgroundColor: 'hsl(var(--background))',
                  borderColor: 'hsl(var(--border))',
                  borderRadius: 'var(--radius)',
                }}
                formatter={(value: number) => [formatter(value), metricLabel]}
              />
              <Bar dataKey="value" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} animationDuration={1000} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}
