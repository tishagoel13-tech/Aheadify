export default function StatsCard({
  title,
  value,
  color,
}) {
  return (
    <div className="bg-white rounded-3xl shadow p-6">

      <div
className={`w-14 h-14 rounded-2xl ${color} mb-5 flex items-center justify-center`}
>
</div>

      <p className="text-gray-500">
        {title}
      </p>

      <h2 className="text-4xl font-bold mt-2">
        {value}
      </h2>

    </div>
  );
}