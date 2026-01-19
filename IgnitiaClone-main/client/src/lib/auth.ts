// Authentication API utilities
const API_BASE_URL = 'http://localhost:3001/api';

export interface PersonalInfo {
  name: string;
  email: string;
  contact_number: string;
}

export interface CollegeInfo {
  college: string;
  roll_number?: string;
}

export interface PasswordCreation {
  password: string;
  confirm_password: string;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  contact_number: string;
  college: string;
  roll_number?: string;
  is_email_verified: boolean;
  is_admin: boolean;
  role: string;
  created_at: string;
}

export interface AuthResponse {
  user: User;
  token: string;
  is_admin: boolean;
}

export interface College {
  id: string;
  name: string;
  code: string;
}

export interface SignupSession {
  session_id: string;
  next_step: string;
  message: string;
}

// API Functions
export const authAPI = {
  // Get available colleges
  getColleges: async (): Promise<College[]> => {
    const response = await fetch(`${API_BASE_URL}/colleges`);
    if (!response.ok) throw new Error('Failed to fetch colleges');
    return response.json();
  },

  // Step 1: Submit personal info
  submitPersonalInfo: async (data: PersonalInfo): Promise<SignupSession> => {
    const response = await fetch(`${API_BASE_URL}/auth/signup/personal-info`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || 'Failed to submit personal info');
    }
    return response.json();
  },

  // Step 2: Submit college info
  submitCollegeInfo: async (data: CollegeInfo, sessionId: string): Promise<SignupSession> => {
    const response = await fetch(`${API_BASE_URL}/auth/signup/college-info`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Session-ID': sessionId,
      },
      body: JSON.stringify(data),
    });
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || 'Failed to submit college info');
    }
    return response.json();
  },

  // Step 3: Complete registration
  completeRegistration: async (data: PasswordCreation, sessionId: string): Promise<AuthResponse> => {
    const response = await fetch(`${API_BASE_URL}/auth/signup/complete`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Session-ID': sessionId,
      },
      body: JSON.stringify(data),
    });
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || 'Failed to complete registration');
    }
    return response.json();
  },

  // Login
  login: async (credentials: LoginCredentials): Promise<AuthResponse> => {
    const response = await fetch(`${API_BASE_URL}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(credentials),
    });
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || 'Login failed');
    }
    return response.json();
  },

  // Get user profile
  getProfile: async (token: string): Promise<User> => {
    const response = await fetch(`${API_BASE_URL}/profile`, {
      headers: { 'Authorization': `Bearer ${token}` },
    });
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || 'Failed to get profile');
    }
    return response.json();
  },

  // Logout
  logout: async (token: string): Promise<void> => {
    await fetch(`${API_BASE_URL}/auth/logout`, {
      method: 'POST',
      headers: { 'Authorization': `Bearer ${token}` },
    });
  },
};

// Local storage utilities
export const authStorage = {
  setToken: (token: string) => localStorage.setItem('auth_token', token),
  getToken: () => localStorage.getItem('auth_token'),
  removeToken: () => localStorage.removeItem('auth_token'),
  
  setUser: (user: User) => localStorage.setItem('auth_user', JSON.stringify(user)),
  getUser: (): User | null => {
    const user = localStorage.getItem('auth_user');
    return user ? JSON.parse(user) : null;
  },
  removeUser: () => localStorage.removeItem('auth_user'),
  
  setSessionId: (sessionId: string) => localStorage.setItem('signup_session', sessionId),
  getSessionId: () => localStorage.getItem('signup_session'),
  removeSessionId: () => localStorage.removeItem('signup_session'),
  
  clear: () => {
    localStorage.removeItem('auth_token');
    localStorage.removeItem('auth_user');
    localStorage.removeItem('signup_session');
  },
};