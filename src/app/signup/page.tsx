"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import AuthForm from "./AuthForm";
import { signupUser } from "../services/apiService";

const SignupPage = () => {
  const [role, setRole] = useState("student"); // 'admin','professor','student'
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  const handleSignup = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (loading) return;
    if (!name || !email || !password) {
      alert("Please fill all fields.");
      return;
    }
    setLoading(true);

    try {
      // Attempt signup
      const response = await signupUser(name, email, password);
      console.log("Signup response:", response);
      // The server returns: { stoken, response, error }

      if (response.error === null) {
        alert("Signup successful! Your token is " + response.stoken);
        // Optionally store stoken or auto-login. For now, redirect to login page:
        router.push("/login");
      } else {
        // Show the error
        alert("Signup failed: " + response.error);
      }
    } catch (error) {
      console.error("Signup error:", error);
      alert("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
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

      <div className="w-full max-w-md bg-[#f7f2d8] rounded-lg shadow-lg p-8 space-y-6 relative z-10">
        {/* Tabs for Role Selection */}
        <div className="flex justify-between mb-4">
          {["admin", "professor", "student"].map((r) => (
            <button
              key={r}
              onClick={() => setRole(r)}
              className={`w-1/3 py-2 text-center text-lg font-bold ${
                role === r
                  ? "bg-[#8e4e18] text-white border-2 border-white font-['Jersey_10']"
                  : "bg-transparent text-[#8e4e18] font-['Jersey_10'] border-2 border-white"
              } transition-all duration-300`}
            >
              {r.charAt(0).toUpperCase() + r.slice(1)}
            </button>
          ))}
        </div>

        <h1
          className="text-center text-[#8e4e18] text-4xl font-['Jersey_10'] font-bold tracking-wider drop-shadow-lg"
        >
          Discrete Mathematical Structures
        </h1>

        {/* Signup Form */}
        <form onSubmit={handleSignup} className="space-y-4">
          <div>
            <input
              type="text"
              placeholder="Full Name"
              className="w-full px-4 py-2 border rounded-lg"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div>
            <input
              type="email"
              placeholder="Email"
              className="w-full px-4 py-2 border rounded-lg"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div>
            <input
              type="password"
              placeholder="Password"
              className="w-full px-4 py-2 border rounded-lg"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full py-2 bg-[#8e4e18] text-white rounded-lg hover:bg-[#733c14] disabled:bg-gray-300"
          >
            {loading ? "Signing Up..." : "Sign Up"}
          </button>
        </form>

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
