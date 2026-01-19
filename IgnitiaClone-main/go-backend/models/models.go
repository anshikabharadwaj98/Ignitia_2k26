package models

import (
	"time"
	"github.com/google/uuid"
	"github.com/golang-jwt/jwt/v5"
	"gorm.io/gorm"
)

// User represents a user in the system
type User struct {
	ID              string    `json:"id" gorm:"type:uuid;primary_key;default:gen_random_uuid()"`
	Name            string    `json:"name" gorm:"not null"`
	Email           string    `json:"email" gorm:"unique;not null"`
	ContactNumber   string    `json:"contact_number" gorm:"not null"`
	Password        string    `json:"password,omitempty"`
	College         string    `json:"college" gorm:"not null"`
	RollNumber      *string   `json:"roll_number,omitempty"` // Only for PSIT students
	IsEmailVerified bool      `json:"is_email_verified" gorm:"default:false"`
	IsAdmin         bool      `json:"is_admin" gorm:"default:false"`
	Role            string    `json:"role" gorm:"default:'user'"` // 'user', 'admin'
	CreatedAt       time.Time `json:"created_at"`
	UpdatedAt       time.Time `json:"updated_at"`
}

// EmailVerification represents email verification tokens
type EmailVerification struct {
	ID        string    `json:"id" gorm:"type:uuid;primary_key;default:gen_random_uuid()"`
	UserID    string    `json:"user_id" gorm:"not null"`
	Token     string    `json:"token" gorm:"unique;not null"`
	ExpiresAt time.Time `json:"expires_at"`
	CreatedAt time.Time `json:"created_at"`
	User      User      `json:"user" gorm:"foreignKey:UserID"`
}

// College represents available colleges
type College struct {
	ID   string `json:"id" gorm:"type:uuid;primary_key;default:gen_random_uuid()"`
	Name string `json:"name" gorm:"unique;not null"`
	Code string `json:"code" gorm:"unique;not null"`
}

// Admin emails list (you can also store this in database)
var AdminEmails = []string{
	"admin@psit.ac.in",
	"coordinator@psit.ac.in",
	"ignitia@psit.ac.in",
	// Add more admin emails as needed
}

// BeforeCreate will set a UUID rather than numeric ID.
func (u *User) BeforeCreate(tx *gorm.DB) error {
	if u.ID == "" {
		u.ID = uuid.New().String()
	}
	return nil
}

// Sponsor represents a sponsor entity
type Sponsor struct {
	ID           string    `json:"id" gorm:"type:uuid;primary_key;default:gen_random_uuid()"`
	Name         string    `json:"name" gorm:"not null"`
	Tier         string    `json:"tier" gorm:"not null"`
	LogoURL      *string   `json:"logo_url,omitempty"`
	WebsiteURL   *string   `json:"website_url,omitempty"`
	DisplayOrder int       `json:"display_order" gorm:"default:0"`
	CreatedAt    time.Time `json:"created_at"`
	UpdatedAt    time.Time `json:"updated_at"`
}

func (s *Sponsor) BeforeCreate(tx *gorm.DB) error {
	if s.ID == "" {
		s.ID = uuid.New().String()
	}
	return nil
}

// Team represents a team member
type Team struct {
	ID           string    `json:"id" gorm:"type:uuid;primary_key;default:gen_random_uuid()"`
	Name         string    `json:"name" gorm:"not null"`
	Role         string    `json:"role" gorm:"not null"`
	ImageURL     *string   `json:"image_url,omitempty"`
	Bio          *string   `json:"bio,omitempty"`
	SocialLinks  *string   `json:"social_links,omitempty"`
	DisplayOrder int       `json:"display_order" gorm:"default:0"`
	CreatedAt    time.Time `json:"created_at"`
	UpdatedAt    time.Time `json:"updated_at"`
}

func (t *Team) BeforeCreate(tx *gorm.DB) error {
	if t.ID == "" {
		t.ID = uuid.New().String()
	}
	return nil
}

// DTOs for API requests

// Step 1: Personal Info
type PersonalInfoRequest struct {
	Name          string `json:"name" binding:"required"`
	Email         string `json:"email" binding:"required,email"`
	ContactNumber string `json:"contact_number" binding:"required,len=10"`
}

// Step 2: College Info
type CollegeInfoRequest struct {
	College    string  `json:"college" binding:"required"`
	RollNumber *string `json:"roll_number,omitempty"` // Required only for PSIT
}

// Step 3: Email Verification
type EmailVerificationRequest struct {
	Token string `json:"token" binding:"required"`
}

// Step 4: Password Creation
type PasswordCreationRequest struct {
	Password        string `json:"password" binding:"required,min=8"`
	ConfirmPassword string `json:"confirm_password" binding:"required"`
}

// Complete Signup Request (all steps combined)
type CompleteSignupRequest struct {
	PersonalInfoRequest
	CollegeInfoRequest
	PasswordCreationRequest
}

// JWT Claims with admin info
type JWTClaims struct {
	UserID  string `json:"user_id"`
	Email   string `json:"email"`
	IsAdmin bool   `json:"is_admin"`
	Role    string `json:"role"`
	jwt.RegisteredClaims
}

// Auth response with admin info
type AuthResponse struct {
	User    User   `json:"user"`
	Token   string `json:"token"`
	IsAdmin bool   `json:"is_admin"`
}

// Login request
type LoginRequest struct {
	Email    string `json:"email" binding:"required,email"`
	Password string `json:"password" binding:"required"`
}

// Signup session (temporary storage during multi-step signup)
type SignupSession struct {
	ID            string    `json:"id"`
	PersonalInfo  PersonalInfoRequest `json:"personal_info"`
	CollegeInfo   CollegeInfoRequest  `json:"college_info"`
	IsVerified    bool      `json:"is_verified"`
	CreatedAt     time.Time `json:"created_at"`
	ExpiresAt     time.Time `json:"expires_at"`
}

// College response
type CollegeResponse struct {
	ID   string `json:"id"`
	Name string `json:"name"`
	Code string `json:"code"`
}

type CreateSponsorRequest struct {
	Name         string  `json:"name" binding:"required"`
	Tier         string  `json:"tier" binding:"required,oneof=title platinum gold silver"`
	LogoURL      *string `json:"logo_url,omitempty"`
	WebsiteURL   *string `json:"website_url,omitempty"`
	DisplayOrder int     `json:"display_order"`
}

type UpdateSponsorRequest struct {
	Name         *string `json:"name,omitempty"`
	Tier         *string `json:"tier,omitempty"`
	LogoURL      *string `json:"logo_url,omitempty"`
	WebsiteURL   *string `json:"website_url,omitempty"`
	DisplayOrder *int    `json:"display_order,omitempty"`
}

type CreateTeamRequest struct {
	Name         string  `json:"name" binding:"required"`
	Role         string  `json:"role" binding:"required"`
	ImageURL     *string `json:"image_url,omitempty"`
	Bio          *string `json:"bio,omitempty"`
	SocialLinks  *string `json:"social_links,omitempty"`
	DisplayOrder int     `json:"display_order"`
}

type UpdateTeamRequest struct {
	Name         *string `json:"name,omitempty"`
	Role         *string `json:"role,omitempty"`
	ImageURL     *string `json:"image_url,omitempty"`
	Bio          *string `json:"bio,omitempty"`
	SocialLinks  *string `json:"social_links,omitempty"`
	DisplayOrder *int    `json:"display_order,omitempty"`
}

func (e *EmailVerification) BeforeCreate(tx *gorm.DB) error {
	if e.ID == "" {
		e.ID = uuid.New().String()
	}
	return nil
}

func (c *College) BeforeCreate(tx *gorm.DB) error {
	if c.ID == "" {
		c.ID = uuid.New().String()
	}
	return nil
}