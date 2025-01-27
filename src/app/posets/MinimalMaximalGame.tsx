"use client";

import { useState } from "react";
import clsx from "clsx";

type MinimalMaximalQuestion = {
  elements: number[];
  correctMinimal: number[];
  correctMaximal: number[];
  description: string; // textual description of partial order
};

const QUESTIONS: MinimalMaximalQuestion[] = [
  {
    elements: [1, 2, 3, 4],
    correctMinimal: [1],
    correctMaximal: [4],
    description: "1 < 2, 1 < 3, 2 < 4, 3 < 4",
  },
  {
    elements: [1, 2, 4, 8],
    correctMinimal: [1],
    correctMaximal: [8],
    description: "1 < 2, 2 < 4, 4 < 8",
  },
  {
    elements: [1, 2, 3, 4, 5],
    correctMinimal: [1, 2],
    correctMaximal: [5],
    description: "1 < 3, 2 < 4, 3 < 5, 4 < 5",
  },
  {
    elements: [1, 2, 3, 4, 5],
    correctMinimal: [1],
    correctMaximal: [4, 5],
    description: "1 < 2, 1 < 3, 2 < 4, 3 < 5, 2 < 5",
  },
  {
    elements: [1, 2, 3, 4, 5, 6],
    correctMinimal: [1],
    correctMaximal: [4, 6],
    description: "1 < 2, 1 < 3, 2 < 4, 2 < 5, 3 < 5, 5 < 6",
  },
];

export default function MinimalMaximalGame() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [feedback, setFeedback] = useState("");

  // Track if we've already answered the current question correctly (to avoid double scoring).
  const [answeredCorrectly, setAnsweredCorrectly] = useState(false);

  // Current question
  const { elements, correctMinimal, correctMaximal, description } = QUESTIONS[currentIndex];

  // Selections for the current question
  const [selectedMinimal, setSelectedMinimal] = useState<number[]>([]);
  const [selectedMaximal, setSelectedMaximal] = useState<number[]>([]);

  const toggleMinimal = (elem: number) => {
    setSelectedMinimal((prev) =>
      prev.includes(elem) ? prev.filter((x) => x !== elem) : [...prev, elem]
    );
  };

  const toggleMaximal = (elem: number) => {
    setSelectedMaximal((prev) =>
      prev.includes(elem) ? prev.filter((x) => x !== elem) : [...prev, elem]
    );
  };

  const checkAnswers = () => {
    // If already answered correctly, don't do anything
    if (answeredCorrectly) {
      setFeedback("You already answered this question correctly!");
      return;
    }

    const sortedMin = [...selectedMinimal].sort((a, b) => a - b);
    const sortedMax = [...selectedMaximal].sort((a, b) => a - b);

    const sortedCorrectMin = [...correctMinimal].sort((a, b) => a - b);
    const sortedCorrectMax = [...correctMaximal].sort((a, b) => a - b);

    const minIsCorrect = JSON.stringify(sortedMin) === JSON.stringify(sortedCorrectMin);
    const maxIsCorrect = JSON.stringify(sortedMax) === JSON.stringify(sortedCorrectMax);

    if (minIsCorrect && maxIsCorrect) {
      setFeedback("Perfect! You identified minimal and maximal elements correctly.");
      setAnsweredCorrectly(true);
      setScore((prev) => prev + 1); // increment score exactly once
    } else if (!minIsCorrect && !maxIsCorrect) {
      setFeedback("Both minimal and maximal element selections are incorrect.");
    } else if (!minIsCorrect) {
      setFeedback("Your minimal elements selection is incorrect. Try again!");
    } else if (!maxIsCorrect) {
      setFeedback("Your maximal elements selection is incorrect. Try again!");
    }
  };

  const goToNextQuestion = () => {
    // Reset everything for the next question
    setSelectedMinimal([]);
    setSelectedMaximal([]);
    setAnsweredCorrectly(false);
    setFeedback("");

    if (currentIndex < QUESTIONS.length - 1) {
      setCurrentIndex((prev) => prev + 1);
    } else {
      // We’re at the last question
      setFeedback("No more questions available. Great job!");
    }
  };

  return (
    <div className="bg-white/95 p-6 rounded-lg shadow-md text-black">
      <h2 className="text-2xl font-bold text-[#a65c1c] mb-4">
        Game 1: Minimal &amp; Maximal Elements
      </h2>
      <p className="mb-2">Score: {score}</p>

      <p className="mb-4">
        <strong>Question {currentIndex + 1}:</strong> For the set <strong>S = &#123;
        {elements.join(", ")}&#125;</strong> with partial order <strong>{description}</strong>,
        select all minimal and maximal elements.
      </p>

      <div className="grid grid-cols-2 gap-6">
        {/* Minimal */}
        <div>
          <h3 className="text-lg font-semibold text-[#a65c1c] mb-2">
            Select Minimal Elements
          </h3>
          {elements.map((elem) => (
            <label key={`min-${elem}`} className="block mb-2">
              <input
                type="checkbox"
                className="mr-2 accent-black"
                checked={selectedMinimal.includes(elem)}
                onChange={() => toggleMinimal(elem)}
              />
              {elem}
            </label>
          ))}
        </div>

        {/* Maximal */}
        <div>
          <h3 className="text-lg font-semibold text-[#a65c1c] mb-2">
            Select Maximal Elements
          </h3>
          {elements.map((elem) => (
            <label key={`max-${elem}`} className="block mb-2">
              <input
                type="checkbox"
                className="mr-2 accent-black"
                checked={selectedMaximal.includes(elem)}
                onChange={() => toggleMaximal(elem)}
              />
              {elem}
            </label>
          ))}
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
          onClick={goToNextQuestion}
          className="px-4 py-2 bg-[#a65c1c] text-white rounded hover:bg-[#8e4e18]"
        >
          Next Question
        </button>
      </div>

      {feedback && (
        <div
          className={clsx(
            "mt-4 p-3 rounded-md text-center",
            feedback.includes("incorrect") || feedback.includes("incorrectly")
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
