import { ModelDetailClient } from '@/components/model-detail-client';
import { getModelById, getGlobalMetrics, getPerClassMetrics, getConfusionMatrix } from '@/lib/data';
import { notFound } from 'next/navigation';

type ModelPageProps = {
  params: {
    model_id: string;
  };
};

export async function generateMetadata({ params }: ModelPageProps) {
    const model = await getModelById(params.model_id);
    if (!model) {
        return { title: 'Model Not Found' };
    }
    return { title: `${model.name} Details` };
}

export default async function ModelPage({ params }: ModelPageProps) {
  const { model_id } = params;

  try {
    const [model, allGlobalMetrics, perClassMetrics, confusionMatrix] = await Promise.all([
      getModelById(model_id),
      getGlobalMetrics(),
      getPerClassMetrics(model_id),
      getConfusionMatrix(model_id),
    ]);

    if (!model) {
      notFound();
    }
    
    const globalMetrics = allGlobalMetrics[model.id as keyof typeof allGlobalMetrics];

    return (
        <ModelDetailClient 
            model={model}
            globalMetrics={globalMetrics}
            perClassMetrics={perClassMetrics}
            confusionMatrix={confusionMatrix}
        />
    );
  } catch (error) {
    console.error(`Failed to load data for model ${model_id}:`, error);
    notFound();
  }
}

export async function generateStaticParams() {
    const models = await getModels();
   
    return models.map((model) => ({
      model_id: model.id,
    }));
}
