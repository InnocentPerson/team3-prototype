"use client";

import { useState } from "react";
import clsx from "clsx";

type BoundsQuestion = {
  set: number[];
  subset: number[];
  correctLUB: number;
  correctGLB: number;
  relation: string; // textual description
};

const QUESTIONS: BoundsQuestion[] = [
  {
    set: [1, 2, 3, 6],
    subset: [2, 3],
    correctLUB: 6,
    correctGLB: 1,
    relation: "divides (x divides y)",
  },
  {
    set: [1, 2, 4, 8],
    subset: [2, 4],
    correctLUB: 8,
    correctGLB: 2,
    relation: "divides (x divides y)",
  },
  {
    set: [1, 2, 3, 4, 5, 6],
    subset: [3, 5],
    correctLUB: 5,
    correctGLB: 3,
    relation: "less than or equal to (≤)",
  },
  {
    set: [10, 20, 30, 40, 50],
    subset: [20, 30, 40],
    correctLUB: 40,
    correctGLB: 20,
    relation: "less than or equal to (≤)",
  },
  {
    set: [2, 4, 6, 8, 12, 16],
    subset: [4, 8],
    correctLUB: 16,
    correctGLB: 4,
    relation: "divides (x divides y)",
  },
];


export default function UpperLowerBoundsGame() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [feedback, setFeedback] = useState("");

  // Track if the current question was already answered correctly
  const [answeredCorrectly, setAnsweredCorrectly] = useState(false);

  // Current question details
  const { set, subset, correctLUB, correctGLB, relation } = QUESTIONS[currentIndex];

  const [lubGuess, setLubGuess] = useState<number | null>(null);
  const [glbGuess, setGlbGuess] = useState<number | null>(null);

  const checkAnswers = () => {
    // If already answered correctly, do nothing
    if (answeredCorrectly) {
      setFeedback("You already answered this question correctly!");
      return;
    }

    if (lubGuess === correctLUB && glbGuess === correctGLB) {
      setFeedback("Perfect! You identified the correct LUB and GLB.");
      setScore((prev) => prev + 1);
      setAnsweredCorrectly(true);
    } else if (lubGuess !== correctLUB && glbGuess !== correctGLB) {
      setFeedback("Both your LUB and GLB guesses are incorrect. Try again!");
    } else if (lubGuess !== correctLUB) {
      setFeedback("Your LUB (Least Upper Bound) guess is incorrect.");
    } else if (glbGuess !== correctGLB) {
      setFeedback("Your GLB (Greatest Lower Bound) guess is incorrect.");
    }
  };

  const nextQuestion = () => {
    setFeedback("");
    setLubGuess(null);
    setGlbGuess(null);
    setAnsweredCorrectly(false);

    if (currentIndex < QUESTIONS.length - 1) {
      setCurrentIndex((prev) => prev + 1);
    } else {
      setFeedback("No more questions! Great job!");
    }
  };

  return (
    <div className="bg-white/95 p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold text-[#a65c1c] mb-4">
        Game 2: Upper &amp; Lower Bounds
      </h2>
      <p className="mb-2 text-black">Score: {score}</p>

      <p className="mb-4 text-black">
        <strong>Question {currentIndex + 1}:</strong> S = &#123;{set.join(", ")}&#125; under {relation}.
        <br />
        Find LUB/GLB for the subset &#123;{subset.join(", ")}&#125;.
      </p>

      <div className="flex gap-8">
        {/* LUB */}
        <div>
          <label className="block font-semibold mb-2 text-[#a65c1c]">Choose LUB</label>
          <select
            className="border border-gray-300 rounded-md p-2"
            value={lubGuess ?? ""}
            onChange={(e) => setLubGuess(Number(e.target.value))}
          >
            <option value="">-- Select --</option>
            {set.map((val) => (
              <option key={val} value={val}>
                {val}
              </option>
            ))}
          </select>
        </div>

        {/* GLB */}
        <div>
          <label className="block font-semibold mb-2 text-[#a65c1c]">Choose GLB</label>
          <select
            className="border border-gray-300 rounded-md p-2"
            value={glbGuess ?? ""}
            onChange={(e) => setGlbGuess(Number(e.target.value))}
          >
            <option value="">-- Select --</option>
            {set.map((val) => (
              <option key={val} value={val}>
                {val}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="mt-4 flex gap-3">
        <button
          onClick={checkAnswers}
          className="px-4 py-2 bg-[#a65c1c] text-white rounded hover:bg-[#8e4e18]"
        >
          Check Answers
        </button>
        <button
          onClick={nextQuestion}
          className="px-4 py-2 bg-[#a65c1c] text-white rounded hover:bg-[#8e4e18]"
        >
          Next Question
        </button>
      </div>

      {feedback && (
        <div
          className={clsx(
            "mt-4 p-3 rounded-md text-center",
            feedback.includes("incorrect")
              ? "bg-red-100 text-red-800"
              : feedback.includes("Perfect") || feedback.includes("No more questions")
              ? "bg-green-100 text-green-800"
              : "bg-yellow-100 text-yellow-800"
          )}
        >
          {feedback}
        </div>
      )}
    </div>
  );
}
