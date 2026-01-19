package handlers

import (
	"net/http"
	"strconv"

	"github.com/gin-gonic/gin"
)

// GalleryImage represents a gallery image
type GalleryImage struct {
	ID           int    `json:"id"`
	Src          string `json:"src"`
	Title        string `json:"title"`
	Category     string `json:"category"`
	Date         string `json:"date"`
	Photographer string `json:"photographer"`
	Likes        int    `json:"likes"`
	Description  string `json:"description"`
}

// Mock gallery data - in production, this would come from database
var galleryImages = []GalleryImage{
	{
		ID:           1,
		Src:          "/assets/image_1762513720153.png",
		Title:        "Live Band Performance",
		Category:     "Cultural",
		Date:         "2024-03-15",
		Photographer: "Ignitia Photography Team",
		Likes:        245,
		Description:  "Electrifying live band performance with stunning stage lighting and energetic crowd",
	},
	{
		ID:           2,
		Src:          "/assets/image_1762942833107.png",
		Title:        "Award Ceremony",
		Category:     "Awards",
		Date:         "2024-03-16",
		Photographer: "Ignitia Photography Team",
		Likes:        189,
		Description:  "Recognition ceremony honoring outstanding participants and performers",
	},
	{
		ID:           3,
		Src:          "/assets/image_1762942849683.png",
		Title:        "Dance Performance Duo",
		Category:     "Cultural",
		Date:         "2024-03-14",
		Photographer: "Ignitia Photography Team",
		Likes:        312,
		Description:  "Dynamic dance performance showcasing traditional and contemporary fusion",
	},
	{
		ID:           4,
		Src:          "/assets/image_1762942966096.png",
		Title:        "Acoustic Solo Performance",
		Category:     "Cultural",
		Date:         "2024-03-17",
		Photographer: "Ignitia Photography Team",
		Likes:        156,
		Description:  "Intimate acoustic guitar performance creating a magical atmosphere",
	},
	{
		ID:           5,
		Src:          "/assets/image_1762943836825.png",
		Title:        "Fashion Show Finale",
		Category:     "Cultural",
		Date:         "2024-03-18",
		Photographer: "Ignitia Photography Team",
		Likes:        278,
		Description:  "Grand finale of the fashion show featuring elegant evening wear",
	},
	{
		ID:           6,
		Src:          "/assets/generated_images/Hero_background_techno_festival_ed84d769.png",
		Title:        "Festival Atmosphere",
		Category:     "Cultural",
		Date:         "2024-03-13",
		Photographer: "Ignitia Photography Team",
		Likes:        203,
		Description:  "Capturing the vibrant techno-cultural festival atmosphere",
	},
	{
		ID:           7,
		Src:          "/assets/generated_images/Team_member_female_photo_b0df5488.png",
		Title:        "Team Member Portrait",
		Category:     "Cultural",
		Date:         "2024-03-12",
		Photographer: "Ignitia Photography Team",
		Likes:        134,
		Description:  "Professional portrait of dedicated team member",
	},
	{
		ID:           8,
		Src:          "/assets/generated_images/Team_member_male_photo_b1563a63.png",
		Title:        "Team Member Portrait",
		Category:     "Cultural",
		Date:         "2024-03-11",
		Photographer: "Ignitia Photography Team",
		Likes:        167,
		Description:  "Professional portrait of dedicated team member",
	},
	{
		ID:           9,
		Src:          "/assets/generated_images/Rotating_neon_circle_graphic_146cf3db.png",
		Title:        "Digital Art Installation",
		Category:     "Technical",
		Date:         "2024-03-10",
		Photographer: "Ignitia Photography Team",
		Likes:        198,
		Description:  "Interactive digital art installation with neon graphics and rotating elements",
	},
	{
		ID:           10,
		Src:          "/assets/generated_images/Festival_date_badge_graphic_268e2f27.png",
		Title:        "Festival Branding",
		Category:     "Technical",
		Date:         "2024-03-09",
		Photographer: "Ignitia Photography Team",
		Likes:        145,
		Description:  "Creative festival branding and graphic design showcase",
	},
	{
		ID:           11,
		Src:          "/assets/generated_images/Particle_effect_element_e11156f1.png",
		Title:        "Visual Effects Demo",
		Category:     "Technical",
		Date:         "2024-03-08",
		Photographer: "Ignitia Photography Team",
		Likes:        223,
		Description:  "Demonstration of advanced visual effects and particle systems",
	},
}

// GetAllGalleryImages returns all gallery images
func GetAllGalleryImages(c *gin.Context) {
	// Get query parameters for filtering
	category := c.Query("category")
	search := c.Query("search")
	page := c.DefaultQuery("page", "1")
	limit := c.DefaultQuery("limit", "10")

	// Convert page and limit to integers
	pageInt, err := strconv.Atoi(page)
	if err != nil || pageInt < 1 {
		pageInt = 1
	}

	limitInt, err := strconv.Atoi(limit)
	if err != nil || limitInt < 1 {
		limitInt = 10
	}

	// Filter images
	var filteredImages []GalleryImage
	for _, img := range galleryImages {
		// Category filter
		if category != "" && category != "All" && img.Category != category {
			continue
		}

		// Search filter (title, description, photographer)
		if search != "" {
			searchLower := search
			if !contains(img.Title, searchLower) &&
				!contains(img.Description, searchLower) &&
				!contains(img.Photographer, searchLower) {
				continue
			}
		}

		filteredImages = append(filteredImages, img)
	}

	// Pagination
	start := (pageInt - 1) * limitInt
	end := start + limitInt

	if start >= len(filteredImages) {
		c.JSON(http.StatusOK, gin.H{
			"images":     []GalleryImage{},
			"total":      len(filteredImages),
			"page":       pageInt,
			"limit":      limitInt,
			"totalPages": (len(filteredImages) + limitInt - 1) / limitInt,
		})
		return
	}

	if end > len(filteredImages) {
		end = len(filteredImages)
	}

	paginatedImages := filteredImages[start:end]

	c.JSON(http.StatusOK, gin.H{
		"images":     paginatedImages,
		"total":      len(filteredImages),
		"page":       pageInt,
		"limit":      limitInt,
		"totalPages": (len(filteredImages) + limitInt - 1) / limitInt,
	})
}

// GetGalleryImage returns a single gallery image by ID
func GetGalleryImage(c *gin.Context) {
	idParam := c.Param("id")
	id, err := strconv.Atoi(idParam)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid image ID"})
		return
	}

	for _, img := range galleryImages {
		if img.ID == id {
			c.JSON(http.StatusOK, img)
			return
		}
	}

	c.JSON(http.StatusNotFound, gin.H{"error": "Image not found"})
}

// LikeGalleryImage toggles like for a gallery image
func LikeGalleryImage(c *gin.Context) {
	idParam := c.Param("id")
	id, err := strconv.Atoi(idParam)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid image ID"})
		return
	}

	for i, img := range galleryImages {
		if img.ID == id {
			// In a real app, you'd track user likes in database
			// For now, just increment the like count
			galleryImages[i].Likes++
			c.JSON(http.StatusOK, gin.H{
				"message": "Image liked successfully",
				"likes":   galleryImages[i].Likes,
			})
			return
		}
	}

	c.JSON(http.StatusNotFound, gin.H{"error": "Image not found"})
}

// GetGalleryCategories returns all available categories
func GetGalleryCategories(c *gin.Context) {
	categories := []string{"All", "Cultural", "Technical", "Sports", "Literary", "Awards"}
	c.JSON(http.StatusOK, gin.H{"categories": categories})
}

// Helper function to check if string contains substring (case-insensitive)
func contains(str, substr string) bool {
	return len(str) >= len(substr) && 
		   (str == substr || 
		    (len(str) > len(substr) && 
		     (str[:len(substr)] == substr || 
		      str[len(str)-len(substr):] == substr ||
		      containsSubstring(str, substr))))
}

func containsSubstring(str, substr string) bool {
	for i := 0; i <= len(str)-len(substr); i++ {
		if str[i:i+len(substr)] == substr {
			return true
		}
	}
	return false
}