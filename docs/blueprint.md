# **App Name**: Fruit Model Comparator

## Core Features:

- Model Loading: Loads pre-trained models (CNN, SVM, Boosting) from the backend/models directory upon API startup, caching them in memory for fast access.  Supports .keras, .joblib, and .pkl formats.  Includes error handling for missing or invalid model files.
- Metrics Ingestion: Reads pre-computed metrics (global, per-class, confusion matrices) from JSON files in the backend/data directory. Validates the JSON structure against predefined schemas. Makes global metrics available via the /metrics/global endpoint.
- Image Preprocessing Pipeline: Provides functions for resizing, normalizing, and converting uploaded images to the required format (e.g., numpy arrays or tensors). Includes specific preprocessing steps tailored to each model type (CNN, SVM, Boosting).
- REST API Endpoints: Exposes REST endpoints using FastAPI for retrieving model information (/models), global metrics (/metrics/global), per-class metrics (/metrics/{model_id}/per_class), confusion matrices (/metrics/{model_id}/confusion_matrix), and making predictions (/predict/{model_id}, /predict/all).
- Inference Service: Executes the loaded models with preprocessed image data and returns predictions along with probabilities and inference times.  The service is a tool that measures and returns the execution time.
- Model Comparison Visualizations: The frontend allows users to select a performance metric, and see the model performances as a group on a bar chart, helping the user visualize performance differences between each trained model.
- Live Prediction Interface: Enables users to upload a fruit image and receive predictions from all models, displayed side-by-side with probabilities and inference times for easy comparison. Uses a grid layout or set of cards for each model.

## Style Guidelines:

- Primary color: HSL(45, 70%, 50%) - Golden yellow (#D4A627), evoking the vibrancy of ripe fruit without being overly bright.
- Background color: HSL(45, 20%, 95%) - Off-white (#F8F7F2), providing a neutral, bright canvas to showcase the metrics.
- Accent color: HSL(15, 80%, 55%) - Orange-red (#E05118), used sparingly for important actions and highlights to add punch.
- Headline font: 'Poppins', a geometric sans-serif to provide a contemporary, precise feel to the titles, labels and tables.
- Body font: 'PT Sans', a humanist sans-serif, blends a modern feel and a little warmth or personality to enhance readability.
- Use simple, clean icons from a consistent set (e.g., Material Design Icons) to represent different fruit types, metrics, and actions. Ensure icons are intuitive and visually distinct.
- Employ a grid-based layout to organize model comparison results, ensuring responsiveness across devices. Utilize clear separation between sections with subtle dividers and whitespace.
- Incorporate subtle transitions (e.g., fade-in, slide-up) when displaying predictions or switching between tabs to provide a smooth user experience without distracting from the content.