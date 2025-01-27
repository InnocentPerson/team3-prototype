export default function DashboardAchievements() {
    return (
      <div className="bg-[#f7f2d8] shadow-md rounded-lg p-6 mt-6">
        <h2 className="text-lg font-bold text-gray-800">Recent Achievements</h2>
        <ul className="mt-4 space-y-2">
          <li className="flex items-center">
            <span className="text-blue-500 text-xl">🏆</span>
            <p className="ml-2 text-sm font-medium text-gray-700">Poset Master - Completed 10 poset puzzles</p>
          </li>
          <li className="flex items-center">
            <span className="text-green-500 text-xl">⚡</span>
            <p className="ml-2 text-sm font-medium text-gray-700">Quick Solver - Solved lattice puzzle in record time</p>
          </li>
        </ul>
      </div>
    );
  }
  