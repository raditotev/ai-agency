# Multi-stage Dockerfile for Nuxt SSR deployment
# Stage 1: Build the application
FROM node:22-alpine AS builder

# Set working directory
WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm ci --only=production

# Copy source code
COPY . .

# Build the SSR application
RUN npm run build

# Stage 2: Production image
FROM node:22-alpine AS production

# Install dumb-init for proper signal handling
RUN apk add --no-cache dumb-init

# Create app user for security
RUN addgroup -g 1001 -S nodejs
RUN adduser -S nuxt -u 1001

# Set working directory
WORKDIR /app

# Copy package files
COPY package*.json ./

# Install only production dependencies
RUN npm ci --only=production && npm cache clean --force

# Copy built application
COPY --from=builder --chown=nuxt:nodejs /app/.output ./.output

# Switch to non-root user
USER nuxt

# Expose port (will be overridden by docker-compose)
EXPOSE 3000

# Set environment
ENV NODE_ENV=production
ENV HOST=0.0.0.0

# Start the application
ENTRYPOINT ["dumb-init", "--"]
CMD ["node", ".output/server/index.mjs"]
