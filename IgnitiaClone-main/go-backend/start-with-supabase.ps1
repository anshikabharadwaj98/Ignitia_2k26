#!/usr/bin/env pwsh
# Script to start the Go backend with Supabase database

Write-Host "Starting Ignitia Backend with Supabase Database" -ForegroundColor Cyan
Write-Host "=================================================" -ForegroundColor Cyan

# Check if .env file exists
if (-not (Test-Path ".env")) {
    Write-Host "Error: .env file not found!" -ForegroundColor Red
    Write-Host "Please create .env file with your Supabase credentials." -ForegroundColor Red
    Write-Host "See SUPABASE-SETUP-GUIDE.md for instructions." -ForegroundColor Yellow
    exit 1
}

# Check if Go is installed
try {
    $goVersion = & go version 2>$null
    Write-Host "Go version: $goVersion" -ForegroundColor Green
} catch {
    Write-Host "Error: Go is not installed or not in PATH!" -ForegroundColor Red
    Write-Host "Please install Go from https://golang.org/dl/" -ForegroundColor Yellow
    exit 1
}

# Set environment variables
$env:PATH += ";C:\Program Files\Go\bin"
$env:PORT = "3001"

Write-Host "`nStarting backend server..." -ForegroundColor Yellow
Write-Host "This will:" -ForegroundColor Gray
Write-Host "  1. Connect to Supabase database" -ForegroundColor Gray
Write-Host "  2. Run database migrations" -ForegroundColor Gray
Write-Host "  3. Seed initial data (colleges, sponsors, teams)" -ForegroundColor Gray
Write-Host "  4. Start the API server on port 3001" -ForegroundColor Gray

Write-Host "`nPress Ctrl+C to stop the server" -ForegroundColor Yellow
Write-Host "Server will be available at: http://localhost:3001" -ForegroundColor Cyan
Write-Host "API endpoints will be at: http://localhost:3001/api/*" -ForegroundColor Cyan

# Start the main Go application (not the test version)
try {
    & go run main.go
} catch {
    Write-Host "`nError starting server:" -ForegroundColor Red
    Write-Host $_.Exception.Message -ForegroundColor Red
    Write-Host "`nCommon issues:" -ForegroundColor Yellow
    Write-Host "  - Check your DATABASE_URL in .env file" -ForegroundColor Gray
    Write-Host "  - Verify Supabase project is running" -ForegroundColor Gray
    Write-Host "  - Check network connectivity" -ForegroundColor Gray
    exit 1
}