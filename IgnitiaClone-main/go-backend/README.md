# Ignitia Backend - Go Implementation

A complete Go backend implementation for the Ignitia festival website, providing all the functionalities from the original Node.js/Express backend.

## Features

- **RESTful API** with Gin framework
- **PostgreSQL** database with GORM ORM
- **CRUD operations** for Sponsors, Teams, and Users
- **Authentication System**:
  - Local authentication (email/password)
  - JWT token-based authentication
  - Protected routes with middleware
- **Database migrations** and seeding
- **CORS support** for frontend integration
- **Request logging** middleware
- **Environment-based configuration**

## API Endpoints

### Health Check
- `GET /api/health` - Health check endpoint

### Users
- `GET /api/users/:id` - Get user by ID
- `GET /api/users?username=value` - Get user by username
- `POST /api/users` - Create new user

### Sponsors
- `GET /api/sponsors` - Get all sponsors (sorted by tier and display order)
- `GET /api/sponsors/:id` - Get sponsor by ID
- `POST /api/sponsors` - Create new sponsor
- `PATCH /api/sponsors/:id` - Update sponsor
- `DELETE /api/sponsors/:id` - Delete sponsor

### Teams
- `GET /api/teams` - Get all team members (sorted by display order)
- `GET /api/teams/:id` - Get team member by ID
- `POST /api/teams` - Create new team member
- `PATCH /api/teams/:id` - Update team member
- `DELETE /api/teams/:id` - Delete team member

## Setup Instructions

### Prerequisites
- Go 1.21 or higher
- PostgreSQL database

### Installation

1. **Clone and navigate to the Go backend directory:**
   ```bash
   cd go-backend
   ```

2. **Install dependencies:**
   ```bash
   go mod tidy
   ```

3. **Set up environment variables:**
   ```bash
   cp .env.example .env
   # Edit .env with your database configuration
   ```

4. **Create PostgreSQL database:**
   ```sql
   CREATE DATABASE ignitia;
   ```

5. **Run the application:**
   ```bash
   go run main.go
   ```

The server will start on port 8080 (or the port specified in the PORT environment variable).

### Database Configuration

You can configure the database connection in two ways:

1. **Individual environment variables:**
   ```env
   DB_HOST=localhost
   DB_PORT=5432
   DB_USER=postgres
   DB_PASSWORD=password
   DB_NAME=ignitia
   DB_SSLMODE=disable
   ```

2. **Single DATABASE_URL:**
   ```env
   DATABASE_URL=postgres://username:password@localhost:5432/ignitia?sslmode=disable
   ```

### Development vs Production

- **Development:** Set `GIN_MODE=debug` (default)
- **Production:** Set `GIN_MODE=release`

## Project Structure

```
go-backend/
├── main.go              # Application entry point
├── models/              # Data models and DTOs
│   └── models.go
├── database/            # Database connection and migrations
│   └── database.go
├── handlers/            # HTTP request handlers
│   ├── users.go
│   ├── sponsors.go
│   └── teams.go
├── routes/              # Route definitions
│   └── routes.go
├── middleware/          # HTTP middleware
│   └── middleware.go
├── go.mod              # Go module definition
├── .env.example        # Environment variables template
└── README.md           # This file
```

## Data Models

### Sponsor Tiers
- `title` - Title sponsor (highest tier)
- `platinum` - Platinum sponsors
- `gold` - Gold sponsors  
- `silver` - Silver sponsors (lowest tier)

### Sample API Requests

**Create Sponsor:**
```json
POST /api/sponsors
{
  "name": "Tech Company",
  "tier": "gold",
  "logo_url": "https://example.com/logo.png",
  "website_url": "https://example.com",
  "display_order": 1
}
```

**Create Team Member:**
```json
POST /api/teams
{
  "name": "John Doe",
  "role": "Technical Lead",
  "image_url": "https://example.com/photo.jpg",
  "bio": "Experienced developer leading the tech team",
  "social_links": "https://linkedin.com/in/johndoe",
  "display_order": 1
}
```

## Migration from Node.js Backend

This Go backend provides 100% API compatibility with the original Node.js/Express backend:

- Same endpoint URLs and HTTP methods
- Same request/response formats
- Same data validation rules
- Same error handling patterns
- Same database schema

You can switch between the backends without any frontend changes.

## Building for Production

```bash
# Build binary
go build -o ignitia-backend main.go

# Run binary
./ignitia-backend
```

## Docker Support

Create a `Dockerfile`:
```dockerfile
FROM golang:1.21-alpine AS builder
WORKDIR /app
COPY go.mod go.sum ./
RUN go mod download
COPY . .
RUN go build -o main .

FROM alpine:latest
RUN apk --no-cache add ca-certificates
WORKDIR /root/
COPY --from=builder /app/main .
CMD ["./main"]
```