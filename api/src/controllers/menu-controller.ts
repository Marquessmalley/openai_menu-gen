import { Request, Response } from "express";
import { ReadMenuFile, ReadCurrentMonthMenu } from "../utils/menu-helper.js";

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
    const { month, year } = req.query;
    if (typeof month === 'string' && typeof year === 'string') {
      const monthMenu = await ReadCurrentMonthMenu(month, year)
      res.json(monthMenu)
    }

  } catch (err) {
    res.status(500).json({ error: "Failed to get current month menu" });
  }

}
