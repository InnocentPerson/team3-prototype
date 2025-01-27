import DashboardCard from "./DashboardCard";
import DashboardProgress from "./DashboardProgress";
import DashboardAchievements from "./DashboardAchievements";

export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-100 to-green-300 p-6">
      <nav className="flex justify-between items-center bg-white p-4 shadow-md rounded-lg">
        <h1 className="text-xl font-semibold text-gray-800">Dashboard</h1>
        <div className="flex items-center">
          <button className="bg-gray-200 p-2 rounded-full hover:bg-gray-300">🔔</button>
          <img
            src="https://via.placeholder.com/40"
            alt="User Profile"
            className="ml-4 w-10 h-10 rounded-full border"
          />
        </div>
      </nav>

      {/* Game Cards with Navigation */}
      <section className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
        <DashboardCard 
          title="Posets" 
          description="Explore partially ordered sets through interactive games" 
          gamesAvailable={12} 
          link="/posets" // <-- Navigates to Posets
        />
        <DashboardCard 
          title="Lattices" 
          description="Master lattice theory with engaging puzzles" 
          gamesAvailable={8} 
          link="/lattices" // <-- Navigates to Lattices
        />
        <DashboardCard 
          title="Permutations" 
          description="Practice permutations with interactive challenges" 
          gamesAvailable={10} 
          link="/permutation" // <-- Navigates to Permutations
        />
      </section>

      <DashboardProgress />
      <DashboardAchievements />
    </div>
  );
}
