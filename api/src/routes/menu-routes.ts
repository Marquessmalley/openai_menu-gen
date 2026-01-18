import express from "express";
import { GetMonthMenu, GetMenuList, GetCurrentMonthMenu, GetMonthsMenu } from "../controllers/menu-controller.js";

const router = express.Router();

router.get("/", GetMenuList);
router.get("/current", GetCurrentMonthMenu);
router.get("/months", GetMonthsMenu);
router.get("/:month/:year", GetMonthMenu);


export default router;