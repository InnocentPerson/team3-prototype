"use client";
import { useState } from "react";

export default function MappingQuizPage() {
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

  // Function to shuffle the options array
  const shuffleArray = (array: any[]) => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  };

  // Function to generate dynamic MCQ questions based on user input
  const generateQuizQuestions = (inputArray: number[]) => {
    let questions = [];

    // Question 1: Total number of permutations
    const totalPermutations = generatePermutations(inputArray).length;
    setTotalPermutations(totalPermutations); // Store total permutations

    const permutationsQuestion = {
      question: "What is the total number of permutations possible for these numbers?",
      options: [
        totalPermutations, // Correct option
        totalPermutations + 1, // Incorrect option
        totalPermutations - 1, // Incorrect option
        totalPermutations + 2, // Incorrect option
      ],
      correctAnswer: totalPermutations,
    };

    // Shuffle the options for permutations question
    permutationsQuestion.options = shuffleArray(permutationsQuestion.options);

    questions.push(permutationsQuestion);

    // Question 2: Mapping question based on entered numbers
    const mappingQuestion = {
      question: "What is the correct mapping for the given elements?",
      options: [
        [inputArray[0], inputArray[1], inputArray[2]], // Correct mapping
        [inputArray[1], inputArray[0], inputArray[2]], // Incorrect mapping
        [inputArray[2], inputArray[0], inputArray[1]], // Incorrect mapping
        [inputArray[2], inputArray[1], inputArray[0]], // Incorrect mapping
      ],
      correctAnswer: [inputArray[0], inputArray[1], inputArray[2]], // Correct mapping
    };

    // Shuffle the options for mapping question
    mappingQuestion.options = shuffleArray(mappingQuestion.options);

    questions.push(mappingQuestion);

    // Set all possible mappings
    setAllMappings(generatePermutations(inputArray));

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
    setSelectedAnswer(""); // Reset selected answer
    setFeedback(null); // Reset feedback
    setQuizStarted(true); // Start the quiz when inputs are valid
    setShowPermutations(false); // Hide permutations initially
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
        `Incorrect! The correct answer is: ${JSON.stringify(quizQuestions[quizCount].correctAnswer)}`
      );
    }
  };

  const handleNextButton = () => {
    // Reset feedback and selected answer before moving to the next question
    setFeedback(null);
    setSelectedAnswer(""); // Reset selected answer for the next question
    if (quizCount < 1) {
      setQuizCount(quizCount + 1); // Move to the next question
    } else {
      setShowPermutations(true); // Show permutations and mappings after both questions are answered
    }
  };

  const handlePreviousQuestion = () => {
    // Navigate to the previous question
    if (quizCount > 0) {
      setQuizCount(quizCount - 1); // Move to the previous question
    }
  };

  
  const handleGoBack = () => {
    setQuizStarted(false); // Go back to the first page of the quiz
    setN("");
    setInput("");
    setError("");
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-b from-[#96a86c] to-[#5c6b47] p-6">
      <div className="flex flex-col md:flex-row bg-[#f7f2d8] shadow-lg rounded-lg p-6 max-w-4xl w-full gap-6">
        {/* Input Section */}
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

        {/* Quiz Section */}
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
                  Previous Question
                </button>

                <button
                  onClick={handleAnswerSubmit}
                  className="bg-[#5c6b47] text-white px-4 py-2 rounded-md hover:bg-[#a65c1c] transition"
                >
                  Submit Answer
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

        {/* Only show Permutations and Mappings when quiz has started */}
{quizStarted && showPermutations && (
  <div className="flex-1 space-y-4">
    <h2 className="text-2xl font-bold text-[#a65c1c]">Permutations and Mappings</h2>
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

    <button
      onClick={handleGoBack}
      className="bg-[#a65c1c] text-white px-4 py-2 rounded-md w-full hover:bg-[#5c6b47] transition"
    >
      Go Back to Home
    </button>
  </div>
)}

      </div>
    </div>
  );
}
