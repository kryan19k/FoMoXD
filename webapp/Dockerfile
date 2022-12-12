# Use a Node 14 base image
FROM node:14-alpine

# Set the working directory to /app inside the container
WORKDIR /app

COPY package.json .

# Install dependencies (npm ci makes sure the exact versions in the lockfile gets installed)
RUN npm ci

# Copy app files
COPY . .

# ==== BUILD =====
RUN npm run build

# Set the env to "development"
ENV NODE_ENV development

# Expose the port on which the app will be running (3000 is the default that `serve` uses)
EXPOSE 3000/tcp

# Start the app
CMD ["npm", "run", "start"]