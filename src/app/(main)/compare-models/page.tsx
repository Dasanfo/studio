import { CompareModelsClient } from '@/components/compare-models-client';
import { getGlobalMetrics } from '@/lib/data';

export const metadata = {
    title: 'Compare Models',
};

export default async function CompareModelsPage() {
  const metrics = await getGlobalMetrics();
  
  return <CompareModelsClient metrics={metrics} />;
}
