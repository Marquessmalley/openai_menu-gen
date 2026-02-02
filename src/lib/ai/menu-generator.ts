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

    // Pre-compute weekday dates so the LLM doesn't have to do calendar math
    const dayNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    const weekdays: { date: number; dayOfWeek: string }[] = [];
    for (let d = 1; d <= daysInMonth; d++) {
      const dow = new Date(yearNum, monthNum, d).getDay();
      if (dow >= 1 && dow <= 5) {
        weekdays.push({ date: d, dayOfWeek: dayNames[dow] });
      }
    }
    const weekdayList = weekdays
      .map((w) => `  - ${currentMonth} ${w.date} (${w.dayOfWeek})`)
      .join("\n");

    const prompt = `You are a meal planning expert. Create a Monday-Friday dinner schedule using ONLY the meals from this menu list:

${JSON.stringify(menu, null, 2)}

Here are the exact weekday dates for ${currentMonth} ${currentYear}. Use these EXACTLY as provided — do NOT change any date or day-of-week pairing:
${weekdayList}

Requirements:
1. Use each meal name & sides EXACTLY as written (include "id" if present on the menu item).
2. Create one schedule entry for every weekday listed above. Each entry must have "date" (day of month), "dayOfWeek", and "meal".
3. Ensure variety - don't repeat the same meal within the same week (week = dates 1-7, 8-14, 15-21, 22-28, 29-${daysInMonth}).
4. Randomly order the meals throughout the entire month.

Return your response as a JSON object with this exact structure:
{
  "textFormat": "${currentMonth} ${weekdays[0].date} (${weekdays[0].dayOfWeek}): Chili - Sides: crackers, cornbread\\n${currentMonth} ${weekdays[1].date} (${weekdays[1].dayOfWeek}): ...\\n...(nicely formatted text for emails, one line per weekday date)",
  "schedule": {
    "month": "${currentMonth}",
    "year": "${currentYear}",
    "schedule": [
      { "date": ${weekdays[0].date}, "dayOfWeek": "${weekdays[0].dayOfWeek}", "meal": { "id": 1, "name": "Chili", "sides": ["crackers", "cornbread"] } },
      { "date": ${weekdays[1].date}, "dayOfWeek": "${weekdays[1].dayOfWeek}", "meal": { "id": 2, "name": "Meatloaf", "sides": ["mashed potatoes", "corn"] } }
    ]
  }
}

IMPORTANT:
- Return ONLY valid JSON, no markdown code blocks or other text.
- "schedule" must be an array of objects. Each object has "date", "dayOfWeek", and "meal" (object with name, sides, and id if in the menu).
- You MUST use the exact date-to-day mappings listed above. Do not compute your own calendar.
- Include exactly one entry for each weekday listed above (${weekdays.length} total).
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
