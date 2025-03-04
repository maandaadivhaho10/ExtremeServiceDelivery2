# Use node image
FROM node:14

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the backend code
COPY . .

# Copy .env file
COPY .env ./

# Expose the port the app listens on
EXPOSE 5000

# Start the server
CMD ["npm", "start"]
