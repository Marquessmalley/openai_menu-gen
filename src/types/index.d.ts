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

interface MenuScheduleResponse {
  textFormat: string;
  schedule: WeekSchedule[];
}
