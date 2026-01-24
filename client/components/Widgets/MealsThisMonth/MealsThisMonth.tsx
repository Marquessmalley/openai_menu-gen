import WidgetCard from "@/components/UI/cards/WidgetCard";
import { CurrentMonthMenuWidgetProps } from "@/types";
import { countMealsInMonth } from "@/lib/menu-utils";
import { getCurrentDateInfo } from "@/lib/date-utils";

export default function MealsThisMonth({
  currentMonthMenu,
}: CurrentMonthMenuWidgetProps) {
  const numOfMeals = countMealsInMonth(currentMonthMenu);
  const { month, year } = getCurrentDateInfo();
  return (
    <div>
      <WidgetCard
        title="Meals This Month"
        stat={numOfMeals}
        subtitle={`${month} ${year}`}
        icon={
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="lucide lucide-calendar h-4 w-4"
          >
            <path d="M8 2v4"></path>
            <path d="M16 2v4"></path>
            <rect width="18" height="18" x="3" y="4" rx="2"></rect>
            <path d="M3 10h18"></path>
          </svg>
        }
      />
    </div>
  );
}
