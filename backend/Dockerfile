# ========================================
# DOCKERFILE FOR BACKEND
# ========================================
# This file tells Docker how to build your backend container

# Use Debian-based image instead of Alpine for better Prisma compatibility
FROM node:22

# Set working directory inside container
# All commands run from this folder
WORKDIR /app

# Copy package files first (for better caching)
# Docker caches layers - if package.json doesn't change, it reuses installed node_modules
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy all source code
COPY . .

# Generate Prisma Client
# This creates the code that lets you query the database
RUN npx prisma generate

# Expose port 5000
# This doesn't actually publish the port, it's just documentation
EXPOSE 5000

# Start the server
# In development, we'll override this with nodemon
CMD ["npm", "start"]
