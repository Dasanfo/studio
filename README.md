# Fruit Model Comparator - Next.js Edition

This project is a Next.js implementation of the "Fruit Model Comparator" application. It provides a web interface to visualize and compare the performance of pre-trained machine learning models for fruit image classification.

This version is designed as a modern, full-stack web application using the Next.js framework, React, and TypeScript, delivering a highly interactive and polished user experience.

## Architectural Overview

This application translates the original Python/FastAPI/Streamlit proposal into a single, cohesive Next.js application.

-   **Unified Stack:** The `backend` (FastAPI) and `frontend` (Streamlit) services are merged into one Next.js application. This is the standard, performant approach for Next.js, where the server-side logic (API endpoints, data fetching) and client-side logic (UI rendering) are tightly integrated.
-   **Data Loading:** The application reads model and metric data directly from JSON files located in the `src/data` directory on the server. You can use Docker volumes to mount your own data files into this directory to populate the dashboard.
-   **API Layer:** API logic is handled by a combination of Server Components (for data fetching) and Server Actions (for mutations like live predictions). This is more efficient than a traditional REST API for this use case.
-   **UI:** The user interface is built with React and styled using **Tailwind CSS** and **ShadCN UI** components, providing a professional, accessible, and responsive design.

## How to Run the Application

### Prerequisites

-   [Docker](https://www.docker.com/get-started) and Docker Compose

### Running with Docker

1.  **Build the Docker images:**
    Open your terminal in the project root and run:
    ```bash
    docker-compose build
    ```

2.  **Start the application:**
    ```bash
    docker-compose up
    ```

3.  **Access the application:**
    -   **Frontend:** The web application will be available at [http://localhost:8501](http://localhost:8501).
    -   **Backend API (for inspection):** The Next.js server runs on port 3000 inside the container. The API routes can be explored if needed, though the UI interacts with the server directly.

### Local Development (Without Docker)

1.  **Install dependencies:**
    ```bash
    npm install
    ```

2.  **Run the development server:**
    ```bash
    npm run dev
    ```

3.  **Access the application:**
    -   **Frontend:** The application will be available at [http://localhost:9002](http://localhost:9002).

## Project Structure

-   `Dockerfile` & `docker-compose.yml`: Configuration for building and running the application with Docker.
-   `src/app/(main)/`: Contains all the pages of the application, following the Next.js App Router paradigm.
    -   `layout.tsx`: The main dashboard layout with the sidebar navigation.
    -   `page.tsx`: The "Home" page.
    -   `compare-models/page.tsx`: The "Compare Models" page.
    -   `models/[model_id]/page.tsx`: The dynamic page for detailed model views.
    -   `live-test/page.tsx`: The "Live Test" page.
-   `src/components/`: Reusable React components used across the application.
    -   `charts/`: Components for rendering charts (e.g., bar charts, confusion matrices).
    -   `*.tsx`: UI components like cards, navigation, and page-specific client components.
-   `src/data/`: **(Important)** This directory holds all the JSON data for metrics and models. You can replace these files with your own.
-   `src/lib/`: Core logic and utility functions.
    -   `data.ts`: Functions for reading and parsing data from the `src/data` directory.
    -   `types.ts`: TypeScript type definitions for all data structures.
-   `src/app/actions.ts`: Contains the Server Action for handling live predictions.
-   `src/app/globals.css`: Global styles and Tailwind CSS theme configuration, including the custom color palette.
-   `tailwind.config.ts`: Tailwind configuration, including custom fonts.
