package main

import (
	"log"
	"net/http"
	"os"

	"github.com/gin-gonic/gin"
)

func main() {
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
			"message": "🚀 Ignitia Go Backend Test Server",
			"status":  "running",
			"version": "1.0.0",
			"endpoints": gin.H{
				"health":              "GET /api/health",
				"colleges":            "GET /api/colleges",
				"signup_step1":        "POST /api/auth/signup/personal-info",
				"signup_step2":        "POST /api/auth/signup/college-info",
				"signup_step3":        "POST /api/auth/signup/complete",
				"login":               "POST /api/auth/login",
			},
			"note": "This is a test server. Database connection required for full functionality.",
		})
	})

	// Health check endpoint
	router.GET("/api/health", func(c *gin.Context) {
		c.JSON(http.StatusOK, gin.H{
			"status":    "ok",
			"timestamp": "now",
			"service":   "ignitia-backend",
			"message":   "Go backend is running successfully!",
			"features": gin.H{
				"authentication": "Multi-step signup with email verification",
				"admin_panel":    "Role-based admin access",
				"college_system": "PSIT integration with roll number validation",
				"security":       "JWT tokens with 24-hour expiry",
			},
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

	// Test signup endpoints (mock responses)
	auth := router.Group("/api/auth")
	{
		auth.POST("/signup/personal-info", func(c *gin.Context) {
			c.JSON(http.StatusOK, gin.H{
				"message":    "Personal info saved successfully",
				"session_id": "test-session-123",
				"next_step":  "college_info",
				"note":       "This is a test response - database not connected",
			})
		})

		auth.POST("/signup/college-info", func(c *gin.Context) {
			c.JSON(http.StatusOK, gin.H{
				"message":   "College info saved successfully",
				"next_step": "create_password",
				"note":      "This is a test response - database not connected",
			})
		})

		auth.POST("/signup/complete", func(c *gin.Context) {
			c.JSON(http.StatusCreated, gin.H{
				"user": gin.H{
					"id":                "test-user-123",
					"name":              "Test User",
					"email":             "test@example.com",
					"contact_number":    "1234567890",
					"college":           "PSIT",
					"roll_number":       "1234567890123",
					"is_email_verified": true,
					"is_admin":          false,
					"role":              "user",
					"created_at":        "2024-01-01T00:00:00Z",
				},
				"token":    "test-jwt-token-123",
				"is_admin": false,
				"note":     "This is a test response - database not connected",
			})
		})

		auth.POST("/login", func(c *gin.Context) {
			c.JSON(http.StatusOK, gin.H{
				"message": "Login endpoint ready",
				"note":    "Database connection required for full functionality",
			})
		})
	}

	// Get port from environment variable or use default
	port := os.Getenv("PORT")
	if port == "" {
		port = "8080"
	}

	log.Printf("🚀 Go Backend Test Server starting on port %s", port)
	log.Printf("📋 Available endpoints:")
	log.Printf("   GET  /api/health - Health check")
	log.Printf("   GET  /api/colleges - List colleges")
	log.Printf("   POST /api/auth/signup/personal-info - Test signup step 1")
	log.Printf("   POST /api/auth/signup/college-info - Test signup step 2")
	log.Printf("   POST /api/auth/signup/complete - Test signup step 3")
	log.Printf("   POST /api/auth/login - Test login")
	log.Printf("🔧 Note: Database connection required for full authentication system")

	// Start server
	if err := router.Run(":" + port); err != nil {
		log.Fatal("Failed to start server:", err)
	}
}