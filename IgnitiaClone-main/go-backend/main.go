package main

import (
	"log"
	"os"

	"ignitia-backend/database"
	"ignitia-backend/routes"

	"github.com/gin-gonic/gin"
	"github.com/joho/godotenv"
)

func main() {
	// Load environment variables from .env file if it exists
	if err := godotenv.Load(); err != nil {
		log.Println("No .env file found, using system environment variables")
	}

	// Check if DATABASE_URL is set
	if os.Getenv("DATABASE_URL") == "" {
		log.Println("⚠️  DATABASE_URL not found in environment variables")
		log.Println("Please set up your Supabase database connection in .env file")
		log.Println("See SUPABASE-SETUP-GUIDE.md for instructions")
	}

	log.Println("🚀 Starting Ignitia Backend with Supabase Database")

	// Connect to database
	database.Connect()
	
	// Run migrations
	database.Migrate()
	
	// Seed initial data
	database.SeedData()

	// Set Gin mode based on environment
	if os.Getenv("GIN_MODE") == "release" {
		gin.SetMode(gin.ReleaseMode)
	}

	// Create Gin router
	router := gin.Default()

	// Setup routes
	routes.SetupRoutes(router)

	// Get port from environment variable or use default
	port := os.Getenv("PORT")
	if port == "" {
		port = "3001"
	}

	log.Printf("🌐 Server starting on port %s", port)
	log.Printf("📊 Database: Connected to Supabase")
	log.Printf("🔗 API available at: http://localhost:%s", port)
	log.Printf("📋 Health check: http://localhost:%s/api/health", port)
	
	// Start server
	if err := router.Run(":" + port); err != nil {
		log.Fatal("Failed to start server:", err)
	}
}