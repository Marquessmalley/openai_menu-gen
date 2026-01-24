// components/Widgets/WeeklyScheduleWidget/WeeklyScheduleWidget.tsx
import { WeekCard } from "@/components/UI/cards/WeekCard";
import { CurrentMonthMenu } from "@/types";
import { getCurrentDateInfo } from "@/lib/date-utils";

export default function WeeklyScheduleWidget({
  monthMenu,
}: {
  monthMenu: CurrentMonthMenu;
}) {
  const { week: currentWeek } = getCurrentDateInfo();
  return (
    <div className="bg-white rounded-2xl shadow-sm overflow-hidden flex flex-col h-full">
      <div className="p-6 pb-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold text-gray-900">
            Weekly Schedules
          </h2>
        </div>
      </div>

      <div className="flex-1 px-6 pb-6 overflow-y-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 h-auto">
          {monthMenu.schedule.map((week) => (
            <div key={week.week} className="min-h-0">
              <WeekCard
                weekNumber={week.week}
                isCurrent={week.week === currentWeek}
                days={week.days}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
