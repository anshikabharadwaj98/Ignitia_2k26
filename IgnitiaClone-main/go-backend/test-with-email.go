package main

import (
	"log"
	"net/http"
	"os"
	"time"

	"ignitia-backend/utils"

	"github.com/gin-gonic/gin"
	"github.com/google/uuid"
	"github.com/joho/godotenv"
)

// Simple in-memory storage for testing
var testSessions = make(map[string]map[string]interface{})
var verificationTokens = make(map[string]string) // token -> email mapping

func main() {
	// Load environment variables from .env file if it exists
	if err := godotenv.Load(); err != nil {
		log.Println("No .env file found, using system environment variables")
	}

	// Set Gin mode based on environment
	if os.Getenv("GIN_MODE") == "release" {
		gin.SetMode(gin.ReleaseMode)
	}

	// Create Gin router
	router := gin.Default()

	// Add CORS middleware
	router.Use(func(c *gin.Context) {
		c.Writer.Header().Set("Access-Control-Allow-Origin", "*")
		c.Writer.Header().Set("Access-Control-Allow-Credentials", "true")
		c.Writer.Header().Set("Access-Control-Allow-Headers", "Content-Type, Content-Length, Accept-Encoding, X-CSRF-Token, Authorization, accept, origin, Cache-Control, X-Requested-With, X-Session-ID")
		c.Writer.Header().Set("Access-Control-Allow-Methods", "POST, OPTIONS, GET, PUT, PATCH, DELETE")

		if c.Request.Method == "OPTIONS" {
			c.AbortWithStatus(204)
			return
		}

		c.Next()
	})

	// Root endpoint - Welcome page
	router.GET("/", func(c *gin.Context) {
		c.JSON(http.StatusOK, gin.H{
			"message": "🚀 Ignitia Go Backend with Real Email Verification",
			"status":  "running",
			"version": "1.0.0",
			"features": gin.H{
				"real_email_verification": "Sends actual verification emails",
				"mock_database":           "Uses in-memory storage for testing",
				"gmail_smtp":              "Configured for Gmail SMTP",
			},
			"endpoints": gin.H{
				"health":              "GET /api/health",
				"colleges":            "GET /api/colleges",
				"signup_step1":        "POST /api/auth/signup/personal-info",
				"signup_step2":        "POST /api/auth/signup/college-info",
				"signup_step3":        "POST /api/auth/signup/send-verification",
				"signup_step4":        "POST /api/auth/signup/verify-email",
				"signup_step5":        "POST /api/auth/signup/complete",
				"login":               "POST /api/auth/login",
			},
			"note": "This server sends real emails but uses mock data for everything else.",
		})
	})

	// Health check endpoint
	router.GET("/api/health", func(c *gin.Context) {
		c.JSON(http.StatusOK, gin.H{
			"status":    "ok",
			"timestamp": time.Now().Format(time.RFC3339),
			"service":   "ignitia-backend-with-email",
			"message":   "Go backend with real email verification is running!",
		})
	})

	// Test endpoint to show available colleges
	router.GET("/api/colleges", func(c *gin.Context) {
		colleges := []gin.H{
			{"id": "1", "name": "Pranveer Singh Institute of Technology (PSIT)", "code": "PSIT"},
			{"id": "2", "name": "Other College", "code": "OTHER"},
			{"id": "3", "name": "Indian Institute of Technology (IIT)", "code": "IIT"},
			{"id": "4", "name": "National Institute of Technology (NIT)", "code": "NIT"},
			{"id": "5", "name": "Indian Institute of Information Technology (IIIT)", "code": "IIIT"},
			{"id": "6", "name": "Delhi Technological University (DTU)", "code": "DTU"},
		}
		c.JSON(http.StatusOK, colleges)
	})

	// Signup endpoints with real email functionality
	auth := router.Group("/api/auth")
	{
		auth.POST("/signup/personal-info", func(c *gin.Context) {
			var personalInfo map[string]interface{}
			if err := c.ShouldBindJSON(&personalInfo); err != nil {
				c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid personal info"})
				return
			}

			sessionID := uuid.New().String()
			testSessions[sessionID] = map[string]interface{}{
				"personal_info": personalInfo,
				"created_at":    time.Now(),
			}

			c.JSON(http.StatusOK, gin.H{
				"message":    "Personal info saved successfully",
				"session_id": sessionID,
				"next_step":  "college_info",
			})
		})

		auth.POST("/signup/college-info", func(c *gin.Context) {
			sessionID := c.GetHeader("X-Session-ID")
			if sessionID == "" {
				c.JSON(http.StatusBadRequest, gin.H{"error": "Session ID required"})
				return
			}

			session, exists := testSessions[sessionID]
			if !exists {
				c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid session"})
				return
			}

			var collegeInfo map[string]interface{}
			if err := c.ShouldBindJSON(&collegeInfo); err != nil {
				c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid college info"})
				return
			}

			// Validate PSIT roll number
			if college, ok := collegeInfo["college"].(string); ok && college == "PSIT" {
				if rollNumber, ok := collegeInfo["roll_number"].(string); !ok || len(rollNumber) != 13 {
					c.JSON(http.StatusBadRequest, gin.H{"error": "PSIT students must provide a 13-digit roll number"})
					return
				}
			}

			session["college_info"] = collegeInfo
			testSessions[sessionID] = session

			c.JSON(http.StatusOK, gin.H{
				"message":   "College info saved successfully",
				"next_step": "email_verification",
			})
		})

		auth.POST("/signup/send-verification", func(c *gin.Context) {
			sessionID := c.GetHeader("X-Session-ID")
			if sessionID == "" {
				c.JSON(http.StatusBadRequest, gin.H{"error": "Session ID required"})
				return
			}

			session, exists := testSessions[sessionID]
			if !exists {
				c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid session"})
				return
			}

			// Get email from personal info
			personalInfo, ok := session["personal_info"].(map[string]interface{})
			if !ok {
				c.JSON(http.StatusBadRequest, gin.H{"error": "Personal info not found"})
				return
			}

			email, ok := personalInfo["email"].(string)
			if !ok {
				c.JSON(http.StatusBadRequest, gin.H{"error": "Email not found"})
				return
			}

			// Generate verification token
			token := utils.GenerateVerificationToken()
			if token == "" {
				c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to generate verification token"})
				return
			}

			// Store token mapping
			verificationTokens[token] = email

			// Send real verification email
			err := utils.SendVerificationEmail(email, token)
			if err != nil {
				log.Printf("Failed to send verification email to %s: %v", email, err)
				c.JSON(http.StatusInternalServerError, gin.H{
					"error": "Failed to send verification email",
					"details": err.Error(),
				})
				return
			}

			log.Printf("✅ Verification email sent to %s with token: %s", email, token[:8]+"...")

			c.JSON(http.StatusOK, gin.H{
				"message":   "Verification email sent successfully to " + email,
				"next_step": "verify_email",
				"note":      "Check your email for the verification code",
			})
		})

		auth.POST("/signup/verify-email", func(c *gin.Context) {
			sessionID := c.GetHeader("X-Session-ID")
			if sessionID == "" {
				c.JSON(http.StatusBadRequest, gin.H{"error": "Session ID required"})
				return
			}

			session, exists := testSessions[sessionID]
			if !exists {
				c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid session"})
				return
			}

			var verifyData map[string]interface{}
			if err := c.ShouldBindJSON(&verifyData); err != nil {
				c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid verification data"})
				return
			}

			token, ok := verifyData["token"].(string)
			if !ok {
				c.JSON(http.StatusBadRequest, gin.H{"error": "Token required"})
				return
			}

			// Verify token
			email, tokenExists := verificationTokens[token]
			if !tokenExists {
				c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid or expired verification token"})
				return
			}

			// Get email from session to double-check
			personalInfo, ok := session["personal_info"].(map[string]interface{})
			if !ok {
				c.JSON(http.StatusBadRequest, gin.H{"error": "Personal info not found"})
				return
			}

			sessionEmail, ok := personalInfo["email"].(string)
			if !ok || sessionEmail != email {
				c.JSON(http.StatusBadRequest, gin.H{"error": "Token does not match session email"})
				return
			}

			// Mark as verified and remove token
			session["is_verified"] = true
			testSessions[sessionID] = session
			delete(verificationTokens, token)

			log.Printf("✅ Email verified successfully for %s", email)

			c.JSON(http.StatusOK, gin.H{
				"message":   "Email verified successfully",
				"next_step": "create_password",
			})
		})

		auth.POST("/signup/complete", func(c *gin.Context) {
			sessionID := c.GetHeader("X-Session-ID")
			if sessionID == "" {
				c.JSON(http.StatusBadRequest, gin.H{"error": "Session ID required"})
				return
			}

			session, exists := testSessions[sessionID]
			if !exists {
				c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid session"})
				return
			}

			isVerified, ok := session["is_verified"].(bool)
			if !ok || !isVerified {
				c.JSON(http.StatusBadRequest, gin.H{"error": "Email not verified"})
				return
			}

			var passwordData map[string]interface{}
			if err := c.ShouldBindJSON(&passwordData); err != nil {
				c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid password data"})
				return
			}

			password, ok1 := passwordData["password"].(string)
			confirmPassword, ok2 := passwordData["confirm_password"].(string)
			if !ok1 || !ok2 || password != confirmPassword {
				c.JSON(http.StatusBadRequest, gin.H{"error": "Passwords do not match"})
				return
			}

			// Get user data from session
			personalInfo := session["personal_info"].(map[string]interface{})
			collegeInfo := session["college_info"].(map[string]interface{})

			email := personalInfo["email"].(string)
			name := personalInfo["name"].(string)

			// Check if admin
			isAdmin := email == "admin@psit.ac.in" || email == "coordinator@psit.ac.in" || email == "ignitia@psit.ac.in"

			// Create mock user response
			user := gin.H{
				"id":                uuid.New().String(),
				"name":              name,
				"email":             email,
				"contact_number":    personalInfo["contact_number"],
				"college":           collegeInfo["college"],
				"roll_number":       collegeInfo["roll_number"],
				"is_email_verified": true,
				"is_admin":          isAdmin,
				"role":              map[bool]string{true: "admin", false: "user"}[isAdmin],
				"created_at":        time.Now().Format(time.RFC3339),
			}

			// Send welcome email
			utils.SendWelcomeEmail(email, name)

			// Clean up session
			delete(testSessions, sessionID)

			log.Printf("✅ Registration completed for %s (admin: %v)", email, isAdmin)

			c.JSON(http.StatusCreated, gin.H{
				"user":     user,
				"token":    "mock-jwt-token-" + uuid.New().String()[:8],
				"is_admin": isAdmin,
				"message":  "Registration completed successfully!",
			})
		})

		auth.POST("/login", func(c *gin.Context) {
			c.JSON(http.StatusOK, gin.H{
				"message": "Login endpoint ready - database connection required for full functionality",
			})
		})
	}

	// Get port from environment variable or use default
	port := os.Getenv("PORT")
	if port == "" {
		port = "3001"
	}

	log.Printf("🚀 Go Backend with Real Email Verification starting on port %s", port)
	log.Printf("📧 Email Configuration:")
	log.Printf("   SMTP Host: %s", os.Getenv("SMTP_HOST"))
	log.Printf("   SMTP Username: %s", os.Getenv("SMTP_USERNAME"))
	log.Printf("   From Email: %s", os.Getenv("FROM_EMAIL"))
	log.Printf("📋 Available endpoints:")
	log.Printf("   GET  /api/health - Health check")
	log.Printf("   GET  /api/colleges - List colleges")
	log.Printf("   POST /api/auth/signup/personal-info - Submit personal info")
	log.Printf("   POST /api/auth/signup/college-info - Submit college info")
	log.Printf("   POST /api/auth/signup/send-verification - Send REAL verification email")
	log.Printf("   POST /api/auth/signup/verify-email - Verify email with token")
	log.Printf("   POST /api/auth/signup/complete - Complete registration")
	log.Printf("   POST /api/auth/login - Login")
	log.Printf("🔧 Note: This server sends real emails but uses mock data for everything else")

	// Start server
	if err := router.Run(":" + port); err != nil {
		log.Fatal("Failed to start server:", err)
	}
}