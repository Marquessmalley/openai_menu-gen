import "dotenv/config";
import { sendEmail } from "./lib/nodemailer.js";
import { ReadMenuFile, SaveMenu } from "./utils/menu-helper.js";
import { GenerateMenuSchedule } from "./lib/ai/menu-generator.js";

const subcribers: string[] = [
  "ksmalley77@gmail.com",
  "marquessmalley@gmail.com",
];

export default async function Program() {
  console.log("Generating monthly menu schedule...");

  const menu: Menu[] = await ReadMenuFile();

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

Program();
