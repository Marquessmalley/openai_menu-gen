// types/index.ts
export interface MenuItem {
  id: number;
  name: string;
  sides: string[];
}

export interface DayMenu {
  day: string;
  meal: MenuItem;
}

/** One meal per calendar date (weekdays only). Used in API/JSON. */
export interface ScheduleEntry {
  date: number;
  dayOfWeek: string;
  meal: MenuItem;
}

export interface CurrentMonthMenu {
  month: string;
  year: string;
  schedule: ScheduleEntry[];
}

/** Week grouping for display (derived from schedule). */
export interface WeekSchedule {
  week: number;
  days: DayMenu[];
}

export interface WeekCardProps {
  weekNumber: number;
  month: string;
  year: string;
  isCurrent?: boolean;
  days: DayMenu[];
}
export interface RecipeCatalogWidgetProps {
  menuItems: MenuItem[];
}

export interface TotalRecipeWidgetProps {
  stat: number;
}

export interface CurrentMonthMenuWidgetProps {
  currentMonthMenu: CurrentMonthMenu;
}

export interface SideDishesWidgetProps {
  stat: number;
}
