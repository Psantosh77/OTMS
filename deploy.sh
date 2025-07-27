#!/bin/bash

# OTGMS Deployment Script
# This script helps deploy the OTGMS application

set -e

echo "🚀 OTGMS Deployment Script"
echo "=========================="

# Function to check if command exists
command_exists() {
    command -v "$1" >/dev/null 2>&1
}

# Function to deploy backend
deploy_backend() {
    echo "📦 Deploying Backend..."
    
    cd Backend
    
    # Check if .env exists
    if [ ! -f .env ]; then
        echo "❌ .env file not found in Backend directory"
        echo "Please copy .env.example to .env and configure it"
        exit 1
    fi
    
    # Install dependencies
    echo "📥 Installing backend dependencies..."
    npm ci --production
    
    # Start the application
    echo "🔄 Starting backend application..."
    npm start &
    
    echo "✅ Backend deployed successfully"
    cd ..
}

# Function to deploy frontend
deploy_frontend() {
    echo "🎨 Deploying Frontend..."
    
    cd Frontend
    
    # Check if environment file exists
    if [ ! -f .env.production ]; then
        echo "❌ .env.production file not found in Frontend directory"
        echo "Please create .env.production with your configuration"
        exit 1
    fi
    
    # Install dependencies
    echo "📥 Installing frontend dependencies..."
    npm ci
    
    # Build the application
    echo "🔨 Building frontend application..."
    npm run build
    
    # Check if build was successful
    if [ ! -d "dist" ]; then
        echo "❌ Build failed - dist directory not found"
        exit 1
    fi
    
    echo "✅ Frontend built successfully"
    echo "📁 Build output is in Frontend/dist directory"
    cd ..
}

# Function to deploy with Docker
deploy_docker() {
    echo "🐳 Deploying with Docker..."
    
    # Check if Docker is installed
    if ! command_exists docker; then
        echo "❌ Docker is not installed"
        exit 1
    fi
    
    # Check if docker-compose is installed
    if ! command_exists docker-compose; then
        echo "❌ Docker Compose is not installed"
        exit 1
    fi
    
    # Build and start services
    echo "🔨 Building and starting Docker services..."
    docker-compose up --build -d
    
    echo "✅ Docker deployment completed"
    echo "🌐 Frontend: http://localhost:3000"
    echo "🔗 Backend: http://localhost:10000"
    echo "📊 MongoDB: localhost:27017"
}

# Function to show deployment status
show_status() {
    echo ""
    echo "📊 Deployment Status"
    echo "==================="
    
    # Check backend
    if curl -s http://localhost:10000/health >/dev/null 2>&1; then
        echo "✅ Backend: Running (http://localhost:10000)"
    else
        echo "❌ Backend: Not running"
    fi
    
    # Check frontend (if using Docker)
    if curl -s http://localhost:3000/health >/dev/null 2>&1; then
        echo "✅ Frontend: Running (http://localhost:3000)"
    else
        echo "❌ Frontend: Not running or not using Docker"
    fi
}

# Function to show help
show_help() {
    echo "Usage: $0 [OPTION]"
    echo ""
    echo "Options:"
    echo "  backend    Deploy backend only"
    echo "  frontend   Build frontend only"
    echo "  docker     Deploy using Docker Compose"
    echo "  status     Show deployment status"
    echo "  help       Show this help message"
    echo ""
    echo "Examples:"
    echo "  $0 backend          # Deploy backend only"
    echo "  $0 frontend         # Build frontend only"
    echo "  $0 docker           # Full Docker deployment"
    echo "  $0 status           # Check deployment status"
}

# Main deployment logic
case "${1:-help}" in
    "backend")
        deploy_backend
        ;;
    "frontend")
        deploy_frontend
        ;;
    "docker")
        deploy_docker
        ;;
    "status")
        show_status
        ;;
    "help"|*)
        show_help
        ;;
esac

echo ""
echo "🎉 Deployment script completed!"
echo "📚 For more information, check README.md"
