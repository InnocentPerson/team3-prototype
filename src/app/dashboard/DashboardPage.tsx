"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import DashboardCard from "./DashboardCard";
import DashboardProgress from "./DashboardProgress";
import DashboardAchievements from "./DashboardAchievements";
import { getUserData } from "@/app/utils/getUserData";
import { getMetrics } from "@/app/services/apiService";

interface UserData {
  email: string;
  role: string;
  token: string;
  expiry: number; // timestamp in ms
}

export default function DashboardPage() {
  const [metrics, setMetrics] = useState<any>(null);

  useEffect(() => {
    const userData = getUserData();
    if (userData?.stoken) {
      getMetrics(userData.stoken)
        .then((m) => setMetrics(m))
        .catch((err) => console.error("Error fetching metrics:", err));
    }
  }, []);

  const [user, setUser] = useState<UserData | null>(null);

  // 1) Check if user data exists in localStorage
  useEffect(() => {
    const data = localStorage.getItem("userData");
    if (data) {
      const userData: UserData = JSON.parse(data);
      // 2) Validate expiry
      if (Date.now() < userData.expiry) {
        setUser(userData);
      } else {
        // session expired
        localStorage.removeItem("userData");
      }
    }
  }, []);

  // 3) If not logged in, show a "not logged in" message or redirect
  if (!user) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-[#f7f2d8]">
        <h1 className="text-2xl font-bold mb-4 text-gray-700">
          You are not logged in!
        </h1>
        <Link href="/login">
          <button className="px-4 py-2 bg-[#a65c1c] text-white rounded hover:bg-[#8e4e18]">
            Go to Login
          </button>
        </Link>
      </div>
    );
  }

  

  // 4) Otherwise, the user is logged in. Render the dashboard content.
  return (
    <div className="min-h-screen p-6">
      {/* Simple Navbar / Header */}
      <nav className="flex justify-between items-center bg-[#f7f2d8] p-4 shadow-md rounded-lg">
        <h1 className="text-xl font-semibold text-gray-800">
          Dashboard
        </h1>
        <div className="flex items-center space-x-4">
          <p className="text-sm text-gray-600">
            Logged in as <span className="font-bold">{user.email}</span>
          </p>
          <button className="bg-gray-200 p-2 rounded-full hover:bg-gray-300">
            🔔
          </button>
          <img
            src="data:image/png;base64,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"
            alt="User Profile"
            className="ml-4 w-10 h-10 rounded-full border"
          />
        </div>
      </nav>

      {/* Main Dashboard Sections */}
      <section className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
        <DashboardCard
          title="Permutations"
          description="Practice permutations with interactive challenges"
          gamesAvailable={10}
          link="/permutation"
        />
        <DashboardCard
          title="Lattices"
          description="Master lattice theory with engaging puzzles"
          gamesAvailable={8}
          link="/lattices"
        />
        <DashboardCard
          title="Posets"
          description="Explore partially ordered sets through interactive games"
          gamesAvailable={12}
          link="/posets"
        />
      </section>

      {/* Show metrics if available */}
      {metrics && (
        <div className="mt-6 p-4 bg-[#f7f2d8] rounded-lg shadow-md">
          <h2 className="text-lg font-bold text-gray-800">Your Metrics</h2>
          <ul className="mt-2 text-sm text-gray-600 space-y-1">
            <li>Total Games Attempted: {metrics.total_games_attempted}</li>
            <li>Total Games Correct: {metrics.total_games_correct}</li>
            <li>Total Points Earned: {metrics.total_points_earned}</li>
            <li>Success Rate: {metrics.success_rate?.toFixed(2) ?? "N/A"}%</li>
            <li>Last Active: {metrics.last_active}</li>
          </ul>
        </div>
      )}

      <DashboardProgress />
      <DashboardAchievements />
    </div>
  );
}
