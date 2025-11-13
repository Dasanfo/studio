import 'server-only';
import fs from 'fs/promises';
import path from 'path';
import { AllGlobalMetrics, ConfusionMatrix, Model, PerClassMetrics } from './types';

const dataPath = path.join(process.cwd(), 'src', 'data');

async function readJsonFile<T>(filename: string): Promise<T> {
  try {
    const filePath = path.join(dataPath, filename);
    const fileContent = await fs.readFile(filePath, 'utf-8');
    return JSON.parse(fileContent);
  } catch (error) {
    console.error(`Error reading or parsing ${filename}:`, error);
    throw new Error(`Could not load data for ${filename}.`);
  }
}

export async function getModels(): Promise<Model[]> {
  return readJsonFile<Model[]>('models.json');
}

export async function getModelById(id: string): Promise<Model | undefined> {
    const models = await getModels();
    return models.find(m => m.id === id);
}

export async function getGlobalMetrics(): Promise<AllGlobalMetrics> {
  return readJsonFile<AllGlobalMetrics>('metrics-global.json');
}

export async function getPerClassMetrics(modelId: string): Promise<PerClassMetrics> {
  return readJsonFile<PerClassMetrics>(`metrics-${modelId}-per-class.json`);
}

export async function getConfusionMatrix(modelId: string): Promise<ConfusionMatrix> {
  return readJsonFile<ConfusionMatrix>(`confusion-matrix-${modelId}.json`);
}

export async function getLabels(): Promise<string[]> {
    return readJsonFile<string[]>('labels.json');
}
