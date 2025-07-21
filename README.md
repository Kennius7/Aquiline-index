# Aquiline Technology Website - Docker Setup

This project contains the Aquiline Technology website with Docker configuration for easy local development and deployment.

## Prerequisites

- Docker installed on your machine
- Docker Compose installed

## Quick Start

### Option 1: Using Docker Compose (Recommended)

1. **Build and run the container:**
   ```bash
   docker-compose up --build
   ```

2. **Access the website:**
   Open your browser and go to: `http://localhost:3000`

3. **Stop the container:**
   ```bash
   docker-compose down
   ```

### Option 2: Using Docker directly

1. **Build the Docker image:**
   ```bash
   docker build -t aquiline-website .
   ```

2. **Run the container:**
   ```bash
   docker run -d -p 3000:80 --name aquiline-web aquiline-website
   ```

3. **Access the website:**
   Open your browser and go to: `http://localhost:3000`

4. **Stop the container:**
   ```bash
   docker stop aquiline-web
   docker rm aquiline-web
   ```

## Development

### Live Reload (Development Mode)

For development with live reload, you can mount the current directory:

```bash
docker-compose up -d
```

The docker-compose.yml is already configured with volume mounting, so any changes to your HTML, CSS, or JS files will be reflected immediately.

### Custom Port

To run on a different port, modify the `docker-compose.yml` file or use:

```bash
docker run -d -p 8080:80 --name aquiline-web aquiline-website
```

## File Structure

```
aquiline-new/
├── index.html          # Main HTML file
├── styles.css          # Main stylesheet
├── script.js           # JavaScript functionality
├── logo.svg           # Company logo
├── Dockerfile         # Docker configuration
├── docker-compose.yml # Docker Compose configuration
├── nginx.conf         # Nginx server configuration
├── .dockerignore      # Docker ignore file
└── README.md          # This file
```

## Docker Configuration

- **Base Image:** `nginx:alpine` (lightweight and secure)
- **Port:** Container runs on port 80, mapped to host port 3000
- **Web Server:** Nginx with optimized configuration
- **Features:**
  - Gzip compression enabled
  - Security headers configured
  - Static asset caching
  - Custom error pages

## Troubleshooting

### Container won't start
```bash
# Check if port 3000 is already in use
lsof -i :3000

# Use a different port
docker run -d -p 3001:80 --name aquiline-web aquiline-website
```

### Permission issues on macOS/Linux
```bash
# Make sure Docker has permission to access the directory
chmod -R 755 .
```

### View container logs
```bash
docker logs aquiline-web
# or with docker-compose
docker-compose logs
```

## Production Deployment

For production deployment, you can use the same Docker image with additional considerations:

1. Use environment variables for configuration
2. Set up proper SSL/TLS certificates
3. Configure reverse proxy if needed
4. Set up monitoring and logging

## Commands Reference

```bash
# Build and start with Docker Compose
docker-compose up --build -d

# Stop all services
docker-compose down

# Rebuild only
docker-compose build

# View logs
docker-compose logs -f

# Shell into container
docker exec -it aquiline-website sh
```
