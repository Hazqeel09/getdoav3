# syntax = docker/dockerfile:1

# Use slim Node.js image for smaller base
ARG NODE_VERSION=22.12.0
FROM --platform=linux/amd64 node:${NODE_VERSION}-slim as base

# Set working directory and production environment
WORKDIR /app
ENV NODE_ENV="production"

# Install pnpm globally
ARG PNPM_VERSION=9.2.0
RUN npm install -g pnpm@$PNPM_VERSION

# Update and clean up
RUN apt-get update -qq && \
    apt-get install --no-install-recommends -y curl && \
    apt-get clean && \
    rm -rf /var/lib/apt/lists/*


# Build stage to reduce final image size
FROM base as build

# Install build dependencies
RUN apt-get update -qq && \
    apt-get install --no-install-recommends -y build-essential node-gyp pkg-config python-is-python3

# Copy package.json and lockfile
COPY package.json pnpm-lock.yaml ./

# Install all dependencies for building
RUN pnpm install --frozen-lockfile --prod=false

# Copy application code
COPY . .

# Build the Remix application
RUN pnpm run build

# Prune development dependencies
RUN pnpm prune --prod


# Final production image
FROM base

# Copy the built application from the build stage
COPY --from=build /app /app

# Expose the port Remix will listen on
EXPOSE 3000

# Set the default command to start the server
CMD [ "pnpm", "run", "start" ]
