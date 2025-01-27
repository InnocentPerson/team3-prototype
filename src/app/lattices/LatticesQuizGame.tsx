import React, { useState } from "react";
import { useRouter } from "next/navigation";

interface Question {
  id: number;
  question: string;
  diagram?: string; 
  options: string[];
  correctAnswer: string;
  explanation: string;
}

const questions: Question[] = [
  {
    id: 1,
    question: "Identify the least upper bound (LUB) of {a, b} in the given lattice diagram:",
    diagram: "/images/lattice1.png", 
    options: ["c", "d", "e", "f"],
    correctAnswer: "c",
    explanation:
      "In the given lattice, c is the least upper bound of {a, b} as it is the smallest element above both a and b.",
  },
  {
    id: 2,
    question: "What is the greatest lower bound (GLB) of {x, y} in this lattice?",
    diagram: "/images/lattice2.png", 
    options: ["z", "w", "u", "v"],
    correctAnswer: "w",
    explanation:
      "The greatest lower bound of {x, y} is w, as it is the largest element below both x and y.",
  },
  {
    id: 3,
    question: "Which lattice type is depicted in the diagram?",
    diagram: "/images/lattice3.png",
    options: ["Distributive lattice", "Modular lattice", "Boolean lattice", "Complete lattice"],
    correctAnswer: "Distributive lattice",
    explanation:
      "The given lattice satisfies the distributive property: a ∧ (b ∨ c) = (a ∧ b) ∨ (a ∧ c), making it a distributive lattice.",
  },
  {
    id: 4,
    question: "Find the complement of the element 'a' in this Boolean lattice.",
    diagram: "/images/lattice4.png",
    options: ["b", "c", "d", "e"],
    correctAnswer: "b",
    explanation:
      "In a Boolean lattice, the complement of 'a' is 'b' because their meet (∧) is 0, and their join (∨) is 1.",
  },
  {
    id: 5,
    question: "What type of lattice is illustrated here?",
    diagram: "/images/lattice5.png",
    options: ["Complete lattice", "Bounded lattice", "Modular lattice", "Boolean lattice"],
    correctAnswer: "Bounded lattice",
    explanation:
      "The lattice has both a greatest element (1) and a least element (0), which makes it a bounded lattice.",
  },
  // Previous questions
  {
    id: 6,
    question: "Which of the following is a lattice?",
    options: [
      "Set of natural numbers with usual ordering",
      "Power set of a set with inclusion relation",
      "Set of integers under multiplication",
      "Set of real numbers under division",
    ],
    correctAnswer: "Power set of a set with inclusion relation",
    explanation:
      "The power set of a set with inclusion relation is a lattice because every subset has a least upper bound (union) and a greatest lower bound (intersection).",
  },
  {
    id: 7,
    question: "What is the least upper bound (LUB) of {2, 3} in divisors of 12?",
    options: ["6", "12", "2", "3"],
    correctAnswer: "6",
    explanation:
      "In the divisors of 12, the least upper bound of {2, 3} is 6 because 6 is the smallest divisor of 12 that is divisible by both 2 and 3.",
  },
  {
    id: 8,
    question: "Which property is required for a set to be a lattice?",
    options: [
      "Distributive property",
      "Existence of least upper and greatest lower bounds",
      "Associativity",
      "Commutativity",
    ],
    correctAnswer: "Existence of least upper and greatest lower bounds",
    explanation:
      "A lattice requires that every pair of elements have a least upper bound (LUB) and a greatest lower bound (GLB). This is the defining property of a lattice.",
  },
  {
    id: 9,
    question: "What is the greatest lower bound (GLB) of {4, 6} in divisors of 12?",
    options: ["2", "4", "6", "1"],
    correctAnswer: "2",
    explanation:
      "In the divisors of 12, the greatest lower bound of {4, 6} is 2 because it is the largest divisor of 12 that divides both 4 and 6.",
  },
  {
    id: 10,
    question: "Which of the following lattices is distributive?",
    options: [
      "Boolean lattice",
      "Set of integers under divisibility",
      "Real numbers under usual order",
      "None of the above",
    ],
    correctAnswer: "Boolean lattice",
    explanation:
      "A Boolean lattice is distributive because it satisfies the distributive property: a ∧ (b ∨ c) = (a ∧ b) ∨ (a ∧ c).",
  },
];

const LatticesQuizGame: React.FC = () => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedOption, setSelectedOption] = useState("");
  const [isAnswerCorrect, setIsAnswerCorrect] = useState<null | boolean>(null);
  const router = useRouter();

  const handleOptionClick = (option: string) => {
    setSelectedOption(option);
    const isCorrect = option === questions[currentQuestionIndex].correctAnswer;
    setIsAnswerCorrect(isCorrect);
    if (isCorrect) setScore((prev) => prev + 1);
  };

  const handleNextQuestion = () => {
    setSelectedOption("");
    setIsAnswerCorrect(null);
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex((prev) => prev + 1);
    } else {
      router.push("/lattices/quiz-results"); // Navigate to results page
    }
  };

  return (
    <div className="flex flex-col items-center justify-center p-6 bg-gray-50 min-h-screen">
      <h1 className="text-2xl font-bold mb-4">Lattices Quiz Game</h1>
      <div className="w-full max-w-md p-6 bg-white rounded-lg shadow">
        <h2 className="text-xl font-semibold">
          Question {currentQuestionIndex + 1} of {questions.length}
        </h2>
        <p className="mt-2 text-gray-700">{questions[currentQuestionIndex].question}</p>
        {/* Display lattice diagram if available */}
        {questions[currentQuestionIndex].diagram && (
          <div className="mt-4">
            <img
              src={questions[currentQuestionIndex].diagram}
              alt="Lattice diagram"
              className="w-full h-auto rounded-lg shadow-md"
            />
          </div>
        )}
        <div className="mt-4 space-y-2">
          {questions[currentQuestionIndex].options.map((option, index) => (
            <button
              key={index}
              onClick={() => handleOptionClick(option)}
              className={`w-full py-2 px-4 rounded-lg text-left ${
                selectedOption === option
                  ? option === questions[currentQuestionIndex].correctAnswer
                    ? "bg-green-500 text-white"
                    : "bg-red-500 text-white"
                  : "bg-gray-100 hover:bg-gray-200"
              }`}
              disabled={selectedOption !== ""}
            >
              {option}
            </button>
          ))}
        </div>
        {isAnswerCorrect !== null && (
          <div className="mt-4">
            <p
              className={`font-semibold ${
                isAnswerCorrect ? "text-green-600" : "text-red-600"
              }`}
            >
              {isAnswerCorrect ? "Correct!" : "Incorrect."}
            </p>
            <p className="mt-2 text-gray-700">{questions[currentQuestionIndex].explanation}</p>
          </div>
        )}
        <button
          onClick={handleNextQuestion}
          disabled={selectedOption === ""}
          className="mt-4 py-2 px-4 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:bg-gray-300"
        >
          {currentQuestionIndex < questions.length - 1 ? "Next Question" : "View Results"}
        </button>
      </div>
      <p className="mt-6 text-gray-600">Score: {score}</p>
    </div>
  );
};

export default LatticesQuizGame;
