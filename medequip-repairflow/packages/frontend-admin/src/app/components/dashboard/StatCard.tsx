interface StatCardProps {
  title: string;
  value: number;
  // Add more props for icon, color, etc. later
}

export default function StatCard({ title, value }: StatCardProps) {
  return (
    <div className="bg-white p-4 shadow rounded">
      <h3 className="text-gray-500 text-sm">{title}</h3>
      <p className="text-2xl font-bold">{value}</p>
    </div>
  );
}
