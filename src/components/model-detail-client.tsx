'use client';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import type { GlobalMetrics, Model, PerClassMetrics, ConfusionMatrix } from '@/lib/types';
import { PerClassChart } from './charts/per-class-chart';
import { ConfusionMatrixHeatmap } from './charts/confusion-matrix';

type ModelDetailClientProps = {
  model: Model;
  globalMetrics: GlobalMetrics;
  perClassMetrics: PerClassMetrics;
  confusionMatrix: ConfusionMatrix;
};

export function ModelDetailClient({
  model,
  globalMetrics,
  perClassMetrics,
  confusionMatrix,
}: ModelDetailClientProps) {
  return (
    <div className="flex flex-col gap-8 animate-fade-in-up">
      <div>
        <h1 className="text-3xl font-bold tracking-tight font-headline">
          {model.name}
        </h1>
        <p className="text-muted-foreground mt-2">
          Detailed performance analysis for the {model.type.replace('_', ' ')} model.
        </p>
      </div>

      <Card className="animate-fade-in" style={{ animationDelay: '100ms' }}>
        <CardHeader>
          <CardTitle className="font-headline text-xl">Global Metrics</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
            <div className="rounded-lg border p-4 transition-transform hover:scale-105">
              <div className="text-sm text-muted-foreground">Accuracy</div>
              <div className="text-2xl font-bold">{(globalMetrics.accuracy * 100).toFixed(1)}%</div>
            </div>
            <div className="rounded-lg border p-4 transition-transform hover:scale-105">
              <div className="text-sm text-muted-foreground">F1 (Macro)</div>
              <div className="text-2xl font-bold">{globalMetrics.f1_macro.toFixed(3)}</div>
            </div>
            <div className="rounded-lg border p-4 transition-transform hover:scale-105">
              <div className="text-sm text-muted-foreground">Inference (ms)</div>
              <div className="text-2xl font-bold">{globalMetrics.avg_inference_time_ms.toFixed(1)}</div>
            </div>
            <div className="rounded-lg border p-4 transition-transform hover:scale-105">
              <div className="text-sm text-muted-foreground">Size (MB)</div>
              <div className="text-2xl font-bold">{globalMetrics.model_size_mb.toFixed(1)}</div>
            </div>
          </div>
        </CardContent>
      </Card>
      
      <Tabs defaultValue="per-class" className="animate-fade-in" style={{ animationDelay: '200ms' }}>
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="per-class">Metrics per Class</TabsTrigger>
          <TabsTrigger value="confusion-matrix">Confusion Matrix</TabsTrigger>
        </TabsList>
        <TabsContent value="per-class">
          <Card>
            <CardHeader>
              <CardTitle className="font-headline text-xl">Performance by Fruit</CardTitle>
              <CardDescription>Precision, Recall, and F1-Score for each class.</CardDescription>
            </CardHeader>
            <CardContent className="grid gap-6 lg:grid-cols-2">
              <div className='overflow-auto h-[400px]'>
                <Table>
                    <TableHeader>
                        <TableRow>
                        <TableHead>Fruit</TableHead>
                        <TableHead className="text-right">Precision</TableHead>
                        <TableHead className="text-right">Recall</TableHead>
                        <TableHead className="text-right">F1-Score</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {perClassMetrics.per_class.map((item) => (
                        <TableRow key={item.class_id}>
                            <TableCell className="font-medium">{item.label}</TableCell>
                            <TableCell className="text-right">{item.precision.toFixed(3)}</TableCell>
                            <TableCell className="text-right">{item.recall.toFixed(3)}</TableCell>
                            <TableCell className="text-right font-semibold">{item.f1.toFixed(3)}</TableCell>
                        </TableRow>
                        ))}
                    </TableBody>
                </Table>
              </div>
              <div className="pl-4">
                <h3 className="text-lg font-semibold mb-4 text-center font-headline">F1-Score Distribution</h3>
                <PerClassChart data={perClassMetrics.per_class} />
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="confusion-matrix">
            <Card>
                <CardHeader>
                    <CardTitle className="font-headline text-xl">Confusion Matrix</CardTitle>
                    <CardDescription>
                        Visualizing where the model gets confused. Rows represent actual labels, and columns represent predicted labels.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <ConfusionMatrixHeatmap data={confusionMatrix} />
                </CardContent>
            </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
