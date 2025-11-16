import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Table, TableBody, TableCell, TableRow } from '@/components/ui/table';
import type { PredictionResult, Model } from '@/lib/types';
import { BrainCircuit, Spline, Rocket, Clock } from 'lucide-react';
import React from 'react';

const icons: Record<string, JSX.Element> = {
  neural_network: <BrainCircuit className="h-6 w-6 text-muted-foreground" />,
  svm: <Spline className="h-6 w-6 text-muted-foreground" />,
  boosting: <Rocket className="h-6 w-6 text-muted-foreground" />,
};

const modelDisplayNames: Record<Model['id'], string> = {
    cnn_simple: "CNN (Simple)",
    cnn_transfer: "CNN (Transfer Learning)",
    svm: "SVM",
    boosting: "XGBoost",
}

const modelTypes: Record<Model['id'], string> = {
    cnn_simple: "neural_network",
    cnn_transfer: "neural_network",
    svm: "svm",
    boosting: "boosting",
}

type PredictionCardProps = {
    result: PredictionResult;
} & React.HTMLAttributes<HTMLDivElement>;

export function PredictionCard({ result, ...props }: PredictionCardProps) {
    const topPrediction = result.probabilities[0];
    const modelType = modelTypes[result.model_id];

    return (
        <Card className="w-full animate-fade-in" {...props}>
            <CardHeader>
                <div className="flex justify-between items-start">
                    <CardTitle className="font-headline flex items-center gap-2">
                        {icons[modelType]}
                        {modelDisplayNames[result.model_id]}
                    </CardTitle>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Clock className="h-4 w-4" />
                        <span>{result.inference_time_ms} ms</span>
                    </div>
                </div>
                <CardDescription>
                    Prediction: <span className="font-bold text-primary">{result.predicted_label}</span>
                </CardDescription>
            </CardHeader>
            <CardContent>
                <p className="text-sm font-medium mb-2">Top Probabilities:</p>
                <Table>
                    <TableBody>
                        {result.probabilities.slice(0, 3).map((p) => (
                            <TableRow key={p.label}>
                                <TableCell className="py-2 font-medium">{p.label}</TableCell>
                                <TableCell className="py-2 w-[120px]">
                                    <Progress value={p.prob * 100} className="h-2"/>
                                </TableCell>
                                <TableCell className="py-2 text-right font-mono text-muted-foreground text-xs">
                                    {(p.prob * 100).toFixed(1)}%
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </CardContent>
        </Card>
    )
}
