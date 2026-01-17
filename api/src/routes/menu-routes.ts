import express from "express";
import {GetMenuList} from "../controllers/menu-controller.js";
const router = express.Router();

router.get("/", GetMenuList);

export default router;