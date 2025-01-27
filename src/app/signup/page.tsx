"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import AuthForm from "./AuthForm";
import { signupUser } from "../services/apiService";

const SignupPage = () => {
  const [role, setRole] = useState("student"); // Default role is set to "student"
  const [loading, setLoading] = useState(false); // Loading state for form submission
  const router = useRouter();

  const handleSignup = async (name: string, email: string, password: string) => {
    if (loading) return; // Prevent multiple submissions while loading
    setLoading(true); // Set loading state

    // Generate a random auth_token (for simplicity, this can be replaced with an actual token generation mechanism)
    const auth_token = Math.random().toString(36).substring(2);

    try {
      const response = await fetch("/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ auth_token, name, email, password, role }),
      });

      if (response.ok) {
        alert(`Signed up successfully as ${role}`);
        router.push("/login"); // Redirect to login page after successful signup
      } else {
        const data = await response.json();
        alert(data.message || "Signup failed");
      }
    } catch (error) {
      console.error("Signup error:", error);
      alert("Something went wrong. Please try again.");
    } finally {
      setLoading(false); // Reset loading state
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

        {/* Signup Form */}
        <AuthForm onSubmit={handleSignup} buttonText={loading ? "Signing Up..." : "Sign Up"} />

        <p className="text-center text-sm text-gray-600">
          Already have an account?{" "}
          <a href="/login" className="text-blue-600 hover:text-blue-800">
            Login
          </a>
        </p>
      </div>
    </div>
  );
};

export default SignupPage;
