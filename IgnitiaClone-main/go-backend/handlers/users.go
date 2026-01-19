package handlers

import (
	"net/http"

	"ignitia-backend/database"
	"ignitia-backend/models"

	"github.com/gin-gonic/gin"
)

// GetUser retrieves a user by ID
func GetUser(c *gin.Context) {
	id := c.Param("id")
	var user models.User

	result := database.DB.First(&user, "id = ?", id)
	if result.Error != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "User not found"})
		return
	}

	// Don't return password in response
	user.Password = ""
	c.JSON(http.StatusOK, user)
}

// GetUserByUsername retrieves a user by email (since we removed username)
func GetUserByUsername(c *gin.Context) {
	email := c.Query("email")
	if email == "" {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Email parameter is required"})
		return
	}

	var user models.User
	result := database.DB.First(&user, "email = ?", email)
	if result.Error != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "User not found"})
		return
	}

	// Don't return password in response
	user.Password = ""
	c.JSON(http.StatusOK, user)
}

// CreateUser creates a new user (deprecated - use multi-step signup instead)
func CreateUser(c *gin.Context) {
	c.JSON(http.StatusBadRequest, gin.H{
		"error": "Direct user creation is deprecated. Please use the multi-step signup process.",
		"signup_endpoint": "/api/auth/signup/personal-info",
	})
}

// Health check endpoint
func HealthCheck(c *gin.Context) {
	c.JSON(http.StatusOK, gin.H{
		"status":    "ok",
		"timestamp": gin.H{"time": "now"},
		"service":   "ignitia-backend",
	})
}