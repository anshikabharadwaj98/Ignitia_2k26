#!/usr/bin/env pwsh
# Test script for signup flow without email verification

Write-Host "Testing Signup Flow (No Email Verification)" -ForegroundColor Cyan
Write-Host "=============================================" -ForegroundColor Cyan

$baseUrl = "http://localhost:3001/api"
$headers = @{
    "Content-Type" = "application/json"
}

try {
    # Step 1: Submit personal info
    Write-Host "`nStep 1: Submitting personal info..." -ForegroundColor Yellow
    $personalData = @{
        name = "Test User"
        email = "2K23.cs2310761@gmail.com"
        contact_number = "1234567890"
    } | ConvertTo-Json

    $response1 = Invoke-WebRequest -Uri "$baseUrl/auth/signup/personal-info" -Method POST -Headers $headers -Body $personalData -UseBasicParsing
    $result1 = $response1.Content | ConvertFrom-Json
    Write-Host "✅ Personal info submitted" -ForegroundColor Green
    Write-Host "Session ID: $($result1.session_id)" -ForegroundColor Gray
    
    $sessionId = $result1.session_id
    $sessionHeaders = @{
        "Content-Type" = "application/json"
        "X-Session-ID" = $sessionId
    }

    # Step 2: Submit college info
    Write-Host "`nStep 2: Submitting college info..." -ForegroundColor Yellow
    $collegeData = @{
        college = "PSIT"
        roll_number = "1234567890123"
    } | ConvertTo-Json

    $response2 = Invoke-WebRequest -Uri "$baseUrl/auth/signup/college-info" -Method POST -Headers $sessionHeaders -Body $collegeData -UseBasicParsing
    $result2 = $response2.Content | ConvertFrom-Json
    Write-Host "✅ College info submitted" -ForegroundColor Green
    Write-Host "Next step: $($result2.next_step)" -ForegroundColor Gray

    # Step 3: Complete registration with password (no email verification)
    Write-Host "`nStep 3: Creating password and completing registration..." -ForegroundColor Yellow
    $passwordData = @{
        password = "Mybi@20jan"
        confirm_password = "Mybi@20jan"
    } | ConvertTo-Json

    $response3 = Invoke-WebRequest -Uri "$baseUrl/auth/signup/complete" -Method POST -Headers $sessionHeaders -Body $passwordData -UseBasicParsing
    $result3 = $response3.Content | ConvertFrom-Json
    Write-Host "✅ Registration completed successfully!" -ForegroundColor Green
    Write-Host "User ID: $($result3.user.id)" -ForegroundColor Gray
    Write-Host "User Email: $($result3.user.email)" -ForegroundColor Gray
    Write-Host "User Name: $($result3.user.name)" -ForegroundColor Gray
    Write-Host "Is Admin: $($result3.is_admin)" -ForegroundColor Gray
    Write-Host "JWT Token: $($result3.token.Substring(0, 20))..." -ForegroundColor Gray

    Write-Host "`n🎉 Account created successfully without email verification!" -ForegroundColor Green
    Write-Host "The user has been saved to Supabase database." -ForegroundColor Green

} catch {
    Write-Host "`nError during signup:" -ForegroundColor Red
    Write-Host $_.Exception.Message -ForegroundColor Red
    
    if ($_.Exception.Response) {
        $errorResponse = $_.Exception.Response.GetResponseStream()
        $reader = New-Object System.IO.StreamReader($errorResponse)
        $errorContent = $reader.ReadToEnd()
        Write-Host "Error details: $errorContent" -ForegroundColor Red
    }
}

Write-Host "`nFrontend signup should now work at: http://localhost:5000/signup" -ForegroundColor Cyan