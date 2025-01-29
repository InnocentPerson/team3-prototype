"use client";

import Link from "next/link";

export default function LearnMorePage() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-b from-[#96a86c] to-[#5c6b47] p-6">
      <div className="max-w-6xl w-full">
        <h1 className="text-3xl font-bold text-center text-[#a65c1c] mb-6">
          Learn More About Discrete Mathematics
        </h1>
        <p className="text-center text-lg text-gray-800 mb-10">
          Explore the concepts of <b>Lattices, Posets, and Permutations</b> through interactive learning.
        </p>

        {/* Grid Container to Align Cards Side by Side */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          {/* Lattices Card */}
          <div className="bg-[#f7f2d8] shadow-lg rounded-lg p-6 flex flex-col items-center text-center">
            {/* Image */}
            <img
              src="https://images.javatpoint.com/tutorial/dms/images/discrete-mathematics-lattices3.png"
              alt="Lattices Illustration"
              className="w-48 h-32 rounded-lg mb-4 object-cover"
            />

            {/* Title */}
            <h2 className="text-xl font-bold text-[#a65c1c] mb-2">Lattices</h2>

            {/* Description */}
            <p className="text-gray-700 mb-4">
              Learn about <b>partially ordered sets</b> where every pair has a unique supremum and infimum.
            </p>

            {/* Learn More Button */}
            <Link href="https://www.geeksforgeeks.org/partial-orders-lattices/">
              <button className="bg-[#a65c1c] text-white px-4 py-2 rounded-md hover:bg-[#8e4e18] transition">
                Let's Learn!
              </button>
            </Link>
          </div>

          {/* Posets Card */}
          <div className="bg-[#f7f2d8] shadow-lg rounded-lg p-6 flex flex-col items-center text-center">
            {/* Image */}
            <img
              src="https://media.geeksforgeeks.org/wp-content/uploads/20220110030946/Screenshot53-300x249.png"
              alt="Posets Illustration"
              className="w-48 h-32 rounded-lg mb-4 object-cover"
            />

            {/* Title */}
            <h2 className="text-xl font-bold text-[#a65c1c] mb-2">Posets</h2>

            {/* Description */}
            <p className="text-gray-700 mb-4">
              Understand <b>partially ordered sets</b>, where some elements are comparable and others are not.
            </p>

            {/* Learn More Button */}
            <Link href="https://www.geeksforgeeks.org/elements-of-poset/">
              <button className="bg-[#a65c1c] text-white px-4 py-2 rounded-md hover:bg-[#8e4e18] transition">
                Let's Learn!
              </button>
            </Link>
          </div>

          {/* Permutations Card */}
          <div className="bg-[#f7f2d8] shadow-lg rounded-lg p-6 flex flex-col items-center text-center">
            {/* Image */}
            <img
              src="https://media.geeksforgeeks.org/wp-content/uploads/20230502131208/Permutation-Combination-4.webp"
              alt="Permutations Illustration"
              className="w-48 h-32 rounded-lg mb-4 object-cover"
            />

            {/* Title */}
            <h2 className="text-xl font-bold text-[#a65c1c] mb-2">Permutations</h2>

            {/* Description */}
            <p className="text-gray-700 mb-4">
              Discover <b>arrangements of elements</b> and how they are used in combinatorics.
            </p>

            {/* Learn More Button */}
            <Link href="https://www.geeksforgeeks.org/permutation-groups-and-multiplication-of-permutation/">
              <button className="bg-[#a65c1c] text-white px-4 py-2 rounded-md hover:bg-[#8e4e18] transition">
                Let's Learn!
              </button>
            </Link>
          </div>

        </div> {/* End of Grid Container */}
      </div>
    </div>
  );
}
