#!/bin/bash

set -e

echo "### Deploying Blog Application ###"

# Load env variables
if [ -f .env ]; then
  export $(cat .env | xargs)
fi

# Hack into ECR! Just a login though
echo "Logging into AWS ECR"
  aws ecr get-login-password --region $AWS_REGION | docker login --username AWS --password-stdin $AWS_ACCOUNT_ID.dkr.ecr.$AWS_REGION.amazonaws.com

# Pull latest images
echo "Pulling latest images from ECR"
docker pull $AWS_ACCOUNT_ID.dkr.ecr.$AWS_REGION.amazonaws.com/blog-backend:latest
docker pull $AWS_ACCOUNT_ID.dkr.ecr.$AWS_REGION.amazonaws.com/blog-frontend:latest

# Stop and remove old containers
echo "Stopping old containers"
docker-compose -f infra/docker-compose.prod.yml down

# Start new containers
echo "Starting new containers"
docker-compose -f infra/docker-compose.prod.yml up -d

echo "### Deployment Complete ###"
docker-compose -f infra/docker-compose.prod.yml ps
