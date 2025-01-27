"use client";
import { useState, useEffect } from "react";

export default function PermutationPage() {
  const [n, setN] = useState("");
  const [input, setInput] = useState("");
  const [error, setError] = useState("");
  const [quizQuestions, setQuizQuestions] = useState<any[]>([]);
  const [quizCount, setQuizCount] = useState(0);
  const [showMappings, setShowMappings] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState<string>("");
  const [feedback, setFeedback] = useState<string | null>(null);
  const [quizStarted, setQuizStarted] = useState(false);
  const [allPermutations, setAllPermutations] = useState<any[]>([]);

  // Function to generate all permutations of an array
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

  // Function to generate dynamic MCQ questions based on user input
  const generateQuizQuestions = (inputArray: number[]) => {
    const randomizeArray = (array: number[]) => {
      for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]]; // Swap elements
      }
      return array;
    };

    let questions = [];
    for (let i = 0; i < 5; i++) {
      const domain = [...inputArray]; // Using user input for domain
      const range = randomizeArray([...domain]); // Randomizing the range
      const options = [
        randomizeArray([...range]),
        randomizeArray([...range]),
        randomizeArray([...range]),
        randomizeArray([...range]),
      ];
      questions.push({ mapping: domain, correctAnswer: range, options });
    }
    return questions;
  };

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

    setQuizQuestions(generateQuizQuestions(inputArray)); // Generate dynamic quiz questions based on input
    setQuizCount(0);
    setShowMappings(false);
    setSelectedAnswer(""); // Reset selected answer
    setFeedback(null); // Reset feedback
    setQuizStarted(true); // Start the quiz when inputs are valid
    setAllPermutations(generatePermutations(inputArray)); // Generate permutations for the input numbers
  };

  const handleAnswerSubmit = () => {
    if (selectedAnswer === "") {
      setFeedback("Please select an answer.");
      return;
    }

    // Check the selected answer and provide feedback
    const correct = selectedAnswer === JSON.stringify(quizQuestions[quizCount].correctAnswer);

    if (correct) {
      setFeedback("Correct!");
    } else {
      setFeedback(
        `Incorrect! The correct answer is: ${quizQuestions[quizCount].correctAnswer.join(" -> ")}`
      );
    }
  };

  const handleNextQuestion = () => {
    // Reset feedback and selected answer before moving to the next question
    setFeedback(null);
    setSelectedAnswer(""); // Reset selected answer for the next question
    if (quizCount < 4) {
      setQuizCount(quizCount + 1); // Move to the next question
    } else {
      setShowMappings(true); // After the last question, show all permutations
    }
  };

  const handlePreviousQuestion = () => {
    // Navigate to the previous question
    if (quizCount > 0) {
      setQuizCount(quizCount - 1); // Move to the previous question
    }
  };

  const handleRestartQuiz = () => {
    setN("");
    setInput("");
    setError("");
    setQuizQuestions([]);
    setQuizCount(0);
    setShowMappings(false);
    setSelectedAnswer("");
    setFeedback(null);
    setQuizStarted(false);
    setAllPermutations([]);
  };

  const handleGoBack = () => {
    setQuizStarted(false); // Go back to the first page of the quiz
    setN("");
    setInput("");
    setError("");
    setAllPermutations([]); // Clear permutations when going back to home
    setShowMappings(false); // Hide the mappings view
  };

  useEffect(() => {
    if (quizCount === 5) {
      setShowMappings(true); // Show mappings and results after the last question
    }
  }, [quizCount]);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-b from-[#96a86c] to-[#5c6b47] p-6">
      <div className="flex flex-col md:flex-row bg-[#f7f2d8] shadow-lg rounded-lg p-6 max-w-4xl w-full gap-6">
        {/* Input Section */}
        {!quizStarted && (
          <div className="flex-1">
            <h1 className="text-2xl font-bold text-center text-[#a65c1c] mb-4">
              Permutation Mappings MCQ Quiz
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

        {/* Quiz Section */}
        {quizStarted && quizCount < 5 && !showMappings && (
          <div className="flex-1">
            <h2 className="text-lg font-bold text-center mb-4 text-[#a65c1c]">
              Mapping Question {quizCount + 1}
            </h2>
            <div className="space-y-4">
              <p className="text-center text-[#5c6b47] text-xl mb-6">
                What is the correct mapping for: <br />
                {quizQuestions[quizCount]?.mapping.join(" -> ")}
              </p>

              <div className="space-y-4">
  {quizQuestions[quizCount]?.options.map((option: any[], idx: number) => (
    <div
      key={idx}
      className="flex items-center p-4 rounded-md bg-[#e8f1d4] hover:bg-[#d6e5a8] cursor-pointer border-2 border-[#5c6b47] transition duration-300 shadow-lg"
    >
      <input
        type="radio"
        name="answer"
        value={JSON.stringify(option)}
        onChange={(e) => setSelectedAnswer(e.target.value)} // Update selected answer for this question
        checked={selectedAnswer === JSON.stringify(option)} // Keep the selected answer checked
        className="mr-4 w-6 h-6 accent-[#5c6b47]"
      />
      <span className="text-xl text-[#5c6b47]">{option.join(" -> ")}</span>
    </div>
  ))}
</div>


              {feedback && <p className="mt-2 text-sm text-[#a65c1c]">{feedback}</p>}

              <button
                onClick={handleAnswerSubmit}
                className="w-full bg-[#5c6b47] text-white px-4 py-2 rounded-md mt-2 hover:bg-[#4b5e37] transition"
              >
                Submit Answer
              </button>

              <button
                onClick={handleNextQuestion}
                className="w-full bg-[#a65c1c] text-white px-4 py-2 rounded-md mt-2 hover:bg-[#a66c1c] transition"
              >
                Next Question
              </button>

              {quizCount > 0 && (
                <button
                  onClick={handlePreviousQuestion}
                  className="w-full bg-gray-500 text-white px-4 py-2 rounded-md mt-2 hover:bg-gray-600 transition"
                >
                  Previous Question
                </button>
              )}
            </div>
          </div>
        )}

        {/* Mappings Section */}
        {showMappings && (
          <div className="flex-1">
            <h2 className="text-lg font-bold text-center text-[#a65c1c] mb-4">
              All Permutations (Mappings)
            </h2>
            <div className="space-y-4">
              {allPermutations.map((perm, idx) => (
                <p key={idx} className="text-center text-xl text-[#5c6b47]">
                  {perm.join(" -> ")}
                </p>
              ))}
            </div>

            <button
              onClick={handleGoBack}
              className="w-full bg-[#a65c1c] text-white px-4 py-2 rounded-md mt-6 hover:bg-[#a66c1c] transition"
            >
              Go Back to Home
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
