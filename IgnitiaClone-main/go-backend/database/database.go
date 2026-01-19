package database

import (
	"fmt"
	"log"
	"os"

	"ignitia-backend/models"
	"gorm.io/driver/postgres"
	"gorm.io/gorm"
	"gorm.io/gorm/logger"
)

var DB *gorm.DB

// Connect initializes the database connection
func Connect() {
	var err error
	
	// Get database URL from environment variable or use default
	databaseURL := os.Getenv("DATABASE_URL")
	if databaseURL == "" {
		// Default connection for development
		host := getEnv("DB_HOST", "localhost")
		port := getEnv("DB_PORT", "5432")
		user := getEnv("DB_USER", "postgres")
		password := getEnv("DB_PASSWORD", "password")
		dbname := getEnv("DB_NAME", "ignitia")
		sslmode := getEnv("DB_SSLMODE", "disable")
		
		databaseURL = fmt.Sprintf("host=%s port=%s user=%s password=%s dbname=%s sslmode=%s",
			host, port, user, password, dbname, sslmode)
	}

	log.Println("🔗 Connecting to database...")
	
	DB, err = gorm.Open(postgres.Open(databaseURL), &gorm.Config{
		Logger: logger.Default.LogMode(logger.Info),
	})

	if err != nil {
		log.Printf("❌ Failed to connect to database: %v", err)
		log.Println("🔧 Troubleshooting:")
		log.Println("  1. Check your DATABASE_URL in .env file")
		log.Println("  2. Verify your Supabase project is running")
		log.Println("  3. Check your database password")
		log.Println("  4. Ensure SSL mode is correct (usually 'require' for Supabase)")
		log.Fatal("Database connection failed")
	}

	// Test the connection
	sqlDB, err := DB.DB()
	if err != nil {
		log.Fatal("Failed to get database instance:", err)
	}

	if err := sqlDB.Ping(); err != nil {
		log.Fatal("Failed to ping database:", err)
	}

	log.Println("✅ Database connected successfully")
}

// Migrate runs database migrations
func Migrate() {
	err := DB.AutoMigrate(
		&models.User{},
		&models.EmailVerification{},
		&models.College{},
		&models.Sponsor{},
		&models.Team{},
	)
	if err != nil {
		log.Fatal("Failed to migrate database:", err)
	}
	log.Println("Database migration completed")
}

// SeedData populates the database with initial data
func SeedData() {
	// Seed colleges first
	seedColleges()
	// Seed sponsors
	seedSponsors()
	// Seed teams
	seedTeams()
}

func seedColleges() {
	var count int64
	DB.Model(&models.College{}).Count(&count)
	if count > 0 {
		return // Data already exists
	}

	colleges := []models.College{
		{Name: "Pranveer Singh Institute of Technology (PSIT)", Code: "PSIT"},
		{Name: "Other College", Code: "OTHER"},
		{Name: "Indian Institute of Technology (IIT)", Code: "IIT"},
		{Name: "National Institute of Technology (NIT)", Code: "NIT"},
		{Name: "Indian Institute of Information Technology (IIIT)", Code: "IIIT"},
		{Name: "Delhi Technological University (DTU)", Code: "DTU"},
		{Name: "Netaji Subhas University of Technology (NSUT)", Code: "NSUT"},
		{Name: "Indira Gandhi Delhi Technical University for Women (IGDTUW)", Code: "IGDTUW"},
	}

	for _, college := range colleges {
		DB.Create(&college)
	}
	log.Println("Colleges seeded successfully")
}

func seedSponsors() {
	var count int64
	DB.Model(&models.Sponsor{}).Count(&count)
	if count > 0 {
		return // Data already exists
	}

	sponsors := []models.Sponsor{
		{Name: "Tech Giants Inc.", Tier: "title", DisplayOrder: 1},
		{Name: "Innovation Labs", Tier: "platinum", DisplayOrder: 1},
		{Name: "Digital Solutions", Tier: "platinum", DisplayOrder: 2},
		{Name: "Future Tech", Tier: "platinum", DisplayOrder: 3},
		{Name: "Cloud Systems", Tier: "gold", DisplayOrder: 1},
		{Name: "Smart Corp", Tier: "gold", DisplayOrder: 2},
		{Name: "Tech Vision", Tier: "gold", DisplayOrder: 3},
		{Name: "Code Masters", Tier: "gold", DisplayOrder: 4},
		{Name: "Startup Hub", Tier: "silver", DisplayOrder: 1},
		{Name: "Dev Tools", Tier: "silver", DisplayOrder: 2},
		{Name: "Data Analytics", Tier: "silver", DisplayOrder: 3},
		{Name: "AI Innovations", Tier: "silver", DisplayOrder: 4},
		{Name: "Web Solutions", Tier: "silver", DisplayOrder: 5},
		{Name: "Mobile First", Tier: "silver", DisplayOrder: 6},
	}

	for _, sponsor := range sponsors {
		DB.Create(&sponsor)
	}
	log.Println("Sponsors seeded successfully")
}

func seedTeams() {
	var count int64
	DB.Model(&models.Team{}).Count(&count)
	if count > 0 {
		return // Data already exists
	}

	bio1 := "Professor of Computer Science with 15 years of experience"
	bio2 := "Final year CS student passionate about tech events"
	bio3 := "Leading the technical infrastructure team"
	bio4 := "Creating stunning visuals for Ignitia 2K26"
	bio5 := "Spreading the word about our amazing event"
	bio6 := "Building partnerships with industry leaders"
	bio7 := "Ensuring smooth event operations"
	bio8 := "Crafting compelling stories and content"

	teams := []models.Team{
		{Name: "Dr. Rajesh Kumar", Role: "Faculty Coordinator", Bio: &bio1, DisplayOrder: 1},
		{Name: "Priya Sharma", Role: "Student Coordinator", Bio: &bio2, DisplayOrder: 2},
		{Name: "Arjun Patel", Role: "Technical Lead", Bio: &bio3, DisplayOrder: 3},
		{Name: "Sneha Reddy", Role: "Design Head", Bio: &bio4, DisplayOrder: 4},
		{Name: "Rahul Verma", Role: "Marketing Head", Bio: &bio5, DisplayOrder: 5},
		{Name: "Ananya Singh", Role: "Sponsorship Lead", Bio: &bio6, DisplayOrder: 6},
		{Name: "Vikram Joshi", Role: "Logistics Manager", Bio: &bio7, DisplayOrder: 7},
		{Name: "Meera Kapoor", Role: "Content Writer", Bio: &bio8, DisplayOrder: 8},
	}

	for _, team := range teams {
		DB.Create(&team)
	}
	log.Println("Teams seeded successfully")
}

func getEnv(key, defaultValue string) string {
	if value := os.Getenv(key); value != "" {
		return value
	}
	return defaultValue
}