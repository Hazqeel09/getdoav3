# syntax=docker/dockerfile:1.4
FROM --platform=linux/arm64 node:22-alpine

WORKDIR /myremix

# Install pnpm using corepack
RUN corepack enable && corepack prepare pnpm@latest --activate

# Copy lock file and package.json first to leverage Docker caching
COPY pnpm-lock.yaml package.json ./

# Install dependencies in frozen mode for consistency
RUN pnpm install --frozen-lockfile

# Copy the entire source code
COPY . .

# Build the application
RUN pnpm run build

# Expose the port Remix uses
EXPOSE 3000

# Run the application
CMD ["pnpm", "start"]
