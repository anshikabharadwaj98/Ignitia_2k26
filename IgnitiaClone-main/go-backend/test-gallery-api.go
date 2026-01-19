package main

import (
	"log"
	"os"

	"ignitia-backend/handlers"

	"github.com/gin-gonic/gin"
)

func main() {
	log.Println("🚀 Starting Gallery API Test Server")

	// Set Gin mode
	gin.SetMode(gin.DebugMode)

	// Create Gin router
	router := gin.Default()

	// Add CORS middleware
	router.Use(func(c *gin.Context) {
		c.Header("Access-Control-Allow-Origin", "*")
		c.Header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS")
		c.Header("Access-Control-Allow-Headers", "Content-Type, Authorization")
		
		if c.Request.Method == "OPTIONS" {
			c.AbortWithStatus(204)
			return
		}
		
		c.Next()
	})

	// Serve static files from attached_assets directory
	router.Static("/assets", "../attached_assets")

	// API routes
	api := router.Group("/api")
	{
		// Health check
		api.GET("/health", func(c *gin.Context) {
			c.JSON(200, gin.H{"status": "ok", "message": "Gallery API Test Server is running"})
		})

		// Gallery routes
		api.GET("/gallery", handlers.GetAllGalleryImages)
		api.GET("/gallery/:id", handlers.GetGalleryImage)
		api.GET("/gallery/categories", handlers.GetGalleryCategories)
		api.POST("/gallery/:id/like", handlers.LikeGalleryImage)
	}

	// Get port from environment variable or use default
	port := os.Getenv("PORT")
	if port == "" {
		port = "3001"
	}

	log.Printf("🌐 Gallery API Server starting on port %s", port)
	log.Printf("🔗 API available at: http://localhost:%s", port)
	log.Printf("📋 Health check: http://localhost:%s/api/health", port)
	log.Printf("🖼️  Gallery API: http://localhost:%s/api/gallery", port)
	log.Printf("📁 Static assets: http://localhost:%s/assets/", port)
	
	// Start server
	if err := router.Run(":" + port); err != nil {
		log.Fatal("Failed to start server:", err)
	}
}