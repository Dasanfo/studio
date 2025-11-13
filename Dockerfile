# Use an official Node.js runtime as a parent image
FROM node:20-slim

# Set the working directory
WORKDIR /app

# Install dependencies
COPY package*.json ./
RUN npm install

# Copy the rest of the application code
COPY . .

# Build the Next.js application for production
RUN npm run build

# Expose the port the app runs on
EXPOSE 3000

# Define the command to run the app
CMD ["npm", "start"]
