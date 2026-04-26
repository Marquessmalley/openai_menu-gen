interface Menu {
  id: number;
  name: string;
  sides: string[];
}

interface ScheduleEntry {
  date: number;
  dayOfWeek: string;
  meal: Menu;
}

interface MonthMenu {
  month: string;
  year: string;
  schedule: ScheduleEntry[];
}

interface MenuScheduleResponse {
  textFormat: string;
  schedule: MonthMenu;
}
