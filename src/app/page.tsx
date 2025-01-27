import Link from "next/link";
// import styles from './page.module.css';

export default function Home() {
  return (
    <>
      <div className="h-screen bg-gradient-to-b from-[#96a86c] to-[#5c6b47] flex items-center justify-center relative overflow-hidden">
        <div className="container mx-auto px-6 z-10">
          <div className="max-w-3xl mx-auto flex flex-col items-start">
            {/* Title Section */}
            <h1 className="text-6xl font-extrabold text-white leading-tight mb-6 jersey-10-regular drop-shadow-lg tracking-wider">
              Discrete
              <br />
              Mathematical
              <br />
              Structures
            </h1>

            {/* Subtitle Section */}
            <p className="text-2xl text-[#e4c3a4] mb-8 jockey-one-regular drop-shadow-md tracking-wider">
              Emphasizing your learning experience of{" "}
              <span className="text-orange-500">
                Lattices and Posets
              </span>
              ,<br />
              through an engaging gameplay.
            </p>

            {/* CTA Button */}
            <button className="bg-[#a65c1c] hover:bg-[#8e4e18] text-white font-bold py-3 px-8 rounded-full text-xl shadow-lg jersey-10-regular tracking-wider">
              <Link href="/dashboard">GET STARTED</Link>
            </button>
          </div>
        </div>

        {/* Decorative Elements */}
        <div className="absolute top-10 right-20 text-black text-4xl transform rotate-[10deg] font-bold">
          x ∉ A
        </div>
        <div className="absolute bottom-10 right-20 text-black text-3xl font-bold">
          f(x)
        </div>
        <div className="absolute top-5 left-10 text-black text-4xl font-bold transform rotate-[-20deg]">
          f(x)
        </div>

        {/* Hexagonal Symbol */}
        <div className="absolute top-1/3 right-1/4">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-20 h-20 text-black"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 2l6.9 4v8l-6.9 4-6.9-4V6z"
            />
          </svg>
        </div>

        {/* Graph Illustration */}
        <div className="absolute bottom-16 left-20">
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
      </div>
    </>
  );
}
