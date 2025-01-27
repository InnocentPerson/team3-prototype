"use client"; // Mark the file as a client component

import { useState } from "react";
import { useRouter } from "next/navigation"; // This works now in client component
import { loginUser } from "../services/apiService"; // Using the service function

const LoginPage = () => {
  const [role, setRole] = useState("student"); // Default role is student
  const [email, setEmail] = useState(""); // Changed from username to email
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleLogin = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (email && password && role) {
      try {
        const response = await loginUser(email, password, ""); // Passing email, password, and empty auth_token

        if (response.token) {
          alert("Login successful");
          // Store the JWT token in localStorage or state
          localStorage.setItem("token", response.token);
          router.push(`/${role}`);  // Redirect based on role (e.g., admin, student, etc.)
        } else {
          alert("Login failed: " + (response.message || "Unknown error"));
        }
      } catch (error) {
        console.error("Login error:", error);
        alert("Something went wrong. Please try again.");
      }
    } else {
      alert("Please fill in all fields.");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-t from-green-950 to-yellow-100 flex items-center justify-center p-6 relative">
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

      <div className="w-full max-w-md bg-[#F5F5DC] rounded-lg shadow-lg p-8 space-y-6 relative z-10">
        {/* Tabs for Role Selection */}
        <div className="flex justify-between mb-4">
          {["admin", "professor", "student"].map((r) => (
            <button
              key={r}
              onClick={() => setRole(r)}
              className={`w-1/3 py-2 text-center text-lg font-bold ${
                role === r
                  ? "bg-orange-600 text-white border-2 border-white font-['Jersey_10']"
                  : "bg-transparent text-orange-600 font-['Jersey_10'] border-2 border-white"
              } transition-all duration-300`}
            >
              {r.charAt(0).toUpperCase() + r.slice(1)}
            </button>
          ))}
        </div>

        <h1
          className="text-center text-orange-400 text-3xl font-['Jersey_10'] font-bold"
          style={{
            textShadow: '1px 0px 0px #000, -1px 0px 0px #000, 1px 0px 0px #000, -1px 0px 0px #000',
          }}
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
              className="w-full px-4 py-2 mt-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-500 bg-gray-200 font-['Jersey_10'] text-gray-600 font-bold"
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
              className="w-full px-4 py-2 mt-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-500 bg-gray-200 font-['Jersey_10'] text-gray-600 font-bold"
            />
          </div>

          {/* Login Button */}
          <button
            type="submit"
            className="w-full py-2 bg-orange-600 text-white rounded-lg shadow-md hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-orange-500 font-['Jersey_10'] font-bold transition-all duration-300"
          >
            Login
          </button>
        </form>

        {/* Divider and Create Account Link */}
        <div className="flex items-center justify-between my-4">
          <span className="w-1/3 border-b border-orange-300"></span>
          <span className="text-orange-600 text-sm font-['Jersey_10'] font-bold">OR</span>
          <span className="w-1/3 border-b border-orange-300"></span>
        </div>

        {/* Create Account Button */}
        <div className="flex justify-center">
          <button
            className="py-2 px-6 bg-orange-600 text-white rounded-lg font-['Jersey_10'] font-bold transition-all duration-300 hover:bg-orange-700"
            onClick={() => router.push("/signup")}
          >
            Create Account
          </button>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
