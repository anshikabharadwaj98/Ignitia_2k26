package routes

import (
	"ignitia-backend/handlers"
	"ignitia-backend/middleware"

	"github.com/gin-gonic/gin"
)

// SetupRoutes configures all API routes
func SetupRoutes(router *gin.Engine) {
	// Add CORS middleware
	router.Use(middleware.CORSMiddleware())
	
	// Add logging middleware
	router.Use(middleware.LoggingMiddleware())

	// API group
	api := router.Group("/api")
	{
		// Health check
		api.GET("/health", handlers.HealthCheck)

		// Public routes
		api.GET("/colleges", handlers.GetColleges)

		// Authentication routes (public)
		auth := api.Group("/auth")
		{
			// Multi-step signup
			auth.POST("/signup/personal-info", handlers.SubmitPersonalInfo)
			auth.POST("/signup/college-info", handlers.SubmitCollegeInfo)
			auth.POST("/signup/send-verification", handlers.SendEmailVerification)
			auth.POST("/signup/verify-email", handlers.VerifyEmail)
			auth.POST("/signup/complete", handlers.CompleteRegistration)
			
			// Login and logout
			auth.POST("/login", handlers.Login)
			auth.POST("/logout", handlers.Logout)
		}

		// Protected routes (require authentication)
		protected := api.Group("/")
		protected.Use(middleware.JWTAuthMiddleware())
		{
			// User profile
			protected.GET("/profile", handlers.GetProfile)

			// Protected user routes
			users := protected.Group("/users")
			{
				users.GET("/:id", handlers.GetUser)
				users.GET("", handlers.GetUserByUsername) // ?email=value
			}
		}

		// Admin routes (require admin authentication)
		admin := api.Group("/admin")
		admin.Use(middleware.AdminAuthMiddleware())
		{
			// Admin dashboard
			admin.GET("/dashboard", handlers.GetAdminDashboard)

			// Admin routes for sponsors
			sponsors := admin.Group("/sponsors")
			{
				sponsors.POST("", handlers.CreateSponsor)
				sponsors.PATCH("/:id", handlers.UpdateSponsor)
				sponsors.DELETE("/:id", handlers.DeleteSponsor)
			}

			// Admin routes for teams
			teams := admin.Group("/teams")
			{
				teams.POST("", handlers.CreateTeam)
				teams.PATCH("/:id", handlers.UpdateTeam)
				teams.DELETE("/:id", handlers.DeleteTeam)
			}
		}

		// Public routes (no authentication required)
		public := api.Group("/")
		public.Use(middleware.OptionalJWTAuthMiddleware())
		{
			// Public sponsor routes
			public.GET("/sponsors", handlers.GetAllSponsors)
			public.GET("/sponsors/:id", handlers.GetSponsor)

			// Public team routes
			public.GET("/teams", handlers.GetAllTeams)
			public.GET("/teams/:id", handlers.GetTeam)

			// Public gallery routes
			public.GET("/gallery", handlers.GetAllGalleryImages)
			public.GET("/gallery/:id", handlers.GetGalleryImage)
			public.GET("/gallery/categories", handlers.GetGalleryCategories)
			public.POST("/gallery/:id/like", handlers.LikeGalleryImage)
		}
	}
}