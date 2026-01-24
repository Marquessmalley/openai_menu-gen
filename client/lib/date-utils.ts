export interface CurrentDateInfo {
  date: Date;
  day: string;
  month: string;
  year: number;
  week: number;
}

export function getCurrentDateInfo(): CurrentDateInfo {
  const currentDate = new Date();

  return {
    date: currentDate,
    day: currentDate.toLocaleDateString("en-US", { weekday: "long" }),
    month: currentDate.toLocaleDateString("en-US", { month: "long" }),
    year: currentDate.getFullYear(),
    week: Math.ceil(currentDate.getDate() / 7),
  };
}
