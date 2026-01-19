package handlers

import (
	"net/http"

	"ignitia-backend/database"
	"ignitia-backend/models"

	"github.com/gin-gonic/gin"
)

// GetAllSponsors retrieves all sponsors sorted by tier and display order
func GetAllSponsors(c *gin.Context) {
	var sponsors []models.Sponsor
	
	// Order by tier priority and then by display order
	result := database.DB.Order(`
		CASE tier 
			WHEN 'title' THEN 0 
			WHEN 'platinum' THEN 1 
			WHEN 'gold' THEN 2 
			WHEN 'silver' THEN 3 
			ELSE 999 
		END, display_order ASC
	`).Find(&sponsors)

	if result.Error != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to fetch sponsors"})
		return
	}

	c.JSON(http.StatusOK, sponsors)
}

// GetSponsor retrieves a single sponsor by ID
func GetSponsor(c *gin.Context) {
	id := c.Param("id")
	var sponsor models.Sponsor

	result := database.DB.First(&sponsor, "id = ?", id)
	if result.Error != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "Sponsor not found"})
		return
	}

	c.JSON(http.StatusOK, sponsor)
}

// CreateSponsor creates a new sponsor
func CreateSponsor(c *gin.Context) {
	var req models.CreateSponsorRequest
	if err := c.ShouldBindJSON(&req); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid sponsor data", "details": err.Error()})
		return
	}

	sponsor := models.Sponsor{
		Name:         req.Name,
		Tier:         req.Tier,
		LogoURL:      req.LogoURL,
		WebsiteURL:   req.WebsiteURL,
		DisplayOrder: req.DisplayOrder,
	}

	result := database.DB.Create(&sponsor)
	if result.Error != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to create sponsor"})
		return
	}

	c.JSON(http.StatusCreated, sponsor)
}

// UpdateSponsor updates an existing sponsor
func UpdateSponsor(c *gin.Context) {
	id := c.Param("id")
	var req models.UpdateSponsorRequest
	
	if err := c.ShouldBindJSON(&req); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid sponsor data", "details": err.Error()})
		return
	}

	var sponsor models.Sponsor
	result := database.DB.First(&sponsor, "id = ?", id)
	if result.Error != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "Sponsor not found"})
		return
	}

	// Update only provided fields
	updates := make(map[string]interface{})
	if req.Name != nil {
		updates["name"] = *req.Name
	}
	if req.Tier != nil {
		updates["tier"] = *req.Tier
	}
	if req.LogoURL != nil {
		updates["logo_url"] = *req.LogoURL
	}
	if req.WebsiteURL != nil {
		updates["website_url"] = *req.WebsiteURL
	}
	if req.DisplayOrder != nil {
		updates["display_order"] = *req.DisplayOrder
	}

	result = database.DB.Model(&sponsor).Updates(updates)
	if result.Error != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to update sponsor"})
		return
	}

	c.JSON(http.StatusOK, sponsor)
}

// DeleteSponsor deletes a sponsor by ID
func DeleteSponsor(c *gin.Context) {
	id := c.Param("id")
	
	result := database.DB.Delete(&models.Sponsor{}, "id = ?", id)
	if result.Error != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to delete sponsor"})
		return
	}

	if result.RowsAffected == 0 {
		c.JSON(http.StatusNotFound, gin.H{"error": "Sponsor not found"})
		return
	}

	c.Status(http.StatusNoContent)
}