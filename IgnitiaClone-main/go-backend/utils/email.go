package utils

import (
	"crypto/rand"
	"encoding/hex"
	"fmt"
	"log"
	"net/smtp"
	"os"
)

// EmailConfig holds email configuration
type EmailConfig struct {
	SMTPHost     string
	SMTPPort     string
	SMTPUsername string
	SMTPPassword string
	FromEmail    string
}

// GetEmailConfig returns email configuration from environment variables
func GetEmailConfig() EmailConfig {
	return EmailConfig{
		SMTPHost:     getEnv("SMTP_HOST", "smtp.gmail.com"),
		SMTPPort:     getEnv("SMTP_PORT", "587"),
		SMTPUsername: getEnv("SMTP_USERNAME", ""),
		SMTPPassword: getEnv("SMTP_PASSWORD", ""),
		FromEmail:    getEnv("FROM_EMAIL", "noreply@ignitia.com"),
	}
}

// GenerateVerificationToken generates a random verification token
func GenerateVerificationToken() string {
	bytes := make([]byte, 32)
	if _, err := rand.Read(bytes); err != nil {
		log.Printf("Error generating verification token: %v", err)
		return ""
	}
	return hex.EncodeToString(bytes)
}

// SendVerificationEmail sends an email verification email
func SendVerificationEmail(toEmail, token string) error {
	config := GetEmailConfig()
	
	// Skip email sending in development if SMTP is not configured
	if config.SMTPUsername == "" || config.SMTPPassword == "" {
		log.Printf("SMTP not configured, skipping email to %s with token: %s", toEmail, token)
		return nil
	}

	// Email content
	subject := "Verify your email for Ignitia 2K26"
	verificationURL := fmt.Sprintf("%s/verify-email?token=%s", getEnv("FRONTEND_URL", "http://localhost:3000"), token)
	
	body := fmt.Sprintf(`
<!DOCTYPE html>
<html>
<head>
    <title>Email Verification</title>
</head>
<body>
    <h2>Welcome to Ignitia 2K26!</h2>
    <p>Thank you for registering for Ignitia 2K26. Please verify your email address by clicking the link below:</p>
    <p><a href="%s" style="background-color: #4CAF50; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px;">Verify Email</a></p>
    <p>Or copy and paste this link in your browser:</p>
    <p>%s</p>
    <p>This link will expire in 24 hours.</p>
    <p>If you didn't create an account, please ignore this email.</p>
    <br>
    <p>Best regards,<br>Ignitia 2K26 Team</p>
</body>
</html>
	`, verificationURL, verificationURL)

	// Email message
	message := fmt.Sprintf("To: %s\r\nSubject: %s\r\nContent-Type: text/html; charset=UTF-8\r\n\r\n%s", toEmail, subject, body)

	// SMTP authentication
	auth := smtp.PlainAuth("", config.SMTPUsername, config.SMTPPassword, config.SMTPHost)

	// Send email
	err := smtp.SendMail(
		config.SMTPHost+":"+config.SMTPPort,
		auth,
		config.FromEmail,
		[]string{toEmail},
		[]byte(message),
	)

	if err != nil {
		log.Printf("Error sending email to %s: %v", toEmail, err)
		return err
	}

	log.Printf("Verification email sent to %s", toEmail)
	return nil
}

// SendWelcomeEmail sends a welcome email after successful registration
func SendWelcomeEmail(toEmail, name string) error {
	config := GetEmailConfig()
	
	// Skip email sending in development if SMTP is not configured
	if config.SMTPUsername == "" || config.SMTPPassword == "" {
		log.Printf("SMTP not configured, skipping welcome email to %s", toEmail)
		return nil
	}

	subject := "Welcome to Ignitia 2K26!"
	body := fmt.Sprintf(`
<!DOCTYPE html>
<html>
<head>
    <title>Welcome to Ignitia 2K26</title>
</head>
<body>
    <h2>Welcome to Ignitia 2K26, %s!</h2>
    <p>Your registration has been completed successfully. We're excited to have you join us for this amazing tech festival!</p>
    <p>Stay tuned for updates about events, workshops, and competitions.</p>
    <p>Visit our website: <a href="%s">%s</a></p>
    <br>
    <p>Best regards,<br>Ignitia 2K26 Team</p>
</body>
</html>
	`, name, getEnv("FRONTEND_URL", "http://localhost:3000"), getEnv("FRONTEND_URL", "http://localhost:3000"))

	message := fmt.Sprintf("To: %s\r\nSubject: %s\r\nContent-Type: text/html; charset=UTF-8\r\n\r\n%s", toEmail, subject, body)

	auth := smtp.PlainAuth("", config.SMTPUsername, config.SMTPPassword, config.SMTPHost)

	err := smtp.SendMail(
		config.SMTPHost+":"+config.SMTPPort,
		auth,
		config.FromEmail,
		[]string{toEmail},
		[]byte(message),
	)

	if err != nil {
		log.Printf("Error sending welcome email to %s: %v", toEmail, err)
		return err
	}

	log.Printf("Welcome email sent to %s", toEmail)
	return nil
}

func getEnv(key, defaultValue string) string {
	if value := os.Getenv(key); value != "" {
		return value
	}
	return defaultValue
}