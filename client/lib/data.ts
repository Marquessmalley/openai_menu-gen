import { CurrentMonthMenu, ScheduleEntry } from "@/types";
import { getCurrentDateInfo } from "@/lib/date-utils";

// Build-safe fallbacks
const emptyMenuList: any[] = [];
const emptyCurrentMonthMenu: CurrentMonthMenu = {
  month: "",
  year: "",
  schedule: [],
};
const emptyMonthMenu: CurrentMonthMenu = { ...emptyCurrentMonthMenu };
const emptyMonthsMenu: any[] = [];

/** Detect old week-based format and convert to date-based schedule. */
function normalizeMonthMenu(raw: any): CurrentMonthMenu {
  const schedule = raw?.schedule;
  if (!Array.isArray(schedule) || schedule.length === 0) {
    return { month: raw?.month ?? "", year: raw?.year ?? "", schedule: [] };
  }
  const first = schedule[0];
  if (typeof first?.date === "number" && first?.dayOfWeek != null) {
    return raw as CurrentMonthMenu;
  }
  if (typeof first?.week !== "number" || !Array.isArray(first?.days)) {
    return { month: raw?.month ?? "", year: raw?.year ?? "", schedule: [] };
  }
  const monthNames: Record<string, number> = {
    January: 0, February: 1, March: 2, April: 3, May: 4, June: 5,
    July: 6, August: 7, September: 8, October: 9, November: 10, December: 11,
  };
  const month = monthNames[raw?.month] ?? new Date().getMonth();
  const year = parseInt(String(raw?.year ?? new Date().getFullYear()), 10) || new Date().getFullYear();
  const entries: ScheduleEntry[] = [];
  for (const week of schedule) {
    const weekNum = week.week as number;
    const startDate = (weekNum - 1) * 7 + 1;
    for (const day of week.days ?? []) {
      const dayName = day.day as string;
      for (let d = startDate; d < startDate + 7 && d <= 31; d++) {
        const date = new Date(year, month, d);
        const weekday = date.toLocaleDateString("en-US", { weekday: "long" });
        if (weekday === dayName) {
          entries.push({ date: d, dayOfWeek: dayName, meal: day.meal });
          break;
        }
      }
    }
  }
  entries.sort((a, b) => a.date - b.date);
  return { month: raw?.month ?? "", year: String(year), schedule: entries };
}

export async function fetchMenuList() {
  // Skip fetch at build time if API URL is not available
  if (typeof window === "undefined" && !process.env.NEXT_PUBLIC_API_URL) {
    return emptyMenuList;
  }
  const resp = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/menu`);

  if (!resp.ok) {
    // At build time, return fallback instead of throwing
    if (typeof window === "undefined") {
      console.warn("Failed to fetch menu list at build time, using fallback");
      return emptyMenuList;
    }
    throw new Error("Failed to fetch menu list");
  }

  return resp.json();
}

export async function fetchCurrentMonthMenu() {
  // Skip fetch at build time if API URL is not available
  if (typeof window === "undefined" && !process.env.NEXT_PUBLIC_API_URL) {
    return emptyCurrentMonthMenu;
  }
  const resp = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/menu/current`);

  if (!resp.ok) {
    // At build time, return fallback instead of throwing
    if (typeof window === "undefined") {
      console.warn(
        "Failed to fetch current month menu at build time, using fallback",
      );
      return emptyCurrentMonthMenu;
    }
    throw new Error("Failed to fetch menu list");
  }

  const raw = await resp.json();
  return normalizeMonthMenu(raw);
}

export async function fetchMonthMenu() {
  // Skip fetch at build time if API URL is not available
  if (typeof window === "undefined" && !process.env.NEXT_PUBLIC_API_URL) {
    return emptyMonthMenu;
  }
  const { month, year } = getCurrentDateInfo();
  const resp = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/menu/${month}/${year}`,
  );

  if (!resp.ok) {
    // At build time, return fallback instead of throwing
    if (typeof window === "undefined") {
      console.warn("Failed to fetch month menu at build time, using fallback");
      return emptyMonthMenu;
    }
    throw new Error("Failed to fetch menu list");
  }

  const raw = await resp.json();
  return normalizeMonthMenu(raw);
}

export async function fetchMonthsMenu() {
  // Skip fetch at build time if API URL is not available
  if (typeof window === "undefined" && !process.env.NEXT_PUBLIC_API_URL) {
    return emptyMonthsMenu;
  }
  const resp = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/menu/months`);

  if (!resp.ok) {
    // At build time, return fallback instead of throwing
    if (typeof window === "undefined") {
      console.warn("Failed to fetch months menu at build time, using fallback");
      return emptyMonthsMenu;
    }
    throw new Error("Failed to fetch menu list");
  }

  return resp.json();
}
