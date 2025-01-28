// src/app/services/apiService.ts

import axios from 'axios';

const API_BASE_URL = 'http://127.0.0.1:8000'; // FastAPI base URL
// If you prefer environment variables, use process.env.NEXT_PUBLIC_API_BASE_URL, etc.

const AUTH_TOKEN = process.env.AUTH_TOKEN || "2eb3c12348258d673eb1514c92fe20dfe533cc0ad7863520444b5300072a91da";

/** 
 * Attempt to log in. 
 * Returns { response, error, stoken } on success.
 */
export const loginUser = async (email: string, password: string) => {
  try {
    const resp = await axios.post(`${API_BASE_URL}/login`, {
      auth_token: AUTH_TOKEN,
      email,
      password,
    });
    return resp.data; 
  } catch (error) {
    console.error("Login error:", error);
    throw error;
  }
};

/** 
 * Signup user. 
 * Returns { response, error, stoken } 
 */
export const signupUser = async (name: string, email: string, password: string) => {
  try {
    const resp = await axios.post(`${API_BASE_URL}/signup`, {
      auth_token: AUTH_TOKEN,
      name,
      email,
      password,
    });
    return resp.data;
  } catch (error) {
    console.error("Signup error:", error);
    throw error;
  }
};

/** 
 * Logout user (optional). 
 */
export const logoutUser = async (email: string) => {
  try {
    const resp = await axios.post(`${API_BASE_URL}/logout`, {
      auth_token: AUTH_TOKEN,
      email,
    });
    return resp.data;
  } catch (error) {
    console.error("Logout error:", error);
    throw error;
  }
};

/** 
 * Log a game attempt to the backend. 
 * stoken: the student's token
 * gid: the game ID (1=Permutation,2=Lattices,3=Posets,...)
 * gotCorrect: boolean indicating if user “passed” or “got it correct”
 */
export const gameAttempt = async (stoken: string, gid: number, gotCorrect: boolean) => {
  try {
    const resp = await axios.post(`${API_BASE_URL}/game-attempt`, {
      stoken,
      gid,
      got_correct: gotCorrect,
    });
    return resp.data; // { message: "..."}
  } catch (error) {
    console.error("Game attempt error:", error);
    throw error;
  }
};

/** 
 * Fetch metrics from the backend for the given stoken. 
 */
export const getMetrics = async (stoken: string) => {
  try {
    const resp = await axios.get(`${API_BASE_URL}/metrics/${stoken}`);
    console.log("Metrics response:", resp.data);
    return resp.data; 
    // shape: { stoken, total_games_attempted, total_games_correct, total_points_earned, success_rate, last_active }
  } catch (error) {
    console.error("Metrics fetch error:", error);
    throw error;
  }
};

