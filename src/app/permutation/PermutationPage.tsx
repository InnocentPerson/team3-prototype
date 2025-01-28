"use client";

import { useState } from "react";
import { gameAttempt, getMetrics } from "@/app/services/apiService";
import { getUserData } from "@/app/utils/getUserData";

// You stated GId=1 for the Permutation game
const PERMUTATION_GAME_ID = 1;

export default function MappingQuizPage() {
  // Existing states for quiz logic
  const [n, setN] = useState("");
  const [input, setInput] = useState("");
  const [error, setError] = useState("");
  const [quizQuestions, setQuizQuestions] = useState<any[]>([]);
  const [quizCount, setQuizCount] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string>("");
  const [feedback, setFeedback] = useState<string | null>(null);
  const [quizStarted, setQuizStarted] = useState(false);
  const [totalPermutations, setTotalPermutations] = useState<number>(0);
  const [allMappings, setAllMappings] = useState<any[]>([]);
  const [showPermutations, setShowPermutations] = useState(false);

  // Additional states for metrics & final result
  const [finalResult, setFinalResult] = useState<null | "passed" | "failed">(null);
  const [metrics, setMetrics] = useState<any>(null);
  const [score, setScore] = useState(0);

  // ==================== Utility Functions ====================

  const generatePermutations = (array: any[]) => {
    const results: any[] = [];
    const permute = (arr: any[], current: any[] = []) => {
      if (arr.length === 0) {
        results.push(current);
      } else {
        for (let i = 0; i < arr.length; i++) {
          const remaining = arr.slice(0, i).concat(arr.slice(i + 1));
          permute(remaining, current.concat(arr[i]));
        }
      }
    };
    permute(array);
    return results;
  };

  const shuffleArray = (array: any[]) => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  };

  // ==================== Generate Quiz Questions ====================
  const generateQuizQuestions = (inputArray: number[]) => {
    const questions = [];

    // Q1: total permutations
    const totalPerms = generatePermutations(inputArray).length;
    setTotalPermutations(totalPerms);

    const permutationsQuestion = {
      question: "What is the total number of permutations possible for these numbers?",
      options: shuffleArray([
        totalPerms,                // correct
        totalPerms + 1,
        totalPerms - 1,
        totalPerms + 2,
      ]),
      correctAnswer: totalPerms,
    };
    questions.push(permutationsQuestion);

    // Q2: correct mapping
    const mappingQuestion = {
      question: "What is the correct mapping for the given elements?",
      options: shuffleArray([
        [inputArray[0], inputArray[1], inputArray[2]], // correct
        [inputArray[1], inputArray[0], inputArray[2]],
        [inputArray[2], inputArray[0], inputArray[1]],
        [inputArray[2], inputArray[1], inputArray[0]],
      ]),
      correctAnswer: [inputArray[0], inputArray[1], inputArray[2]],
    };
    questions.push(mappingQuestion);

    // Also store all permutations
    setAllMappings(generatePermutations(inputArray));

    return questions;
  };

  // ==================== Handlers for Starting & Navigating Quiz ====================

  const handleStartQuiz = () => {
    if (n.trim() === "" || isNaN(Number(n)) || Number(n) <= 0) {
      setError("Please enter a valid positive integer for n.");
      return;
    }
    if (input.trim() === "") {
      setError("Please enter the numbers.");
      return;
    }

    setError("");
    const inputArray = input
      .split(",")
      .map((x) => parseInt(x.trim(), 10))
      .filter((x) => !isNaN(x));

    if (inputArray.length !== Number(n)) {
      setError(`Please enter exactly ${n} numbers.`);
      return;
    }

    // Generate dynamic quiz
    setQuizQuestions(generateQuizQuestions(inputArray));
    setQuizCount(0);
    setSelectedAnswer("");
    setFeedback(null);
    setQuizStarted(true);
    setShowPermutations(false);
  };

  const handleAnswerSubmit = () => {
    if (selectedAnswer === "") {
      setFeedback("Please select an answer.");
      return;
    }
    // Check correctness
    const correct = selectedAnswer === JSON.stringify(quizQuestions[quizCount].correctAnswer);
    if (correct) {
      setFeedback("Correct!");
      setScore((prev) => prev + 1);
    } else {
      setFeedback(
        `Incorrect! The correct answer is: ${JSON.stringify(
          quizQuestions[quizCount].correctAnswer
        )}`
      );
    }
  };

  const handleNextButton = () => {
    setFeedback(null);
    setSelectedAnswer("");
    if (quizCount < 1) {
      setQuizCount((prev) => prev + 1);
    } else {
      // after 2 Qs
      setShowPermutations(true);
    }
  };

  const handlePreviousQuestion = () => {
    if (quizCount > 0) setQuizCount((prev) => prev - 1);
  };

  const handleGoBack = () => {
    setQuizStarted(false);
    setN("");
    setInput("");
    setError("");
  };

  // ==================== Finishing Quiz & Updating Metrics ====================
  const handleFinishQuiz = async () => {
    // Example logic: user "passed" if they got both Qs correct
    const passed = (score >= 2);
    setFinalResult(passed ? "passed" : "failed");

    // Log the attempt if logged in
    const userData = getUserData();
    if (userData?.stoken) {
      try {
        await gameAttempt(userData.stoken, PERMUTATION_GAME_ID, passed);
        const updatedMetrics = await getMetrics(userData.stoken);
        setMetrics(updatedMetrics);
      } catch (err) {
        console.error("Error logging attempt or fetching metrics:", err);
      }
    }
  };

  // ==================== Final Screen ====================
  if (finalResult !== null) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-b from-[#96a86c] to-[#5c6b47] p-6">
        <div className="bg-[#f7f2d8] shadow-lg rounded-lg p-6 max-w-md text-center">
          <h1 className="text-2xl font-bold text-[#a65c1c] mb-4">Quiz Finished!</h1>
          <p className="text-lg text-black">You {finalResult === "passed" ? "passed" : "did not pass"} the quiz.</p>

          {metrics && (
            <div className="mt-4 text-left">
              <h2 className="text-lg font-bold">Your Latest Metrics:</h2>
              <p>Total Attempts: {metrics.total_games_attempted}</p>
              <p>Total Correct: {metrics.total_games_correct}</p>
              <p>Total Points Earned: {metrics.total_points_earned}</p>
              <p>Success Rate: {metrics.success_rate?.toFixed(2) ?? "N/A"}%</p>
              <p>Last Active: {metrics.last_active}</p>
            </div>
          )}

          <button
            onClick={() => (window.location.href = "/")}
            className="mt-4 px-4 py-2 bg-[#a65c1c] text-white rounded hover:bg-[#8e4e18]"
          >
            Return Home
          </button>
        </div>
      </div>
    );
  }

  // ==================== Normal Quiz UI ====================
  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-b from-[#96a86c] to-[#5c6b47] p-6">
      <div className="flex flex-col md:flex-row bg-[#f7f2d8] shadow-lg rounded-lg p-6 max-w-4xl w-full gap-6">
        {/* ============ Input Section (before quiz starts) ============ */}
        {!quizStarted && (
          <div className="flex-1">
            <h1 className="text-2xl font-bold text-center text-[#a65c1c] mb-4">
              Mapping and Permutation MCQ Quiz
            </h1>

            <div className="mb-4">
              <label className="text-gray-700">Enter the number of elements (n):</label>
              <input
                type="number"
                value={n}
                onChange={(e) => setN(e.target.value)}
                placeholder="Enter n"
                className="border p-2 w-full rounded-md mt-2 bg-gray-100 text-gray-800"
              />
            </div>

            <div className="mb-4">
              <label className="text-gray-700">Enter the numbers (e.g., 1, 2, 3):</label>
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Enter numbers separated by commas"
                className="border p-2 w-full rounded-md mt-2 bg-gray-100 text-gray-800"
              />
            </div>

            {error && <p className="text-red-500 mt-2">{error}</p>}

            <button
              onClick={handleStartQuiz}
              className="bg-[#a65c1c] text-white px-4 py-2 rounded-md w-full hover:bg-[#a66c1c] transition"
            >
              Start Quiz
            </button>
          </div>
        )}

        {/* ============ Quiz Section (2 questions) ============ */}
        {quizStarted && quizCount < 2 && !showPermutations && (
          <div className="flex-1">
            <h2 className="text-lg font-bold text-center mb-4 text-[#a65c1c]">
              Question {quizCount + 1}
            </h2>
            <div className="space-y-4">
              <p className="text-center text-[#5c6b47] text-xl mb-6">
                {quizQuestions[quizCount]?.question}
              </p>

              <div className="space-y-4">
                {quizQuestions[quizCount]?.options.map((option: any, idx: number) => (
                  <div
                    key={idx}
                    className="flex items-center p-4 rounded-md bg-[#e8f1d4] hover:bg-[#d6e5a8] cursor-pointer border-2 border-[#5c6b47] transition duration-300 shadow-lg justify-start"
                  >
                    <input
                      type="radio"
                      name="answer"
                      value={JSON.stringify(option)}
                      onChange={(e) => setSelectedAnswer(e.target.value)}
                      checked={selectedAnswer === JSON.stringify(option)}
                      className="w-4 h-4"
                    />
                    <span className="ml-2 text-[#5c6b47]">{JSON.stringify(option)}</span>
                  </div>
                ))}
              </div>

              {feedback && <p className="text-center text-red-500">{feedback}</p>}

              <div className="flex justify-between">
                <button
                  onClick={handlePreviousQuestion}
                  className="bg-[#5c6b47] text-white px-4 py-2 rounded-md hover:bg-[#a65c1c] transition"
                >
                  Previous
                </button>

                <button
                  onClick={handleAnswerSubmit}
                  className="bg-[#5c6b47] text-white px-4 py-2 rounded-md hover:bg-[#a65c1c] transition"
                >
                  Submit
                </button>

                <button
                  onClick={handleNextButton}
                  className="bg-[#a65c1c] text-white px-4 py-2 rounded-md hover:bg-[#5c6b47] transition"
                >
                  Next
                </button>
              </div>
            </div>
          </div>
        )}

        {/* ============ After Both Questions (Show Permutations) ============ */}
        {quizStarted && showPermutations && (
          <div className="flex-1 space-y-4">
            <h2 className="text-2xl font-bold text-[#a65c1c]">Permutations & Mappings</h2>
            <div className="text-[#5c6b47]">
              <h3 className="font-bold text-lg">All Possible Mappings:</h3>
              <ul className="space-y-2">
                {allMappings.map((mapping, idx) => (
                  <li key={idx}>
                    Mapping {idx + 1}: {JSON.stringify(mapping)}
                  </li>
                ))}
              </ul>
            </div>

            {/* Finish Quiz Button */}
            <button
              onClick={handleFinishQuiz}
              className="bg-[#a65c1c] text-white px-4 py-2 rounded-md w-full hover:bg-[#5c6b47] transition"
            >
              Finish Quiz
            </button>

            <button
              onClick={handleGoBack}
              className="bg-[#6b6b47] text-white px-4 py-2 rounded-md w-full hover:bg-[#4a4b27] transition"
            >
              Go Back to Start
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
