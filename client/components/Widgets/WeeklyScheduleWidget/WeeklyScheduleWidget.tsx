// components/Widgets/WeeklyScheduleWidget/WeeklyScheduleWidget.tsx
import { WeekCard } from "@/components/UI/cards/WeekCard";

// Mock data for 4 weeks
const weeklyMenus = [
  {
    weekNumber: 1,
    isCurrent: false,
    days: [
      {
        day: "Mon",
        meal: "Spaghetti Carbonara",
        sides: ["Garlic Bread", "Caesar Salad"],
      },
      {
        day: "Tue",
        meal: "Grilled Chicken",
        sides: ["Mashed Potatoes", "Steamed Vegetables"],
      },
      {
        day: "Wed",
        meal: "Vegetable Stir Fry",
        sides: ["Rice", "Spring Rolls"],
      },
      {
        day: "Thu",
        meal: "Beef Tacos",
        sides: ["Refried Beans", "Spanish Rice"],
      },
      {
        day: "Fri",
        meal: "Fish and Chips",
        sides: ["Tartar Sauce", "Coleslaw"],
      },
    ],
  },
  {
    weekNumber: 2,
    isCurrent: false,
    days: [
      {
        day: "Mon",
        meal: "Chicken Alfredo",
        sides: ["Garlic Bread", "Caesar Salad"],
      },
      { day: "Tue", meal: "Grilled Salmon", sides: ["Asparagus", "Wild Rice"] },
      {
        day: "Wed",
        meal: "Vegetable Lasagna",
        sides: ["Garlic Bread", "Side Salad"],
      },
      {
        day: "Thu",
        meal: "Pork Chops",
        sides: ["Apple Sauce", "Roasted Potatoes"],
      },
      { day: "Fri", meal: "Pizza", sides: ["Garlic Knots", "Marinara"] },
    ],
  },
  {
    weekNumber: 3,
    isCurrent: true,
    days: [
      { day: "Mon", meal: "Butter Chicken", sides: ["Basmati Rice", "Naan"] },
      {
        day: "Tue",
        meal: "Beef Bourguignon",
        sides: ["Mashed Potatoes", "Green Beans"],
      },
      { day: "Wed", meal: "Vegetable Curry", sides: ["Rice", "Poppadoms"] },
      { day: "Thu", meal: "Chicken Fajitas", sides: ["Peppers", "Sour Cream"] },
      {
        day: "Fri",
        meal: "Burgers",
        sides: ["Sweet Potato Fries", "Onion Rings"],
      },
    ],
  },
  {
    weekNumber: 4,
    isCurrent: false,
    days: [
      {
        day: "Mon",
        meal: "Pasta Primavera",
        sides: ["Garlic Bread", "Side Salad"],
      },
      {
        day: "Tue",
        meal: "Grilled Steak",
        sides: ["Baked Potato", "Grilled Asparagus"],
      },
      {
        day: "Wed",
        meal: "Vegetable Soup",
        sides: ["Crusty Bread", "Side Salad"],
      },
      {
        day: "Thu",
        meal: "Chicken Stir Fry",
        sides: ["Noodles", "Spring Rolls"],
      },
      {
        day: "Fri",
        meal: "Fish Tacos",
        sides: ["Lime Crema", "Black Bean Salad"],
      },
    ],
  },
];

export default function WeeklyScheduleWidget() {
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
          {weeklyMenus.map((week) => (
            <div key={week.weekNumber} className="min-h-0">
              <WeekCard
                weekNumber={week.weekNumber}
                isCurrent={week.isCurrent}
                days={week.days}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
