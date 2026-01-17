import express from "express";
import menuRoutes from "./menu-routes.js";

const router = express.Router();

router.use("/menu", menuRoutes);

export default router;