# Use an official Node.js runtime as a parent image
FROM node:20-alpine AS builder

# Set the working directory
WORKDIR /app

COPY . .

# Install dependencies
RUN npm i install

# Build the NestJS application
RUN npm run build

# Expose the port that your NestJS app runs on
EXPOSE 3000

# Define the command to run your app
CMD ["node", "apps/api/dist/src/main"]
