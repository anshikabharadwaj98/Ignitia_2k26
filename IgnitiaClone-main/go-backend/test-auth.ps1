# PowerShell script to test authentication endpoints

Write-Host "Testing Ignitia Go Backend Authentication..." -ForegroundColor Green

$baseUrl = "http://localhost:8080/api"

# Test health endpoint first
Write-Host "`nTesting health endpoint..." -ForegroundColor Yellow
try {
    $response = Invoke-RestMethod -Uri "$baseUrl/health" -Method GET
    Write-Host "✓ Health check passed" -ForegroundColor Green
} catch {
    Write-Host "✗ Health check failed: $($_.Exception.Message)" -ForegroundColor Red
    Write-Host "Make sure the server is running on port 8080" -ForegroundColor Red
    exit 1
}

# Test user registration
Write-Host "`nTesting user registration..." -ForegroundColor Yellow
$newUser = @{
    username = "testuser"
    email = "test@example.com"
    password = "password123"
    name = "Test User"
} | ConvertTo-Json

try {
    $registerResponse = Invoke-RestMethod -Uri "$baseUrl/auth/register" -Method POST -Body $newUser -ContentType "application/json"
    Write-Host "✓ User registration successful" -ForegroundColor Green
    $token = $registerResponse.token
    $userId = $registerResponse.user.id
    Write-Host "User ID: $userId" -ForegroundColor Cyan
} catch {
    if ($_.Exception.Response.StatusCode -eq 409) {
        Write-Host "⚠ User already exists, trying login instead..." -ForegroundColor Yellow
        
        # Try login instead
        $loginData = @{
            email = "test@example.com"
            password = "password123"
        } | ConvertTo-Json
        
        try {
            $loginResponse = Invoke-RestMethod -Uri "$baseUrl/auth/login" -Method POST -Body $loginData -ContentType "application/json"
            Write-Host "✓ User login successful" -ForegroundColor Green
            $token = $loginResponse.token
            $userId = $loginResponse.user.id
        } catch {
            Write-Host "✗ Login failed: $($_.Exception.Message)" -ForegroundColor Red
            exit 1
        }
    } else {
        Write-Host "✗ Registration failed: $($_.Exception.Message)" -ForegroundColor Red
        exit 1
    }
}

# Test profile retrieval with JWT token
Write-Host "`nTesting profile retrieval..." -ForegroundColor Yellow
try {
    $headers = @{
        "Authorization" = "Bearer $token"
    }
    $profile = Invoke-RestMethod -Uri "$baseUrl/profile" -Method GET -Headers $headers
    Write-Host "✓ Profile retrieval successful" -ForegroundColor Green
    Write-Host "Profile: $($profile.name) ($($profile.email))" -ForegroundColor Cyan
} catch {
    Write-Host "✗ Profile retrieval failed: $($_.Exception.Message)" -ForegroundColor Red
}

# Test protected route (create sponsor)
Write-Host "`nTesting protected route (create sponsor)..." -ForegroundColor Yellow
$newSponsor = @{
    name = "Test Auth Sponsor"
    tier = "silver"
    display_order = 99
} | ConvertTo-Json

try {
    $headers = @{
        "Authorization" = "Bearer $token"
    }
    $sponsor = Invoke-RestMethod -Uri "$baseUrl/sponsors" -Method POST -Body $newSponsor -ContentType "application/json" -Headers $headers
    Write-Host "✓ Protected route access successful" -ForegroundColor Green
    $sponsorId = $sponsor.id
    
    # Clean up - delete the test sponsor
    Invoke-RestMethod -Uri "$baseUrl/sponsors/$sponsorId" -Method DELETE -Headers $headers
    Write-Host "✓ Test sponsor cleaned up" -ForegroundColor Green
} catch {
    Write-Host "✗ Protected route access failed: $($_.Exception.Message)" -ForegroundColor Red
}

# Test public route access without token
Write-Host "`nTesting public route access..." -ForegroundColor Yellow
try {
    $sponsors = Invoke-RestMethod -Uri "$baseUrl/sponsors" -Method GET
    Write-Host "✓ Public route access successful - Found $($sponsors.Count) sponsors" -ForegroundColor Green
} catch {
    Write-Host "✗ Public route access failed: $($_.Exception.Message)" -ForegroundColor Red
}

# Test invalid token
Write-Host "`nTesting invalid token handling..." -ForegroundColor Yellow
try {
    $headers = @{
        "Authorization" = "Bearer invalid-token"
    }
    Invoke-RestMethod -Uri "$baseUrl/profile" -Method GET -Headers $headers
    Write-Host "✗ Invalid token was accepted (this should not happen)" -ForegroundColor Red
} catch {
    if ($_.Exception.Response.StatusCode -eq 401) {
        Write-Host "✓ Invalid token properly rejected" -ForegroundColor Green
    } else {
        Write-Host "✗ Unexpected error with invalid token: $($_.Exception.Message)" -ForegroundColor Red
    }
}

# Test login with wrong password
Write-Host "`nTesting invalid login credentials..." -ForegroundColor Yellow
$wrongLogin = @{
    email = "test@example.com"
    password = "wrongpassword"
} | ConvertTo-Json

try {
    Invoke-RestMethod -Uri "$baseUrl/auth/login" -Method POST -Body $wrongLogin -ContentType "application/json"
    Write-Host "✗ Invalid credentials were accepted (this should not happen)" -ForegroundColor Red
} catch {
    if ($_.Exception.Response.StatusCode -eq 401) {
        Write-Host "✓ Invalid credentials properly rejected" -ForegroundColor Green
    } else {
        Write-Host "✗ Unexpected error with invalid credentials: $($_.Exception.Message)" -ForegroundColor Red
    }
}

Write-Host "`nAuthentication testing completed!" -ForegroundColor Green
Write-Host "`nAuthentication Features:" -ForegroundColor Yellow
Write-Host "✓ User registration with email/password" -ForegroundColor White
Write-Host "✓ User login with email/password" -ForegroundColor White
Write-Host "✓ JWT token generation and validation" -ForegroundColor White
Write-Host "✓ Protected routes with authentication middleware" -ForegroundColor White
Write-Host "✓ Public routes accessible without authentication" -ForegroundColor White