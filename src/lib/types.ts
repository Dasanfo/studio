export type Model = {
  id: 'cnn' | 'svm' | 'boosting';
  name: string;
  type: string;
  file: string;
};

export type GlobalMetrics = {
  accuracy: number;
  f1_macro: number;
  f1_micro: number;
  avg_inference_time_ms: number;
  model_size_mb: number;
};

export type AllGlobalMetrics = {
  [key in Model['id']]: GlobalMetrics;
};

export type PerClassMetric = {
  class_id: number;
  label: string;
  precision: number;
  recall: number;
  f1: number;
};

export type PerClassMetrics = {
  model_id: Model['id'];
  per_class: PerClassMetric[];
};

export type ConfusionMatrix = {
  labels: string[];
  matrix: number[][];
};

export type PredictionProbability = {
  label: string;
  index: number;
  prob: number;
};

export type PredictionResult = {
  model_id: Model['id'];
  predicted_label: string;
  predicted_index: number;
  probabilities: PredictionProbability[];
  inference_time_ms: number;
};

export type AllPredictionsResult = {
  results: PredictionResult[];
};

export type TestImage = {
  id: string;
  description: string;
  imageUrl: string;
};
