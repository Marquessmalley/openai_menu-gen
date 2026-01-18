interface Menu {
  name: string;
  sides: string[];
}

interface DaySchedule {
  day: string;
  meal: Menu;
}

interface WeekSchedule {
  week: number;
  days: DaySchedule[];
}

interface MonthMenu {
  month: string;
  year: string;
  schedule: WeekSchedule[];
}

interface MenuScheduleResponse {
  textFormat: string;
  schedule: MonthMenu;
}
