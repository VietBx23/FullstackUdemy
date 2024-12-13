# Use Node.js version 20 as base image
FROM node:20

# Set working directory in container
WORKDIR /app

# Copy package.json and package-lock.json (if available)
COPY package*.json ./ 

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Expose the application port (update as per app requirement)
EXPOSE 8081

# Command to run the application
CMD ["node", "src/server.js"]
