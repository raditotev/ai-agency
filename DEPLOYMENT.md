# Docker Deployment Guide

This guide explains how to deploy the agency website using Docker on your own server. The application uses Server-Side Rendering (SSR) to ensure secure API endpoints.

## Prerequisites

Before deploying, ensure you have the following installed on your server:

- Docker (version 20.10 or higher)
- Docker Compose (version 2.0 or higher)

### Installing Docker and Docker Compose

**Ubuntu/Debian:**

```bash
# Update package index
sudo apt update

# Install Docker
sudo apt install docker.io docker-compose-plugin

# Start and enable Docker
sudo systemctl start docker
sudo systemctl enable docker

# Add your user to docker group (optional, for non-sudo usage)
sudo usermod -aG docker $USER
```

**CentOS/RHEL:**

```bash
# Install Docker
sudo yum install docker docker-compose-plugin

# Start and enable Docker
sudo systemctl start docker
sudo systemctl enable docker
```

## Deployment Steps

### 1. Prepare Environment Variables

Copy the example environment file and configure it:

```bash
cp env.example .env
```

Edit `.env` and set your configuration:

```bash
# Required: Get your access key from https://web3forms.com
WEB3FORMS_ACCESS_KEY=your_actual_access_key_here

# Optional: Change port if needed (default: 3000)
PORT=3000
```

### 2. Build and Deploy

From the project root directory, run:

```bash
# Build and start the container
docker compose up -d

# Or if you prefer the older syntax:
docker-compose up -d
```

This will:

- Build the Docker image using the multi-stage Dockerfile
- Build the SSR application
- Start the Nuxt server
- Map the container port to your specified host port

### 3. Verify Deployment

Check if the container is running:

```bash
docker compose ps
```

Test the website:

```bash
# If using default port 3000
curl http://localhost:3000

# If using custom port
curl http://localhost:YOUR_PORT
```

Check container logs:

```bash
docker compose logs web
```

## Management Commands

### Stop the Application

```bash
docker compose down
```

### Restart the Application

```bash
docker compose restart
```

### Update and Redeploy

```bash
# Pull latest changes (if using git)
git pull

# Rebuild and restart
docker compose up -d --build
```

### View Logs

```bash
# Follow logs in real-time
docker compose logs -f web

# View recent logs
docker compose logs --tail=100 web
```

### Access Container Shell

```bash
docker compose exec web sh
```

## Configuration

### Port Configuration

To change the external port, modify the `PORT` variable in your `.env` file:

```bash
PORT=8080
```

Then restart the container:

```bash
docker compose down
docker compose up -d
```

### Nginx Configuration

The nginx configuration is located in `nginx.conf`. Key features:

- Serves static files with appropriate cache headers
- Handles client-side routing (SPA fallback)
- Enables gzip compression
- Includes security headers
- Provides health check endpoint at `/health`

To modify nginx settings, edit `nginx.conf` and rebuild:

```bash
docker compose up -d --build
```

## Troubleshooting

### Container Won't Start

1. Check logs for errors:

   ```bash
   docker compose logs web
   ```

2. Verify port availability:

   ```bash
   sudo netstat -tlnp | grep :80
   ```

3. Check Docker daemon status:
   ```bash
   sudo systemctl status docker
   ```

### Build Failures

1. Clear Docker build cache:

   ```bash
   docker builder prune
   ```

2. Rebuild without cache:
   ```bash
   docker compose build --no-cache
   ```

### Permission Issues

If you encounter permission issues:

1. Add your user to the docker group:

   ```bash
   sudo usermod -aG docker $USER
   ```

   Then log out and back in.

2. Or run Docker commands with sudo:
   ```bash
   sudo docker compose up -d
   ```

### Website Not Loading

1. Check if the container is running:

   ```bash
   docker compose ps
   ```

2. Verify port mapping:

   ```bash
   docker compose port web 3000
   ```

3. Test the API endpoint:

   ```bash
   curl http://localhost:3000/api/contact
   ```

4. Check application logs:
   ```bash
   docker compose logs web
   ```

## Production Considerations

### Reverse Proxy Setup

For production, consider setting up a reverse proxy (like nginx or Traefik) in front of your container:

```nginx
# Example nginx reverse proxy configuration
server {
    listen 80;
    server_name your-domain.com;

    location / {
        proxy_pass http://localhost:3000;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}
```

### SSL/TLS Setup

For HTTPS, use a reverse proxy with SSL termination or modify the nginx configuration to include SSL certificates.

### Monitoring

Consider adding monitoring tools like:

- Docker health checks (already included)
- Log aggregation (ELK stack, Fluentd)
- Application monitoring (Prometheus, Grafana)

### Backup Strategy

Regularly backup your:

- Environment configuration (`.env` file)
- Docker volumes (if any)
- Source code repository

## Security Notes

- The `WEB3FORMS_ACCESS_KEY` is kept secure on the server side and never exposed to the client
- The contact form submits to our secure API endpoint which handles the Web3Forms integration
- Keep your `.env` file secure and never commit it to version control
- Regularly update Docker images and dependencies
- Use non-root users in production when possible
- Consider using Docker secrets for sensitive data in production

## Support

If you encounter issues not covered in this guide:

1. Check the Docker and Docker Compose documentation
2. Review the application logs
3. Verify your server meets the prerequisites
4. Check for port conflicts or firewall issues
