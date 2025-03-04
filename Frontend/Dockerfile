

    # Use an official Node.js runtime as a parent image
    FROM node:20.13.1
    
    # Set the working directory in the container
    WORKDIR /usr/src/app
    
    # Copy package.json and package-lock.json
    COPY package*.json ./
    
    # Install any needed packages
    RUN npm install
    
    # Copy the rest of the application code
    COPY . .
    
    ENV PORT=3000
    
    # Expose the port the app runs on
    EXPOSE 3000
    
    # Define the command to run the app
    CMD ["npm", "start"]