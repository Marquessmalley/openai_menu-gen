import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";

// get the url of the current file, convert it to a file path and store it in __filename
const __filename = fileURLToPath(import.meta.url);

// get the directory(folder) name of the current file and store it in __dirname
const __dirname = path.dirname(__filename);

// resolve the path to the data folder
const DATA_DIR = path.resolve(__dirname, "../data");


export const ReadMenuFile = async (): Promise<Menu[]> => {
  console.log("Fetching menu file...");
  // Navigate to root project's data folder
  const menuPath = path.join(DATA_DIR, "menu.json");

  try {
    const content = await fs.promises.readFile(menuPath, { encoding: "utf-8" });
    return JSON.parse(content);
  } catch (err) {
    console.log("There was an error reading the file: ", err);
    throw err;
  }
};

export const ReadMonthMenu = async (month: string, year: string): Promise<WeekSchedule[]> => {
  try {
    const menuPath = path.join(DATA_DIR, "output", `${month}-${year}-menu.json`);
    const content = await fs.promises.readFile(menuPath, { encoding: "utf-8" });

    return JSON.parse(content);
  } catch (err) {
    console.log("There was an error reading the current month menu file: ", err);
    throw err;
  }
}

export const ReadMonthsMenu = async (): Promise<MonthMenu[]> => {
  try {
    const menuPath = path.join(DATA_DIR, "output");
    const files = await fs.promises.readdir(menuPath);
    const jsonFiles = files.filter((file) => file.endsWith('.json'))


    // Read all files in parallel
    const allMenus = await Promise.all(
      jsonFiles.map(async (file) => {
        const filePath = path.join(menuPath, file);
        const content = await fs.promises.readFile(filePath, { encoding: "utf-8" });
        const schedule: WeekSchedule[] = JSON.parse(content);

        // Extract month and year from filename (e.g., "January-2026-menu.json")
        const [month, year] = file.replace('-menu.json', '').split('-');

        return {
          month,
          year,
          schedule
        };
      })
    );

    return allMenus;
  } catch (err) {
    console.log("There was an error reading the months menu file: ", err);
    throw err;
  }
}