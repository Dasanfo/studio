'use client';

import { useActionState, useRef, useEffect } from 'react';
import { predictAllModels } from '@/app/actions';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { UploadCloud, LoaderCircle, AlertTriangle, Sparkles } from 'lucide-react';
import Image from 'next/image';
import { PredictionCard } from './prediction-card';
import { useToast } from '@/hooks/use-toast';

const initialState = {
  message: '',
};

export function LiveTestClient() {
  const [state, formAction, isPending] = useActionState(predictAllModels, initialState);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  useEffect(() => {
    if (state.error) {
        toast({
            variant: "destructive",
            title: "Error",
            description: state.message,
        })
    }
  }, [state, toast])

  return (
    <div className="flex flex-col gap-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight font-headline">
          Live Prediction Test
        </h1>
        <p className="text-muted-foreground mt-2">
          Upload an image of a fruit to get predictions from all available models in real-time.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="font-headline text-xl">Upload Image</CardTitle>
        </CardHeader>
        <CardContent>
          <form action={formAction} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="image">Fruit Image</Label>
              <Input id="image" name="image" type="file" accept="image/*" ref={fileInputRef} required />
            </div>
            <Button type="submit" disabled={isPending} className="w-full md:w-auto">
              {isPending ? (
                <>
                  <LoaderCircle className="mr-2 h-4 w-4 animate-spin" />
                  Predicting...
                </>
              ) : (
                'Run Prediction'
              )}
            </Button>
          </form>
        </CardContent>
      </Card>
      
      {isPending && (
          <div className="flex items-center justify-center rounded-lg border border-dashed p-12 text-center">
              <div className="flex flex-col items-center gap-2 text-muted-foreground">
                <LoaderCircle className="h-10 w-10 animate-spin text-primary"/>
                <p className="text-lg font-medium">Analyzing image...</p>
                <p className="text-sm">Models are warming up. This might take a moment.</p>
              </div>
          </div>
      )}

      {state.predictions && state.imagePreview && (
        <Card>
            <CardHeader>
                <CardTitle className="font-headline text-xl">Prediction Results</CardTitle>
            </CardHeader>
            <CardContent className="grid gap-8">
                <div className="grid gap-6 lg:grid-cols-[1fr_2fr]">
                    <div className="relative aspect-square max-w-sm mx-auto w-full">
                        <Image 
                            src={state.imagePreview} 
                            alt="Uploaded fruit" 
                            fill 
                            className="rounded-lg object-cover"
                        />
                    </div>
                    <div className="flex flex-col gap-4">
                        <h3 className="font-semibold font-headline">Model Outputs</h3>
                        <div className="grid gap-4 md:grid-cols-1 lg:grid-cols-1 xl:grid-cols-2">
                            {state.predictions.results.map(result => (
                                <PredictionCard key={result.model_id} result={result} />
                            ))}
                        </div>
                    </div>
                </div>

                {state.summary && (
                    <Alert className="bg-primary/5 border-primary/20">
                        <Sparkles className="h-4 w-4 text-primary" />
                        <AlertTitle className="font-headline text-primary">AI Summary</AlertTitle>
                        <AlertDescription className="text-primary/90">
                            {state.summary}
                        </AlertDescription>
                    </Alert>
                )}
            </CardContent>
        </Card>
      )}

      {!isPending && !state.predictions && (
        <div className="flex flex-col items-center justify-center rounded-lg border border-dashed p-12 text-center">
          <UploadCloud className="mx-auto h-12 w-12 text-muted-foreground" />
          <h3 className="mt-4 text-lg font-semibold">Awaiting Image</h3>
          <p className="mt-1 text-sm text-muted-foreground">
            Your prediction results will appear here once you upload an image.
          </p>
        </div>
      )}
    </div>
  );
}
