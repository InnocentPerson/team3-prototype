import DashboardCard from "./DashboardCard";
import DashboardProgress from "./DashboardProgress";
import DashboardAchievements from "./DashboardAchievements";

export default function DashboardPage() {
  return (
    <div className="min-h-screen p-6">
      <nav className="flex justify-between items-center bg-[#f7f2d8] p-4 shadow-md rounded-lg">
        <h1 className="text-xl font-semibold text-gray-800">Dashboard</h1>
        <div className="flex items-center">
          <button className="bg-gray-200 p-2 rounded-full hover:bg-gray-300">🔔</button>
          <img
            src="data:image/png;base64,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"
            alt="User Profile"
            className="ml-4 w-10 h-10 rounded-full border"
          />
        </div>
      </nav>

      {/* Game Cards with Navigation */}
      <section className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
        <DashboardCard 
          title="Permutations" 
          description="Practice permutations with interactive challenges" 
          gamesAvailable={10} 
          link="/permutation" // <-- Navigates to Permutations
        />
        <DashboardCard 
          title="Lattices" 
          description="Master lattice theory with engaging puzzles" 
          gamesAvailable={8} 
          link="/lattices" // <-- Navigates to Lattices
        />
        <DashboardCard 
          title="Posets" 
          description="Explore partially ordered sets through interactive games" 
          gamesAvailable={12} 
          link="/posets" // <-- Navigates to Posets
        />
        
      </section>

      <DashboardProgress />
      <DashboardAchievements />
    </div>
  );
}
