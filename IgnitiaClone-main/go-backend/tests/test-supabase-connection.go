package main

import (
	"fmt"
	"log"
	"os"

	"github.com/joho/godotenv"
	"gorm.io/driver/postgres"
	"gorm.io/gorm"
)

func main() {
	fmt.Println("🧪 Testing Supabase Database Connection")
	fmt.Println("=======================================")

	// Load environment variables
	if err := godotenv.Load(); err != nil {
		log.Println("No .env file found, using system environment variables")
	}

	// Get database URL
	databaseURL := os.Getenv("DATABASE_URL")
	if databaseURL == "" {
		fmt.Println("❌ DATABASE_URL not found in environment variables")
		fmt.Println("Please set DATABASE_URL in your .env file")
		fmt.Println("Example: DATABASE_URL=postgresql://postgres:password@db.xxxxx.supabase.co:5432/postgres")
		return
	}

	fmt.Printf("🔗 Connecting to: %s\n", maskPassword(databaseURL))

	// Test connection
	db, err := gorm.Open(postgres.Open(databaseURL), &gorm.Config{})
	if err != nil {
		fmt.Printf("❌ Failed to connect to database: %v\n", err)
		fmt.Println("\n🔧 Troubleshooting:")
		fmt.Println("  1. Check your DATABASE_URL format")
		fmt.Println("  2. Verify your Supabase project is running")
		fmt.Println("  3. Check your database password")
		fmt.Println("  4. Ensure SSL mode is correct (usually 'require' for Supabase)")
		return
	}

	// Test database operations
	sqlDB, err := db.DB()
	if err != nil {
		fmt.Printf("❌ Failed to get database instance: %v\n", err)
		return
	}

	// Ping database
	if err := sqlDB.Ping(); err != nil {
		fmt.Printf("❌ Failed to ping database: %v\n", err)
		return
	}

	fmt.Println("✅ Database connection successful!")

	// Get database info
	var version string
	db.Raw("SELECT version()").Scan(&version)
	fmt.Printf("📊 Database version: %s\n", version[:50]+"...")

	// Check if tables exist
	var tableCount int64
	db.Raw("SELECT COUNT(*) FROM information_schema.tables WHERE table_schema = 'public'").Scan(&tableCount)
	fmt.Printf("📋 Tables in database: %d\n", tableCount)

	// List existing tables
	var tables []string
	db.Raw("SELECT table_name FROM information_schema.tables WHERE table_schema = 'public' ORDER BY table_name").Scan(&tables)
	if len(tables) > 0 {
		fmt.Println("📝 Existing tables:")
		for _, table := range tables {
			fmt.Printf("   - %s\n", table)
		}
	} else {
		fmt.Println("📝 No tables found (this is normal for a new database)")
	}

	fmt.Println("\n🎉 Supabase connection test completed successfully!")
	fmt.Println("You can now run the full backend with: go run main.go")
}

// maskPassword hides the password in the connection string for logging
func maskPassword(url string) string {
	// Simple masking - replace password with ***
	// This is a basic implementation, you might want to use regex for better masking
	if len(url) > 50 {
		return url[:30] + "***[MASKED]***" + url[len(url)-20:]
	}
	return "***[MASKED]***"
}