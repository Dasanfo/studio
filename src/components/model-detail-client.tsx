'use client';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import type { GlobalMetrics, Model, PerClassMetrics, ConfusionMatrix } from '@/lib/types';
import { ConfusionMatrixHeatmap } from './charts/confusion-matrix';
import Image from 'next/image';

type ModelDetailClientProps = {
  model: Model;
  globalMetrics: GlobalMetrics;
  perClassMetrics: PerClassMetrics | null;
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
      
      <Tabs defaultValue="confusion-matrix" className="animate-fade-in" style={{ animationDelay: '200ms' }}>
        <TabsList className="grid w-full grid-cols-1">
          <TabsTrigger value="confusion-matrix">Confusion Matrix</TabsTrigger>
        </TabsList>
        <TabsContent value="confusion-matrix">
            <Card>
                <CardHeader>
                    <CardTitle className="font-headline text-xl">Confusion Matrix</CardTitle>
                    <CardDescription>
                        Visualizing where the model gets confused. Rows represent actual labels, and columns represent predicted labels.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    {model.id === 'cnn_transfer' ? (
                      <div className="flex justify-center">
                        <Image 
                          src="/cnn_t.png"
                          alt="Confusion Matrix for CNN with Transfer Learning"
                          width={800}
                          height={800}
                          className="rounded-lg"
                        />
                      </div>
                    ) : (
                      <ConfusionMatrixHeatmap data={confusionMatrix} />
                    )}
                </CardContent>
            </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
