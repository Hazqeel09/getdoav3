# Use slim Node.js image for smaller base
ARG NODE_VERSION=22.12.0
ARG PLATFORM=linux/arm64
FROM --platform=${PLATFORM} node:${NODE_VERSION}-slim AS base

ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable

RUN apt-get update -y
RUN apt-get install -y openssl

# Build stage to reduce final image size
FROM base AS builder

WORKDIR /app

# Set up environment variables for Prisma
ARG DATABASE_URL
ENV DATABASE_URL=file:/sqlite/dev.db

# Copy package.json and lockfile
COPY .npmrc prisma package.json pnpm-lock.yaml* ./

# Install all dependencies for building
RUN pnpm install --frozen-lockfile

# FROM base AS builder
WORKDIR /app
# COPY --from=deps /app/node_modules ./node_modules
# RUN ls -la
COPY . .

# Generate Prisma Client
# RUN npx prisma generate

# Build the Remix application
RUN pnpm run build

# Final production image
FROM base AS runner

# Copy the built application from the build stage
COPY --from=builder /app .

# Set working directory and production environment
ENV NODE_ENV="production"

# Expose the port Remix will listen on
EXPOSE 3000

# Set the default command to start the server
CMD [ "pnpm", "run", "start" ]
