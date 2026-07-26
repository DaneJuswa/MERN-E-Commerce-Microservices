import axios from "axios";
import type { LoginCredentials, AuthResponse, RegisterData, User } from "../types/authTypes";

const authAPI = axios.create({
  baseURL: "http://localhost:4000/api/auth",
  withCredentials: true,
});


export const login = (credentials: LoginCredentials) =>{
    console.log(credentials)  
    authAPI.post<AuthResponse>("/login", credentials);
  }


export const register = async (userData: RegisterData): Promise<AuthResponse> => {
  const { data } = await authAPI.post<AuthResponse>("/register", userData);
  
  return data;
};

export const logout = () =>
  authAPI.post("/logout");

export const getCurrentUser = () =>
  authAPI.get<User>("/me");