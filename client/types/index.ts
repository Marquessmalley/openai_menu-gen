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

export interface WeekSchedule {
  week: number;
  days: DayMenu[];
}

export interface CurrentMonthMenu {
  month: string;
  year: string;
  schedule: WeekSchedule[];
}

export interface WeekCardProps {
  weekNumber: number;
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
