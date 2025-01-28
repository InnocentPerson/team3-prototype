"use client";

import { useState } from "react";
import clsx from "clsx";
import { getUserData } from "@/app/utils/getUserData";
import { gameAttempt, getMetrics } from "@/app/services/apiService";

const LATTICE_VIS_GAME_ID = 3;

export default function LatticeVisualizerGame() {
  // Single question scenario: top = {1,2}, bottom = ∅
  const correctTop = "{1,2}";
  const correctBottom = "∅";

  type Node = {
    id: string;
    x: number;
    y: number;
    isSelected?: boolean;
  };

  const [nodes, setNodes] = useState<Node[]>([
    { id: "∅", x: 100, y: 20 },
    { id: "{1}", x: 60, y: 100 },
    { id: "{2}", x: 140, y: 100 },
    { id: "{1,2}", x: 100, y: 180 },
  ]);

  const edges = [
    ["∅", "{1}"],
    ["∅", "{2}"],
    ["{1}", "{1,2}"],
    ["{2}", "{1,2}"],
  ];

  const [selectedTop, setSelectedTop] = useState("");
  const [selectedBottom, setSelectedBottom] = useState("");

  const [feedback, setFeedback] = useState("");
  const [score, setScore] = useState(0);

  // Prevent repeated scoring for the single question
  const [answeredCorrectly, setAnsweredCorrectly] = useState(false);

  // Final states
  const [gameOver, setGameOver] = useState(false);
  const [metrics, setMetrics] = useState<any>(null);

  const toggleNodeSelect = (id: string) => {
    setNodes((prev) =>
      prev.map((node) =>
        node.id === id ? { ...node, isSelected: !node.isSelected } : node
      )
    );
  };

  const checkAnswers = () => {
    if (answeredCorrectly) {
      setFeedback("You already answered this question correctly!");
      return;
    }

    if (selectedTop === correctTop && selectedBottom === correctBottom) {
      setFeedback("Perfect! You identified the top and bottom nodes.");
      setScore((prev) => prev + 1);
      setAnsweredCorrectly(true);
    } else if (selectedTop !== correctTop && selectedBottom !== correctBottom) {
      setFeedback("Both top and bottom node selections are incorrect!");
    } else if (selectedTop !== correctTop) {
      setFeedback("Your top node selection is incorrect.");
    } else if (selectedBottom !== correctBottom) {
      setFeedback("Your bottom node selection is incorrect.");
    }
  };

  const finishGame = async () => {
    setGameOver(true);
    const userData = getUserData();
    if (userData?.stoken) {
      try {
        // Decide pass/fail. For example, pass if score>0
        const gotCorrect = score > 0;
        await gameAttempt(userData.stoken, LATTICE_VIS_GAME_ID, gotCorrect);
        const updated = await getMetrics(userData.stoken);
        setMetrics(updated);
      } catch (err) {
        console.error("LatticeVisualizer game attempt error:", err);
      }
    }
  };

  // If gameOver => final screen
  if (gameOver) {
    return (
      <div className="p-6">
        <h2 className="text-2xl font-bold text-[#a65c1c] mb-4">
          Lattice Visualizer Completed
        </h2>
        <p className="mb-2">Score: {score}</p>

        {metrics && (
          <div className="bg-[#eee] p-3 rounded-md mt-4">
            <h3 className="font-bold">Your Updated Metrics:</h3>
            <p>Total Attempts: {metrics.total_games_attempted}</p>
            <p>Total Games Correct: {metrics.total_games_correct}</p>
            <p>Total Points Earned: {metrics.total_points_earned}</p>
            <p>Success Rate: {metrics.success_rate?.toFixed(2) ?? "N/A"}%</p>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="bg-white/95 p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold text-[#a65c1c] mb-4">
        Game 3: Lattice Visualizer
      </h2>
      <p className="mb-2 text-black">Score: {score}</p>
      <p className="mb-4 text-black">
        This is the power set of <strong>&#123;1,2&#125;</strong> under set inclusion, a small
        lattice. Click on the nodes to highlight them. Then, pick which node is the top
        (maximum) and which is the bottom (minimum).
      </p>

      {/* Lattice in an SVG */}
      <div className="flex justify-center mb-4">
        <svg width="200" height="220" className="border border-gray-300">
          {/* Draw edges first */}
          {edges.map(([source, target], i) => {
            const srcNode = nodes.find((n) => n.id === source);
            const tgtNode = nodes.find((n) => n.id === target);
            if (!srcNode || !tgtNode) return null;
            return (
              <line
                key={`edge-${i}`}
                x1={srcNode.x}
                y1={srcNode.y}
                x2={tgtNode.x}
                y2={tgtNode.y}
                stroke="#888"
                strokeWidth={2}
              />
            );
          })}

          {/* Draw nodes */}
          {nodes.map((node) => (
            <g key={node.id} onClick={() => toggleNodeSelect(node.id)}>
              <circle
                cx={node.x}
                cy={node.y}
                r={14}
                fill={node.isSelected ? "#a65c1c" : "#fff"}
                stroke="#a65c1c"
                strokeWidth={2}
                className="cursor-pointer"
              />
              <text
                x={node.x}
                y={node.y + 4}
                textAnchor="middle"
                fill={node.isSelected ? "#fff" : "#a65c1c"}
                className="cursor-pointer select-none text-sm font-bold"
              >
                {node.id}
              </text>
            </g>
          ))}
        </svg>
      </div>

      {/* User picks top & bottom */}
      <div className="flex gap-8 mb-4">
        <div>
          <label className="block font-semibold mb-2 text-[#a65c1c]">
            Select Top
          </label>
          <select
            className="border border-gray-300 rounded-md p-2"
            value={selectedTop}
            onChange={(e) => setSelectedTop(e.target.value)}
          >
            <option value="">-- Select --</option>
            {nodes.map((n) => (
              <option key={`top-${n.id}`} value={n.id}>
                {n.id}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="block font-semibold mb-2 text-[#a65c1c]">
            Select Bottom
          </label>
          <select
            className="border border-gray-300 rounded-md p-2"
            value={selectedBottom}
            onChange={(e) => setSelectedBottom(e.target.value)}
          >
            <option value="">-- Select --</option>
            {nodes.map((n) => (
              <option key={`bottom-${n.id}`} value={n.id}>
                {n.id}
              </option>
            ))}
          </select>
        </div>
      </div>

      <button
        onClick={checkAnswers}
        className="px-4 py-2 bg-[#a65c1c] text-white rounded hover:bg-[#8e4e18] mr-4"
      >
        Check Answers
      </button>

      <button
        onClick={finishGame}
        className="px-4 py-2 bg-[#a65c1c] text-white rounded hover:bg-[#8e4e18]"
      >
        Finish Game
      </button>

      {feedback && (
        <div
          className={clsx(
            "mt-4 p-3 rounded-md text-center",
            feedback.includes("incorrect")
              ? "bg-red-100 text-red-800"
              : feedback.includes("Perfect")
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
