export interface CurrentDateInfo {
  date: string;
  day: string;
  month: string;
  year: number;
  week: number;
}

export function getCurrentDateInfo(): CurrentDateInfo {
  const currentDate = new Date();

  return {
    date: currentDate.toLocaleDateString("en-US", { timeZone: "America/New_York", day: "2-digit" }),
    day: currentDate.toLocaleDateString("en-US", { weekday: "long", timeZone: "America/New_York" }),
    month: currentDate.toLocaleDateString("en-US", { month: "long" }),
    year: currentDate.getFullYear(),
    week: Math.ceil(currentDate.getDate() / 7),
  };
}
