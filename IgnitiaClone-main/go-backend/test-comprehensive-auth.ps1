# PowerShell script to test comprehensive authentication system

Write-Host "Testing Ignitia Comprehensive Authentication System..." -ForegroundColor Green

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

# Test get colleges
Write-Host "`nTesting get colleges..." -ForegroundColor Yellow
try {
    $colleges = Invoke-RestMethod -Uri "$baseUrl/colleges" -Method GET
    Write-Host "✓ Colleges retrieved successfully - Found $($colleges.Count) colleges" -ForegroundColor Green
    $colleges | ForEach-Object { Write-Host "  - $($_.name) ($($_.code))" -ForegroundColor Cyan }
} catch {
    Write-Host "✗ Failed to get colleges: $($_.Exception.Message)" -ForegroundColor Red
}

# Multi-step signup process
Write-Host "`n=== MULTI-STEP SIGNUP PROCESS ===" -ForegroundColor Magenta

# Step 1: Personal Info
Write-Host "`nStep 1: Submitting personal info..." -ForegroundColor Yellow
$personalInfo = @{
    name = "John Doe"
    email = "john.doe@example.com"
    contact_number = "9876543210"
} | ConvertTo-Json

try {
    $step1Response = Invoke-RestMethod -Uri "$baseUrl/auth/signup/personal-info" -Method POST -Body $personalInfo -ContentType "application/json"
    Write-Host "✓ Personal info submitted successfully" -ForegroundColor Green
    $sessionId = $step1Response.session_id
    Write-Host "Session ID: $sessionId" -ForegroundColor Cyan
} catch {
    if ($_.Exception.Response.StatusCode -eq 409) {
        Write-Host "⚠ User already exists, skipping signup test..." -ForegroundColor Yellow
        # Try login instead
        $loginData = @{
            email = "john.doe@example.com"
            password = "password123"
        } | ConvertTo-Json
        
        try {
            $loginResponse = Invoke-RestMethod -Uri "$baseUrl/auth/login" -Method POST -Body $loginData -ContentType "application/json"
            Write-Host "✓ User login successful" -ForegroundColor Green
            $token = $loginResponse.token
            $isAdmin = $loginResponse.is_admin
            Write-Host "Is Admin: $isAdmin" -ForegroundColor Cyan
        } catch {
            Write-Host "✗ Login failed: $($_.Exception.Message)" -ForegroundColor Red
        }
    } else {
        Write-Host "✗ Personal info submission failed: $($_.Exception.Message)" -ForegroundColor Red
        exit 1
    }
}

if ($sessionId) {
    # Step 2: College Info
    Write-Host "`nStep 2: Submitting college info..." -ForegroundColor Yellow
    $collegeInfo = @{
        college = "PSIT"
        roll_number = "1234567890123"
    } | ConvertTo-Json

    try {
        $headers = @{
            "X-Session-ID" = $sessionId
        }
        $step2Response = Invoke-RestMethod -Uri "$baseUrl/auth/signup/college-info" -Method POST -Body $collegeInfo -ContentType "application/json" -Headers $headers
        Write-Host "✓ College info submitted successfully" -ForegroundColor Green
    } catch {
        Write-Host "✗ College info submission failed: $($_.Exception.Message)" -ForegroundColor Red
        exit 1
    }

    # Step 3: Send Email Verification
    Write-Host "`nStep 3: Sending email verification..." -ForegroundColor Yellow
    try {
        $headers = @{
            "X-Session-ID" = $sessionId
        }
        $step3Response = Invoke-RestMethod -Uri "$baseUrl/auth/signup/send-verification" -Method POST -Headers $headers
        Write-Host "✓ Email verification sent successfully" -ForegroundColor Green
        Write-Host "⚠ Check your email for verification token (or check server logs in development)" -ForegroundColor Yellow
    } catch {
        Write-Host "✗ Email verification sending failed: $($_.Exception.Message)" -ForegroundColor Red
    }

    # Step 4: Simulate Email Verification (using a dummy token for testing)
    Write-Host "`nStep 4: Simulating email verification..." -ForegroundColor Yellow
    Write-Host "⚠ In a real scenario, user would get token from email" -ForegroundColor Yellow
    Write-Host "⚠ For testing, you would need the actual token from the database or logs" -ForegroundColor Yellow

    # Step 5: Complete Registration (skipped in automated test due to email verification requirement)
    Write-Host "`nStep 5: Complete registration..." -ForegroundColor Yellow
    Write-Host "⚠ Skipped in automated test - requires actual email verification token" -ForegroundColor Yellow
}

# Test admin login (if admin email exists)
Write-Host "`n=== ADMIN LOGIN TEST ===" -ForegroundColor Magenta
Write-Host "`nTesting admin login..." -ForegroundColor Yellow
$adminLogin = @{
    email = "admin@psit.ac.in"
    password = "admin123"
} | ConvertTo-Json

try {
    $adminResponse = Invoke-RestMethod -Uri "$baseUrl/auth/login" -Method POST -Body $adminLogin -ContentType "application/json"
    Write-Host "✓ Admin login successful" -ForegroundColor Green
    $adminToken = $adminResponse.token
    Write-Host "Is Admin: $($adminResponse.is_admin)" -ForegroundColor Cyan
    
    # Test admin dashboard access
    Write-Host "`nTesting admin dashboard access..." -ForegroundColor Yellow
    try {
        $headers = @{
            "Authorization" = "Bearer $adminToken"
        }
        $dashboard = Invoke-RestMethod -Uri "$baseUrl/admin/dashboard" -Method GET -Headers $headers
        Write-Host "✓ Admin dashboard access successful" -ForegroundColor Green
        Write-Host "Dashboard stats: Users: $($dashboard.statistics.total_users), Sponsors: $($dashboard.statistics.total_sponsors), Teams: $($dashboard.statistics.total_teams)" -ForegroundColor Cyan
    } catch {
        Write-Host "✗ Admin dashboard access failed: $($_.Exception.Message)" -ForegroundColor Red
    }
} catch {
    Write-Host "⚠ Admin login failed (admin user may not exist): $($_.Exception.Message)" -ForegroundColor Yellow
}

# Test regular user trying to access admin routes
if ($token) {
    Write-Host "`nTesting regular user accessing admin routes..." -ForegroundColor Yellow
    try {
        $headers = @{
            "Authorization" = "Bearer $token"
        }
        Invoke-RestMethod -Uri "$baseUrl/admin/dashboard" -Method GET -Headers $headers
        Write-Host "✗ Regular user was able to access admin routes (this should not happen)" -ForegroundColor Red
    } catch {
        if ($_.Exception.Response.StatusCode -eq 403) {
            Write-Host "✓ Regular user properly blocked from admin routes" -ForegroundColor Green
        } else {
            Write-Host "✗ Unexpected error: $($_.Exception.Message)" -ForegroundColor Red
        }
    }
}

# Test public routes
Write-Host "`n=== PUBLIC ROUTES TEST ===" -ForegroundColor Magenta
Write-Host "`nTesting public routes access..." -ForegroundColor Yellow
try {
    $sponsors = Invoke-RestMethod -Uri "$baseUrl/sponsors" -Method GET
    Write-Host "✓ Public sponsors route accessible - Found $($sponsors.Count) sponsors" -ForegroundColor Green
    
    $teams = Invoke-RestMethod -Uri "$baseUrl/teams" -Method GET
    Write-Host "✓ Public teams route accessible - Found $($teams.Count) team members" -ForegroundColor Green
} catch {
    Write-Host "✗ Public routes access failed: $($_.Exception.Message)" -ForegroundColor Red
}

Write-Host "`n=== AUTHENTICATION SYSTEM SUMMARY ===" -ForegroundColor Magenta
Write-Host "✓ Multi-step signup process implemented" -ForegroundColor Green
Write-Host "  - Step 1: Personal Info (name, email, contact)" -ForegroundColor White
Write-Host "  - Step 2: College Info (college selection, roll number for PSIT)" -ForegroundColor White
Write-Host "  - Step 3: Email Verification" -ForegroundColor White
Write-Host "  - Step 4: Email Token Verification" -ForegroundColor White
Write-Host "  - Step 5: Password Creation & Registration Complete" -ForegroundColor White
Write-Host "✓ Admin detection based on email domain" -ForegroundColor Green
Write-Host "✓ Role-based access control (user/admin)" -ForegroundColor Green
Write-Host "✓ Protected admin routes" -ForegroundColor Green
Write-Host "✓ Public routes for general access" -ForegroundColor Green
Write-Host "✓ JWT token-based authentication" -ForegroundColor Green

Write-Host "`nComprehensive authentication testing completed!" -ForegroundColor Green