import path from "path";
import fs from "fs";

export const ReadMenuFile = async (): Promise<Menu[]> => {
  console.log("Fetching menu file...");
  const menuPath = path.join(process.cwd(), "src/data", "menu.json");
  try {
    const content = await fs.promises.readFile(menuPath, { encoding: "utf-8" });
    return JSON.parse(content);
  } catch (err) {
    console.log("There was an error reading the file: ", err);
    throw err;
  }
};

export const SaveMenu = async (scheduleResponse: MenuScheduleResponse) => {
  console.log("Saving menu files...");
  const today = new Date();
  const month = today.toLocaleString("en-US", { month: "long" });
  const year = today.getFullYear();

  const outputDir = path.join(process.cwd(), "src/data/output");

  if (!fs.existsSync(outputDir)) {
    await fs.promises.mkdir(outputDir, { recursive: true });
  }

  const textFilePath = path.join(outputDir, `${month}-${year}-menu.txt`);
  const jsonFilePath = path.join(outputDir, `${month}-${year}-menu.json`);

  // Save text format for emails
  await fs.promises.writeFile(textFilePath, scheduleResponse.textFormat);
  console.log(`Text menu saved to: ${textFilePath}`);

  // Save JSON format for structured data
  await fs.promises.writeFile(
    jsonFilePath,
    JSON.stringify(scheduleResponse.schedule, null, 2)
  );
  console.log(`JSON menu saved to: ${jsonFilePath}`);
};
