# OTGMS Deployment Script for Windows PowerShell
# This script helps deploy the OTGMS application on Windows

param(
    [Parameter(Position=0)]
    [ValidateSet("backend", "frontend", "docker", "status", "help")]
    [string]$Action = "help"
)

Write-Host "🚀 OTGMS Deployment Script for Windows" -ForegroundColor Green
Write-Host "======================================" -ForegroundColor Green

# Function to check if command exists
function Test-Command {
    param($Command)
    try {
        Get-Command $Command -ErrorAction Stop | Out-Null
        return $true
    }
    catch {
        return $false
    }
}

# Function to deploy backend
function Deploy-Backend {
    Write-Host "📦 Deploying Backend..." -ForegroundColor Yellow
    
    Set-Location Backend
    
    # Check if .env exists
    if (-not (Test-Path .env)) {
        Write-Host "❌ .env file not found in Backend directory" -ForegroundColor Red
        Write-Host "Please copy .env.example to .env and configure it" -ForegroundColor Red
        exit 1
    }
    
    # Install dependencies
    Write-Host "📥 Installing backend dependencies..." -ForegroundColor Blue
    npm ci --production
    
    if ($LASTEXITCODE -ne 0) {
        Write-Host "❌ Failed to install backend dependencies" -ForegroundColor Red
        exit 1
    }
    
    # Start the application
    Write-Host "🔄 Starting backend application..." -ForegroundColor Blue
    Start-Process -NoNewWindow npm -ArgumentList "start"
    
    Write-Host "✅ Backend deployed successfully" -ForegroundColor Green
    Set-Location ..
}

# Function to deploy frontend
function Deploy-Frontend {
    Write-Host "🎨 Deploying Frontend..." -ForegroundColor Yellow
    
    Set-Location Frontend
    
    # Check if environment file exists
    if (-not (Test-Path .env.production)) {
        Write-Host "❌ .env.production file not found in Frontend directory" -ForegroundColor Red
        Write-Host "Please create .env.production with your configuration" -ForegroundColor Red
        exit 1
    }
    
    # Install dependencies
    Write-Host "📥 Installing frontend dependencies..." -ForegroundColor Blue
    npm ci
    
    if ($LASTEXITCODE -ne 0) {
        Write-Host "❌ Failed to install frontend dependencies" -ForegroundColor Red
        exit 1
    }
    
    # Build the application
    Write-Host "🔨 Building frontend application..." -ForegroundColor Blue
    npm run build
    
    if ($LASTEXITCODE -ne 0) {
        Write-Host "❌ Frontend build failed" -ForegroundColor Red
        exit 1
    }
    
    # Check if build was successful
    if (-not (Test-Path "dist")) {
        Write-Host "❌ Build failed - dist directory not found" -ForegroundColor Red
        exit 1
    }
    
    Write-Host "✅ Frontend built successfully" -ForegroundColor Green
    Write-Host "📁 Build output is in Frontend/dist directory" -ForegroundColor Green
    Set-Location ..
}

# Function to deploy with Docker
function Deploy-Docker {
    Write-Host "🐳 Deploying with Docker..." -ForegroundColor Yellow
    
    # Check if Docker is installed
    if (-not (Test-Command docker)) {
        Write-Host "❌ Docker is not installed" -ForegroundColor Red
        exit 1
    }
    
    # Check if docker-compose is installed
    if (-not (Test-Command docker-compose)) {
        Write-Host "❌ Docker Compose is not installed" -ForegroundColor Red
        exit 1
    }
    
    # Build and start services
    Write-Host "🔨 Building and starting Docker services..." -ForegroundColor Blue
    docker-compose up --build -d
    
    if ($LASTEXITCODE -ne 0) {
        Write-Host "❌ Docker deployment failed" -ForegroundColor Red
        exit 1
    }
    
    Write-Host "✅ Docker deployment completed" -ForegroundColor Green
    Write-Host "🌐 Frontend: http://localhost:3000" -ForegroundColor Cyan
    Write-Host "🔗 Backend: http://localhost:10000" -ForegroundColor Cyan
    Write-Host "📊 MongoDB: localhost:27017" -ForegroundColor Cyan
}

# Function to show deployment status
function Show-Status {
    Write-Host ""
    Write-Host "📊 Deployment Status" -ForegroundColor Yellow
    Write-Host "===================" -ForegroundColor Yellow
    
    # Check backend
    try {
        $response = Invoke-WebRequest -Uri "http://localhost:10000/health" -TimeoutSec 5 -ErrorAction Stop
        Write-Host "✅ Backend: Running (http://localhost:10000)" -ForegroundColor Green
    }
    catch {
        Write-Host "❌ Backend: Not running" -ForegroundColor Red
    }
    
    # Check frontend (if using Docker)
    try {
        $response = Invoke-WebRequest -Uri "http://localhost:3000/health" -TimeoutSec 5 -ErrorAction Stop
        Write-Host "✅ Frontend: Running (http://localhost:3000)" -ForegroundColor Green
    }
    catch {
        Write-Host "❌ Frontend: Not running or not using Docker" -ForegroundColor Red
    }
}

# Function to show help
function Show-Help {
    Write-Host "Usage: .\deploy.ps1 [OPTION]" -ForegroundColor Cyan
    Write-Host ""
    Write-Host "Options:" -ForegroundColor White
    Write-Host "  backend    Deploy backend only" -ForegroundColor Gray
    Write-Host "  frontend   Build frontend only" -ForegroundColor Gray
    Write-Host "  docker     Deploy using Docker Compose" -ForegroundColor Gray
    Write-Host "  status     Show deployment status" -ForegroundColor Gray
    Write-Host "  help       Show this help message" -ForegroundColor Gray
    Write-Host ""
    Write-Host "Examples:" -ForegroundColor White
    Write-Host "  .\deploy.ps1 backend          # Deploy backend only" -ForegroundColor Gray
    Write-Host "  .\deploy.ps1 frontend         # Build frontend only" -ForegroundColor Gray
    Write-Host "  .\deploy.ps1 docker           # Full Docker deployment" -ForegroundColor Gray
    Write-Host "  .\deploy.ps1 status           # Check deployment status" -ForegroundColor Gray
}

# Main deployment logic
switch ($Action) {
    "backend" { Deploy-Backend }
    "frontend" { Deploy-Frontend }
    "docker" { Deploy-Docker }
    "status" { Show-Status }
    "help" { Show-Help }
    default { Show-Help }
}

Write-Host ""
Write-Host "🎉 Deployment script completed!" -ForegroundColor Green
Write-Host "📚 For more information, check README.md" -ForegroundColor Cyan
