import {
  CurrentMonthMenu,
  MenuItem,
  WeekSchedule,
  DayMenu,
} from "@/types";

export function countMealsInMonth(menu: CurrentMonthMenu): number {
  return menu.schedule.length;
}

export function countSideDishes(menuItems: MenuItem[]): number {
  return menuItems.reduce((total, item) => {
    return total + item.sides.length;
  }, 0);
}

export function getCurrentMeal(menu: CurrentMonthMenu): MenuItem | undefined {
  const today = new Date();
  const timeZone = "America/New_York";

  const dayOfMonth = parseInt(
    today.toLocaleDateString("en-US", {
      day: "numeric",
      timeZone,
    }),
    10
  );

  const currentDay = today.toLocaleDateString("en-US", {
    weekday: "long",
    timeZone,
  });

  // Weekend: no meal planned
  if (currentDay === "Saturday" || currentDay === "Sunday") {
    return undefined;
  }

  const entry = menu.schedule.find((e) => e.date === dayOfMonth);
  return entry?.meal;
}

/**
 * Group date-based schedule into weeks for display (Week 1 = dates 1-7, etc.).
 */
export function groupScheduleByWeek(
  menu: CurrentMonthMenu
): WeekSchedule[] {
  const byWeek = new Map<number, DayMenu[]>();

  for (const entry of menu.schedule) {
    const week = Math.ceil(entry.date / 7);
    const dayMenu: DayMenu = { day: entry.dayOfWeek, meal: entry.meal };
    if (!byWeek.has(week)) {
      byWeek.set(week, []);
    }
    byWeek.get(week)!.push(dayMenu);
  }

  return Array.from(byWeek.entries())
    .sort((a, b) => a[0] - b[0])
    .map(([week, days]) => ({
      week,
      days,
    }));
}

/** Unique week numbers present in the schedule (for week navigation). */
export function getWeeksInSchedule(menu: CurrentMonthMenu): number[] {
  const weeks = new Set(menu.schedule.map((e) => Math.ceil(e.date / 7)));
  return Array.from(weeks).sort((a, b) => a - b);
}