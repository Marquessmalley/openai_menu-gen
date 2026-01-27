import { Calendar, ArrowRight } from "lucide-react";
import { getCurrentDateInfo } from "@/lib/date-utils";
import { getCurrentMeal } from "@/lib/menu-utils";
import { CurrentMonthMenu } from "@/types";

export default function CurrentMealWidget({
  monthMenu,
}: {
  monthMenu: CurrentMonthMenu;
}) {
  const {
    day: currentDay,
    month: currentMonth,
    year: currentYear,
    week: currentWeek,
  } = getCurrentDateInfo();
  const meal = getCurrentMeal(monthMenu);

  return (
    <div className="w-full rounded-2xl bg-white dark:bg-gray-800 shadow-sm overflow-hidden">
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
            <span className="text-sm text-gray-500 dark:text-gray-400">
              Today's Dinner
            </span>
            <ArrowRight className="w-4 h-4 text-gray-400 dark:text-gray-500" />
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
              {currentDay}
            </span>
          </div>
        </div>

        {/* Meal Card */}
        {meal ? (
          <div className="bg-gray-50 dark:bg-gray-700 rounded-xl p-4 mb-4 border border-gray-100 dark:border-gray-600">
            <h3 className="font-semibold text-gray-900 dark:text-white">
              {meal.name}
            </h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              {meal.sides.join(", ")}
            </p>
          </div>
        ) : (
          <div className="bg-gray-50 dark:bg-gray-700 rounded-xl p-4 mb-4 border border-gray-100 dark:border-gray-600">
            <h3 className="font-semibold text-gray-900 dark:text-white">
              No meal planned for today
            </h3>
          </div>
        )}

        {/* Week Navigation */}
        <div className="flex justify-between mt-6">
          {[1, 2, 3, 4].map((week) => (
            <button
              key={week}
              className={`px-4 py-2.5 text-sm rounded-lg transition-all ${
                week === currentWeek
                  ? "text-white font-medium shadow-md"
                  : "bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600"
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
