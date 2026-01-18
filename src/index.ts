import "dotenv/config";
import { sendEmail } from "./lib/nodemailer.js";
import { ReadMenuFile, SaveMenu } from "./utils/menu-helper.js";
import { GenerateMenuSchedule } from "./lib/ai/menu-generator.js";

const subcribers: string[] = [
  "ksmalley77@gmail.com",
  "marquessmalley@gmail.com",
];

// CLI TOOL TO GENERATE A SINGLE MENU

export default async function Program() {
  console.log("Generating monthly menu schedule...");

  const menu: Menu[] = await ReadMenuFile();

  if (!menu || menu.length === 0) {
    console.log("Menu not found");
    return;
  }

  const scheduleResponse = await GenerateMenuSchedule(menu);

  if (!scheduleResponse) {
    throw new Error("Schedule not generated");
  }

  // Save both text and JSON files
  await SaveMenu(scheduleResponse);

  // Send the text format via email
  // for (const subscriber of subcribers) {
  //   await sendEmail(subscriber, scheduleResponse.textFormat);
  // }

  console.log("Monthly menu generated and emails sent successfully!");
}

Program();
