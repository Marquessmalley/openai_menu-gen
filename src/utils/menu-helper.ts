import path from "path";
import fs from "fs";

export const ReadMenu = async (): Promise<Menu[]> => {
  console.log("Fetcing menu file...");
  const menuPath = path.join(process.cwd(), "src/data", "menu.json");
  try {
    const content = await fs.promises.readFile(menuPath, { encoding: "utf-8" });
    return JSON.parse(content);
  } catch (err) {
    console.log("There was an error reading the file: ", err);
    throw err;
  }
};

export const SaveMenu = async (schedule: string) => {
  console.log("Saving menu file...");
  const today = new Date();
  const month = today.toLocaleString("en-US", { month: "long" });
  const year = today.getFullYear();

  const outputDir = path.join(process.cwd(), "src/data/output");

  if (!fs.existsSync(outputDir)) {
    fs.mkdir(outputDir, { recursive: true }, () => {});
  }

  const filePath = path.join(outputDir, `${month}-${year}-menu.txt`);
  fs.writeFile(filePath, schedule, () => {});
};
