import axios from 'axios';

const API_BASE_URL = 'http://127.0.0.1:8000'; // FastAPI backend base URL

// Service to handle login
export const loginUser = async (email: string, password: string, auth_token: string = '') => {
  try {
    const response = await axios.post(`${API_BASE_URL}/login`, {
      email,
      password,
      auth_token,
    });
    return response.data;
  } catch (error) {
    console.error("Login error:", error);
    throw error;
  }
};

// Service to handle logout
export const logoutUser = async (email: string, auth_token: string) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/logout`, {
      email,
      auth_token,
    });
    console.log("Logout response:", response.data);
    return response.data;
  } catch (error) {
    console.error("Logout error:", error);
    throw error;
  }
};

// Service to handle signup
export const signupUser = async (name: string, email: string, password: string, auth_token: string = '') => {
  try {
    const response = await axios.post(`${API_BASE_URL}/signup`, {
      name,
      email,
      password,
      auth_token,
    });
    console.log("Signup response:", response.data);
    return response.data;
  } catch (error) {
    console.error("Signup error:", error);
    throw error;
  }
};
