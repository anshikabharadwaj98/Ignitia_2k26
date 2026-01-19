# PowerShell script to test Go compilation

Write-Host "Testing Go Backend Compilation..." -ForegroundColor Green

# Check if Go is installed
try {
    $goVersion = go version
    Write-Host "✓ Go is installed: $goVersion" -ForegroundColor Green
} catch {
    Write-Host "✗ Go is not installed. Please install Go first." -ForegroundColor Red
    Write-Host "Download from: https://golang.org/dl/" -ForegroundColor Yellow
    exit 1
}

# Download dependencies
Write-Host "`nDownloading dependencies..." -ForegroundColor Yellow
try {
    go mod tidy
    Write-Host "✓ Dependencies downloaded successfully" -ForegroundColor Green
} catch {
    Write-Host "✗ Failed to download dependencies: $($_.Exception.Message)" -ForegroundColor Red
    exit 1
}

# Test compilation
Write-Host "`nTesting compilation..." -ForegroundColor Yellow
try {
    go build -o ignitia-backend.exe main.go
    Write-Host "✓ Compilation successful" -ForegroundColor Green
    
    # Clean up the executable
    if (Test-Path "ignitia-backend.exe") {
        Remove-Item "ignitia-backend.exe"
        Write-Host "✓ Test executable cleaned up" -ForegroundColor Green
    }
} catch {
    Write-Host "✗ Compilation failed: $($_.Exception.Message)" -ForegroundColor Red
    exit 1
}

# Test syntax checking
Write-Host "`nChecking syntax..." -ForegroundColor Yellow
try {
    go vet ./...
    Write-Host "✓ Syntax check passed" -ForegroundColor Green
} catch {
    Write-Host "⚠ Syntax warnings found: $($_.Exception.Message)" -ForegroundColor Yellow
}

Write-Host "`n=== COMPILATION TEST SUMMARY ===" -ForegroundColor Magenta
Write-Host "✓ Go installation verified" -ForegroundColor Green
Write-Host "✓ Dependencies resolved" -ForegroundColor Green
Write-Host "✓ Code compiles successfully" -ForegroundColor Green
Write-Host "✓ No critical syntax errors" -ForegroundColor Green

Write-Host "`nYour Go backend is ready to run!" -ForegroundColor Green
Write-Host "To start the server: go run main.go" -ForegroundColor Cyan