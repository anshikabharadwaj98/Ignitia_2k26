package handlers

import (
	"net/http"
    
	"ignitia-backend/database"
	"ignitia-backend/models"

	"github.com/gin-gonic/gin"
)

// GetAllTeams retrieves all team members sorted by display order
func GetAllTeams(c *gin.Context) {
	var teams []models.Team
	
	result := database.DB.Order("display_order ASC").Find(&teams)
	if result.Error != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to fetch teams"})
		return
	}

	c.JSON(http.StatusOK, teams)
}

// GetTeam retrieves a single team member by ID
func GetTeam(c *gin.Context) {
	id := c.Param("id")
	var team models.Team

	result := database.DB.First(&team, "id = ?", id)
	if result.Error != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "Team member not found"})
		return
	}

	c.JSON(http.StatusOK, team)
}

// CreateTeam creates a new team member
func CreateTeam(c *gin.Context) {
	var req models.CreateTeamRequest
	if err := c.ShouldBindJSON(&req); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid team data", "details": err.Error()})
		return
	}

	team := models.Team{
		Name:         req.Name,
		Role:         req.Role,
		ImageURL:     req.ImageURL,
		Bio:          req.Bio,
		SocialLinks:  req.SocialLinks,
		DisplayOrder: req.DisplayOrder,
	}

	result := database.DB.Create(&team)
	if result.Error != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to create team member"})
		return
	}

	c.JSON(http.StatusCreated, team)
}

// UpdateTeam updates an existing team member
func UpdateTeam(c *gin.Context) {
	id := c.Param("id")
	var req models.UpdateTeamRequest
	
	if err := c.ShouldBindJSON(&req); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid team data", "details": err.Error()})
		return
	}

	var team models.Team
	result := database.DB.First(&team, "id = ?", id)
	if result.Error != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "Team member not found"})
		return
	}

	// Update only provided fields
	updates := make(map[string]interface{})
	if req.Name != nil {
		updates["name"] = *req.Name
	}
	if req.Role != nil {
		updates["role"] = *req.Role
	}
	if req.ImageURL != nil {
		updates["image_url"] = *req.ImageURL
	}
	if req.Bio != nil {
		updates["bio"] = *req.Bio
	}
	if req.SocialLinks != nil {
		updates["social_links"] = *req.SocialLinks
	}
	if req.DisplayOrder != nil {
		updates["display_order"] = *req.DisplayOrder
	}

	result = database.DB.Model(&team).Updates(updates)
	if result.Error != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to update team member"})
		return
	}

	c.JSON(http.StatusOK, team)
}

// DeleteTeam deletes a team member by ID
func DeleteTeam(c *gin.Context) {
	id := c.Param("id")
	
	result := database.DB.Delete(&models.Team{}, "id = ?", id)
	if result.Error != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to delete team member"})
		return
	}

	if result.RowsAffected == 0 {
		c.JSON(http.StatusNotFound, gin.H{"error": "Team member not found"})
		return
	}

	c.Status(http.StatusNoContent)
}