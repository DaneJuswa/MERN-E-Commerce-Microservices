export interface User {
  _id: string;
  name: string;
  email: string;
  provider: "local" | "google" | "facebook";
  verified: boolean;
  createdAt?: string;
  updatedAt?: string;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterData {
  name: string;
  email: string;
  password: string;
}

export interface AuthResponse {
  message: string;
  user: User;
}