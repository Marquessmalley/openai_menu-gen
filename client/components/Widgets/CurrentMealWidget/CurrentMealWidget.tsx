import { Calendar, ArrowRight } from "lucide-react";

export default function CurrentMealWidget() {
  const currentDate = new Date();
  const currentDay = currentDate.toLocaleDateString("en-US", {
    weekday: "long",
  });
  const currentMonth = currentDate.toLocaleDateString("en-US", {
    month: "long",
  });
  const currentYear = currentDate.getFullYear();
  const currentWeek = Math.ceil(currentDate.getDate() / 7);

  return (
    <div className="w-full rounded-2xl bg-white shadow-sm overflow-hidden">
      {/* Header */}
      <div className="bg-linear-to-r from-teal-600 to-teal-500 p-4 text-white">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-teal-500 rounded-lg">
            <Calendar className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-2xl font-bold">
              {currentMonth} {currentYear}
            </h2>
            <p className="text-sm text-teal-100">Current meal schedule</p>
          </div>
        </div>
      </div>

      {/* Today's Meal */}
      <div className="p-4">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-2">
            <span className="text-sm text-gray-500">Today's Dinner</span>
            <ArrowRight className="w-4 h-4 text-gray-400" />
            <span className="text-sm font-medium text-gray-700">
              {currentDay}
            </span>
          </div>
        </div>

        {/* Meal Card */}
        <div className="bg-gray-50 rounded-xl p-4 mb-4 border border-gray-100">
          <h3 className="font-semibold text-gray-900">Baked Chicken</h3>
          <p className="text-sm text-gray-500">
            with cabbage & macaroni and cheese
          </p>
        </div>

        {/* Week Navigation */}
        <div className="flex justify-between mt-6">
          {[1, 2, 3, 4].map((week) => (
            <button
              key={week}
              className={`px-4 py-2.5 text-sm rounded-lg transition-all ${
                week === currentWeek
                  ? "text-white font-medium shadow-md"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
              style={{
                background:
                  week === currentWeek
                    ? "linear-gradient(135deg, hsl(162 72% 40%) 0%, hsl(175 70% 45%) 100%)"
                    : undefined,
              }}
            >
              Week {week}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
