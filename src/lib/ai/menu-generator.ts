import { openAiClient } from "./openai.js";

export async function GenerateMenuSchedule(
  menu: Menu[]
): Promise<MenuScheduleResponse | undefined> {
  try {
    const prompt = `You are a meal planning expert. Create a Monday-Friday dinner schedule using ONLY the meals from this menu list:

${JSON.stringify(menu, null, 2)}

Requirements:
1. Use each meal name & sides EXACTLY as written
2. Create 4 weeks of meals (Week 1-4, Monday-Friday each week = 20 meals total)
3. Ensure variety - don't repeat the same meal within the same week
4. Randomly order the meals throughout the entire month, not just for each week

Return your response as a JSON object with this exact structure:
{
  "textFormat": "WEEK 1\\nMonday: Chili - Sides: crackers, cornbread\\nTuesday: Meatloaf - Sides: mashed potatoes, corn\\n...\\n\\nWEEK 2\\n...(nicely formatted text for emails with all 4 weeks)",
  "schedule": [
    {
      "week": 1,
      "days": [
        { "day": "Monday", "meal": { "name": "Chili", "sides": ["crackers", "cornbread"] } },
        { "day": "Tuesday", "meal": { "name": "Meatloaf", "sides": ["mashed potatoes", "corn"] } },
        { "day": "Wednesday", "meal": { "name": "...", "sides": ["..."] } },
        { "day": "Thursday", "meal": { "name": "...", "sides": ["..."] } },
        { "day": "Friday", "meal": { "name": "...", "sides": ["..."] } }
      ]
    },
    {
      "week": 2,
      "days": [...]
    },
    {
      "week": 3,
      "days": [...]
    },
    {
      "week": 4,
      "days": [...]
    }
  ]
}

IMPORTANT: 
- Return ONLY valid JSON, no markdown code blocks or other text.
- The "textFormat" should be a nicely formatted string with newlines (\\n) for email readability.
- Include all 4 weeks with Monday-Friday for each week.`;

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
