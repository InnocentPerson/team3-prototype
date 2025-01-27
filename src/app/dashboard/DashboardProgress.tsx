export default function DashboardProgress() {
    return (
      <div className="bg-white shadow-md rounded-lg p-6 mt-6">
        <h2 className="text-lg font-bold text-gray-800">Your Progress</h2>
        <div className="mt-4">
          <p className="text-sm text-gray-600">Posets (75%)</p>
          <div className="w-full bg-gray-200 h-2 rounded-full">
            <div className="bg-blue-500 h-2 rounded-full w-3/4"></div>
          </div>
        </div>
        <div className="mt-4">
          <p className="text-sm text-gray-600">Lattices (45%)</p>
          <div className="w-full bg-gray-200 h-2 rounded-full">
            <div className="bg-green-500 h-2 rounded-full w-2/5"></div>
          </div>
        </div>
        <div className="mt-4">
          <p className="text-sm text-gray-600">Permutations (60%)</p>
          <div className="w-full bg-gray-200 h-2 rounded-full">
            <div className="bg-purple-500 h-2 rounded-full w-3/5"></div>
          </div>
        </div>
      </div>
    );
  }
  