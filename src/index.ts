import "dotenv/config";
import { openAiClient } from "./lib/openai.js";
import { sendEmail } from "./lib/nodemailer.js";
import { ReadMenu, SaveMenu } from "./utils/menu-helper.js";

const subcribers: string[] = ["ksmalley77@gmail.com"];

async function GenerateMenuSchedule(menu: Menu[]) {
  try {
    const prompt = `You are a meal planning expert. Create a Monday-Friday dinner schedule using ONLY the meals from this menu list:

${JSON.stringify(menu, null, 2)}

Requirements:
1. Use each meal name & sides EXACTLY as written
2. Create 4 weeks of meals (Week 1-4, Monday-Friday each week = 20 meals total)
3. Ensure variety - don't repeat the same meal within the same week
4. Start the message with a funny joke about current USA events (sports, politics, news, tech, holidays)
5. Format your response in a nice, clean structure that's easy to read
6. Randomly order the meals throughout the weeks

Format like this:
[Funny joke here]

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

export default async function GenerateMonthlySchedule() {
  console.log("Generating monthly menu schedule...");

  const menu: Menu[] = await ReadMenu();

  if (!menu || menu.length === 0) {
    console.log("Menu not found");
    return;
  }

  const schedule = await GenerateMenuSchedule(menu);

  if (!schedule) {
    throw new Error("Schedule not generated");
  }

  await SaveMenu(schedule);

  for (const subscriber of subcribers) {
    await sendEmail(subscriber, schedule);
  }
}

GenerateMonthlySchedule();
