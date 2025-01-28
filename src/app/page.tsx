"use client";

import Link from "next/link";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-100 to-green-300 p-6">
      {/* Navbar */}
      <nav className="flex justify-between items-center bg-white p-4 shadow-md rounded-lg">
        <h1 className="text-xl font-semibold text-gray-800">EduPortal</h1>
        <div className="flex space-x-4">
          <Link href="/about" className="text-gray-700 hover:text-gray-900">About</Link>
          <Link href="/features" className="text-gray-700 hover:text-gray-900">Features</Link>
          <Link href="/contact" className="text-gray-700 hover:text-gray-900">Contact</Link>
          <Link href="/login">
            <button className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700">Sign In</button>
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="text-center mt-16">
        <h1 className="text-4xl font-extrabold text-gray-900">Welcome to Your Educational Portal</h1>
        <p className="mt-2 text-gray-700">Access your courses, submit assignments, and view grades</p>
      </div>

      {/* Student Login Card (Only Option Available) */}
      <div className="flex justify-center mt-10">
        <Link href="/login">
          <div className="block bg-white shadow-lg p-6 rounded-lg text-center hover:shadow-xl w-96 cursor-pointer">
            <span className="text-4xl">🎓</span>
            <h3 className="text-lg font-bold mt-2 text-black">Student</h3>  {/* Made text black */}
            <p className="text-sm text-gray-600">Access courses, submit assignments, and view grades</p>
            <button className="mt-4 px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700">
              Login as Student
            </button>
          </div>
        </Link>
      </div>

      {/* Features Section */}
      <div className="mt-16 text-center">
        <h2 className="text-2xl font-bold text-gray-900">Platform Features</h2>
        <p className="text-gray-600">Everything you need in one place.</p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6 max-w-6xl mx-auto">
          <div className="bg-white p-4 shadow-md rounded-lg">
            <h3 className="font-semibold text-black">📊 Analytics Dashboard</h3>  {/* Made text black */}
            <p className="text-sm text-gray-600">Track performance and progress in real-time</p>
          </div>
          <div className="bg-white p-4 shadow-md rounded-lg">
            <h3 className="font-semibold text-black">📅 Schedule Management</h3>  {/* Made text black */}
            <p className="text-sm text-gray-600">Organize classes and assignments efficiently</p>
          </div>
          <div className="bg-white p-4 shadow-md rounded-lg">
            <h3 className="font-semibold text-black">💬 Communication Tools</h3>  {/* Made text black */}
            <p className="text-sm text-gray-600">Stay connected with instant messaging</p>
          </div>
          <div className="bg-white p-4 shadow-md rounded-lg">
            <h3 className="font-semibold text-black">📚 Resource Library</h3>  {/* Made text black */}
            <p className="text-sm text-gray-600">Access and share learning materials</p>
          </div>
          <div className="bg-white p-4 shadow-md rounded-lg">
            <h3 className="font-semibold text-black">📝 Assessment Tools</h3>  {/* Made text black */}
            <p className="text-sm text-gray-600">Create and grade assignments easily</p>
          </div>
          <div className="bg-white p-4 shadow-md rounded-lg">
            <h3 className="font-semibold text-black">🔒 Secure Access</h3>  {/* Made text black */}
            <p className="text-sm text-gray-600">Role-based permissions and security</p>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-white mt-16 p-6 text-center shadow-md">
        <p className="text-gray-600">&copy; 2025 EduPortal. All rights reserved.</p>
      </footer>
    </div>
  );
}
