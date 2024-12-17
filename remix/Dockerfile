FROM node:22-alpine

WORKDIR /myremix

# Install pnpm
RUN npm install -g pnpm

# Copy package files and install dependencies
COPY pnpm-lock.yaml ./
COPY package.json ./
RUN pnpm install

# Copy the application source code
COPY . .

# Build the application
RUN pnpm run build

# Expose the application's port
EXPOSE 3000

CMD ["pnpm", "start"]