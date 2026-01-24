// components/UI/cards/WeekCard.tsx
import { Chip } from "../Chip";
import { DayMenu } from "@/types";

interface WeekCardProps {
  weekNumber: number;
  isCurrent?: boolean;
  days: DayMenu[];
}

export function WeekCard({
  weekNumber,
  isCurrent = false,
  days,
}: WeekCardProps) {
  // Day color mapping with vibrant colors for each day of the week
  const dayColors: Record<string, { bg: string; text: string }> = {
    Monday: { bg: "bg-blue-100", text: "text-blue-800" },
    Tuesday: { bg: "bg-purple-100", text: "text-purple-800" },
    Wednesday: { bg: "bg-green-100", text: "text-green-800" },
    Thursday: { bg: "bg-yellow-100", text: "text-yellow-800" },
    Friday: { bg: "bg-red-100", text: "text-red-800" },
    Saturday: { bg: "bg-pink-100", text: "text-pink-800" },
    Sunday: { bg: "bg-indigo-100", text: "text-indigo-800" },
  };

  // Get the first three letters of the day for the chip
  const getDayAbbreviation = (day: string) => day.substring(0, 3);

  return (
    <div className="h-full flex flex-col bg-white rounded-xl border border-gray-200 overflow-hidden hover:shadow-md transition-shadow">
      <div className="p-4 border-b border-gray-100 flex justify-between items-center">
        <h3 className="text-base font-medium text-gray-900">
          Week {weekNumber}
        </h3>
        {isCurrent && (
          <Chip className="bg-teal-100 text-teal-800 text-xs font-medium">
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
              bg: "bg-gray-100",
              text: "text-gray-800",
            };
            return (
              <div key={index} className="flex items-start space-x-3">
                <Chip
                  className={`${colors.bg} ${colors.text} text-xs font-medium`}
                >
                  {getDayAbbreviation(day.day)}
                </Chip>
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-medium text-gray-900">
                    {day.meal.name}
                  </div>
                  {day.meal.sides && day.meal.sides.length > 0 && (
                    <div className="mt-1">
                      {day.meal.sides.map((side: string, i: number) => (
                        <span key={i} className="text-xs text-gray-500">
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
