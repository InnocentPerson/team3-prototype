import Link from "next/link";

interface DashboardCardProps {
  title: string;
  description: string;
  gamesAvailable: number;
  link: string; // <-- Added link prop
}

export default function DashboardCard({ title, description, gamesAvailable, link }: DashboardCardProps) {
  return (
    <div className="bg-white shadow-md rounded-lg p-4 flex flex-col items-start">
      <h2 className="text-lg font-bold text-gray-800">{title}</h2>
      <p className="text-sm text-gray-600">{description}</p>
      <p className="mt-2 text-sm font-medium text-gray-700">{gamesAvailable} games available</p>
      
      {/* Play Now Button Navigates to the Game */}
      <Link href={link}>
        <button className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
          Play Now
        </button>
      </Link>
    </div>
  );
}
