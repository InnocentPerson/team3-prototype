"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

interface UserData {
  email: string;
  role: string;
  token: string;
  expiry: number;
}

export default function Home() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    // Check localStorage for userData
    const data = localStorage.getItem("userData");
    if (data) {
      const userData: UserData = JSON.parse(data);
      if (Date.now() < userData.expiry) {
        setIsLoggedIn(true);
      } else {
        // session expired
        localStorage.removeItem("userData");
      }
    }
  }, []);

  return (
    <div className="min-h-screen pt-6">
      {/* Hero Section */}
      <div className="text-center mt-16">
      <h1 className="text-6xl font-extrabold text-white leading-tight mb-2 jersey-10-regular drop-shadow-lg tracking-wider">
          Welcome to Discreta
        </h1>
        <p className="text-2xl text-[#e4c3a4] mb-8 jockey-one-regular drop-shadow-md tracking-wider">
              Emphasizing your learning experience of{" "}
              <span className="text-orange-500">
                Lattices and Posets
              </span>
              ,<br />
              through an engaging gameplay.
            </p>
      </div>

      {/* Card Section */}
      <div className="flex justify-center mt-10">
        {isLoggedIn ? (
          /* If user is logged in, show "Go to Dashboard" card */
          <Link href="/dashboard">
            <div className="block bg-[#f7f2d8] shadow-lg p-6 rounded-lg text-center hover:shadow-xl w-96 cursor-pointer">
              <span className="text-4xl">👋</span>
              <h3 className="text-lg font-bold mt-2 text-black">
                Welcome Back!
              </h3>
              <p className="text-sm text-gray-600">
                Access your personalized dashboard
              </p>
              <button className="mt-4 px-4 py-2 bg-[#8e4e18] text-white rounded-md hover:bg-[#733c14]">
                Go to Dashboard
              </button>
            </div>
          </Link>
        ) : (
          /* If user is not logged in, show "Student Login" card */
          <Link href="/login">
            <div className="block bg-[#f7f2d8] shadow-lg p-6 rounded-lg text-center hover:shadow-xl w-96 cursor-pointer">
              <span className="text-4xl">🎓</span>
              <h3 className="text-lg font-bold mt-2 text-black">
                Student
              </h3>
              <p className="text-sm text-gray-600">
                Access courses, submit assignments, and view grades
              </p>
              <button className="mt-4 px-4 py-2 bg-[#8e4e18] text-white rounded-md hover:bg-[#733c14]">
                Login as Student
              </button>
            </div>
          </Link>
        )}
      </div>

      {/* Features Section */}
      <div className="mt-16 text-center">
        <h2 className="text-3xl font-extrabold text-white leading-tight mb-2 jersey-10-regular drop-shadow-lg tracking-wider">
          Platform Features
        </h2>
        <p className="text-lg text-[#e4c3a4] mb-8 jockey-one-regular drop-shadow-md tracking-wider">
          Everything you need in one place.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6 max-w-6xl mx-auto">
          <div className="bg-[#f7f2d8] p-4 shadow-md rounded-lg">
            <h3 className="font-semibold text-black">📊 Analytics Dashboard</h3>
            <p className="text-sm text-gray-600">
              Track performance and progress in real-time
            </p>
          </div>
          <div className="bg-[#f7f2d8] p-4 shadow-md rounded-lg">
            <h3 className="font-semibold text-black">
              🔒 Secure Access
            </h3>
            <p className="text-sm text-gray-600">
              Role-based permissions and security
            </p>
          </div>
          <div className="bg-[#f7f2d8] p-4 shadow-md rounded-lg">
            <h3 className="font-semibold text-black">
            🎮 Engaging Games
            </h3>
            <p className="text-sm text-gray-600">
              Games that make learning fun!
            </p>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="mt-16 p-6 text-center  shadow-md">
        <p className="text-white">
          &copy; 2025 Discreta. All rights reserved.
        </p>
      </footer>
    </div>
  );
}
