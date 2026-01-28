import { CurrentMonthMenu, MenuItem } from "@/types";

export function countMealsInMonth(menu: CurrentMonthMenu): number {
  return menu.schedule.reduce((total, week) => {
    return total + week.days.length;
  }, 0);
}

export function countSideDishes(menuItems: MenuItem[]): number {
  return menuItems.reduce((total, item) => {
    return total + item.sides.length;
  }, 0);
}

export function getCurrentMeal(menu: CurrentMonthMenu): MenuItem | undefined {
  // Get today's date information in America/New_York timezone
  const today = new Date();
  const timeZone = "America/New_York";

  // Get the weekday in New York timezone
  const currentDay = today.toLocaleDateString("en-US", {
    weekday: "long",
    timeZone,
  });

  // Get the day of month in New York timezone
  const dayOfMonth = parseInt(
    today.toLocaleDateString("en-US", {
      day: "numeric",
      timeZone,
    }),
    10
  );

  // Calculate the week number based on day of month in New York timezone
  const currentWeek = Math.ceil(dayOfMonth / 7);

  // Find the current week in the schedule
  const currentWeekSchedule = menu.schedule.find(
    (week) => week.week === currentWeek,
  );
  if (!currentWeekSchedule) return undefined;

  // Find today's meal in the week's days
  const todayMeal = currentWeekSchedule.days.find(
    (day) => day.day.toLowerCase() === currentDay.toLowerCase(),
  );

  return todayMeal?.meal;
}