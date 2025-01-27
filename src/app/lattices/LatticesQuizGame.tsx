"use client";

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
  // Additional non-diagram questions
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

export default function LatticesQuizGame() {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);

  const [selectedOption, setSelectedOption] = useState("");
  const [isAnswerCorrect, setIsAnswerCorrect] = useState<null | boolean>(null);
  // If user has already answered a question correctly, no further increment in score
  const [questionAnswered, setQuestionAnswered] = useState(false);

  // Once quizOver is true, we show the final results section
  const [quizOver, setQuizOver] = useState(false);

  const router = useRouter();
  const currentQuestion = questions[currentQuestionIndex];

  const handleOptionClick = (option: string) => {
    // If user already answered correctly, do nothing
    if (questionAnswered || quizOver) return;

    setSelectedOption(option);
    const isCorrect = option === currentQuestion.correctAnswer;
    setIsAnswerCorrect(isCorrect);

    if (isCorrect) {
      setScore((prev) => prev + 1);
      setQuestionAnswered(true);
    }
  };

  const handleNextQuestion = () => {
    // Move on to next question, or end quiz
    setSelectedOption("");
    setIsAnswerCorrect(null);
    setQuestionAnswered(false);

    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex((prev) => prev + 1);
    } else {
      // Quiz is finished
      setQuizOver(true);
    }
  };

  const handleRestartQuiz = () => {
    // Reset all states
    setCurrentQuestionIndex(0);
    setScore(0);
    setSelectedOption("");
    setIsAnswerCorrect(null);
    setQuestionAnswered(false);
    setQuizOver(false);
  };

  const handleReturnHome = () => {
    router.push("/"); // or your home route
  };

  // =================== RENDER FINAL RESULTS ===================
  if (quizOver) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4 py-8 bg-gradient-to-b from-[#96a86c] to-[#5c6b47]">
        <div className="w-full max-w-md bg-[#f7f2d8] p-6 rounded-lg shadow-lg flex flex-col items-center">
          <h1 className="text-2xl font-extrabold text-[#a65c1c] mb-6 text-center">
            Quiz Completed!
          </h1>
          <p className="text-black text-lg mb-4">
            Your final score is <span className="font-bold">{score}</span> out of{" "}
            {questions.length}.
          </p>
          <div className="flex gap-4">
            <button
              onClick={handleRestartQuiz}
              className="px-4 py-2 bg-[#a65c1c] text-white rounded hover:bg-[#8e4e18]"
            >
              Restart Quiz
            </button>
            <button
              onClick={handleReturnHome}
              className="px-4 py-2 bg-[#a65c1c] text-white rounded hover:bg-[#8e4e18]"
            >
              Return Home
            </button>
          </div>
        </div>
      </div>
    );
  }

  // =================== RENDER QUIZ QUESTIONS ===================
  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-8 bg-gradient-to-b from-[#96a86c] to-[#5c6b47]">
      <div className="w-full max-w-2xl bg-[#f7f2d8] rounded-lg shadow-lg p-6">
        {/* Header Row: Title + Score */}
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-3xl font-extrabold text-[#a65c1c]">
            Lattices Quiz
          </h1>
          <p className="text-[#a65c1c] font-bold">
            Score: {score}
          </p>
        </div>

        {/* Question Number & Text */}
        <h2 className="text-lg font-semibold text-[#a65c1c]">
          Question {currentQuestionIndex + 1} of {questions.length}
        </h2>
        <p className="mt-2 text-black">{currentQuestion.question}</p>

        {/* Optional diagram */}
        {currentQuestion.diagram && (
          <div className="mt-4 max-h-48 flex justify-center">
            <img
              src={currentQuestion.diagram}
              alt="Lattice diagram"
              className="object-contain rounded-lg w-full max-w-sm"
            />
          </div>
        )}

        {/* Options */}
        <div className="mt-4 space-y-2">
          {currentQuestion.options.map((option, index) => {
            let btnStyle = "bg-gray-100 hover:bg-gray-200 text-black";
            if (selectedOption === option) {
              if (option === currentQuestion.correctAnswer) {
                btnStyle = "bg-green-500 text-white";
              } else {
                btnStyle = "bg-red-500 text-white";
              }
            }
            return (
              <button
                key={index}
                onClick={() => handleOptionClick(option)}
                className={`w-full py-2 px-4 rounded-lg text-left transition-colors ${btnStyle}`}
                disabled={selectedOption !== ""} // disable once a choice is made
              >
                {option}
              </button>
            );
          })}
        </div>

        {/* Feedback */}
        {isAnswerCorrect !== null && (
          <div className="mt-4">
            <p
              className={`font-semibold ${
                isAnswerCorrect ? "text-green-600" : "text-red-600"
              }`}
            >
              {isAnswerCorrect ? "Correct!" : "Incorrect."}
            </p>
            <p className="mt-2 text-black">{currentQuestion.explanation}</p>
          </div>
        )}

        {/* Next Button */}
        <button
          onClick={handleNextQuestion}
          disabled={selectedOption === ""}
          className="mt-4 py-2 px-4 bg-[#a65c1c] text-white rounded-lg hover:bg-[#8e4e18] disabled:bg-gray-300"
        >
          {currentQuestionIndex < questions.length - 1 ? "Next Question" : "Finish Quiz"}
        </button>
      </div>
    </div>
  );
}
