"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { loginUser } from "../services/apiService";

// Generate a pseudo-token (we're not receiving a real token from the backend)
function generateClientToken() {
  return Math.random().toString(36).substring(2) + Date.now().toString(36);
}

/**
 * After login, we store user data in localStorage.
 * 'expiry' is 7 days in ms
 */
function storeLoginData(email: string, role: string, stoken: string) {
  const token = generateClientToken();
  const expiry = Date.now() + 7 * 24 * 60 * 60 * 1000; // 7 days
  const userData = { email, role, token, expiry, stoken };
  localStorage.setItem("userData", JSON.stringify(userData));
}

export default function LoginPage() {
  const [role, setRole] = useState("student");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleLogin = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!email || !password) {
      alert("Please fill in all fields.");
      return;
    }

    try {
      const response = await loginUser(email, password);
      // response = { response: string|null, error: string|null, stoken: string|null }
      if (response.error === null) {
        alert("Login successful!");
        // store stoken in local storage
        storeLoginData(email, role, response.stoken || "");
        router.push(`/dashboard`);
      } else {
        alert("Login failed: " + response.error);
      }
    } catch (error) {
      console.error("Login error:", error);
      alert("Something went wrong. Please try again.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6 relative">
      {/* Background Icons */}
      <div className="absolute inset-0 bg-[url('/icons/hexagon.svg')] bg-repeat opacity-10"></div>
      <div className="absolute inset-0 bg-[url('/icons/poset.svg')] bg-repeat opacity-10"></div>
      <div className="absolute inset-0 bg-[url('/icons/function.svg')] bg-repeat opacity-10"></div>

      {/* Decorative Mathematical Symbols */}
      <div className="absolute top-5 left-10 text-black text-4xl font-bold transform rotate-[-20deg]">
        x ∉ A
      </div>
      <div className="absolute top-10 right-20 text-black text-3xl font-bold">
        f(x)
      </div>
      <div className="absolute top-20 left-20 text-black text-2xl font-bold">
        ∅ ⊆ A
      </div>
      <div className="absolute top-1/4 right-1/4 text-black text-4xl font-bold transform rotate-[15deg]">
        ∑
      </div>

      {/* Additional Hexagons */}
      <div className="absolute top-1/3 left-1/4 transform rotate-[-30deg] text-black text-3xl font-bold">
        {/* Hexagonal Shape */}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 100 100"
          className="w-32 h-32"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          <polygon points="50,10 90,25 90,75 50,90 10,75 10,25" fill="transparent" stroke="currentColor" />
        </svg>
      </div>

      {/* 3D Cube */}
      <div className="absolute bottom-24 right-12 transform rotate-[45deg] text-black text-4xl font-bold">
        {/* Cube Shape */}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 100 100"
          className="w-32 h-32"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          <path
            d="M20,30 L80,30 L80,70 L20,70 L20,30 M30,40 L90,40 L90,80 L30,80 L30,40"
            stroke="currentColor"
          />
          <path
            d="M30,40 L50,30 L50,70 L30,80 M50,30 L90,30 L90,70 L50,70"
            stroke="currentColor"
          />
        </svg>
      </div>

      <div className="absolute bottom-16 left-20 z-0">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-40 h-40 text-black"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth="1.5"
        >
          <circle cx="6" cy="6" r="1.5" fill="currentColor" />
          <circle cx="18" cy="6" r="1.5" fill="currentColor" />
          <circle cx="6" cy="18" r="1.5" fill="currentColor" />
          <circle cx="18" cy="18" r="1.5" fill="currentColor" />
          <path d="M6 6L18 18M6 18L18 6" />
        </svg>
      </div>

      <div className="w-full max-w-md bg-[#f7f2d8] rounded-lg shadow-lg p-8 space-y-6 relative z-10">
        {/* Tabs for Role Selection */}
        <div className="flex justify-between mb-4">
          {["admin", "professor", "student"].map((r) => (
            <button
              key={r}
              onClick={() => setRole(r)}
              className={`w-1/3 py-2 text-center text-lg font-bold ${
                role === r
                  ? "bg-[#a65c1c] text-white border-2 border-white font-['Jersey_10']"
                  : "bg-transparent text-[#a65c1c] font-['Jersey_10'] border-2 border-white"
              } transition-all duration-300`}
            >
              {r.charAt(0).toUpperCase() + r.slice(1)}
            </button>
          ))}
        </div>

        <h1
          className="text-center text-[#a65c1c] text-4xl jersey-10-regular font-bold drop-shadow-md"
          
        >
          Discrete Mathematical Structures
        </h1>

        {/* Form */}
        <form onSubmit={handleLogin} className="space-y-4">
          {/* Email */}
          <div>
            <input
              type="email"
              id="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-4 py-2 mt-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-[#8e4e18] bg-gray-200 font-['Jersey_10'] text-gray-600 font-bold"
            />
          </div>

          {/* Password */}
          <div>
            <input
              type="password"
              id="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-4 py-2 mt-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-[#8e4e18] bg-gray-200 font-['Jersey_10'] text-gray-600 font-bold"
            />
          </div>

          {/* Login Button */}
          <button
            type="submit"
            className="w-full py-2 bg-[#a65c1c] text-white rounded-lg shadow-md hover:bg-[#8e4e18] focus:outline-none focus:ring-2 focus:ring-[#8e4e18] font-['Jersey_10'] font-bold transition-all duration-300"
          >
            Login
          </button>
        </form>

        {/* Divider and Create Account Link */}
        <div className="flex items-center justify-between my-4">
          <span className="w-1/3 border-b border-[#8e4e18]"></span>
          <span className="text-[#8e4e18] text-sm font-['Jersey_10'] font-bold">OR</span>
          <span className="w-1/3 border-b border-[#8e4e18]"></span>
        </div>

        {/* Create Account Button */}
        <div className="flex justify-center">
          <button
            className="py-2 px-6 bg-[#a65c1c] text-white rounded-lg font-['Jersey_10'] font-bold transition-all duration-300 hover:bg-[#8e4e18]"
            onClick={() => router.push("/signup")}
          >
            Create Account
          </button>
        </div>
      </div>
    </div>
  );
};
