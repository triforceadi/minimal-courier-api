# Use the official Node.js image as a base image
FROM node:latest

# Set the working directory in the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install app dependencies
RUN npm install

# Copy the rest of the application code to the working directory
COPY . .

# Expose the port that the app will run on
EXPOSE 3000

# Start the application
CMD ["node", "src/app.js"]