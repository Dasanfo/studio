import { ModelCard } from '@/components/model-card';
import { getGlobalMetrics, getModels } from '@/lib/data';

export default async function HomePage() {
  const models = await getModels();
  const allMetrics = await getGlobalMetrics();

  return (
    <div className="flex flex-col gap-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight font-headline">
          Fruit Classification Model Comparator
        </h1>
        <p className="text-muted-foreground mt-2">
          An interactive dashboard to visualize and compare the performance of different AI models for fruit classification.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {models.map((model) => (
          <ModelCard key={model.id} model={model} metrics={allMetrics[model.id]} />
        ))}
      </div>
    </div>
  );
}
