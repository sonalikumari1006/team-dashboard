# Use an official Node.js runtime as the base image
FROM node

# Set the working directory in the container
WORKDIR /app

COPY . .

# Expose a port for the application (adjust if your app uses a different port)
EXPOSE 5000

# Set the default command to run the application
CMD ["npm", "run", "dev"]
