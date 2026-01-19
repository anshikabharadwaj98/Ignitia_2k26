#!/usr/bin/env pwsh
# Test script for complete signup flow

Write-Host "Testing Complete Signup Flow" -ForegroundColor Cyan
Write-Host "============================" -ForegroundColor Cyan

$baseUrl = "http://localhost:3001/api"
$headers = @{
    "Content-Type" = "application/json"
}

try {
    # Step 1: Test personal info submission
    Write-Host "`nStep 1: Submitting personal info..." -ForegroundColor Yellow
    $personalData = @{
        name = "Test User"
        email = "test@example.com"
        contact_number = "1234567890"
    } | ConvertTo-Json

    $response1 = Invoke-WebRequest -Uri "$baseUrl/auth/signup/personal-info" -Method POST -Headers $headers -Body $personalData -UseBasicParsing
    $result1 = $response1.Content | ConvertFrom-Json
    Write-Host "Personal info submitted successfully" -ForegroundColor Green
    Write-Host "Session ID: $($result1.session_id)" -ForegroundColor Gray
    
    $sessionId = $result1.session_id
    $sessionHeaders = @{
        "Content-Type" = "application/json"
        "X-Session-ID" = $sessionId
    }

    # Step 2: Test college info submission
    Write-Host "`nStep 2: Submitting college info..." -ForegroundColor Yellow
    $collegeData = @{
        college = "PSIT"
        roll_number = "1234567890123"
    } | ConvertTo-Json

    $response2 = Invoke-WebRequest -Uri "$baseUrl/auth/signup/college-info" -Method POST -Headers $sessionHeaders -Body $collegeData -UseBasicParsing
    $result2 = $response2.Content | ConvertFrom-Json
    Write-Host "College info submitted successfully" -ForegroundColor Green

    # Step 3: Test email verification sending
    Write-Host "`nStep 3: Sending email verification..." -ForegroundColor Yellow
    $response3 = Invoke-WebRequest -Uri "$baseUrl/auth/signup/send-verification" -Method POST -Headers $sessionHeaders -UseBasicParsing
    $result3 = $response3.Content | ConvertFrom-Json
    Write-Host "Verification email sent successfully" -ForegroundColor Green

    # Step 4: Test email verification
    Write-Host "`nStep 4: Verifying email..." -ForegroundColor Yellow
    $verifyData = @{
        token = "123456"
    } | ConvertTo-Json

    $response4 = Invoke-WebRequest -Uri "$baseUrl/auth/signup/verify-email" -Method POST -Headers $sessionHeaders -Body $verifyData -UseBasicParsing
    $result4 = $response4.Content | ConvertFrom-Json
    Write-Host "Email verified successfully" -ForegroundColor Green

    # Step 5: Test password creation and registration completion
    Write-Host "`nStep 5: Completing registration..." -ForegroundColor Yellow
    $passwordData = @{
        password = "testpass123"
        confirm_password = "testpass123"
    } | ConvertTo-Json

    $response5 = Invoke-WebRequest -Uri "$baseUrl/auth/signup/complete" -Method POST -Headers $sessionHeaders -Body $passwordData -UseBasicParsing
    $result5 = $response5.Content | ConvertFrom-Json
    Write-Host "Registration completed successfully" -ForegroundColor Green
    Write-Host "User ID: $($result5.user.id)" -ForegroundColor Gray
    Write-Host "Token: $($result5.token)" -ForegroundColor Gray

    Write-Host "`nAll signup steps completed successfully!" -ForegroundColor Green
    Write-Host "The frontend signup flow should now work without JSON parsing errors." -ForegroundColor Green

} catch {
    Write-Host "`nError during signup flow test:" -ForegroundColor Red
    Write-Host $_.Exception.Message -ForegroundColor Red
    
    if ($_.Exception.Response) {
        $errorResponse = $_.Exception.Response.GetResponseStream()
        $reader = New-Object System.IO.StreamReader($errorResponse)
        $errorContent = $reader.ReadToEnd()
        Write-Host "Error details: $errorContent" -ForegroundColor Red
    }
}

Write-Host "`nFrontend URL: http://localhost:5000/signup" -ForegroundColor Cyan
Write-Host "Backend URL: http://localhost:3001" -ForegroundColor Cyan