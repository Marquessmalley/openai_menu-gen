import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";

// get the url of the current file, convert it to a file path and store it in __filename
const __filename = fileURLToPath(import.meta.url);

// get the directory(folder) name of the current file and store it in __dirname
const __dirname = path.dirname(__filename);

// resolve the path to the data folder
const DATA_DIR = path.resolve(__dirname, "../data");


export const ReadMenuFile = async () => {
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
