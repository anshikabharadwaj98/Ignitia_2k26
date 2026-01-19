# Gmail SMTP Setup Guide

To send real verification emails using your Gmail account (bharadwajanshika9@gmail.com), you need to set up a Gmail App Password.

## Step 1: Enable 2-Factor Authentication
1. Go to your Google Account settings: https://myaccount.google.com/
2. Click on "Security" in the left sidebar
3. Under "Signing in to Google", click on "2-Step Verification"
4. Follow the steps to enable 2-Factor Authentication if not already enabled

## Step 2: Generate App Password
1. Go to your Google Account settings: https://myaccount.google.com/
2. Click on "Security" in the left sidebar
3. Under "Signing in to Google", click on "App passwords"
4. You might need to sign in again
5. Select "Mail" as the app and "Other (Custom name)" as the device
6. Enter "Ignitia Backend" as the custom name
7. Click "Generate"
8. Copy the 16-character app password (it will look like: abcd efgh ijkl mnop)

## Step 3: Update .env File
1. Open `go-backend/.env` file
2. Replace `your-gmail-app-password-here` with the app password you just generated
3. Save the file

Example:
```
SMTP_PASSWORD=abcd efgh ijkl mnop
```

## Step 4: Test Email Sending
Once you've updated the .env file, restart the backend server and test the signup flow.

## Troubleshooting
- Make sure 2-Factor Authentication is enabled
- Use the App Password, not your regular Gmail password
- The App Password should be 16 characters with spaces (Gmail format)
- If it still doesn't work, try generating a new App Password

## Security Note
- Never share your App Password
- The App Password gives access to your Gmail account
- You can revoke App Passwords anytime from your Google Account settings