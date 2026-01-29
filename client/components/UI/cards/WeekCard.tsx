// components/UI/cards/WeekCard.tsx
import { Chip } from "../Chip";
import { DayMenu } from "@/types";

interface WeekCardProps {
  weekNumber: number;
  month: string;
  year: string;
  isCurrent?: boolean;
  days: DayMenu[];
}

const MONTH_NAMES: Record<string, number> = {
  January: 0, February: 1, March: 2, April: 3, May: 4, June: 5,
  July: 6, August: 7, September: 8, October: 9, November: 10, December: 11,
};

function getWeekDateRange(month: string, year: string, weekNumber: number): string {
  const monthIndex = MONTH_NAMES[month] ?? new Date().getMonth();
  const yearNum = parseInt(year, 10) || new Date().getFullYear();
  const daysInMonth = new Date(yearNum, monthIndex + 1, 0).getDate();
  const startDate = (weekNumber - 1) * 7 + 1;
  const endDate = Math.min(weekNumber * 7, daysInMonth);
  const monthAbbrev = month ? month.substring(0, 3) : "";
  return `${monthAbbrev} ${startDate}-${endDate}`;
}

export function WeekCard({
  weekNumber,
  month,
  year,
  isCurrent = false,
  days,
}: WeekCardProps) {
  const dateRangeLabel = getWeekDateRange(month, year, weekNumber);
  // Day color mapping with vibrant colors for each day of the week
  const dayColors: Record<string, { bg: string; text: string }> = {
    Monday: {
      bg: "bg-blue-100 dark:bg-blue-900/30",
      text: "text-blue-800 dark:text-blue-200",
    },
    Tuesday: {
      bg: "bg-purple-100 dark:bg-purple-900/30",
      text: "text-purple-800 dark:text-purple-200",
    },
    Wednesday: {
      bg: "bg-green-100 dark:bg-green-900/30",
      text: "text-green-800 dark:text-green-200",
    },
    Thursday: {
      bg: "bg-yellow-100 dark:bg-yellow-900/30",
      text: "text-yellow-800 dark:text-yellow-200",
    },
    Friday: {
      bg: "bg-red-100 dark:bg-red-900/30",
      text: "text-red-800 dark:text-red-200",
    },
    Saturday: {
      bg: "bg-pink-100 dark:bg-pink-900/30",
      text: "text-pink-800 dark:text-pink-200",
    },
    Sunday: {
      bg: "bg-indigo-100 dark:bg-indigo-900/30",
      text: "text-indigo-800 dark:text-indigo-200",
    },
  };

  // Get the first three letters of the day for the chip
  const getDayAbbreviation = (day: string) => day.substring(0, 3);

  return (
    <div className="h-full flex flex-col bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden hover:shadow-md transition-shadow">
      <div className="p-4 border-b border-gray-100 dark:border-gray-700 flex justify-between items-center">
        <h3 className="text-base font-medium text-gray-900 dark:text-white">
          {dateRangeLabel}
        </h3>
        {isCurrent && (
          <Chip className="bg-teal-100 dark:bg-teal-900/30 text-teal-800 dark:text-teal-200 text-xs font-medium">
            Current
          </Chip>
        )}
      </div>

      <div
        className="flex-1 overflow-y-auto p-4"
        style={{ maxHeight: "300px" }}
      >
        <div className="space-y-3">
          {days.map((day, index) => {
            const colors = dayColors[day.day] || {
              bg: "bg-gray-100 dark:bg-gray-700",
              text: "text-gray-800 dark:text-gray-200",
            };
            return (
              <div key={index} className="flex items-start space-x-3">
                <Chip
                  className={`${colors.bg} ${colors.text} text-xs font-medium`}
                >
                  {getDayAbbreviation(day.day)}
                </Chip>
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-medium text-gray-900 dark:text-white">
                    {day.meal.name}
                  </div>
                  {day.meal.sides && day.meal.sides.length > 0 && (
                    <div className="mt-1">
                      {day.meal.sides.map((side: string, i: number) => (
                        <span
                          key={i}
                          className="text-xs text-gray-500 dark:text-gray-400"
                        >
                          {side}
                          {i < day.meal.sides!.length - 1 ? " • " : ""}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
