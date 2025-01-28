// src/app/services/apiService.ts

import axios from 'axios';

const API_BASE_URL = 'http://127.0.0.1:8000'; // FastAPI base URL
// If you prefer environment variables, use process.env.NEXT_PUBLIC_API_BASE_URL, etc.

const AUTH_TOKEN = process.env.NEXT_PUBLIC_AUTH_TOKEN || "2eb3c12348258d673eb1514c92fe20dfe533cc0ad7863520444b5300072a91da";

/**
 * Service to handle login
 * The backend automatically hashes 'password' via Pydantic. 
 * We just send plain-text.
 */
export const loginUser = async (email: string, password: string) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/login`, {
      auth_token: AUTH_TOKEN,  // Must be "auth_token", not "AUTH_TOKEN"
      email,
      password,
    });
    return response.data; // { response, error } 
  } catch (error) {
    console.error("Login error:", error);
    throw error;
  }
};

/**
 * Service to handle signup
 * The backend returns a SignupResponse with stoken, response, error
 */
export const signupUser = async (
  name: string,
  email: string,
  password: string
) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/signup`, {
      auth_token: AUTH_TOKEN,
      name,
      email,
      password,
    });
    return response.data; // { stoken, response, error }
  } catch (error) {
    console.error("Signup error:", error);
    throw error;
  }
};

/**
 * Service to handle logout
 * The backend code checks if user is in 'logged_in_students' set
 * Typically we pass email + auth_token
 */
export const logoutUser = async (email: string) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/logout`, {
      auth_token: AUTH_TOKEN,
      email,
    });
    return response.data; // { response, error }
  } catch (error) {
    console.error("Logout error:", error);
    throw error;
  }
};
