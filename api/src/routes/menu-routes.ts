import express from "express";
import {GetCurrentMonthMenu, GetMenuList} from "../controllers/menu-controller.js";

const router = express.Router();

router.get("/", GetMenuList);
router.get("/current", GetCurrentMonthMenu);

export default router;