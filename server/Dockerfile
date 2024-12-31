# Use the official Node.js image as the base
FROM node:20-alpine

# Install graphviz
RUN apt-get update && apt-get install -y graphviz

# Set the working directory inside the container
WORKDIR /app

# Copy the package.json and package-lock.json
COPY package*.json /app

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . /app

# Expose the port the app runs on
EXPOSE 8080

# Start the application
CMD ["npm", "run", "start"]
