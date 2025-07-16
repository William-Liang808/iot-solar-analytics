# Install dependencies in a slim base image
FROM node:24.1.0-slim AS deps
WORKDIR /app

# Prevent Node from auto-downloading a useless debug package
ENV NODE_OPTIONS=--no-deprecation

# Install only the dependencies
COPY package.json package-lock.json* ./
RUN npm install

# Copy rest of the project and build it
FROM node:24.1.0-slim AS builder
WORKDIR /app

COPY --from=deps /app/node_modules ./node_modules
COPY . .
COPY .env.production .env.local
RUN npm run build

# Final image for running the app
FROM node:24.1.0-slim AS runner
WORKDIR /app

ENV NODE_ENV=production

# Copy only what's needed to run the app
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json

# Expose Next.js default port
EXPOSE 3000

# Start the app
CMD ["npm", "start"]
