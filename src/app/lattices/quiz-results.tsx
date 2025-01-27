import React from "react";
import { useRouter } from "next/navigation";

const QuizResults: React.FC = () => {
  const router = useRouter();
  const score = typeof window !== "undefined" ? localStorage.getItem("score") : 0;

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
      <h1 className="text-3xl font-bold">Quiz Completed!</h1>
      <p className="mt-4 text-xl">Your final score: {score}</p>
      <button
        onClick={() => router.push("/")}
        className="mt-4 py-2 px-4 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
      >
        Return to Home
      </button>
    </div>
  );
};

export default QuizResults;
