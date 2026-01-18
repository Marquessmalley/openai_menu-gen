import { Request, Response } from "express";
import { ReadMenuFile, ReadMonthMenu, ReadMonthsMenu } from "../utils/menu-helper.js";

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