# Authentication Guide

This Go backend includes local authentication with email/password and JWT tokens.

## Features

- **Local Authentication**: Email/password registration and login
- **JWT Tokens**: Secure token-based authentication
- **Protected Routes**: Middleware for route protection
- **User Management**: User registration and profile management

## API Endpoints

### Authentication Routes

#### Register
```http
POST /api/auth/register
Content-Type: application/json

{
  "username": "johndoe",
  "email": "john@example.com",
  "password": "password123",
  "name": "John Doe"
}
```

**Response:**
```json
{
  "user": {
    "id": "uuid",
    "username": "johndoe",
    "email": "john@example.com",
    "name": "John Doe",
    "created_at": "2023-12-18T10:00:00Z"
  },
  "token": "jwt-token-here"
}
```

#### Login
```http
POST /api/auth/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "password123"
}
```

**Response:** Same as register

#### Get Profile
```http
GET /api/profile
Authorization: Bearer jwt-token-here
```

**Response:**
```json
{
  "id": "uuid",
  "username": "johndoe",
  "email": "john@example.com",
  "name": "John Doe",
  "created_at": "2023-12-18T10:00:00Z"
}
```

#### Logout
```http
POST /api/auth/logout
Authorization: Bearer jwt-token-here
```

## Frontend Integration

### React Example

```javascript
// Register
const handleRegister = async (userData) => {
  try {
    const response = await fetch('/api/auth/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    });
    
    const data = await response.json();
    
    if (response.ok) {
      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify(data.user));
      // Redirect to dashboard
    } else {
      console.error('Registration failed:', data.error);
    }
  } catch (error) {
    console.error('Registration error:', error);
  }
};

// Login
const handleLogin = async (email, password) => {
  try {
    const response = await fetch('/api/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });
    
    const data = await response.json();
    
    if (response.ok) {
      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify(data.user));
      // Redirect to dashboard
    } else {
      console.error('Login failed:', data.error);
    }
  } catch (error) {
    console.error('Login error:', error);
  }
};

// Make authenticated requests
const makeAuthenticatedRequest = async (url, options = {}) => {
  const token = localStorage.getItem('token');
  
  return fetch(url, {
    ...options,
    headers: {
      ...options.headers,
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  });
};

// Get user profile
const getUserProfile = async () => {
  try {
    const response = await makeAuthenticatedRequest('/api/profile');
    const profile = await response.json();
    
    if (response.ok) {
      return profile;
    } else {
      console.error('Failed to get profile:', profile.error);
    }
  } catch (error) {
    console.error('Profile error:', error);
  }
};
```

## Route Protection

### Public Routes (No Authentication Required)
- `GET /api/health`
- `GET /api/sponsors`
- `GET /api/sponsors/:id`
- `GET /api/teams`
- `GET /api/teams/:id`
- `POST /api/auth/register`
- `POST /api/auth/login`
- `POST /api/auth/logout`

### Protected Routes (Authentication Required)
- `GET /api/profile`
- `GET /api/users/:id`
- `GET /api/users?username=value`
- `POST /api/sponsors`
- `PATCH /api/sponsors/:id`
- `DELETE /api/sponsors/:id`
- `POST /api/teams`
- `PATCH /api/teams/:id`
- `DELETE /api/teams/:id`

## Security Features

### JWT Tokens
- **Expiration**: 24 hours
- **Algorithm**: HS256
- **Claims**: user_id, email, standard JWT claims

### Password Security
- **Note**: Current implementation stores plain text passwords for development
- **Production**: Implement bcrypt password hashing

```go
// Example bcrypt implementation (add to production)
import "golang.org/x/crypto/bcrypt"

func hashPassword(password string) (string, error) {
    bytes, err := bcrypt.GenerateFromPassword([]byte(password), 14)
    return string(bytes), err
}

func checkPasswordHash(password, hash string) bool {
    err := bcrypt.CompareHashAndPassword([]byte(hash), []byte(password))
    return err == nil
}
```

## Database Schema

The User model includes fields for local authentication:

```go
type User struct {
    ID        string    `json:"id"`
    Username  string    `json:"username"`
    Password  string    `json:"password,omitempty"`
    Email     string    `json:"email"`
    Name      string    `json:"name"`
    CreatedAt time.Time `json:"created_at"`
    UpdatedAt time.Time `json:"updated_at"`
}
```

## Error Handling

All authentication endpoints return consistent error responses:

```json
{
  "error": "Error message",
  "details": "Additional error details (optional)"
}
```

Common HTTP status codes:
- `200`: Success
- `201`: Created (registration)
- `400`: Bad Request (invalid data)
- `401`: Unauthorized (invalid credentials/token)
- `403`: Forbidden (insufficient permissions)
- `409`: Conflict (user already exists)
- `500`: Internal Server Error

## Testing Authentication

Use the provided test script to verify authentication endpoints:

```powershell
# Test authentication endpoints
.\test-auth.ps1
```

This will test:
- User registration
- User login
- Profile retrieval
- Protected route access
- Invalid token handling
- Invalid credentials handling