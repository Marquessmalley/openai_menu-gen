import { openAiClient } from "./openai.js";

export async function GenerateMenuSchedule(menu: Menu[]) {
  try {
    const prompt = `You are a meal planning expert. Create a Monday-Friday dinner schedule using ONLY the meals from this menu list:

${JSON.stringify(menu, null, 2)}

Requirements:
1. Use each meal name & sides EXACTLY as written
2. Create 4 weeks of meals (Week 1-4, Monday-Friday each week = 20 meals total)
3. Ensure variety - don't repeat the same meal within the same week
4. Format your response in a nice, clean structure that's easy to read
5. Randomly order the meals throughout the entire month, not just for each weeks

Format like this:

WEEK 1
Monday: [Menu Name] - Sides: [sides]
Tuesday: [Menu Name] - Sides: [sides]
...

WEEK 2
...`;

    const response = await openAiClient.responses.create({
      model: "gpt-4o-mini",
      input: prompt,
      temperature: 0.7,
    });

    return response.output_text;
  } catch (err) {
    console.log("The Error: ", err);
  }
}
