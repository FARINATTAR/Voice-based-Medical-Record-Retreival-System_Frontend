const StatsCard = ({ title, value, icon: Icon, color = "blue" }) => {
  const colorClasses = {
    blue: "bg-blue-50 text-blue-600",
    green: "bg-green-50 text-green-600",
    purple: "bg-purple-50 text-purple-600",
    orange: "bg-orange-50 text-orange-600"
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-gray-500 text-sm font-medium">{title}</p>
          <p className="text-3xl font-bold mt-2">{value}</p>
        </div>
        <div className={`p-3 rounded-full ${colorClasses[color]}`}>
          <Icon className="h-8 w-8" />
        </div>
      </div>
    </div>
  );
};

export default StatsCard;