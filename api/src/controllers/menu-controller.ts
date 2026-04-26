import { Request, Response } from "express";
import {
  ReadMenuFile,
  ReadMonthMenu,
  ReadMonthsMenu,
  AddMenuItem,
} from "../utils/menu-helper.js";

export const GetMenuList = async (req: Request, res: Response) => {
  try {
    const menuList = await ReadMenuFile();
    res.json(menuList);
  } catch (err) {
    console.error("Failed to get menu list:", err);
    res.status(500).json({ error: "Failed to load menu" });
  }
};

export const GetCurrentMonthMenu = async (req: Request, res: Response) => {
  try {
    const today = new Date();
    const month = today.toLocaleString("en-US", { month: "long" });
    const year = today.getFullYear();


    if (typeof month === 'string' && typeof year === 'number') {
      const monthMenu = await ReadMonthMenu(month, year.toString())
      res.json(monthMenu)
    }

  } catch (err) {
    res.status(500).json({ error: "Failed to get current month menu" });
  }
}

export const GetMonthMenu = async (req: Request, res: Response) => {

  try {
    const { month, year } = req.params;
    if (typeof month === 'string' && typeof year === 'string') {
      const monthMenu = await ReadMonthMenu(month, year)
      res.json(monthMenu)
    }

  } catch (err) {
    res.status(500).json({ error: "Failed to get month menu" });
  }

}

export const GetMonthsMenu = async (req: Request, res: Response) => {
  try {
    const monthsMenu = await ReadMonthsMenu()
    res.json(monthsMenu)
  } catch (err) {
    res.status(500).json({ error: "Failed to get month menu" });
  }
}

export const CreateMenuItem = async (req: Request, res: Response) => {
  try {
    const body = req.body as unknown;
    if (!body || typeof body !== "object") {
      res.status(400).json({ error: "Invalid body" });
      return;
    }
    const { name, sides } = body as Record<string, unknown>;

    if (typeof name !== "string" || name.trim() === "") {
      res.status(400).json({ error: "name is required" });
      return;
    }
    if (!Array.isArray(sides)) {
      res.status(400).json({ error: "sides must be an array" });
      return;
    }

    const cleanedSides = sides
      .filter((s): s is string => typeof s === "string")
      .map((s) => s.trim())
      .filter((s) => s.length > 0);

    if (cleanedSides.length === 0) {
      res
        .status(400)
        .json({ error: "At least one non-empty side is required" });
      return;
    }

    const item = await AddMenuItem(name.trim(), cleanedSides);
    res.status(201).json(item);
  } catch (err) {
    console.error("Failed to create menu item:", err);
    res.status(500).json({ error: "Failed to create menu item" });
  }
};