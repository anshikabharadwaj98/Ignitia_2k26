# Comprehensive Authentication System Guide

This Go backend implements a sophisticated multi-step authentication system with college verification, email verification, and admin panel access.

## 🚀 Features

### Multi-Step Signup Process
1. **Personal Information**: Name, email, contact number
2. **College Information**: College selection with special handling for PSIT students
3. **Email Verification**: Security verification via email
4. **Password Creation**: Secure password setup
5. **Registration Complete**: Account activation

### Authentication Features
- **Role-Based Access**: User and Admin roles
- **Admin Detection**: Automatic admin role assignment based on email
- **Email Verification**: Mandatory email verification for security
- **JWT Tokens**: Secure token-based authentication
- **Session Management**: Temporary session storage during signup

## 📋 API Endpoints

### Public Endpoints

#### Get Colleges
```http
GET /api/colleges
```
Returns list of available colleges including PSIT and others.

### Multi-Step Signup Process

#### Step 1: Submit Personal Info
```http
POST /api/auth/signup/personal-info
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john.doe@example.com",
  "contact_number": "9876543210"
}
```

**Response:**
```json
{
  "message": "Personal info saved successfully",
  "session_id": "uuid-session-id",
  "next_step": "college_info"
}
```

#### Step 2: Submit College Info
```http
POST /api/auth/signup/college-info
Content-Type: application/json
X-Session-ID: uuid-session-id

{
  "college": "PSIT",
  "roll_number": "1234567890123"
}
```

**Note**: `roll_number` is required only for PSIT students (must be 13 digits).

**Response:**
```json
{
  "message": "College info saved successfully",
  "next_step": "email_verification"
}
```

#### Step 3: Send Email Verification
```http
POST /api/auth/signup/send-verification
X-Session-ID: uuid-session-id
```

**Response:**
```json
{
  "message": "Verification email sent successfully",
  "next_step": "verify_email"
}
```

#### Step 4: Verify Email
```http
POST /api/auth/signup/verify-email
Content-Type: application/json
X-Session-ID: uuid-session-id

{
  "token": "verification-token-from-email"
}
```

**Response:**
```json
{
  "message": "Email verified successfully",
  "next_step": "create_password"
}
```

#### Step 5: Complete Registration
```http
POST /api/auth/signup/complete
Content-Type: application/json
X-Session-ID: uuid-session-id

{
  "password": "securepassword123",
  "confirm_password": "securepassword123"
}
```

**Response:**
```json
{
  "user": {
    "id": "uuid",
    "name": "John Doe",
    "email": "john.doe@example.com",
    "contact_number": "9876543210",
    "college": "PSIT",
    "roll_number": "1234567890123",
    "is_email_verified": true,
    "is_admin": false,
    "role": "user"
  },
  "token": "jwt-token",
  "is_admin": false
}
```

### Login

#### User Login
```http
POST /api/auth/login
Content-Type: application/json

{
  "email": "john.doe@example.com",
  "password": "securepassword123"
}
```

**Response:**
```json
{
  "user": {
    "id": "uuid",
    "name": "John Doe",
    "email": "john.doe@example.com",
    "is_admin": false,
    "role": "user"
  },
  "token": "jwt-token",
  "is_admin": false
}
```

### Protected Routes

#### Get User Profile
```http
GET /api/profile
Authorization: Bearer jwt-token
```

### Admin Routes

#### Admin Dashboard
```http
GET /api/admin/dashboard
Authorization: Bearer admin-jwt-token
```

**Response:**
```json
{
  "message": "Welcome to Admin Dashboard",
  "admin_email": "admin@psit.ac.in",
  "statistics": {
    "total_users": 150,
    "total_sponsors": 14,
    "total_teams": 8
  }
}
```

## 🔐 Admin System

### Admin Email Configuration
Admins are automatically detected based on their email addresses. Configure admin emails in `models/models.go`:

```go
var AdminEmails = []string{
    "admin@psit.ac.in",
    "coordinator@psit.ac.in",
    "ignitia@psit.ac.in",
    // Add more admin emails as needed
}
```

### Admin Features
- **Automatic Role Assignment**: Users with admin emails get admin role
- **Admin Dashboard**: Statistics and management interface
- **Protected Admin Routes**: Only admins can access `/api/admin/*` routes
- **Sponsor Management**: Create, update, delete sponsors
- **Team Management**: Create, update, delete team members

## 🏫 College System

### Supported Colleges
- **PSIT (Pranveer Singh Institute of Technology)**: Requires 13-digit roll number
- **Other Colleges**: IIT, NIT, IIIT, DTU, NSUT, IGDTUW, and "Other College" option

### PSIT Student Validation
- PSIT students must provide a 13-digit roll number
- Roll number validation ensures proper format
- Other college students don't need roll numbers

## 📧 Email Verification System

### Email Configuration
Configure SMTP settings in `.env`:

```env
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USERNAME=your-email@gmail.com
SMTP_PASSWORD=your-app-password
FROM_EMAIL=noreply@ignitia.com
FRONTEND_URL=http://localhost:3000
```

### Email Templates
- **Verification Email**: Contains verification link with token
- **Welcome Email**: Sent after successful registration

### Development Mode
- If SMTP is not configured, emails are logged to console
- Verification tokens are stored in database for testing

## 🔒 Security Features

### JWT Tokens
- **Expiration**: 24 hours
- **Claims**: user_id, email, is_admin, role
- **Algorithm**: HS256

### Session Management
- **Signup Sessions**: 30-minute expiration
- **In-Memory Storage**: For development (use Redis in production)
- **Session Cleanup**: Automatic cleanup after registration

### Password Security
- **Minimum Length**: 8 characters
- **Confirmation**: Password confirmation required
- **Storage**: Plain text in development (implement bcrypt in production)

## 🚀 Frontend Integration

### React Signup Flow Example

```javascript
class SignupFlow extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      step: 1,
      sessionId: null,
      personalInfo: {},
      collegeInfo: {},
      isLoading: false
    };
  }

  // Step 1: Personal Info
  submitPersonalInfo = async (personalData) => {
    try {
      const response = await fetch('/api/auth/signup/personal-info', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(personalData)
      });
      
      const data = await response.json();
      if (response.ok) {
        this.setState({
          sessionId: data.session_id,
          personalInfo: personalData,
          step: 2
        });
      }
    } catch (error) {
      console.error('Personal info submission failed:', error);
    }
  };

  // Step 2: College Info
  submitCollegeInfo = async (collegeData) => {
    try {
      const response = await fetch('/api/auth/signup/college-info', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-Session-ID': this.state.sessionId
        },
        body: JSON.stringify(collegeData)
      });
      
      if (response.ok) {
        this.setState({ collegeInfo: collegeData, step: 3 });
      }
    } catch (error) {
      console.error('College info submission failed:', error);
    }
  };

  // Step 3: Send Verification Email
  sendVerificationEmail = async () => {
    try {
      const response = await fetch('/api/auth/signup/send-verification', {
        method: 'POST',
        headers: { 'X-Session-ID': this.state.sessionId }
      });
      
      if (response.ok) {
        this.setState({ step: 4 });
      }
    } catch (error) {
      console.error('Email verification failed:', error);
    }
  };

  // Step 4: Verify Email Token
  verifyEmail = async (token) => {
    try {
      const response = await fetch('/api/auth/signup/verify-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-Session-ID': this.state.sessionId
        },
        body: JSON.stringify({ token })
      });
      
      if (response.ok) {
        this.setState({ step: 5 });
      }
    } catch (error) {
      console.error('Email verification failed:', error);
    }
  };

  // Step 5: Complete Registration
  completeRegistration = async (passwordData) => {
    try {
      const response = await fetch('/api/auth/signup/complete', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-Session-ID': this.state.sessionId
        },
        body: JSON.stringify(passwordData)
      });
      
      const data = await response.json();
      if (response.ok) {
        localStorage.setItem('token', data.token);
        localStorage.setItem('user', JSON.stringify(data.user));
        // Redirect to dashboard or admin panel
        if (data.is_admin) {
          window.location.href = '/admin';
        } else {
          window.location.href = '/dashboard';
        }
      }
    } catch (error) {
      console.error('Registration completion failed:', error);
    }
  };

  render() {
    // Render appropriate step component based on this.state.step
    switch (this.state.step) {
      case 1: return <PersonalInfoForm onSubmit={this.submitPersonalInfo} />;
      case 2: return <CollegeInfoForm onSubmit={this.submitCollegeInfo} />;
      case 3: return <EmailVerificationSend onSend={this.sendVerificationEmail} />;
      case 4: return <EmailVerificationVerify onVerify={this.verifyEmail} />;
      case 5: return <PasswordCreation onSubmit={this.completeRegistration} />;
      default: return <div>Invalid step</div>;
    }
  }
}
```

## 🧪 Testing

### Run Comprehensive Tests
```powershell
cd go-backend
.\test-comprehensive-auth.ps1
```

### Manual Testing Steps
1. **Test College List**: `GET /api/colleges`
2. **Multi-Step Signup**: Follow all 5 steps with session ID
3. **Admin Login**: Use admin email to test admin features
4. **Regular Login**: Test regular user login
5. **Protected Routes**: Test authentication middleware
6. **Admin Routes**: Test admin-only access

## 🚀 Production Deployment

### Security Enhancements for Production
1. **Password Hashing**: Implement bcrypt
2. **Redis Sessions**: Replace in-memory sessions
3. **Rate Limiting**: Add signup/login rate limits
4. **HTTPS**: Enforce HTTPS in production
5. **Email Templates**: Professional email designs
6. **Database Indexes**: Add indexes for performance

### Environment Variables
```env
# Production settings
GIN_MODE=release
JWT_SECRET=very-secure-production-secret
SMTP_HOST=your-production-smtp
FRONTEND_URL=https://yourdomain.com
```

This comprehensive authentication system provides a secure, user-friendly registration and login experience with proper admin controls and college-specific features for the Ignitia festival website.