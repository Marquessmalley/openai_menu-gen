import { openAiClient } from "./openai.js";

export async function GenerateMenuSchedule(
  menu: Menu[]
): Promise<MenuScheduleResponse | undefined> {
  try {
    const today = new Date();
    const currentMonth = today.toLocaleString("en-US", { month: "long" });
    const currentYear = today.getFullYear().toString();
    const yearNum = today.getFullYear();
    const monthNum = today.getMonth();
    const daysInMonth = new Date(yearNum, monthNum + 1, 0).getDate();
    const firstDayOfMonth = new Date(yearNum, monthNum, 1);
    const firstWeekday = firstDayOfMonth.toLocaleDateString("en-US", {
      weekday: "long",
    });

    const prompt = `You are a meal planning expert. Create a Monday-Friday dinner schedule using ONLY the meals from this menu list:

${JSON.stringify(menu, null, 2)}

Calendar for ${currentMonth} ${currentYear}:
- The month has ${daysInMonth} days.
- The 1st is a ${firstWeekday}.
- Include ONLY weekdays (Monday-Friday). Do not include Saturday or Sunday.

Requirements:
1. Use each meal name & sides EXACTLY as written (include "id" if present on the menu item).
2. Create one schedule entry for every weekday in the month. Each entry must have "date" (day of month 1-${daysInMonth}), "dayOfWeek", and "meal".
3. Ensure variety - don't repeat the same meal within the same week (week = dates 1-7, 8-14, 15-21, 22-28, 29-31).
4. Randomly order the meals throughout the entire month.

Return your response as a JSON object with this exact structure:
{
  "textFormat": "January 1 (Thursday): Chili - Sides: crackers, cornbread\\nJanuary 2 (Friday): ...\\n...(nicely formatted text for emails, one line per weekday date)",
  "schedule": {
    "month": "${currentMonth}",
    "year": "${currentYear}",
    "schedule": [
      { "date": 1, "dayOfWeek": "Thursday", "meal": { "id": 1, "name": "Chili", "sides": ["crackers", "cornbread"] } },
      { "date": 2, "dayOfWeek": "Friday", "meal": { "id": 2, "name": "Meatloaf", "sides": ["mashed potatoes", "corn"] } },
      { "date": 5, "dayOfWeek": "Monday", "meal": { "id": 3, "name": "...", "sides": ["..."] } }
    ]
  }
}

IMPORTANT:
- Return ONLY valid JSON, no markdown code blocks or other text.
- "schedule" must be an array of objects. Each object has "date" (number 1-${daysInMonth}), "dayOfWeek" (Monday/Tuesday/Wednesday/Thursday/Friday), and "meal" (object with name, sides, and id if in the menu).
- Include exactly one entry for each weekday in ${currentMonth} ${currentYear}. Skip weekend dates (no Saturday or Sunday).
- Sort the "schedule" array by "date" ascending.
- The month MUST be "${currentMonth}" and the year MUST be "${currentYear}".`;

    const response = await openAiClient.responses.create({
      model: "gpt-4o-mini",
      input: prompt,
      temperature: 0.7,
    });

    const parsed: MenuScheduleResponse = JSON.parse(response.output_text);
    return parsed;
  } catch (err) {
    console.log("The Error: ", err);
  }
}
