import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";
import { Octokit } from "@octokit/rest";

// get the url of the current file, convert it to a file path and store it in __filename
const __filename = fileURLToPath(import.meta.url);

// get the directory(folder) name of the current file and store it in __dirname
const __dirname = path.dirname(__filename);

// resolve the path to the data folder
const DATA_DIR = path.resolve(__dirname, "../data");

const API_MENU_PATH = path.join(DATA_DIR, "menu.json");
/** Monorepo root `src/data/menu.json` (present in local dev; absent on Render). */
const ROOT_MENU_PATH = path.resolve(__dirname, "../../../src/data/menu.json");

function formatMenuJson(menu: Menu[]): string {
  return JSON.stringify(menu, null, 2);
}

/**
 * Commits the full catalog to both `src/data/menu.json` and `api/src/data/menu.json` on GitHub.
 * Requires GH_TOKEN, GH_OWNER, GH_REPO; optional GH_BRANCH (default main).
 */
export async function commitMenuToGitHub(menu: Menu[]): Promise<void> {
  const token = process.env.GH_TOKEN;
  const owner = process.env.GH_OWNER;
  const repo = process.env.GH_REPO;
  const branch = process.env.GH_BRANCH ?? "main";

  console.log("HERE IS MY TOKEN", token);
  console.log("HERE IS MY OWNER", owner);
  console.log("HERE IS MY REPO", repo);
  console.log("HERE IS MY BRANCH", branch);

  if (!token || !owner || !repo) {
    throw new Error("Missing GH_TOKEN, GH_OWNER, or GH_REPO for GitHub commit");
  }

  const octokit = new Octokit({ auth: token });
  const content = formatMenuJson(menu);
  const ref = `heads/${branch}`;

  const { data: refData } = await octokit.rest.git.getRef({ owner, repo, ref });
  const parentSha = refData.object.sha;
  const { data: parentCommit } = await octokit.rest.git.getCommit({
    owner,
    repo,
    commit_sha: parentSha,
  });
  const baseTreeSha = parentCommit.tree.sha;

  const { data: blob } = await octokit.rest.git.createBlob({
    owner,
    repo,
    content,
    encoding: "utf-8",
  });

  const lastName = menu.length > 0 ? menu[menu.length - 1]!.name : "menu";
  const { data: newTree } = await octokit.rest.git.createTree({
    owner,
    repo,
    base_tree: baseTreeSha,
    tree: [
      {
        path: "src/data/menu.json",
        mode: "100644",
        type: "blob",
        sha: blob.sha,
      },
      {
        path: "api/src/data/menu.json",
        mode: "100644",
        type: "blob",
        sha: blob.sha,
      },
    ],
  });

  const { data: newCommit } = await octokit.rest.git.createCommit({
    owner,
    repo,
    message: `Add menu item: ${lastName}`,
    tree: newTree.sha,
    parents: [parentSha],
  });

  await octokit.rest.git.updateRef({
    owner,
    repo,
    ref,
    sha: newCommit.sha,
  });
}

/** Append a catalog item, write local files, optionally push to GitHub. */
export async function AddMenuItem(name: string, sides: string[]): Promise<Menu> {
  const existing = await ReadMenuFile();
  const maxId =
    existing.length === 0 ? 0 : Math.max(...existing.map((m) => m.id));
  const newItem: Menu = { id: maxId + 1, name, sides };
  const updated = [...existing, newItem];
  const json = formatMenuJson(updated);

  await fs.promises.writeFile(API_MENU_PATH, json, "utf-8");

  if (fs.existsSync(ROOT_MENU_PATH)) {
    await fs.promises.writeFile(ROOT_MENU_PATH, json, "utf-8");
  }

  if (process.env.GH_TOKEN) {
    await commitMenuToGitHub(updated);
  }

  return newItem;
}


export const ReadMenuFile = async (): Promise<Menu[]> => {
  console.log("Fetching menu file...");
  try {
    const content = await fs.promises.readFile(API_MENU_PATH, { encoding: "utf-8" });
    return JSON.parse(content);
  } catch (err) {
    console.log("There was an error reading the file: ", err);
    throw err;
  }
};

export const ReadMonthMenu = async (month: string, year: string): Promise<MonthMenu> => {
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
    const allMenus: MonthMenu[] = await Promise.all(
      jsonFiles.map(async (file) => {
        const filePath = path.join(menuPath, file);
        const content = await fs.promises.readFile(filePath, { encoding: "utf-8" });
        return JSON.parse(content);
      })
    );

    return allMenus;
  } catch (err) {
    console.log("There was an error reading the months menu file: ", err);
    throw err;
  }
}