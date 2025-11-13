import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import type { Model, GlobalMetrics } from '@/lib/types';
import Link from 'next/link';
import { BrainCircuit, Spline, Rocket, ArrowRight } from 'lucide-react';

const icons = {
  neural_network: <BrainCircuit className="h-8 w-8 text-primary" />,
  svm: <Spline className="h-8 w-8 text-primary" />,
  boosting: <Rocket className="h-8 w-8 text-primary" />,
};

type ModelCardProps = {
  model: Model;
  metrics: GlobalMetrics;
};

export function ModelCard({ model, metrics }: ModelCardProps) {
  return (
    <Card className="flex h-full flex-col">
      <CardHeader className="flex flex-row items-start gap-4">
        {icons[model.type as keyof typeof icons] || <BrainCircuit className="h-8 w-8 text-primary" />}
        <div>
          <CardTitle className="font-headline">{model.name}</CardTitle>
          <CardDescription>{model.type.replace('_', ' ')}</CardDescription>
        </div>
      </CardHeader>
      <CardContent className="flex-grow">
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <div className="text-muted-foreground">Accuracy</div>
            <div className="font-semibold">{(metrics.accuracy * 100).toFixed(1)}%</div>
          </div>
          <div>
            <div className="text-muted-foreground">F1 (Macro)</div>
            <div className="font-semibold">{metrics.f1_macro.toFixed(2)}</div>
          </div>
          <div>
            <div className="text-muted-foreground">Inference Time</div>
            <div className="font-semibold">{metrics.avg_inference_time_ms.toFixed(1)} ms</div>
          </div>
          <div>
            <div className="text-muted-foreground">Size</div>
            <div className="font-semibold">{metrics.model_size_mb.toFixed(1)} MB</div>
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <Button asChild className="w-full">
          <Link href={`/models/${model.id}`}>
            View Details <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
