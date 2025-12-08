#!/bin/bash

set -e

echo "### Skynet is being initialized on this EC2 instance ###"

# Update system
echo "Updating system packages"
sudo dnf update -y

# Install Docker
echo "Installing Docker"
sudo dnf install -y docker
sudo systemctl start docker
sudo systemctl enable docker
sudo usermod -aG docker ec2-user

# Install Docker compose
sudo mkdir -p /usr/libexec/docker/cli-plugins/
sudo curl -SL https://github.com/docker/compose/releases/latest/download/docker-compose-linux-$(uname -m) -o /usr/libexec/docker/cli-plugins/docker-compose
sudo chmod +x /usr/libexec/docker/cli-plugins/docker-compose

# Install AWS CLI
echo "Installing/updating AWS CLI"
if ! command -v aws &> /dev/null; then
curl "https://awscli.amazonaws.com/awscli-exe-linux-x86_64.zip" -o "awscliv2.zip"
  unzip awscliv2.zip
  sudo ./aws/install
  rm -rf aws awscliv2.zip
else
  echo "AWS CLI is already installed"
fi

# Create app directory
echo "Creating application directory"
mkdir -p /home/ec2-user/blog-app

echo "### Initialization Complete ###"
echo "You can now deploy the application using the deploy script."
echo "Don't forget to log out and back in for Docker group changes to take effect."

echo "### Next steps ###"
echo "1. Configure AWS credentials"
echo "$ aws configure"
echo "2. Clone the repository to ~/blog-app"
echo "$ git clone https://github.com/g4rrucho/full-stack-technical-challenge /home/ec2-user/blog-app"
echo "3. Create .env file with environment variables"
echo "4. Run the deploy.sh script to start the application"

