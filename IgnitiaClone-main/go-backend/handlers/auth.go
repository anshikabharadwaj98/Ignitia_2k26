package handlers

import (
	"net/http"
	"strings"
	"time"

	"ignitia-backend/database"
	"ignitia-backend/models"
	"ignitia-backend/utils"

	"github.com/gin-gonic/gin"
	"github.com/google/uuid"
)

// In-memory storage for signup sessions (in production, use Redis or database)
var signupSessions = make(map[string]*models.SignupSession)

// Helper function to check if email is admin
func isAdminEmail(email string) bool {
	email = strings.ToLower(email)
	for _, adminEmail := range models.AdminEmails {
		if strings.ToLower(adminEmail) == email {
			return true
		}
	}
	return false
}

// Step 1: Submit Personal Info
func SubmitPersonalInfo(c *gin.Context) {
	var req models.PersonalInfoRequest
	if err := c.ShouldBindJSON(&req); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid personal info", "details": err.Error()})
		return
	}

	// Check if user already exists
	var existingUser models.User
	result := database.DB.First(&existingUser, "email = ?", req.Email)
	if result.Error == nil {
		c.JSON(http.StatusConflict, gin.H{"error": "User with this email already exists"})
		return
	}

	// Create signup session
	sessionID := uuid.New().String()
	session := &models.SignupSession{
		ID:           sessionID,
		PersonalInfo: req,
		CreatedAt:    time.Now(),
		ExpiresAt:    time.Now().Add(30 * time.Minute), // 30 minutes to complete signup
	}

	signupSessions[sessionID] = session

	c.JSON(http.StatusOK, gin.H{
		"message":    "Personal info saved successfully",
		"session_id": sessionID,
		"next_step":  "college_info",
	})
}

// Step 2: Submit College Info
func SubmitCollegeInfo(c *gin.Context) {
	sessionID := c.GetHeader("X-Session-ID")
	if sessionID == "" {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Session ID required in X-Session-ID header"})
		return
	}

	session, exists := signupSessions[sessionID]
	if !exists || time.Now().After(session.ExpiresAt) {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid or expired session"})
		return
	}

	var req models.CollegeInfoRequest
	if err := c.ShouldBindJSON(&req); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid college info", "details": err.Error()})
		return
	}

	// Validate roll number for PSIT students
	if req.College == "PSIT" {
		if req.RollNumber == nil || len(*req.RollNumber) != 13 {
			c.JSON(http.StatusBadRequest, gin.H{"error": "PSIT students must provide a 13-digit roll number"})
			return
		}
	}

	// Update session with college info
	session.CollegeInfo = req
	signupSessions[sessionID] = session

	c.JSON(http.StatusOK, gin.H{
		"message":   "College info saved successfully",
		"next_step": "create_password",
	})
}

// Step 3: Send Email Verification
func SendEmailVerification(c *gin.Context) {
	sessionID := c.GetHeader("X-Session-ID")
	if sessionID == "" {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Session ID required in X-Session-ID header"})
		return
	}

	session, exists := signupSessions[sessionID]
	if !exists || time.Now().After(session.ExpiresAt) {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid or expired session"})
		return
	}

	// Generate verification token
	token := utils.GenerateVerificationToken()
	if token == "" {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to generate verification token"})
		return
	}

	// Create email verification record
	verification := models.EmailVerification{
		UserID:    sessionID, // Using session ID temporarily
		Token:     token,
		ExpiresAt: time.Now().Add(24 * time.Hour), // 24 hours to verify
	}

	result := database.DB.Create(&verification)
	if result.Error != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to create verification record"})
		return
	}

	// Send verification email
	err := utils.SendVerificationEmail(session.PersonalInfo.Email, token)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to send verification email"})
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"message":   "Verification email sent successfully",
		"next_step": "verify_email",
	})
}

// Step 4: Verify Email
func VerifyEmail(c *gin.Context) {
	sessionID := c.GetHeader("X-Session-ID")
	if sessionID == "" {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Session ID required in X-Session-ID header"})
		return
	}

	session, exists := signupSessions[sessionID]
	if !exists || time.Now().After(session.ExpiresAt) {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid or expired session"})
		return
	}

	var req models.EmailVerificationRequest
	if err := c.ShouldBindJSON(&req); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid verification data", "details": err.Error()})
		return
	}

	// Verify token
	var verification models.EmailVerification
	result := database.DB.First(&verification, "token = ? AND user_id = ? AND expires_at > ?", req.Token, sessionID, time.Now())
	if result.Error != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid or expired verification token"})
		return
	}

	// Mark session as verified
	session.IsVerified = true
	signupSessions[sessionID] = session

	// Delete verification record
	database.DB.Delete(&verification)

	c.JSON(http.StatusOK, gin.H{
		"message":   "Email verified successfully",
		"next_step": "create_password",
	})
}

// Step 5: Create Password and Complete Registration
func CompleteRegistration(c *gin.Context) {
	sessionID := c.GetHeader("X-Session-ID")
	if sessionID == "" {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Session ID required in X-Session-ID header"})
		return
	}

	session, exists := signupSessions[sessionID]
	if !exists || time.Now().After(session.ExpiresAt) {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid or expired session"})
		return
	}

	// Skip email verification check since we removed email verification
	// if !session.IsVerified {
	// 	c.JSON(http.StatusBadRequest, gin.H{"error": "Email not verified"})
	// 	return
	// }

	var req models.PasswordCreationRequest
	if err := c.ShouldBindJSON(&req); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid password data", "details": err.Error()})
		return
	}

	// Validate password confirmation
	if req.Password != req.ConfirmPassword {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Passwords do not match"})
		return
	}

	// Check if user is admin
	isAdmin := isAdminEmail(session.PersonalInfo.Email)
	role := "user"
	if isAdmin {
		role = "admin"
	}

	// Create user
	user := models.User{
		Name:            session.PersonalInfo.Name,
		Email:           session.PersonalInfo.Email,
		ContactNumber:   session.PersonalInfo.ContactNumber,
		Password:        req.Password, // In production, hash this with bcrypt
		College:         session.CollegeInfo.College,
		RollNumber:      session.CollegeInfo.RollNumber,
		IsEmailVerified: true,
		IsAdmin:         isAdmin,
		Role:            role,
	}

	result := database.DB.Create(&user)
	if result.Error != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to create user"})
		return
	}

	// Generate JWT token
	jwtToken, err := utils.GenerateJWT(user.ID, user.Email, user.IsAdmin, user.Role)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to generate token"})
		return
	}

	// Send welcome email
	utils.SendWelcomeEmail(user.Email, user.Name)

	// Clean up session
	delete(signupSessions, sessionID)

	// Return user and token (don't return password)
	user.Password = ""
	c.JSON(http.StatusCreated, models.AuthResponse{
		User:    user,
		Token:   jwtToken,
		IsAdmin: user.IsAdmin,
	})
}

// Login handles user login
func Login(c *gin.Context) {
	var req models.LoginRequest
	if err := c.ShouldBindJSON(&req); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid login data", "details": err.Error()})
		return
	}

	// Find user by email
	var user models.User
	result := database.DB.First(&user, "email = ?", req.Email)
	if result.Error != nil {
		c.JSON(http.StatusUnauthorized, gin.H{"error": "Invalid email or password"})
		return
	}

	// Check if email is verified
	if !user.IsEmailVerified {
		c.JSON(http.StatusUnauthorized, gin.H{"error": "Please verify your email before logging in"})
		return
	}

	// Verify password (in production, use bcrypt.CompareHashAndPassword)
	if user.Password != req.Password {
		c.JSON(http.StatusUnauthorized, gin.H{"error": "Invalid email or password"})
		return
	}

	// Generate JWT token
	jwtToken, err := utils.GenerateJWT(user.ID, user.Email, user.IsAdmin, user.Role)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to generate token"})
		return
	}

	// Return user and token (don't return password)
	user.Password = ""
	c.JSON(http.StatusOK, models.AuthResponse{
		User:    user,
		Token:   jwtToken,
		IsAdmin: user.IsAdmin,
	})
}

// GetProfile returns the current user's profile
func GetProfile(c *gin.Context) {
	userID, exists := c.Get("user_id")
	if !exists {
		c.JSON(http.StatusUnauthorized, gin.H{"error": "Unauthorized"})
		return
	}

	var user models.User
	result := database.DB.First(&user, "id = ?", userID)
	if result.Error != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "User not found"})
		return
	}

	// Don't return password
	user.Password = ""
	c.JSON(http.StatusOK, user)
}

// GetColleges returns list of available colleges
func GetColleges(c *gin.Context) {
	var colleges []models.College
	result := database.DB.Find(&colleges)
	if result.Error != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to fetch colleges"})
		return
	}

	// Convert to response format
	var response []models.CollegeResponse
	for _, college := range colleges {
		response = append(response, models.CollegeResponse{
			ID:   college.ID,
			Name: college.Name,
			Code: college.Code,
		})
	}

	c.JSON(http.StatusOK, response)
}

// Admin Panel Access
func GetAdminDashboard(c *gin.Context) {
	// This endpoint is protected by AdminAuthMiddleware
	userEmail, _ := c.Get("user_email")
	
	// Get dashboard statistics
	var userCount, sponsorCount, teamCount int64
	database.DB.Model(&models.User{}).Count(&userCount)
	database.DB.Model(&models.Sponsor{}).Count(&sponsorCount)
	database.DB.Model(&models.Team{}).Count(&teamCount)

	c.JSON(http.StatusOK, gin.H{
		"message": "Welcome to Admin Dashboard",
		"admin_email": userEmail,
		"statistics": gin.H{
			"total_users":    userCount,
			"total_sponsors": sponsorCount,
			"total_teams":    teamCount,
		},
	})
}

// Logout handles user logout
func Logout(c *gin.Context) {
	c.JSON(http.StatusOK, gin.H{"message": "Logged out successfully"})
}