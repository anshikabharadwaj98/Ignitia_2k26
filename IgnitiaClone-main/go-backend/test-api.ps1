# PowerShell script to test the Go backend API endpoints

Write-Host "Testing Ignitia Go Backend API..." -ForegroundColor Green

$baseUrl = "http://localhost:8080/api"

# Test health endpoint
Write-Host "`nTesting health endpoint..." -ForegroundColor Yellow
try {
    $response = Invoke-RestMethod -Uri "$baseUrl/health" -Method GET
    Write-Host "✓ Health check passed" -ForegroundColor Green
    $response | ConvertTo-Json
} catch {
    Write-Host "✗ Health check failed: $($_.Exception.Message)" -ForegroundColor Red
}

# Test sponsors endpoint
Write-Host "`nTesting sponsors endpoint..." -ForegroundColor Yellow
try {
    $sponsors = Invoke-RestMethod -Uri "$baseUrl/sponsors" -Method GET
    Write-Host "✓ Sponsors endpoint working - Found $($sponsors.Count) sponsors" -ForegroundColor Green
    $sponsors[0] | ConvertTo-Json
} catch {
    Write-Host "✗ Sponsors endpoint failed: $($_.Exception.Message)" -ForegroundColor Red
}

# Test teams endpoint
Write-Host "`nTesting teams endpoint..." -ForegroundColor Yellow
try {
    $teams = Invoke-RestMethod -Uri "$baseUrl/teams" -Method GET
    Write-Host "✓ Teams endpoint working - Found $($teams.Count) team members" -ForegroundColor Green
    $teams[0] | ConvertTo-Json
} catch {
    Write-Host "✗ Teams endpoint failed: $($_.Exception.Message)" -ForegroundColor Red
}

# Test creating a new sponsor
Write-Host "`nTesting create sponsor..." -ForegroundColor Yellow
$newSponsor = @{
    name = "Test Sponsor"
    tier = "silver"
    display_order = 99
} | ConvertTo-Json

try {
    $created = Invoke-RestMethod -Uri "$baseUrl/sponsors" -Method POST -Body $newSponsor -ContentType "application/json"
    Write-Host "✓ Sponsor creation successful" -ForegroundColor Green
    $created | ConvertTo-Json
    
    # Clean up - delete the test sponsor
    $sponsorId = $created.id
    Invoke-RestMethod -Uri "$baseUrl/sponsors/$sponsorId" -Method DELETE
    Write-Host "✓ Test sponsor cleaned up" -ForegroundColor Green
} catch {
    Write-Host "✗ Sponsor creation failed: $($_.Exception.Message)" -ForegroundColor Red
}

Write-Host "`nAPI testing completed!" -ForegroundColor Green