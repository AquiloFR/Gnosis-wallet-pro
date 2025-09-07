import { ethers } from "hardhat";
... // # Gnosis Wallet pro dApp – Production Deployment Guide

This guide covers secure, automated deployment of your Safe Wallet dApp (`Gnosis_vault-`) using Docker, environment secrets, and GitHub Actions. It’s optimized for reliability, security, and scalability.

---

## 🏗️ 1. Prerequisites

- **Admin access** to target server/cloud (VPS, AWS, GCP, Azure, etc.)
- **GitHub repository** with your dApp codebase
- **Configured environment secrets** (see below)
- **Docker & Docker Compose** installed on your server
- **GitHub Apps** installed and Copilot enabled (see: SafeVault & GitHub Apps Activation Guide)
- **Domain name** (optional, for HTTPS)

---

## 🔐 2. Prepare Environment Variables

Copy `.env Sample` to `.env` and fill in:

- `SAFE_PRIVATE_KEY`
- `SAFE_ADDRESS`
- `ETH_RPC` or `ARB_RPC`
- Any other required secrets

**Best Practice:**  
Store secrets in your CI and production environment—never commit `.env`.

---

## 🐳 3. Dockerfile Example

Add this to your project root as `Dockerfile`:

```Dockerfile
# Use Node.js LTS
FROM node:20-alpine

WORKDIR /app

COPY package*.json ./
RUN npm install --production

COPY . .

ENV NODE_ENV=production

CMD ["npm", "start"]
```

---

## 🐳 4. Docker Compose (Optional)

For multi-service deployment (web + reverse proxy):

```yaml name=docker-compose.yml
version: "3"
services:
  app:
    build: .
    env_file: .env
    ports:
      - "3000:3000"
    restart: always
    networks:
      - safe-net

  # Example: Add nginx for HTTPS
  nginx:
    image: nginx:alpine
    volumes:
      - ./nginx.conf:/etc/nginx/nginx.conf
    ports:
      - "80:80"
      - "443:443"
    depends_on:
      - app
    networks:
      - safe-net

networks:
  safe-net:
```

---

## 👷 5. GitHub Actions CI/CD

Add a workflow like `.github/workflows/deploy.yml`:

```yaml name=.github/workflows/deploy.yml
name: Deploy to Production

on:
  push:
    branches: [main]
  workflow_dispatch:

jobs:
  build-and-deploy:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout code
        uses: actions/checkout@v4

      - name: Set up Docker Buildx
        uses: docker/setup-buildx-action@v3

      - name: Login to DockerHub
        uses: docker/login-action@v3
        with:
          username: ${{ secrets.DOCKER_USERNAME }}
          password: ${{ secrets.DOCKER_PASSWORD }}

      - name: Build and push image
        uses: docker/build-push-action@v5
        with:
          context: .
          push: true
          tags: ${{ secrets.DOCKER_USERNAME }}/safe-wallet:latest

      # Optional: Deploy via SSH or API
      - name: Deploy to server
        uses: appleboy/ssh-action@v1
        with:
          host: ${{ secrets.SERVER_HOST }}
          username: ${{ secrets.SERVER_USER }}
          key: ${{ secrets.SERVER_SSH_KEY }}
          script: |
            docker pull ${{ secrets.DOCKER_USERNAME }}/safe-wallet:latest
            docker stop safe-wallet || true
            docker rm safe-wallet || true
            docker run -d --env-file /path/to/.env --name safe-wallet -p 3000:3000 ${{ secrets.DOCKER_USERNAME }}/safe-wallet:latest
```

**Store sensitive values as repository secrets.**

---

## 🚦 6. Deploy Manually (for first-time setup)

```sh
docker build -t safe-wallet .
docker run --env-file .env -p 3000:3000 --restart always --name safe-wallet safe-wallet
```

Or, with Compose:

```sh
docker compose up -d
```

---

## 🔍 7. Verify & Monitor

- Open your domain/IP: http://your-server:3000
- Check logs: `docker logs -f safe-wallet`
- Confirm Safe transactions are visible on the dashboard

---

## 🛡️ Security & Best Practices

- Use HTTPS for all public endpoints (nginx or Caddy recommended)
- Keep `.env` and secrets secure—never commit or expose them
- Rotate keys periodically
- Use GitHub Actions for automated, auditable deployments
- Limit SSH and Docker access to trusted users

---

## 🧩 Advanced: Zero-Downtime Deployments

Consider Docker Compose with rolling updates, or orchestration via Kubernetes for scaling and high availability.

---

## 📝 References

- [Safe Protocol Docs](https://docs.safe.global/)
- [GitHub Actions Docs](https://docs.github.com/en/actions)
- [Docker Compose](https://docs.docker.com/compose/)
- [SafeVault & GitHub Apps Activation Guide] (see your repo)

---

> _“Automate securely. Deploy confidently. Monitor continuously.”_

---

Need a sample `nginx.conf`, secrets setup script, or production monitoring recommendations? Just ask!
