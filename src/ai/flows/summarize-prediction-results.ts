'use server';

/**
 * @fileOverview Summarizes prediction results from multiple models.
 *
 * - summarizePredictionResults - A function that generates a concise summary of prediction results.
 * - SummarizePredictionResultsInput - The input type for the summarizePredictionResults function.
 * - SummarizePredictionResultsOutput - The return type for the summarizePredictionResults function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const PredictionResultSchema = z.object({
  model_id: z.string(),
  predicted_label: z.string(),
  probabilities: z.array(z.object({
    label: z.string(),
    index: z.number(),
    prob: z.number(),
  })),
  inference_time_ms: z.number(),
});

const SummarizePredictionResultsInputSchema = z.object({
  results: z.array(PredictionResultSchema).describe('An array of prediction results from different models.'),
});
export type SummarizePredictionResultsInput = z.infer<typeof SummarizePredictionResultsInputSchema>;

const SummarizePredictionResultsOutputSchema = z.object({
  summary: z.string().describe('A concise summary of the prediction results for each model.'),
});
export type SummarizePredictionResultsOutput = z.infer<typeof SummarizePredictionResultsOutputSchema>;

export async function summarizePredictionResults(input: SummarizePredictionResultsInput): Promise<SummarizePredictionResultsOutput> {
  return summarizePredictionResultsFlow(input);
}

const summarizePredictionResultsPrompt = ai.definePrompt({
  name: 'summarizePredictionResultsPrompt',
  input: {schema: SummarizePredictionResultsInputSchema},
  output: {schema: SummarizePredictionResultsOutputSchema},
  prompt: `You are an AI expert that summarizes the results of different classification models.

  Given the following prediction results, provide a concise summary of each model's prediction, highlighting the predicted label, the confidence (probability), and the inference time.

  Results:
  {{#each results}}
  Model ID: {{this.model_id}}
  Predicted Label: {{this.predicted_label}}
  Confidence: {{this.probabilities.[0].prob}}
  Inference Time (ms): {{this.inference_time_ms}}
  {{/each}}

  Summary:`, 
});

const summarizePredictionResultsFlow = ai.defineFlow(
  {
    name: 'summarizePredictionResultsFlow',
    inputSchema: SummarizePredictionResultsInputSchema,
    outputSchema: SummarizePredictionResultsOutputSchema,
  },
  async input => {
    const {output} = await summarizePredictionResultsPrompt(input);
    return output!;
  }
);
