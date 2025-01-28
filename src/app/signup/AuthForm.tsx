"use client";
import { useState } from "react";

interface AuthFormProps {
  onSubmit: (name: string, email: string, password: string) => void;
  buttonText: string;
}

const AuthForm = ({ onSubmit, buttonText }: AuthFormProps) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name && email && password) {
      onSubmit(name, email, password);
    } else {
      alert("Please fill in all fields.");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 mt-4">
      {/* Name */}
      <div>
        <label htmlFor="name" className="block text-gray-900 font-medium">Name</label>
        <input
          type="text"
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          className="w-full px-4 py-2 mt-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-[#8e4e18] bg-gray-200 font-['Jersey_10'] text-gray-600 font-bold"
        />
      </div>

      {/* Email */}
      <div>
        <label htmlFor="email" className="block text-gray-900 font-medium">Email</label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="w-full px-4 py-2 mt-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-[#8e4e18] bg-gray-200 font-['Jersey_10'] text-gray-600 font-bold"
        />
      </div>

      {/* Password */}
      <div>
        <label htmlFor="password" className="block text-gray-700 font-medium">Password</label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="w-full px-4 py-2 mt-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-[#8e4e18] bg-gray-200 font-['Jersey_10'] text-gray-600 font-bold"
        />
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        className="w-full py-2 bg-[#a65c1c] text-white rounded-lg shadow-md hover:bg-[#8e4e18] font-['Jersey_10'] focus:outline-none focus:ring-2 focus:ring-blue-500 font-bold"
      >
        {buttonText}
      </button>
    </form>
  );
};

export default AuthForm;
